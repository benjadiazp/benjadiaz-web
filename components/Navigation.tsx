"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { defaultLocale } from "@/i18n/routing";

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      className={
        "relative text-base transition-colors hover:text-orange-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-red-500 after:to-orange-500 after:transition-all after:duration-300 hover:after:w-full dark:hover:text-orange-400"
      }
      href={href}
    >
      {children}
    </Link>
  );
};

export default function Navigation() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const base = locale === defaultLocale ? "" : `/${locale}`;
  return (
    <nav aria-label={t("ariaLabel")} className={"flex justify-end gap-4"}>
      <NavItem href={`${base}/#home`}>{t("home")}</NavItem>
      <NavItem href={`${base}/#experience`}>{t("experience")}</NavItem>
      <NavItem href={`${base}/#projects`}>{t("projects")}</NavItem>
      <NavItem href={`${base}/#contact`}>{t("contact")}</NavItem>
    </nav>
  );
}
