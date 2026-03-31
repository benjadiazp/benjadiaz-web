import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Play, Film, FlaskConical } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import rehypePrettyCode from "rehype-pretty-code";
import { highlighterPromise } from "@/lib/highlighter";
import { locales, defaultLocale } from "@/i18n/routing";
import { getArticleBySlug, getArticleSlugs, getProjectBySlug } from "@/lib/content";
import type { Locale, ArticleMeta } from "@/lib/content-types";
import { badgeOrange, btnText, contentBlock } from "@/lib/styles";
import { mdxComponents } from "@/components/mdx/mdx-components";
import ProjectLink from "@/components/ProjectLink";
import ProjectCardCompact from "@/components/ProjectCardCompact";
import { buildUrl, buildAlternates, ogLocale } from "@/lib/seo";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

const typeIcons: Record<ArticleMeta["type"], typeof FileText> = {
  blog: FileText,
  video: Play,
  reel: Film,
  poc: FlaskConical,
};

export function generateStaticParams() {
  const slugs = getArticleSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const article = getArticleBySlug(slug, loc);
  if (!article) return {};

  const url = buildUrl(`/blog/${slug}`, loc);

  return {
    title: article.title[loc],
    description: article.summary[loc],
    alternates: buildAlternates(`/blog/${slug}`, loc),
    openGraph: {
      type: "article",
      title: article.title[loc],
      description: article.summary[loc],
      url,
      locale: ogLocale(loc),
      images: [
        {
          url: `https://benjadiaz.com${article.coverImage}`,
          width: 1200,
          height: 630,
          alt: article.title[loc],
        },
      ],
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title[loc],
      description: article.summary[loc],
      images: [`https://benjadiaz.com${article.coverImage}`],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const article = getArticleBySlug(slug, locale as Locale);
  if (!article) notFound();

  const base = locale === defaultLocale ? "" : `/${locale}`;
  const loc = locale as Locale;
  const Icon = typeIcons[article.type];

  const typeLabels: Record<ArticleMeta["type"], string> = {
    blog: t("typeBlog"),
    video: t("typeVideo"),
    reel: t("typeReel"),
    poc: t("typePoc"),
  };

  // Resolve related projects
  const relatedProjects = (article.relatedProjects ?? [])
    .map((s) => getProjectBySlug(s, loc))
    .filter(Boolean);

  const pageUrl = buildUrl(`/blog/${slug}`, loc);

  return (
    <main className="w-full px-4 py-12 sm:mx-auto sm:max-w-screen-lg sm:py-24">
      <JsonLd data={blogPostingSchema(article, loc, pageUrl)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: buildUrl("/", loc) },
          { name: "Blog", url: buildUrl("/blog", loc) },
          { name: article.title[loc], url: pageUrl },
        ])}
      />
      <Link href={`${base}/blog`} className={btnText}>
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        {t("backToBlog")}
      </Link>

      <div className="mt-8">
        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-white dark:bg-black sm:h-80">
          <Image
            src={article.coverImage}
            alt={article.title[loc]}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="rounded-xl object-cover"
            priority
          />
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 font-mono text-xs font-semibold text-white backdrop-blur-sm">
            <Icon className="h-3.5 w-3.5" />
            {typeLabels[article.type]}
          </span>
        </div>

        <div className={`mt-8 ${contentBlock}`}>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {article.title[loc]}
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            {article.author}
            {" · "}
            {new Date(article.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {article.links && article.links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.links.map((link) => (
                <ProjectLink key={link.url} link={link} />
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className={badgeOrange}>
                {tag}
              </span>
            ))}
          </div>

          <article className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
            <MDXRemote
              source={article.body}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [rehypePrettyCode, { theme: { dark: "github-dark-dimmed", light: "github-light" }, getHighlighter: () => highlighterPromise }],
                  ],
                },
              }}
            />
          </article>

          {relatedProjects.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold tracking-tight">
                {loc === "es-CL" ? "Proyectos relacionados" : "Related Projects"}
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                {relatedProjects.map(
                  (project) =>
                    project && (
                      <ProjectCardCompact
                        key={project.slug}
                        project={project}
                        locale={loc}
                      />
                    ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
