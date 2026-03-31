"use client";

import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ThemeSwitch } from "@/components/inputs/ThemeSwitch";
import LanguageSwitch from "@/components/inputs/LanguageSwitch";

export default function UtilityBar({
  onSearchClick,
}: {
  onSearchClick: () => void;
}) {
  const t = useTranslations("Toggles");
  const tHeader = useTranslations("Header");
  const tLang = useTranslations("LanguageSwitch");
  const currentLocale = useLocale();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onSearchClick}
        aria-label={tHeader("search")}
        className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-orange-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-orange-400"
      >
        <Search className="h-4 w-4" />
      </button>
      <ThemeSwitch
        labels={{
          light: t("light"),
          dark: t("dark"),
        }}
      />
      <LanguageSwitch
        currentLocale={currentLocale}
        labels={{
          en: t("english"),
          es: t("spanish"),
        }}
        switchToLabels={{
          en: tLang("switchTo", { label: t("english") }),
          es: tLang("switchTo", { label: t("spanish") }),
        }}
      />
    </div>
  );
}
