import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <span
      className={
        "rounded-lg bg-gray-200 px-2 py-1 font-mono text-xs dark:bg-gray-700"
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
        "flex w-full flex-row justify-evenly gap-4 even:flex-row-reverse"
      }
    >
      <div
        className={
          "relative h-48 w-full rounded-lg bg-white p-4 dark:bg-black sm:h-60"
        }
      >
        <Image
          src={imgSrc}
          alt={`${title} logo`}
          fill={true}
          sizes={"512px"}
          className={`block h-full w-full rounded-lg object-cover`}
        />
      </div>
      <div className={"w-full"}>
        <h3 className={"font-mono text-lg font-bold"}>{title}</h3>
        <p className={"text-md font-mono"}>{subtitle}</p>
        <Link href={href} target={"_blank"} className={"mt-4"}>
          <span
            className={
              "font-mono font-bold underline hover:text-blue-600 dark:hover:text-blue-300"
            }
          >
            {linkLabel} <ArrowTopRightOnSquareIcon className={"inline h-3"} />
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
  );
};

export default function Projects() {
  const t = useTranslations("Projects");

  const keys = ["drizip", "roldic", "oso"] as const;
  return (
    <div className={"w-full"}>
      <div className={""}>
        <h2 className={"text-center text-xl md:text-3xl"}>{t("title")}</h2>
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
