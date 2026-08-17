const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const runtimeConfig = {
  siteUrl:
    configuredSiteUrl && /^https:\/\/[a-z0-9.-]+$/i.test(configuredSiteUrl)
      ? configuredSiteUrl
      : "https://vsinfosys.in",
  contentApiOrigin: process.env.NEXT_PUBLIC_CONTENT_API_ORIGIN ?? "",
  cmsApiOrigin: process.env.NEXT_PUBLIC_CMS_API_ORIGIN ?? "",
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
} as const;
