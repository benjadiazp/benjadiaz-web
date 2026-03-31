"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import type { Locale, ProjectMeta } from "@/lib/content-types";
import ProjectCardGrid from "@/components/ProjectCardGrid";

export default function ProjectsGrid({
  projects,
}: {
  projects: ProjectMeta[];
}) {
  const t = useTranslations("Projects");
  const locale = useLocale() as Locale;
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags)),
  ).sort();

  const filtered = selectedTag
    ? projects.filter((p) => p.tags.includes(selectedTag))
    : projects;

  return (
    <>
      <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedTag(null)}
          aria-pressed={selectedTag === null}
          className={cn(
            "rounded-md border px-3 py-1.5 font-mono text-xs font-semibold transition-all",
            selectedTag === null
              ? "border-orange-400 bg-orange-500 text-white shadow-sm dark:border-orange-500 dark:bg-orange-600"
              : "border-gray-200/80 bg-white/60 text-gray-600 hover:border-orange-200 hover:text-orange-600 dark:border-gray-700/80 dark:bg-gray-900/50 dark:text-gray-400 dark:hover:border-orange-500/30 dark:hover:text-orange-400",
          )}
        >
          {t("allTags")}
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            aria-pressed={selectedTag === tag}
            className={cn(
              "rounded-md border px-3 py-1.5 font-mono text-xs font-semibold transition-all",
              selectedTag === tag
                ? "border-orange-400 bg-orange-500 text-white shadow-sm dark:border-orange-500 dark:bg-orange-600"
                : "border-gray-200/80 bg-white/60 text-gray-600 hover:border-orange-200 hover:text-orange-600 dark:border-gray-700/80 dark:bg-gray-900/50 dark:text-gray-400 dark:hover:border-orange-500/30 dark:hover:text-orange-400",
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p role="status" aria-live="polite" className="mt-12 text-center text-muted-foreground">
          {t("noResults")}
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCardGrid
              key={project.slug}
              project={project}
              locale={locale}
            />
          ))}
        </div>
      )}
    </>
  );
}
