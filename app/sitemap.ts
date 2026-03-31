import { MetadataRoute } from "next";
import { getAllProjects, getAllArticles } from "@/lib/content";
import type { Locale } from "@/lib/content-types";

const baseUrl = "https://benjadiaz.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects("en-US" as Locale);
  const articles = getAllArticles("en-US" as Locale);

  const latestProjectDate =
    projects.length > 0
      ? new Date(
          Math.max(...projects.map((p) => new Date(p.date).getTime())),
        )
      : new Date();

  const latestArticleDate =
    articles.length > 0
      ? new Date(
          Math.max(...articles.map((a) => new Date(a.date).getTime())),
        )
      : new Date();

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        "en-US": `${baseUrl}/projects/${project.slug}`,
        "es-CL": `${baseUrl}/es-CL/projects/${project.slug}`,
      },
    },
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        "en-US": `${baseUrl}/blog/${article.slug}`,
        "es-CL": `${baseUrl}/es-CL/blog/${article.slug}`,
      },
    },
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "en-US": `${baseUrl}/`,
          "es-CL": `${baseUrl}/es-CL`,
        },
      },
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: latestProjectDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "en-US": `${baseUrl}/projects`,
          "es-CL": `${baseUrl}/es-CL/projects`,
        },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          "en-US": `${baseUrl}/blog`,
          "es-CL": `${baseUrl}/es-CL/blog`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "en-US": `${baseUrl}/about`,
          "es-CL": `${baseUrl}/es-CL/about`,
        },
      },
    },
    ...projectEntries,
    ...articleEntries,
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2024-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "en-US": `${baseUrl}/privacy`,
          "es-CL": `${baseUrl}/es-CL/privacy`,
        },
      },
    },
  ];
}
