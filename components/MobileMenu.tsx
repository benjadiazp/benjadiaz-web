"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { defaultLocale } from "@/i18n/routing";
import { ThemeSwitch } from "@/components/inputs/ThemeSwitch";
import LanguageSwitch from "@/components/inputs/LanguageSwitch";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";

export default function MobileMenu({
  onClose,
  onSearchClick,
  headerRef,
  triggerRef,
}: {
  onClose: () => void;
  onSearchClick: () => void;
  headerRef: React.RefObject<HTMLElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const t = useTranslations("Navigation");
  const tHeader = useTranslations("Header");
  const tToggles = useTranslations("Toggles");
  const tLang = useTranslations("LanguageSwitch");
  const locale = useLocale();
  const currentLocale = useLocale();
  const base = locale === defaultLocale ? "" : `/${locale}`;
  const menuRef = useRef<HTMLDivElement>(null);

  useFocusTrap(menuRef);

  // Move focus into menu on open
  useEffect(() => {
    const firstFocusable = menuRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    firstFocusable?.focus();
  }, []);

  // Restore focus to trigger on close
  const handleClose = () => {
    triggerRef.current?.focus();
    onClose();
  };

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  // Close on outside click/pointer (also handles touch) or keyboard focus leaving header
  useEffect(() => {
    function handlePointer(e: PointerEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [onClose, headerRef]);

  const navLinks = [
    { href: `${base}/projects`, label: t("projects") },
    { href: `${base}/blog`, label: t("blog") },
    { href: `${base}/about`, label: t("about") },
  ];

  return (
    <div
      id="mobile-menu"
      ref={menuRef}
      className="border-t border-gray-200/70 bg-white/95 backdrop-blur-lg dark:border-gray-800/70 dark:bg-gray-900/95 md:hidden"
    >
      <nav aria-label={t("ariaLabel")} className="flex flex-col gap-1 px-4 py-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-gray-100 hover:text-orange-500 dark:hover:bg-gray-800 dark:hover:text-orange-400"
          >
            {link.label}
          </Link>
        ))}
        <button
          type="button"
          aria-label={tHeader("search")}
          onClick={() => {
            handleClose();
            onSearchClick();
          }}
          className="flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-base font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-orange-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-orange-400"
        >
          <Search aria-hidden="true" className="h-4 w-4" />
          {tHeader("search")}
        </button>
      </nav>
      <div className="border-t border-gray-200/70 px-4 py-3 dark:border-gray-800/70">
        <div className="flex items-center justify-center gap-6">
          <ThemeSwitch
            labels={{
              light: tToggles("light"),
              dark: tToggles("dark"),
            }}
          />
          <LanguageSwitch
            currentLocale={currentLocale}
            labels={{
              en: tToggles("english"),
              es: tToggles("spanish"),
            }}
            switchToLabels={{
              en: tLang("switchTo", { label: tToggles("english") }),
              es: tLang("switchTo", { label: tToggles("spanish") }),
            }}
          />
        </div>
      </div>
    </div>
  );
}
