"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { defaultLocale } from "@/i18n/routing";
import { btnSecondary } from "@/lib/styles";

export default function Hero() {
  const t = useTranslations("Home");
  const tAbout = useTranslations("About");
  const locale = useLocale();
  const base = locale === defaultLocale ? "" : `/${locale}`;

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="hero-dot-pattern w-full scroll-mt-24 px-4 sm:mx-auto"
    >
      <div className="mx-auto px-4 pt-12 sm:max-w-screen-lg sm:px-16 sm:pb-6 sm:pt-24">
        <h1
          id="home-heading"
          className="animate-fade-in-up text-5xl font-bold text-glow md:text-6xl"
        >
          {t("title")}
        </h1>
        <p className="animate-fade-in-up stagger-1 background-animate mt-2 inline-block text-gradient-accent text-3xl font-medium md:text-4xl">
          {t("subtitle")}
        </p>
        <p className="animate-fade-in-up stagger-2 mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
          {t.rich("description", {
            microsoft: (chunks) => (
              <a
                href="https://www.microsoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-orange-500/50 underline-offset-2 transition-colors hover:text-orange-500 dark:hover:text-orange-400"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
        <Link
          href={`${base}/about`}
          className={`animate-fade-in-up stagger-3 mt-6 ${btnSecondary}`}
        >
          {tAbout("learnMore")} &rarr;
        </Link>
      </div>
    </section>
  );
}
