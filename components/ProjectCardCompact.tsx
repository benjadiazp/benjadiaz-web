import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { badgeOrange, cardBase, cardHover } from "@/lib/styles";
import type { Locale, ProjectMeta } from "@/lib/content-types";
import { defaultLocale } from "@/i18n/routing";

export default function ProjectCardCompact({
  project,
  locale,
}: {
  project: ProjectMeta;
  locale: Locale;
}) {
  const base = locale === defaultLocale ? "" : `/${locale}`;
  return (
    <Link
      href={`${base}/projects/${project.slug}`}
      className={cn(cardBase, cardHover, "group block p-4")}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white dark:bg-black">
          <Image
            src={project.coverImage}
            alt={`${project.title[locale]}`}
            fill
            sizes="64px"
            className="rounded-lg object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-gradient-accent font-mono text-sm font-bold">
            {project.title[locale]}
          </h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {project.summary[locale]}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className={badgeOrange}>
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className={badgeOrange}>+{project.tags.length - 4}</span>
            )}
          </div>
        </div>
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-orange-500"
        />
      </div>
    </Link>
  );
}
