import type { Locale, ArticleMeta, ProjectMeta } from "@/lib/content-types";

const SITE_URL = "https://benjadiaz.com";
const AUTHOR_NAME = "Benjamín Díaz";

const SOCIAL_LINKS = [
  "https://github.com/benjadiazp",
  "https://www.linkedin.com/in/benjamindiaz/",
  "https://twitter.com/benjadiazp",
  "https://www.instagram.com/benjadiazp/",
  "https://www.tiktok.com/@benjadiazp",
  "https://www.youtube.com/@benjadiazdev",
  "https://benjadiaz.itch.io/",
];

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    url: SITE_URL,
    jobTitle: "Software Engineer",
    sameAs: SOCIAL_LINKS,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: AUTHOR_NAME,
    url: SITE_URL,
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostingSchema(
  article: ArticleMeta,
  locale: Locale,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title[locale],
    description: article.summary[locale],
    image: `${SITE_URL}${article.coverImage}`,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author,
      url: SITE_URL,
    },
    url,
    keywords: article.tags.join(", "),
  };
}

export function softwareSourceCodeSchema(
  project: ProjectMeta,
  locale: Locale,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title[locale],
    description: project.summary[locale],
    image: `${SITE_URL}${project.coverImage}`,
    dateCreated: project.date,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    url,
    keywords: project.tags.join(", "),
  };
}
