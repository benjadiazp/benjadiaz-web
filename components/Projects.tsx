import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <span
      className={
        "rounded-md border border-gray-200/80 bg-gray-50/80 px-2 py-0.5 font-mono text-[11px] font-medium text-gray-600 dark:border-gray-600/50 dark:bg-gray-800/50 dark:text-gray-400"
      }
    >
      {children}
    </span>
  );
};

const Project = ({
  title,
  subtitle,
  description,
  imgSrc,
  href,
  linkLabel,
  tags,
}: {
  title: string;
  subtitle: string;
  description: string[];
  imgSrc: string;
  href: string;
  linkLabel: string;
  tags?: string[];
}) => {
  return (
    <div
      className={
        "group rounded-xl border border-gray-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-orange-200 hover:shadow-md dark:border-gray-800/70 dark:bg-gray-900/50 dark:hover:border-orange-500/20"
      }
    >
      <div
        className={
          "flex w-full flex-col justify-evenly gap-4 sm:flex-row even:sm:flex-row-reverse"
        }
      >
        <div
          className={
            "relative h-48 w-full overflow-hidden rounded-lg bg-white dark:bg-black sm:h-60"
          }
        >
          <Image
            src={imgSrc}
            alt={`${title} logo`}
            fill={true}
            sizes={"512px"}
            className={`block h-full w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105`}
          />
        </div>
        <div className={"w-full"}>
          <h3 className={"text-gradient-accent font-mono text-lg font-bold"}>{title}</h3>
          <p className={"text-md font-mono"}>{subtitle}</p>
          <Link href={href} target={"_blank"} rel="noopener noreferrer" aria-label={`${linkLabel} (opens in new tab)`} className={"mt-4 inline-block"}>
            <span
              className={
                "inline-flex items-center gap-1.5 rounded-md border border-orange-200/80 bg-orange-50/80 px-3 py-1.5 font-mono text-sm font-semibold text-orange-600 transition-all hover:bg-orange-100 hover:shadow-sm dark:border-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20"
              }
            >
              {linkLabel} <ArrowTopRightOnSquareIcon aria-hidden="true" className={"inline h-3"} />
            </span>
          </Link>
          {description.map((paragraph: string, idx: number) => (
            <p key={idx} className={"mt-4 max-w-3xl text-sm"}>
              {paragraph}
            </p>
          ))}
          <div className={"mt-4 flex flex-wrap gap-2"}>
            {tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const t = useTranslations("Projects");

  const keys = ["drizip", "roldic", "oso"] as const;
  return (
    <div className={"w-full"}>
      <div className={""}>
        <h2 id="projects-heading" className={"text-center text-xl font-bold tracking-tight md:text-3xl"}>{t("title")}</h2>
      </div>
      <div
        className={
          "mt-8 flex w-full flex-col items-center justify-center gap-16"
        }
      >
        {keys.map((key, idx) => {
          const tags = t(`${key}.tags`).split(", ");
          const p = ["p1", "p2"] as const;
          return (
            <Project
              key={idx}
              title={t(`${key}.title`)}
              subtitle={t(`${key}.subtitle`)}
              description={p.map((p) => t(`${key}.description.${p}`))}
              imgSrc={t(`${key}.imgSrc`)}
              href={t(`${key}.href`)}
              linkLabel={t(`${key}.linkLabel`)}
              tags={tags}
            />
          );
        })}
      </div>
    </div>
  );
}
