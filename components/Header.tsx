"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { defaultLocale } from "@/i18n/routing";
import Navigation from "@/components/Navigation";
import UtilityBar from "@/components/UtilityBar";
import MobileMenu from "@/components/MobileMenu";
import SearchDialog from "@/components/SearchDialog";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const base = locale === defaultLocale ? "" : `/${locale}`;
  const headerRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      ref={headerRef}
      className={
        "sticky inset-0 z-50 w-full border-b border-gray-200/70 bg-white/70 shadow-md backdrop-blur-lg dark:border-gray-800/70 dark:bg-gray-900/50"
      }
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow-md dark:focus:bg-gray-900"
      >
        {t("skipToContent")}
      </a>
      <div className="mx-auto flex w-full items-center justify-between px-4 py-3 sm:max-w-screen-2xl sm:px-6">
        {/* Site name — home link */}
        <Link
          href={`${base}/`}
          aria-label={t("homeLink")}
          className="text-lg font-bold tracking-tight transition-colors hover:text-orange-500 dark:hover:text-orange-400"
        >
          {t("siteName")}
        </Link>

        {/* Desktop: nav + utilities */}
        <div className="hidden items-center gap-6 md:flex">
          <Navigation />
          <div className="h-5 w-px bg-gray-300 dark:bg-gray-700" />
          <UtilityBar onSearchClick={openSearch} />
        </div>

        {/* Mobile: hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-orange-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-orange-400 md:hidden"
        >
          {menuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <MobileMenu onClose={closeMenu} onSearchClick={openSearch} headerRef={headerRef} triggerRef={hamburgerRef} />
      )}

      {/* Search dialog */}
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </header>
  );
}
