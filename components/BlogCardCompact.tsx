import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Play, Film, FlaskConical } from "lucide-react";
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

const typeLabels: Record<ArticleMeta["type"], string> = {
  blog: "Article",
  video: "Video",
  reel: "Reel",
  poc: "Experiment",
};

export default function BlogCardCompact({
  article,
  locale,
}: {
  article: ArticleMeta;
  locale: Locale;
}) {
  const base = locale === defaultLocale ? "" : `/${locale}`;
  const Icon = typeIcons[article.type];

  return (
    <Link
      href={`${base}/blog/${article.slug}`}
      className={cn(cardBase, cardHover, "group block p-4")}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white dark:bg-black">
          <Image
            src={article.coverImage}
            alt={article.title[locale]}
            fill
            sizes="64px"
            className="rounded-lg object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Icon
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 text-orange-500"
            />
            <span className="sr-only">{typeLabels[article.type]}: </span>
            <h3 className="text-gradient-accent truncate font-mono text-sm font-bold">
              {article.title[locale]}
            </h3>
          </div>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {article.summary[locale]}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 4).map((tag) => (
              <span key={tag} className={badgeOrange}>
                {tag}
              </span>
            ))}
            {article.tags.length > 4 && (
              <span className={badgeOrange}>+{article.tags.length - 4}</span>
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
