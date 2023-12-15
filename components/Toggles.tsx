import LanguageSwitch from "@/components/inputs/LanguageSwitch";
import { ThemeSwitch } from "@/components/inputs/ThemeSwitch";
import { useLocale, useTranslations } from "next-intl";

export default function Toggles() {
  const t = useTranslations("Toggles");
  const currentLocale = useLocale();
  return (
    <>
      <div
        className={"flex flex-wrap items-center justify-center gap-4 sm:gap-6"}
      >
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
        />
      </div>
    </>
  );
}
