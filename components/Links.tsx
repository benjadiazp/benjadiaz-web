import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardBase, cardHover } from "@/lib/styles";

const isSafeUrl = (url: string) =>
  /^https?:\/\//.test(url) || /^mailto:/.test(url);

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
  if (!isSafeUrl(href)) return null;
  return (
    <Link
      href={href}
      target={"_blank"}
      rel="noopener noreferrer"
      aria-label={`${title} (opens in new tab)`}
      className={cn(cardBase, cardHover, "flex items-center gap-2 px-3 py-3 hover:-translate-y-0.5")}
    >
      {imgSrc && (
        <div className={"relative h-8 w-10 md:h-10 md:w-12"}>
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
              alt=""
              fill={true}
              sizes={"40px"}
              className={`hidden h-full w-full object-contain dark:block`}
            />
          )}
        </div>
      )}
      <div>
        <span className={"font-mono font-bold"}>
          {title} <ArrowUpRight aria-hidden="true" className={"inline h-3.5 w-3.5"} />
        </span>
        <p className={"font-mono text-sm"}>{subtitle}</p>
      </div>
    </Link>
  );
};

export default function LinksList() {
  const t = useTranslations("Links");
  return (
    <ul className={"flex flex-wrap items-center justify-center gap-3 md:gap-4"}>
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
      <li>
        <ExternalLink
          href={t("itchioUrl")}
          title={t("itchio")}
          subtitle={t("itchioUsername")}
          imgSrc={"/img/itchio-logo.png"}
        />
      </li>
    </ul>
  );
}
