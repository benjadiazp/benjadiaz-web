import fs from "fs";
import path from "path";
import { projects } from "@/content/projects";
import { articles } from "@/content/articles";
import type { Locale, ProjectMeta, ArticleMeta } from "@/lib/content-types";
import { defaultLocale } from "@/i18n/routing";

const contentDir = path.join(process.cwd(), "content");
const mdxCache = new Map<string, string>();

function readMdx(kind: string, slug: string, locale: Locale): string {
  const cacheKey = `${kind}/${slug}/${locale}`;
  if (mdxCache.has(cacheKey)) return mdxCache.get(cacheKey)!;

  const localeFile = path.resolve(contentDir, kind, slug, `${locale}.mdx`);
  const fallbackFile = path.resolve(
    contentDir,
    kind,
    slug,
    `${defaultLocale}.mdx`,
  );
  // Ensure resolved paths stay within the content directory
  if (
    !localeFile.startsWith(contentDir + path.sep) ||
    !fallbackFile.startsWith(contentDir + path.sep)
  ) {
    return "";
  }
  let result = "";
  try {
    result = fs.readFileSync(localeFile, "utf-8");
  } catch {
    try {
      result = fs.readFileSync(fallbackFile, "utf-8");
    } catch {
      result = "";
    }
  }
  mdxCache.set(cacheKey, result);
  return result;
}

// --- Projects ---

export function getProjectSlugs(): string[] {
  return projects.filter((p) => !p.draft).map((p) => p.slug);
}

export function getAllProjects(locale: Locale): ProjectMeta[] {
  return projects
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeaturedProjects(locale: Locale): ProjectMeta[] {
  return projects
    .filter((p) => p.featured && !p.draft)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getProjectBySlug(
  slug: string,
  locale: Locale,
): (ProjectMeta & { body: string }) | null {
  const meta = projects.find((p) => p.slug === slug && !p.draft);
  if (!meta) return null;
  const body = readMdx("projects", slug, locale);
  return { ...meta, body };
}

// --- Articles ---

export function getArticleSlugs(): string[] {
  return articles.filter((a) => !a.draft).map((a) => a.slug);
}

export function getAllArticles(locale: Locale): ArticleMeta[] {
  return articles
    .filter((a) => !a.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeaturedArticles(locale: Locale): ArticleMeta[] {
  return articles
    .filter((a) => a.featured && !a.draft)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getArticlesByType(
  type: ArticleMeta["type"],
  locale: Locale,
): ArticleMeta[] {
  return getAllArticles(locale).filter((a) => a.type === type);
}

export function getArticleBySlug(
  slug: string,
  locale: Locale,
): (ArticleMeta & { body: string }) | null {
  const meta = articles.find((a) => a.slug === slug && !a.draft);
  if (!meta) return null;
  const body = readMdx("articles", slug, locale);
  return { ...meta, body };
}
