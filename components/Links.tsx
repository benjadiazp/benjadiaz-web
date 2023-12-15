import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

const ExternalLink = ({
  href,
  title,
  subtitle,
  imgSrc,
  darkImgSrc,
}: {
  href: string;
  title: string;
  subtitle: string;
  imgSrc?: string;
  darkImgSrc?: string;
}) => {
  return (
    <Link
      href={href}
      target={"_blank"}
      className={
        "flex items-center gap-2 rounded-lg border-2 border-transparent border-opacity-60 px-2 py-2 hover:border-red-500 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 md:px-2"
      }
    >
      {imgSrc && (
        <div className={"relative h-6 w-8 md:h-8 md:w-10"}>
          <Image
            src={imgSrc}
            alt={`${title} logo`}
            fill={true}
            sizes={"40px"}
            className={`block h-full w-full object-contain ${
              darkImgSrc && "dark:hidden"
            }`}
          />
          {darkImgSrc && (
            <Image
              src={darkImgSrc}
              alt={`${title} logo`}
              fill={true}
              sizes={"40px"}
              className={`hidden h-full w-full object-contain dark:block`}
            />
          )}
        </div>
      )}
      <div>
        <span className={"font-mono font-bold"}>
          {title} <ArrowTopRightOnSquareIcon className={"inline h-3"} />
        </span>
        <p className={"font-mono text-sm"}>{subtitle}</p>
      </div>
    </Link>
  );
};

export default function LinksList() {
  const t = useTranslations("Links");
  return (
    <ul className={"flex flex-wrap items-center justify-center gap-2 md:gap-4"}>
      <li>
        <ExternalLink
          href={t("githubUrl")}
          title={t("github")}
          subtitle={t("githubUsername")}
          imgSrc={"/img/github-mark.png"}
          darkImgSrc={"/img/github-mark-white.png"}
        />
      </li>
      <li>
        <ExternalLink
          href={t("linkedinUrl")}
          title={t("linkedin")}
          subtitle={t("linkedinUsername")}
          imgSrc={"/img/LI-In-Bug.png"}
        />
      </li>
      <li>
        <ExternalLink
          href={t("twitterUrl")}
          title={t("twitter")}
          subtitle={t("twitterUsername")}
          imgSrc={"/img/x-black.png"}
          darkImgSrc={"/img/x-white.png"}
        />
      </li>
      <li>
        <ExternalLink
          href={t("instagramUrl")}
          title={t("instagram")}
          subtitle={t("instagramUsername")}
          imgSrc={"/img/Instagram_Logo.png"}
        />
      </li>
      <li>
        <ExternalLink
          href={t("tiktokUrl")}
          title={t("tiktok")}
          subtitle={t("tiktokUsername")}
          imgSrc={"/img/tiktok_logo.png"}
        />
      </li>
      <li>
        <ExternalLink
          href={t("youtubeUrl")}
          title={t("youtube")}
          subtitle={t("youtubeUsername")}
          imgSrc={"/img/youtube_logo.png"}
        />
      </li>
    </ul>
  );
}
