"use client";
import {
  MouseEventHandler,
  useTransition,
} from "react";
import { Globe } from "lucide-react";
import { useRouter, usePathname } from "@/navigation";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

const LanguageButton = ({
  locale,
  label,
  switchToLabel,
  onClick,
  disabled,
}: {
  locale: string;
  label: string;
  switchToLabel: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) => {
  const currentLocale = useLocale();
  return (
    <button
      type="button"
      className={`transition-colors hover:text-orange-500 dark:hover:text-orange-400 disabled:opacity-50 ${
        currentLocale === locale
          ? "font-bold text-foreground"
          : "font-normal text-muted-foreground"
      }`}
      onClick={onClick}
      aria-label={switchToLabel}
      aria-pressed={currentLocale === locale}
      disabled={disabled}
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
  const params = useParams();

  function onLanguageSelect(newLanguage: string) {
    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.replace({ pathname, params } as any, { locale: newLanguage });
    });
  }

  return (
    <div
      role="group"
      aria-label="Language selection"
      aria-busy={isPending}
      className="flex items-center gap-1.5 text-xs sm:text-sm"
    >
      <Globe className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <LanguageButton
        locale={"en-US"}
        label={labels?.en ?? "EN"}
        switchToLabel={switchToLabels?.en ?? "Switch language to English"}
        onClick={(e) => {
          e.preventDefault();
          onLanguageSelect("en-US");
        }}
        disabled={isPending}
      />
      <span aria-hidden="true" className="text-muted-foreground select-none">/</span>
      <LanguageButton
        locale={"es-CL"}
        label={labels?.es ?? "ES"}
        switchToLabel={switchToLabels?.es ?? "Switch language to Spanish"}
        onClick={(e) => {
          e.preventDefault();
          onLanguageSelect("es-CL");
        }}
        disabled={isPending}
      />
    </div>
  );
}
