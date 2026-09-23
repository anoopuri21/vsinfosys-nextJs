"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
type Item = {
  id: string;
  content_type: string;
  slug: string;
  status: string;
  title: string;
  updated_at: string;
};
const api = process.env.NEXT_PUBLIC_CMS_API_ORIGIN || "";
const starterBody = JSON.stringify(
  {
    sections: [
      {
        type: "hero",
        heading: "",
        copy: "",
        ctaLabel: "Start a project",
        ctaUrl: "/start-a-project/",
      },
    ],
  },
  null,
  2,
);
export function AdminWorkspace() {
  const [items, setItems] = useState<Item[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "unavailable">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [form, setForm] = useState({
    contentType: "page",
    slug: "",
    title: "",
    summary: "",
    body: starterBody,
    seoTitle: "",
    seoDescription: "",
    canonicalPath: "",
    status: "draft",
    changeNote: "",
  });
  useEffect(() => {
    if (!api) {
      setState("unavailable");
      return;
    }
    fetch(`${api}/v1/admin/content`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setItems(data);
        setState("ready");
      })
      .catch(() => setState("unavailable"));
  }, []);
  const readiness = useMemo(
    () => [
      {
        label: "URL-safe slug",
        ok: /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug),
      },
      {
        label: "Search title (3–70 chars)",
        ok: form.seoTitle.length >= 3 && form.seoTitle.length <= 70,
      },
      {
        label: "Search description (70–170 chars)",
        ok:
          form.seoDescription.length >= 70 && form.seoDescription.length <= 170,
      },
      { label: "Summary included", ok: form.summary.trim().length >= 30 },
      {
        label: "Canonical path included",
        ok: /^\/[a-z0-9/-]*\/$/.test(form.canonicalPath),
      },
      { label: "Valid structured body JSON", ok: validBody(form.body) },
    ],
    [form],
  );
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!api) {
      setMessage("CMS API origin is not configured for this environment.");
      return;
    }
    if (!readiness.every((x) => x.ok)) {
      setMessage("Complete the publishing checklist before saving.");
      return;
    }
    setMessage("Saving…");
    try {
      const r = await fetch(`${api}/v1/admin/content`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, body: JSON.parse(form.body) }),
      });
      if (!r.ok) throw new Error();
      setMessage(
        "Saved with a new revision. Publishing will increment the public content version.",
      );
    } catch {
      setMessage(
        "Save failed. Confirm the Access policy, API route and CMS API origin.",
      );
    }
  };
  const upload = async (e: FormEvent) => {
    e.preventDefault();
    if (!api || !media) {
      setMessage("Choose a file and configure the CMS API first.");
      return;
    }
    setMessage("Uploading media…");
    const data = new FormData();
    data.set("file", media);
    data.set("altText", altText);
    try {
      const r = await fetch(`${api}/v1/admin/media`, {
        method: "POST",
        credentials: "include",
        body: data,
      });
      if (!r.ok) throw new Error();
      setMessage(
        "Media uploaded as draft. Add meaningful alt text before publishing.",
      );
      setMedia(null);
      setAltText("");
    } catch {
      setMessage("Media upload failed. Confirm Access and the R2 binding.");
    }
  };
  return (
    <>
      <section className="adminIntro">
        <p>VS infosys · CMS</p>
        <h1>
          Content needs a <em>controlled publishing path.</em>
        </h1>
        <span>
          Cloudflare Access protects this route in production. This build
          contains no credential field and no browser-visible admin secret.
        </span>
      </section>
      <section className="adminGrid">
        <form onSubmit={submit}>
          <p>Structured content editor</p>
          <label>
            Content type
            <select
              value={form.contentType}
              onChange={(e) =>
                setForm({ ...form, contentType: e.target.value })
              }
            >
              <option value="page">Page</option>
              <option value="service">Service</option>
              <option value="industry">Industry</option>
              <option value="guide">Guide</option>
            </select>
          </label>
          <label>
            URL slug
            <input
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="ecommerce-development"
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
            />
          </label>
          <label>
            Title
            <input
              required
              value={form.title}
              maxLength={70}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </label>
          <label>
            Summary
            <textarea
              required
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
            />
          </label>
          <label>
            Section JSON
            <textarea
              className="codeInput"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            />
          </label>
          <label>
            SEO title
            <input
              value={form.seoTitle}
              maxLength={70}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
            />
          </label>
          <label>
            SEO description
            <textarea
              value={form.seoDescription}
              maxLength={170}
              onChange={(e) =>
                setForm({ ...form, seoDescription: e.target.value })
              }
            />
          </label>
          <label>
            Canonical path
            <input
              value={form.canonicalPath}
              placeholder="/services/ecommerce-development/"
              onChange={(e) =>
                setForm({ ...form, canonicalPath: e.target.value })
              }
            />
          </label>
          <label>
            Change note
            <input
              value={form.changeNote}
              placeholder="Why this revision was made"
              onChange={(e) => setForm({ ...form, changeNote: e.target.value })}
            />
          </label>
          <label>
            Editorial state
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="published">Published</option>
            </select>
          </label>
          <button type="submit">Save content item</button>
          {message && <output>{message}</output>}
        </form>
        <aside>
          <p>SEO publishing gate</p>
          <ul className="checklist">
            {readiness.map((x) => (
              <li className={x.ok ? "pass" : "fail"} key={x.label}>
                {x.ok ? "✓" : "○"} {x.label}
              </li>
            ))}
          </ul>
          <p>Media upload</p>
          <form onSubmit={upload}>
            <label>
              File
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,application/pdf"
                onChange={(e) => setMedia(e.target.files?.[0] || null)}
              />
            </label>
            <label>
              Alt text
              <input
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Describe the image purpose"
              />
            </label>
            <button type="submit">Upload to media library</button>
          </form>
          <p>Publishing queue</p>
          {state === "loading" && <span>Connecting to CMS API…</span>}
          {state === "unavailable" && (
            <span>
              CMS integration is intentionally unavailable until the protected
              API origin and Cloudflare Access route are configured.
            </span>
          )}
          {state === "ready" &&
            items.map((item) => (
              <article key={item.id}>
                <small>
                  {item.content_type} · {item.status}
                </small>
                <strong>{item.title}</strong>
                <span>/{item.slug}</span>
              </article>
            ))}
        </aside>
      </section>
    </>
  );
}
function validBody(value: string) {
  try {
    const parsed = JSON.parse(value);
    return (
      Boolean(parsed) &&
      typeof parsed === "object" &&
      !Array.isArray(parsed) &&
      value.length <= 65000
    );
  } catch {
    return false;
  }
}
