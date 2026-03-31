import { MetadataRoute } from "next";

const baseUrl = "https://benjadiaz.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2025-03-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/es-CL`,
      lastModified: new Date("2025-03-01"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2024-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/es-CL/privacy`,
      lastModified: new Date("2024-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
