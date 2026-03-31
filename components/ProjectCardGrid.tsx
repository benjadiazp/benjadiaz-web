import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { badgeOrange, cardBase, cardHover } from "@/lib/styles";
import type { Locale, ProjectMeta } from "@/lib/content-types";
import { defaultLocale } from "@/i18n/routing";
import ProjectLink from "@/components/ProjectLink";

export default function ProjectCardGrid({
  project,
  locale,
}: {
  project: ProjectMeta;
  locale: Locale;
}) {
  const base = locale === defaultLocale ? "" : `/${locale}`;
  return (
    <div className={cn(cardBase, cardHover, "group flex flex-col overflow-hidden")}>
      <Link
        href={`${base}/projects/${project.slug}`}
        aria-label={project.title[locale]}
        className="relative h-44 w-full overflow-hidden bg-white dark:bg-black"
      >
        <Image
          src={project.coverImage}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="text-gradient-accent font-mono text-base font-bold">
          <Link
            href={`${base}/projects/${project.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className="hover:underline"
          >
            {project.title[locale]}
          </Link>
        </h2>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {project.subtitle[locale]}
        </p>
        <p className="mt-2 line-clamp-2 text-sm">
          {project.summary[locale]}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag} className={badgeOrange}>
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className={badgeOrange}>+{project.tags.length - 5}</span>
          )}
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          {project.links.map((link) => (
            <ProjectLink key={link.url} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}
