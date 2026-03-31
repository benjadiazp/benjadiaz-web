import Image from "next/image";
import Link from "next/link";
import { FileText, Play, Film, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import { badgeOrange, cardBase, cardHover } from "@/lib/styles";
import type { Locale, ArticleMeta } from "@/lib/content-types";
import { defaultLocale } from "@/i18n/routing";

const typeIcons: Record<ArticleMeta["type"], typeof FileText> = {
  blog: FileText,
  video: Play,
  reel: Film,
  poc: FlaskConical,
};

export default function BlogCardGrid({
  article,
  locale,
  typeLabel,
}: {
  article: ArticleMeta;
  locale: Locale;
  typeLabel: string;
}) {
  const base = locale === defaultLocale ? "" : `/${locale}`;
  const Icon = typeIcons[article.type];

  return (
    <div
      className={cn(
        cardBase,
        cardHover,
        "group flex flex-col overflow-hidden",
      )}
    >
      <Link
        href={`${base}/blog/${article.slug}`}
        aria-label={article.title[locale]}
        className="relative h-44 w-full overflow-hidden bg-white dark:bg-black"
      >
        <Image
          src={article.coverImage}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
        />
        {/* Type badge overlay */}
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 font-mono text-[10px] font-semibold text-white backdrop-blur-sm">
          <Icon aria-hidden="true" className="h-3 w-3" />
          {typeLabel}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="text-gradient-accent font-mono text-base font-bold">
          <Link
            href={`${base}/blog/${article.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className="hover:underline"
          >
            {article.title[locale]}
          </Link>
        </h2>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {new Date(article.date).toLocaleDateString(locale, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <p className="mt-2 line-clamp-2 text-sm">{article.summary[locale]}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 5).map((tag) => (
            <span key={tag} className={badgeOrange}>
              {tag}
            </span>
          ))}
          {article.tags.length > 5 && (
            <span className={badgeOrange}>+{article.tags.length - 5}</span>
          )}
        </div>
      </div>
    </div>
  );
}
