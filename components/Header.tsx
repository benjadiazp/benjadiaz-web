"use client";

import Toggles from "@/components/Toggles";
import Navigation from "@/components/Navigation";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");
  return (
    <header
      className={
        "sticky inset-0 z-50 w-full border-b border-gray-200/70 bg-white/70 shadow-md backdrop-blur-lg dark:border-gray-800/70 dark:bg-gray-900/50"
      }
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow-md dark:focus:bg-gray-900"
      >
        {t("skipToContent")}
      </a>
      <div
        className={
          "mx-auto flex w-full flex-col flex-wrap items-center justify-center gap-2 px-2 py-2 sm:max-w-screen-2xl sm:gap-4 sm:px-4 sm:py-4 md:flex-row md:justify-between"
        }
      >
        <Toggles />
        <Navigation />
      </div>
    </header>
  );
}
