"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { defaultLocale } from "@/i18n/routing";
import { btnPrimary } from "@/lib/styles";
import { projects } from "@/content/projects";
import type { Locale } from "@/lib/content-types";
import ProjectCardCompact from "@/components/ProjectCardCompact";

export default function Projects() {
  const t = useTranslations("Projects");
  const locale = useLocale() as Locale;
  const base = locale === defaultLocale ? "" : `/${locale}`;
  const allCount = projects.filter((p) => !p.draft).length;
  const featured = projects
    .filter((p) => p.featured && !p.draft)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  return (
    <section className="w-full" aria-labelledby="projects-heading">
      <h2
        id="projects-heading"
        className="text-center text-xl font-bold tracking-tight md:text-3xl"
      >
        {t("title")}
      </h2>
      <div className="mt-6 flex w-full flex-col gap-3">
        {featured.map((project) => (
          <ProjectCardCompact
            key={project.slug}
            project={project}
            locale={locale}
          />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          href={`${base}/projects`}
          className={btnPrimary}
        >
          {t("viewAll", { count: allCount })}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
