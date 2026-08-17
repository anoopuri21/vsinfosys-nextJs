import type { D1Database, R2Bucket } from "@cloudflare/workers-types";
import { createRemoteJWKSet, jwtVerify } from "jose";

type Env = {
  DB: D1Database;
  MEDIA: R2Bucket;
  PUBLIC_ORIGIN: string;
  ADMIN_SHARED_SECRET?: string;
  CF_ACCESS_TEAM_DOMAIN?: string;
  CF_ACCESS_AUDIENCE?: string;
  TURNSTILE_SECRET_KEY?: string;
};
import {
  ApiValidationError,
  assertContentInput,
  type ContentInput,
} from "./validation";

const json = (data: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  });
const id = () => crypto.randomUUID();
const jwksByTeam = new Map<string, ReturnType<typeof createRemoteJWKSet>>();
async function actor(request: Request, env: Env) {
  const token = request.headers.get("cf-access-jwt-assertion");
  if (token && env.CF_ACCESS_TEAM_DOMAIN && env.CF_ACCESS_AUDIENCE) {
    const team = env.CF_ACCESS_TEAM_DOMAIN.replace(/^https?:\/\//, "").replace(
      /\/$/,
      "",
    );
    const jwks =
      jwksByTeam.get(team) ||
      createRemoteJWKSet(new URL(`https://${team}/cdn-cgi/access/certs`));
    jwksByTeam.set(team, jwks);
    try {
      const verified = await jwtVerify(token, jwks, {
        audience: env.CF_ACCESS_AUDIENCE,
      });
      return typeof verified.payload.email === "string"
        ? verified.payload.email
        : "cloudflare-access-user";
    } catch {
      return null;
    }
  }
  const secret = request.headers.get("x-vs-admin-secret");
  return env.ADMIN_SHARED_SECRET && secret === env.ADMIN_SHARED_SECRET
    ? "service-automation"
    : null;
}
function cacheHeaders() {
  return {
    "cache-control":
      "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
    "access-control-allow-origin": "*",
  };
}
async function saveContent(request: Request, env: Env, existingId?: string) {
  const user = await actor(request, env);
  if (!user)
    return json({ error: "Unauthorized admin request." }, { status: 401 });
  const input = await request.json();
  assertContentInput(input);
  const now = new Date().toISOString();
  const existing = existingId
    ? await env.DB.prepare("SELECT * FROM content_items WHERE id=?")
        .bind(existingId)
        .first<Record<string, unknown>>()
    : null;
  if (existingId && !existing)
    return json({ error: "Content item not found." }, { status: 404 });
  const itemId = existingId || id();
  const snapshot = JSON.stringify({ ...input, id: itemId, updatedAt: now });
  const revision = await env.DB.prepare(
    "SELECT COALESCE(MAX(revision_number),0)+1 AS revision FROM content_revisions WHERE content_id=?",
  )
    .bind(itemId)
    .first<{ revision: number }>();
  const statements = [
    env.DB.prepare(
      `INSERT INTO content_items (id,content_type,slug,status,title,summary,body_json,seo_title,seo_description,canonical_path,author_name,reviewer_name,published_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET content_type=excluded.content_type,slug=excluded.slug,status=excluded.status,title=excluded.title,summary=excluded.summary,body_json=excluded.body_json,seo_title=excluded.seo_title,seo_description=excluded.seo_description,canonical_path=excluded.canonical_path,author_name=excluded.author_name,reviewer_name=excluded.reviewer_name,published_at=CASE WHEN excluded.status='published' THEN COALESCE(content_items.published_at,excluded.published_at) ELSE content_items.published_at END,updated_at=excluded.updated_at`,
    ).bind(
      itemId,
      input.contentType,
      input.slug,
      input.status || "draft",
      input.title,
      input.summary || "",
      JSON.stringify(input.body || {}),
      input.seoTitle || null,
      input.seoDescription || null,
      input.canonicalPath || null,
      input.authorName || null,
      input.reviewerName || null,
      input.status === "published" ? now : null,
      now,
    ),
    env.DB.prepare(
      "INSERT INTO content_revisions (id,content_id,revision_number,snapshot_json,change_note,created_by) VALUES (?,?,?,?,?,?)",
    ).bind(
      id(),
      itemId,
      revision?.revision || 1,
      snapshot,
      input.changeNote || null,
      user,
    ),
    env.DB.prepare(
      "INSERT INTO audit_events (id,actor,action,entity_type,entity_id,metadata_json) VALUES (?,?,?,?,?,?)",
    ).bind(
      id(),
      user,
      existing ? "content.updated" : "content.created",
      input.contentType,
      itemId,
      JSON.stringify({ slug: input.slug, status: input.status || "draft" }),
    ),
  ];
  await env.DB.batch(statements);
  if (input.status === "published")
    await env.DB.prepare(
      "UPDATE content_versions SET version=version+1,updated_at=CURRENT_TIMESTAMP WHERE scope='public-content'",
    ).run();
  return json(
    {
      id: itemId,
      status: input.status || "draft",
      revision: revision?.revision || 1,
    },
    { status: existing ? 200 : 201 },
  );
}
async function requestKey(request: Request, env: Env) {
  const raw = `${request.headers.get("cf-connecting-ip") || "unknown"}:${env.PUBLIC_ORIGIN}`;
  const bytes = new TextEncoder().encode(raw);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}
async function saveEnquiry(request: Request, env: Env) {
  const data = (await request.json()) as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (
    name.length < 2 ||
    name.length > 100 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    message.length < 20 ||
    message.length > 4000 ||
    data.consent !== true
  )
    return json({ error: "Invalid enquiry payload." }, { status: 400 });
  if (!env.TURNSTILE_SECRET_KEY)
    return json(
      { error: "Enquiry service is not configured." },
      { status: 503 },
    );
  {
    const token =
      typeof data.turnstileToken === "string" ? data.turnstileToken : "";
    const verify = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      },
    ).then((r) => r.json() as Promise<{ success: boolean }>);
    if (!verify.success)
      return json({ error: "Anti-spam verification failed." }, { status: 400 });
  }
  const key = await requestKey(request, env);
  const recent = await env.DB.prepare(
    "SELECT COUNT(*) AS total FROM enquiries WHERE request_key=? AND created_at>=datetime('now','-1 hour')",
  )
    .bind(key)
    .first<{ total: number }>();
  if ((recent?.total || 0) >= 5)
    return json(
      { error: "Too many enquiries. Please try again later." },
      { status: 429, headers: { "retry-after": "3600" } },
    );
  const enquiryId = id();
  await env.DB.batch([
    env.DB.prepare(
      "INSERT INTO enquiries (id,name,email,company,service_interest,message,consent_at,request_key) VALUES (?,?,?,?,?,?,?,?)",
    ).bind(
      enquiryId,
      name,
      email,
      typeof data.company === "string" ? data.company.trim() || null : null,
      typeof data.serviceInterest === "string"
        ? data.serviceInterest.trim() || null
        : null,
      message,
      new Date().toISOString(),
      key,
    ),
    env.DB.prepare(
      "INSERT INTO audit_events (id,actor,action,entity_type,entity_id) VALUES (?,?,?,?,?)",
    ).bind(id(), "public-enquiry", "enquiry.created", "enquiry", enquiryId),
  ]);
  return json({ id: enquiryId, accepted: true }, { status: 202 });
}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(request.url);
      if (request.method === "OPTIONS")
        return new Response(null, {
          headers: {
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET,POST,PATCH,OPTIONS",
            "access-control-allow-headers": "content-type,x-vs-admin-secret",
          },
        });
      if (request.method === "POST" && url.pathname === "/v1/enquiries")
        return saveEnquiry(request, env);
      if (request.method === "GET" && url.pathname === "/v1/content-version") {
        const version = await env.DB.prepare(
          "SELECT version,updated_at FROM content_versions WHERE scope='public-content'",
        ).first();
        return json(version || { version: 1 }, { headers: cacheHeaders() });
      }
      const publicMatch = url.pathname.match(
        /^\/v1\/content\/(page|service|industry|guide)\/([a-z0-9-]+)$/,
      );
      if (request.method === "GET" && publicMatch) {
        const row = await env.DB.prepare(
          "SELECT id,content_type,slug,title,summary,body_json,seo_title,seo_description,canonical_path,author_name,reviewer_name,published_at,updated_at FROM content_items WHERE content_type=? AND slug=? AND status='published'",
        )
          .bind(publicMatch[1], publicMatch[2])
          .first();
        return row
          ? json(row, { headers: cacheHeaders() })
          : json(
              { error: "Not found." },
              { status: 404, headers: cacheHeaders() },
            );
      }
      if (request.method === "POST" && url.pathname === "/v1/admin/media") {
        const user = await actor(request, env);
        if (!user)
          return json(
            { error: "Unauthorized admin request." },
            { status: 401 },
          );
        const form = await request.formData();
        const file = form.get("file");
        const alt = form.get("altText");
        if (
          !(file instanceof File) ||
          file.size > 10_000_000 ||
          ![
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
            "application/pdf",
          ].includes(file.type)
        )
          return json(
            { error: "Upload a JPEG, PNG, WebP, AVIF or PDF under 10 MB." },
            { status: 400 },
          );
        const mediaId = id();
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
        const objectKey = `uploads/${new Date().toISOString().slice(0, 10)}/${mediaId}-${safeName}`;
        await env.MEDIA.put(objectKey, await file.arrayBuffer(), {
          httpMetadata: { contentType: file.type },
        });
        await env.DB.batch([
          env.DB.prepare(
            "INSERT INTO media_assets (id,object_key,file_name,mime_type,byte_size,alt_text,created_by) VALUES (?,?,?,?,?,?,?)",
          ).bind(
            mediaId,
            objectKey,
            file.name,
            file.type,
            file.size,
            typeof alt === "string" ? alt : "",
            user,
          ),
          env.DB.prepare(
            "INSERT INTO audit_events (id,actor,action,entity_type,entity_id) VALUES (?,?,?,?,?)",
          ).bind(id(), user, "media.uploaded", "media", mediaId),
        ]);
        return json(
          { id: mediaId, objectKey, status: "draft" },
          { status: 201 },
        );
      }
      if (request.method === "GET" && url.pathname === "/v1/admin/content") {
        const user = await actor(request, env);
        if (!user)
          return json(
            { error: "Unauthorized admin request." },
            { status: 401 },
          );
        const rows = await env.DB.prepare(
          "SELECT id,content_type,slug,status,title,updated_at,published_at FROM content_items ORDER BY updated_at DESC LIMIT 100",
        ).all();
        return json(rows.results);
      }
      const revisions = url.pathname.match(
        /^\/v1\/admin\/content\/([0-9a-f-]+)\/revisions$/,
      );
      if (request.method === "GET" && revisions) {
        const user = await actor(request, env);
        if (!user)
          return json(
            { error: "Unauthorized admin request." },
            { status: 401 },
          );
        const rows = await env.DB.prepare(
          "SELECT id,revision_number,change_note,created_by,created_at FROM content_revisions WHERE content_id=? ORDER BY revision_number DESC",
        )
          .bind(revisions[1])
          .all();
        return json(rows.results);
      }
      if (request.method === "POST" && url.pathname === "/v1/admin/content")
        return saveContent(request, env);
      const edit = url.pathname.match(/^\/v1\/admin\/content\/([0-9a-f-]+)$/);
      if (request.method === "PATCH" && edit)
        return saveContent(request, env, edit[1]);
      return json({ error: "Route not found." }, { status: 404 });
    } catch (error) {
      if (error instanceof ApiValidationError)
        return json({ error: error.message }, { status: 400 });
      console.error("Unhandled CMS API error", error);
      return json(
        { error: "Service temporarily unavailable." },
        { status: 500 },
      );
    }
  },
} satisfies ExportedHandler<Env>;
