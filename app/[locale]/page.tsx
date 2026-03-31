"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { defaultLocale } from "@/i18n/routing";
import Links from "@/components/Links";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  const t = useTranslations("Home");
  const tAbout = useTranslations("About");
  const locale = useLocale();
  const base = locale === defaultLocale ? "" : `/${locale}`;
  return (
    <>
      <main id="main-content" className="relative w-full">
        <section id={"home"} aria-labelledby="home-heading" className={"hero-dot-pattern w-full scroll-mt-24 px-4 sm:mx-auto"}>
          <div
            className={
              "mx-auto px-4 pt-12 sm:max-w-screen-lg sm:px-16 sm:pb-6 sm:pt-24"
            }
          >
            <h1 id="home-heading" className={"animate-fade-in-up text-5xl font-bold text-glow md:text-6xl"}>{t("title")}</h1>
            <h2
              className={
                "animate-fade-in-up stagger-1 background-animate mt-2 inline-block text-gradient-accent text-3xl font-medium md:text-4xl"
              }
            >
              {t("subtitle")}
            </h2>
            <p className={"animate-fade-in-up stagger-2 mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl"}>
              {t("description")}
            </p>
            <Link
              href={`${base}/about`}
              className="animate-fade-in-up stagger-3 mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-orange-600 transition-colors hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
            >
              {tAbout("learnMore")} &rarr;
            </Link>
          </div>
          <div className={"animate-fade-in-up stagger-4 mt-6 w-full"}>
            <Links />
          </div>
        </section>
        <section
          id={"projects"}
          aria-labelledby="projects-heading"
          className={
            "mt-10 w-full scroll-mt-24 px-4 sm:mx-auto sm:max-w-screen-lg"
          }
        >
          <Projects />
        </section>
        <section
          id={"contact"}
          aria-labelledby="contact-heading"
          className={
            "mt-10 w-full scroll-mt-24 px-4 sm:mx-auto sm:max-w-screen-lg"
          }
        >
          <Contact />
        </section>
      </main>
    </>
  );
}
