import type { MetadataRoute } from "next";
import { industries, services } from "@/lib/site-data";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vsinfosys.in";
  const date = new Date();
  const routes = [
    "/",
    "/services/",
    "/industries/",
    "/technologies/",
    "/insights/",
    "/contact/",
    "/start-a-project/",
  ];
  return [
    ...routes.map((path, index) => ({
      url: `${base}${path === "/" ? "" : path}`,
      lastModified: date,
      changeFrequency: index === 0 ? ("weekly" as const) : ("monthly" as const),
      priority: index === 0 ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}/`,
      lastModified: date,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...industries.map((industry) => ({
      url: `${base}/industries/${industry.slug}/`,
      lastModified: date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
