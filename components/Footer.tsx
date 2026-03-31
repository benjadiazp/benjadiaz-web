"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className={"w-full border-t border-gray-200/70 px-4 py-4 dark:border-gray-800/70 sm:mx-auto sm:max-w-screen-2xl"}>
      <p className={"text-center"} aria-hidden="true">🐻🐧</p>
      <div className={"flex flex-col items-center justify-center gap-4"}>
        <Link href={"/privacy"} className={"text-center text-sm text-muted-foreground transition-colors hover:text-orange-500 dark:hover:text-orange-400"}>
          {t("privacy")}
        </Link>
      </div>

      <div className={"flex flex-col items-center justify-center gap-4"}>
        <p className={"text-center text-sm text-muted-foreground"}>
          {`© ${new Date().getFullYear()} Benjamín Díaz P.`}
        </p>
      </div>
    </footer>
  );
}
