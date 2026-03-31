"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import type { Locale, ArticleMeta } from "@/lib/content-types";
import BlogCardGrid from "@/components/BlogCardGrid";

const articleTypes = ["blog", "video", "reel", "poc"] as const;

export default function BlogGrid({
  articles,
}: {
  articles: ArticleMeta[];
}) {
  const t = useTranslations("Blog");
  const locale = useLocale() as Locale;
  const [selectedType, setSelectedType] = useState<
    ArticleMeta["type"] | null
  >(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const typeFiltered = useMemo(
    () =>
      selectedType
        ? articles.filter((a) => a.type === selectedType)
        : articles,
    [articles, selectedType],
  );

  const allTags = useMemo(
    () => Array.from(new Set(typeFiltered.flatMap((a) => a.tags))).sort(),
    [typeFiltered],
  );

  const filtered = useMemo(
    () =>
      selectedTag
        ? typeFiltered.filter((a) => a.tags.includes(selectedTag))
        : typeFiltered,
    [typeFiltered, selectedTag],
  );

  const typeLabels: Record<ArticleMeta["type"], string> = {
    blog: t("typeBlog"),
    video: t("typeVideo"),
    reel: t("typeReel"),
    poc: t("typePoc"),
  };

  const pillBase =
    "rounded-md border px-3 py-1.5 font-mono text-xs font-semibold transition-all";
  const pillActive =
    "border-orange-400 bg-orange-500 text-white shadow-sm dark:border-orange-500 dark:bg-orange-600";
  const pillInactive =
    "border-gray-200/80 bg-white/60 text-gray-600 hover:border-orange-200 hover:text-orange-600 dark:border-gray-700/80 dark:bg-gray-900/50 dark:text-gray-400 dark:hover:border-orange-500/30 dark:hover:text-orange-400";

  return (
    <>
      {/* Type filter tabs */}
      <div role="group" aria-label={t("filterByType")} className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setSelectedType(null);
            setSelectedTag(null);
          }}
          aria-pressed={selectedType === null}
          className={cn(pillBase, selectedType === null ? pillActive : pillInactive)}
        >
          {t("allTypes")}
        </button>
        {articleTypes.map((type) => {
          const count = articles.filter((a) => a.type === type).length;
          if (count === 0) return null;
          return (
            <button
              key={type}
              type="button"
              onClick={() => {
                setSelectedType(type === selectedType ? null : type);
                setSelectedTag(null);
              }}
              aria-pressed={selectedType === type}
              className={cn(
                pillBase,
                selectedType === type ? pillActive : pillInactive,
              )}
            >
              {typeLabels[type]}
            </button>
          );
        })}
      </div>

      {/* Tag filter pills */}
      {allTags.length > 0 && (
        <div role="group" aria-label={t("filterByTag")} className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            aria-pressed={selectedTag === null}
            className={cn(
              pillBase,
              selectedTag === null ? pillActive : pillInactive,
            )}
          >
            {t("allTags")}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                setSelectedTag(tag === selectedTag ? null : tag)
              }
              aria-pressed={selectedTag === tag}
              className={cn(
                pillBase,
                selectedTag === tag ? pillActive : pillInactive,
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <p role="status" aria-live="polite" className="mt-12 text-center text-muted-foreground">
          {t("noResults")}
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <BlogCardGrid
              key={article.slug}
              article={article}
              locale={locale}
              typeLabel={typeLabels[article.type]}
            />
          ))}
        </div>
      )}
    </>
  );
}
