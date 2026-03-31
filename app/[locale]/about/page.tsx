"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { defaultLocale } from "@/i18n/routing";
import Skills from "@/components/Skills";
import WorkHistory from "@/components/WorkHistory";
import Certificates from "@/components/Certificates";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("About");
  const locale = useLocale();
  const base = locale === defaultLocale ? "" : `/${locale}`;

  return (
    <main id="main-content" className="relative w-full">
      <div className="mx-auto w-full max-w-screen-lg px-4 pt-12 sm:px-8 sm:pt-20">
        <Link
          href={`${base}/`}
          className="inline-flex items-center gap-1.5 font-mono text-sm text-gray-500 transition-colors hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backHome")}
        </Link>

        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>

        <section className="mt-10">
          <div className="rounded-xl border border-gray-200/70 bg-white/60 px-6 py-6 shadow-sm backdrop-blur-sm dark:border-gray-800/70 dark:bg-gray-900/50">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {t("bio.p1")}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {t("bio.p2")}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {t("bio.p3")}
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-center text-xl font-bold tracking-tight md:text-3xl">
            {t("interests.title")}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {(["gamedev", "music", "content", "opensource"] as const).map(
              (key) => (
                <div
                  key={key}
                  className="rounded-xl border border-gray-200/70 bg-white/60 px-5 py-4 shadow-sm backdrop-blur-sm transition-all hover:border-orange-200 hover:shadow-md dark:border-gray-800/70 dark:bg-gray-900/50 dark:hover:border-orange-500/20"
                >
                  <h3 className="font-mono text-sm font-bold">
                    <span className="text-gradient-accent">
                      {t(`interests.${key}.title`)}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {t(`interests.${key}.description`)}
                  </p>
                </div>
              ),
            )}
          </div>
        </section>

        <section className="mt-12">
          <Skills />
        </section>

        <section className="mt-12">
          <WorkHistory />
        </section>

        <section className="mt-12">
          <Certificates />
        </section>

        <div className="pb-16" />
      </div>
    </main>
  );
}
