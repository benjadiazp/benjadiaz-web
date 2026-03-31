import type { routing } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];
export type Localized<T> = Record<Locale, T>;

export type LinkType =
  | "website"
  | "github"
  | "npm"
  | "video"
  | "article"
  | "demo"
  | "itchio"
  | "youtube"
  | "tiktok"
  | "instagram";

export interface ExternalLink {
  type: LinkType;
  url: string;
  label: string;
  icon?: string;
}

export interface ContentBase {
  slug: string;
  title: Localized<string>;
  summary: Localized<string>;
  coverImage: string;
  tags: string[];
  date: string;
  draft?: boolean;
}

export interface ProjectMeta extends ContentBase {
  subtitle: Localized<string>;
  links: ExternalLink[];
  featured: boolean;
  order?: number;
  relatedArticles?: string[];
}

export interface ArticleMeta extends ContentBase {
  type: "blog" | "reel" | "video" | "poc";
  author: string;
  links?: ExternalLink[];
  featured?: boolean;
  order?: number;
  relatedProjects?: string[];
}
