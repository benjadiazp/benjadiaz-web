import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { localePrefix, locales, pathnames } from "@/i18n-constants";

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });
