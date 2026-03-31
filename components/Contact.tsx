"use client";

import { MailIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cardBase, cardHover, btnPrimary } from "@/lib/styles";

export default function Contact() {
  const t = useTranslations("Contact");
  return (
    <section aria-labelledby="contact-heading">
      <div className={cn(cardBase, cardHover, "mb-4 px-8 py-10 text-center")}>
        <h2 id="contact-heading" className={"text-gradient-accent text-xl font-bold tracking-tight md:text-3xl"}>{t("title")}</h2>
        <p className={"mt-8 text-muted-foreground"}>{t("subtitle")}</p>
        <div className={"flex flex-col items-center justify-center gap-4"}>
          <Link
            className={cn(btnPrimary, "mt-4 md:px-8 md:py-4")}
            href={"mailto:hello@benjadiaz.com"}
          >
            <MailIcon aria-hidden="true" className={"h-6 w-6"} />
            <span>{t("email")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
