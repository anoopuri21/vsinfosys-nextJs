export type ContentType =
  | "page"
  | "service"
  | "industry"
  | "guide"
  | "site_settings";
export type ContentStatus = "draft" | "review" | "published" | "archived";
export type ContentInput = {
  contentType: ContentType;
  slug: string;
  title: string;
  summary?: string;
  body?: unknown;
  seoTitle?: string;
  seoDescription?: string;
  canonicalPath?: string;
  authorName?: string;
  reviewerName?: string;
  status?: ContentStatus;
  changeNote?: string;
};

const contentTypes = new Set<ContentType>([
  "page",
  "service",
  "industry",
  "guide",
  "site_settings",
]);
const sectionTypes = new Set([
  "hero",
  "richText",
  "featureGrid",
  "faq",
  "cta",
  "relatedLinks",
]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function assertContentInput(
  value: unknown,
): asserts value is ContentInput {
  const input = value as Partial<ContentInput>;
  if (
    !input ||
    !contentTypes.has(input.contentType as ContentType) ||
    typeof input.slug !== "string" ||
    !slugPattern.test(input.slug) ||
    typeof input.title !== "string" ||
    input.title.trim().length < 3 ||
    input.title.length > 70
  )
    throw new ApiValidationError(
      "A type, URL-safe slug and 3–70 character title are required.",
    );
  if (
    (input.summary?.length ?? 0) > 600 ||
    (input.seoTitle?.length ?? 0) > 70 ||
    (input.seoDescription?.length ?? 0) > 170
  )
    throw new ApiValidationError(
      "One or more SEO/content limits were exceeded.",
    );
  if (input.canonicalPath && !/^\/[a-z0-9/-]*\/$/.test(input.canonicalPath))
    throw new ApiValidationError(
      "Canonical paths must be internal, lowercase paths ending with a slash.",
    );
  validateSections(input.body);
}

function validateSections(body: unknown) {
  if (typeof body === "undefined") return;
  if (!body || typeof body !== "object" || Array.isArray(body))
    throw new ApiValidationError("Body must be a JSON object.");
  const sections = (body as { sections?: unknown }).sections;
  if (!Array.isArray(sections) || sections.length > 24)
    throw new ApiValidationError(
      "Body requires a sections array with at most 24 sections.",
    );
  for (const section of sections) {
    if (
      !section ||
      typeof section !== "object" ||
      !sectionTypes.has((section as { type?: string }).type ?? "")
    )
      throw new ApiValidationError("Unsupported CMS section type.");
    if (JSON.stringify(section).length > 12_000)
      throw new ApiValidationError(
        "A CMS section exceeds its safe content limit.",
      );
    const ctaUrl = (section as { ctaUrl?: unknown }).ctaUrl;
    if (
      ctaUrl !== undefined &&
      (typeof ctaUrl !== "string" || !ctaUrl.startsWith("/"))
    )
      throw new ApiValidationError(
        "CTA URLs must use an internal absolute path.",
      );
  }
  if (JSON.stringify(body).length > 65_000)
    throw new ApiValidationError("Body exceeds its safe content limit.");
}

export class ApiValidationError extends Error {}
