import { useTranslations } from "next-intl";
import Link from "next/link";
import { btnSecondary } from "@/lib/styles";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg">{t("description")}</p>
      <Link href="/" className={`mt-6 ${btnSecondary}`}>
        {t("backHome")}
      </Link>
    </main>
  );
}
