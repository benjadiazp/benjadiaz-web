"use client";
import {
  ChangeEvent,
  MouseEventHandler,
  ReactNode,
  useTransition,
} from "react";
import { useRouter, usePathname } from "@/navigation";
import { useLocale } from "next-intl";

const LanguageButton = ({
  locale,
  label,
  onClick,
}: {
  locale: string;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  const currentLocale = useLocale();
  return (
    <button
      type="button"
      className={`text-xs hover:underline  sm:text-sm ${
        currentLocale === locale
          ? "border-b-2 border-red-500 font-bold"
          : "font-normal"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default function LanguageSwitch({
  currentLocale,
  labels,
}: {
  currentLocale: string;
  labels?: {
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
    <>
      <div className={"flex flex-wrap items-center justify-start gap-2"}>
        <LanguageButton
          locale={"en-US"}
          label={labels?.en ?? "English"}
          onClick={(e) => {
            e.preventDefault();
            onLanguageSelect("en-US");
          }}
        />
        <LanguageButton
          locale={"es-CL"}
          label={labels?.es ?? "Spanish"}
          onClick={(e) => {
            e.preventDefault();
            onLanguageSelect("es-CL");
          }}
        />
      </div>
    </>
  );
}
