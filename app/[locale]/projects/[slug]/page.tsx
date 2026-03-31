import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import rehypePrettyCode from "rehype-pretty-code";
import { highlighterPromise } from "@/lib/highlighter";
import { locales, defaultLocale } from "@/i18n/routing";
import { getProjectBySlug, getProjectSlugs, getArticleBySlug } from "@/lib/content";
import type { Locale } from "@/lib/content-types";
import { badgeOrange, btnText, contentBlock } from "@/lib/styles";
import { mdxComponents } from "@/components/mdx/mdx-components";
import ProjectLink from "@/components/ProjectLink";
import BlogCardCompact from "@/components/BlogCardCompact";
import { buildUrl, buildAlternates, ogLocale } from "@/lib/seo";
import { softwareSourceCodeSchema, breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  const slugs = getProjectSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const project = getProjectBySlug(slug, loc);
  if (!project) return {};

  const url = buildUrl(`/projects/${slug}`, loc);

  return {
    title: project.title[loc],
    description: project.summary[loc],
    alternates: buildAlternates(`/projects/${slug}`, loc),
    openGraph: {
      type: "website",
      title: project.title[loc],
      description: project.summary[loc],
      url,
      locale: ogLocale(loc),
      images: [
        {
          url: `https://benjadiaz.com${project.coverImage}`,
          width: 1200,
          height: 630,
          alt: project.title[loc],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title[loc],
      description: project.summary[loc],
      images: [`https://benjadiaz.com${project.coverImage}`],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Projects" });
  const project = getProjectBySlug(slug, locale as Locale);
  if (!project) notFound();

  const base = locale === defaultLocale ? "" : `/${locale}`;
  const loc = locale as Locale;

  const relatedArticles = (project.relatedArticles ?? [])
    .map((s) => getArticleBySlug(s, loc))
    .filter(Boolean);

  const pageUrl = buildUrl(`/projects/${slug}`, loc);

  return (
    <main className="w-full px-4 py-12 sm:mx-auto sm:max-w-screen-lg sm:py-24">
      <JsonLd data={softwareSourceCodeSchema(project, loc, pageUrl)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: buildUrl("/", loc) },
          { name: t("title"), url: buildUrl("/projects", loc) },
          { name: project.title[loc], url: pageUrl },
        ])}
      />
      <Link
        href={`${base}/projects`}
        className={btnText}
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        {t("backToProjects")}
      </Link>

      <div className="mt-8">
        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-white dark:bg-black sm:h-80">
          <Image
            src={project.coverImage}
            alt={`${project.title[loc]}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="rounded-xl object-cover"
            priority
          />
        </div>

        <div className={`mt-8 ${contentBlock}`}>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {project.title[loc]}
          </h1>
          <p className="mt-2 font-mono text-lg text-muted-foreground">
            {project.subtitle[loc]}
          </p>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            {new Date(project.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
            })}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <ProjectLink key={link.url} link={link} />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className={badgeOrange}>
                {tag}
              </span>
            ))}
          </div>

          <article className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
            <MDXRemote
              source={project.body}
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

          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold tracking-tight">
                {t("relatedArticles")}
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                {relatedArticles.map(
                  (article) =>
                    article && (
                      <BlogCardCompact
                        key={article.slug}
                        article={article}
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
