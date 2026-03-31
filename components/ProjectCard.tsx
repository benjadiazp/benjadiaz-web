import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { badgeOrange, cardBase, cardHover } from "@/lib/styles";
import type { Locale, ProjectMeta } from "@/lib/content-types";
import { defaultLocale } from "@/i18n/routing";
import ProjectLink from "@/components/ProjectLink";

function Tag({ children }: { children: React.ReactNode }) {
  return <span className={badgeOrange}>{children}</span>;
}

export default function ProjectCard({
  project,
  locale,
}: {
  project: ProjectMeta;
  locale: Locale;
}) {
  const base = locale === defaultLocale ? "" : `/${locale}`;
  return (
    <div className={cn(cardBase, cardHover, "group p-5")}>
      <div className="flex w-full flex-col justify-evenly gap-4 sm:flex-row even:sm:flex-row-reverse">
        <div className="relative h-48 w-full overflow-hidden rounded-lg bg-white dark:bg-black sm:h-60">
          <Image
            src={project.coverImage}
            alt={`${project.title[locale]} logo`}
            fill
            sizes="512px"
            className="block h-full w-full rounded-lg object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          />
        </div>
        <div className="w-full">
          <h3 className="text-gradient-accent font-mono text-lg font-bold">
            <Link
              href={`${base}/projects/${project.slug}`}
              className="hover:underline"
            >
              {project.title[locale]}
            </Link>
          </h3>
          <p className="text-md font-mono">{project.subtitle[locale]}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <ProjectLink key={link.url} link={link} />
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-sm">
            {project.summary[locale]}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
