import { MailIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Contact() {
  const t = useTranslations("Contact");
  return (
    <>
      <div className={"flex flex-col items-center justify-center"}>
        <h2 className={"text-center text-xl md:text-3xl"}>{t("title")}</h2>
        <p className={"mt-8 text-center"}>{t("subtitle")}</p>
        <div className={"flex flex-col items-center justify-center gap-4"}>
          <Link
            className={
              "mt-4 flex items-center justify-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 dark:hover:bg-red-400 md:px-8 md:py-4"
            }
            href={"mailto:hello@benjadiaz.com"}
          >
            <MailIcon className={"h-6 w-6"} />
            <span>{t("email")}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
