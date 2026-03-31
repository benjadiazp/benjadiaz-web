"use client";
import {
  MouseEventHandler,
  useTransition,
} from "react";
import { useRouter, usePathname } from "@/navigation";
import { useLocale } from "next-intl";

const LanguageButton = ({
  locale,
  label,
  switchToLabel,
  onClick,
}: {
  locale: string;
  label: string;
  switchToLabel: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  const currentLocale = useLocale();
  return (
    <button
      type="button"
      className={`hover:underline ${
        currentLocale === locale
          ? "font-bold underline underline-offset-4"
          : "font-normal text-muted-foreground"
      }`}
      onClick={onClick}
      aria-label={switchToLabel}
      aria-pressed={currentLocale === locale}
    >
      {label}
    </button>
  );
};

export default function LanguageSwitch({
  currentLocale,
  labels,
  switchToLabels,
}: {
  currentLocale: string;
  labels?: {
    es: string;
    en: string;
  };
  switchToLabels?: {
    es: string;
    en: string;
  };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onLanguageSelect(newLanguage: string) {
    startTransition(() => {
      router.replace(pathname, { locale: newLanguage });
    });
  }

  return (
    <div className="flex items-center gap-1 text-xs sm:text-sm">
      <LanguageButton
        locale={"en-US"}
        label={labels?.en ?? "EN"}
        switchToLabel={switchToLabels?.en ?? "Switch language to English"}
        onClick={(e) => {
          e.preventDefault();
          onLanguageSelect("en-US");
        }}
      />
      <span className="text-muted-foreground select-none">/</span>
      <LanguageButton
        locale={"es-CL"}
        label={labels?.es ?? "ES"}
        switchToLabel={switchToLabels?.es ?? "Switch language to Spanish"}
        onClick={(e) => {
          e.preventDefault();
          onLanguageSelect("es-CL");
        }}
      />
    </div>
  );
}
