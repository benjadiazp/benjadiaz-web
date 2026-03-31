"use client";

import { useTranslations } from "next-intl";
import { btnSecondary } from "@/lib/styles";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-lg">{t("description")}</p>
      <button onClick={reset} className={`mt-6 ${btnSecondary}`}>
        {t("tryAgain")}
      </button>
    </main>
  );
}
