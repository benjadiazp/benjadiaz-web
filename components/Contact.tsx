import { MailIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Contact() {
  const t = useTranslations("Contact");
  return (
    <>
      <div className={"mb-4 rounded-xl border border-gray-200/70 bg-white/60 px-8 py-10 text-center shadow-sm backdrop-blur-sm dark:border-gray-800/70 dark:bg-gray-900/50"}>
        <h2 id="contact-heading" className={"text-gradient-accent text-xl font-bold tracking-tight md:text-3xl"}>{t("title")}</h2>
        <p className={"mt-8 text-muted-foreground"}>{t("subtitle")}</p>
        <div className={"flex flex-col items-center justify-center gap-4"}>
          <Link
            className={
              "mt-4 flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-red-400 to-orange-400 px-4 py-2 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:from-red-300 hover:to-orange-300 hover:shadow-lg dark:from-red-500 dark:to-orange-500 dark:hover:from-red-700 dark:hover:to-orange-700 md:px-8 md:py-4"
            }
            href={"mailto:hello@benjadiaz.com"}
          >
            <MailIcon aria-hidden="true" className={"h-6 w-6"} />
            <span>{t("email")}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
