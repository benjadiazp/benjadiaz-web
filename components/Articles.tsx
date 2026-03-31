"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { defaultLocale } from "@/i18n/routing";
import { btnPrimary } from "@/lib/styles";
import { articles } from "@/content/articles";
import type { Locale } from "@/lib/content-types";
import BlogCardCompact from "@/components/BlogCardCompact";

export default function Articles() {
  const t = useTranslations("Blog");
  const locale = useLocale() as Locale;
  const base = locale === defaultLocale ? "" : `/${locale}`;
  const allCount = articles.filter((a) => !a.draft).length;
  const featured = articles
    .filter((a) => a.featured && !a.draft)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  if (featured.length === 0) return null;

  return (
    <section className="w-full" aria-labelledby="blog-heading">
      <h2
        id="blog-heading"
        className="text-center text-xl font-bold tracking-tight md:text-3xl"
      >
        {t("title")}
      </h2>
      <div className="mt-6 flex w-full flex-col gap-3">
        {featured.map((article) => (
          <BlogCardCompact
            key={article.slug}
            article={article}
            locale={locale}
          />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link href={`${base}/blog`} className={btnPrimary}>
          {t("viewAll", { count: allCount })}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
