import { projects } from "@/content/projects";
import { articles } from "@/content/articles";
import type { Locale } from "@/lib/content-types";

export interface SearchEntry {
  type: "project" | "article" | "page";
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  url: string;
}

const pageEntries: Record<Locale, SearchEntry[]> = {
  "en-US": [
    {
      type: "page",
      slug: "about",
      title: "About me",
      summary: "Learn more about me, my skills, experience, and interests.",
      tags: [],
      url: "/about",
    },
  ],
  "es-CL": [
    {
      type: "page",
      slug: "about",
      title: "Sobre mí",
      summary:
        "Conoce más sobre mí, mis habilidades, experiencia e intereses.",
      tags: [],
      url: "/about",
    },
  ],
};

export function buildSearchIndex(locale: Locale): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const p of projects.filter((p) => !p.draft)) {
    entries.push({
      type: "project",
      slug: p.slug,
      title: p.title[locale],
      summary: p.summary[locale],
      tags: p.tags,
      url: `/projects/${p.slug}`,
    });
  }

  for (const a of articles.filter((a) => !a.draft)) {
    entries.push({
      type: "article",
      slug: a.slug,
      title: a.title[locale],
      summary: a.summary[locale],
      tags: a.tags,
      url: `/blog/${a.slug}`,
    });
  }

  entries.push(...(pageEntries[locale] ?? pageEntries["en-US"]));

  return entries;
}

export function searchEntries(
  index: SearchEntry[],
  query: string,
): SearchEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return index.filter(
    (entry) =>
      entry.title.toLowerCase().includes(q) ||
      entry.summary.toLowerCase().includes(q) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(q)),
  );
}
