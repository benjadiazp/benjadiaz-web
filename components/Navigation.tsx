"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/navigation";
import { defaultLocale } from "@/i18n/routing";

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      className={
        "relative text-base transition-colors hover:text-orange-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-red-500 after:to-orange-500 after:transition-all after:duration-300 hover:after:w-full dark:hover:text-orange-400"
      }
      href={href}
      aria-current={isActive ? "page" : undefined}
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
    <nav aria-label={t("ariaLabel")} className={"flex items-center gap-6"}>
      <NavItem href={`${base}/projects`}>{t("projects")}</NavItem>
      <NavItem href={`${base}/blog`}>{t("blog")}</NavItem>
      <NavItem href={`${base}/about`}>{t("about")}</NavItem>
    </nav>
  );
}
