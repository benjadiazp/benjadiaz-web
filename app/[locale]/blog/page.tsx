import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n/routing";
import { getAllArticles } from "@/lib/content";
import type { Locale } from "@/lib/content-types";
import BlogGrid from "@/components/BlogGrid";
import { buildAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const descriptions: Record<Locale, string> = {
  "en-US":
    "Articles, tutorials, and software development experiments by Benjamín Díaz.",
  "es-CL":
    "Artículos, tutoriales y experimentos de desarrollo de software por Benjamín Díaz.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("title"),
    description: descriptions[loc] ?? descriptions["en-US"],
    alternates: buildAlternates("/blog", loc),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const articles = getAllArticles(locale as Locale);

  return (
    <main className="w-full px-4 py-12 sm:mx-auto sm:max-w-screen-lg sm:py-24">
      <h1 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
        {t("title")}
      </h1>
      <div className="mt-8">
        <BlogGrid articles={articles} />
      </div>
    </main>
  );
}
