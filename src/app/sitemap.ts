import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";

function abs(path: string): string {
  if (!siteUrl) return path;
  return `${siteUrl}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: abs("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: abs("/privacy"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: abs("/terms"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
