"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";
import { defaultLocale, locales } from "@/i18n-constants";
import { useLocale } from "next-intl";

export const ThemeSwitch = ({
  labels,
}: {
  labels?: {
    light: string;
    dark: string;
  };
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const currentLocale = useLocale();

  useEffect(() => {
    setMounted(true);
    const browserLang = navigator.language.split("-")[0];
    let detectedLocale = defaultLocale;

    switch (browserLang) {
      case "es":
        detectedLocale = "es-CL";
        break;
      case "en":
        detectedLocale = "en-US";
        break;
      default:
        detectedLocale = defaultLocale;
    }

    console.log(currentLocale);
    console.log(detectedLocale);

    if (locales.includes(detectedLocale) && currentLocale !== detectedLocale) {
      toast({
        title: "Recomendación",
        description: "Quizás quieras cambiar de idioma.",
      });
    }
  }, []);

  if (!mounted) {
    return <span>loading...</span>;
  }

  return (
    <button
      className={`rounded-2xl px-4 py-2 font-mono text-xs font-medium hover:bg-neutral-400 dark:hover:bg-neutral-700 ${
        theme === "light" ? "" : ""
      }`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? labels?.dark ?? "dark" : labels?.light ?? "light"}
    </button>
  );
};
