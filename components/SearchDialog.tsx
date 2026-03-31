"use client";

import { useState, useRef, useMemo, useCallback, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search, FileText, FolderOpen, File, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { defaultLocale } from "@/i18n/routing";
import { buildSearchIndex, searchEntries } from "@/lib/search";
import type { SearchEntry } from "@/lib/search";
import type { Locale } from "@/lib/content-types";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";

const typeIcons: Record<SearchEntry["type"], typeof FileText> = {
  project: FolderOpen,
  article: FileText,
  page: File,
};

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function SearchDialogInner({
  onClose,
}: {
  onClose: () => void;
}) {
  const t = useTranslations("Search");
  const locale = useLocale() as Locale;
  const base = locale === defaultLocale ? "" : `/${locale}`;
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // Capture focus before dialog opens, restore on close
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    return () => {
      previousFocusRef.current?.focus();
    };
  }, []);

  useFocusTrap(dialogRef);

  const index = useMemo(() => buildSearchIndex(locale), [locale]);
  const results = useMemo(() => searchEntries(index, query), [index, query]);

  // Group results by type
  const grouped = useMemo(() => {
    const groups: { type: SearchEntry["type"]; label: string; entries: SearchEntry[] }[] = [];
    const typeOrder: { type: SearchEntry["type"]; label: string }[] = [
      { type: "project", label: t("projects") },
      { type: "article", label: t("blog") },
      { type: "page", label: t("pages") },
    ];
    for (const { type, label } of typeOrder) {
      const entries = results.filter((r) => r.type === type);
      if (entries.length > 0) groups.push({ type, label, entries });
    }
    return groups;
  }, [results, t]);

  const navigate = useCallback(
    (entry: SearchEntry) => {
      router.push(`${base}${entry.url}`);
      onClose();
    },
    [router, base, onClose],
  );

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      navigate(results[activeIndex]);
    }
  }

  // Close on Escape regardless of focus
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [onClose]);

  // Clamp activeIndex when results change
  const clampedIndex = Math.min(activeIndex, Math.max(results.length - 1, 0));
  if (clampedIndex !== activeIndex) {
    setActiveIndex(clampedIndex);
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]"
      role="presentation"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
        className="relative w-full max-w-lg overflow-hidden rounded-xl border border-gray-200/70 bg-white shadow-2xl dark:border-gray-700/70 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-gray-200/70 px-4 py-3 dark:border-gray-700/70">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder={t("placeholder")}
            className="flex-1 bg-transparent text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <kbd className="hidden rounded border border-gray-200 px-1.5 py-0.5 font-mono text-[10px] text-gray-400 dark:border-gray-700 sm:inline-block">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="rounded p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 sm:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Live region — announces result count and current selection to screen readers */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {query && results.length > 0
            ? `${results.length} result${results.length !== 1 ? "s" : ""}. Selected: ${results[clampedIndex]?.title ?? ""}`
            : query
            ? "No results"
            : ""}
        </div>

        {/* Results */}
        <div
          role="listbox"
          aria-label={t("results")}
          className="max-h-[50vh] overflow-y-auto px-2 py-2"
        >
          {query && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              {t("noResults")}
            </p>
          )}

          {!query && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              {t("hint")}
            </p>
          )}

          {grouped.map((group) => (
            <div key={group.type} className="mb-2">
              <p role="presentation" className="px-3 py-1.5 font-mono text-xs font-semibold text-gray-400 dark:text-gray-500">
                {group.label}
              </p>
              {group.entries.map((entry) => {
                const globalIdx = results.indexOf(entry);
                const Icon = typeIcons[entry.type];
                return (
                  <button
                    key={`${entry.type}-${entry.slug}`}
                    type="button"
                    role="option"
                    aria-selected={globalIdx === clampedIndex}
                    onClick={() => navigate(entry)}
                    onMouseEnter={() => setActiveIndex(globalIdx)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      globalIdx === clampedIndex
                        ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4 shrink-0 opacity-60" />
                    <div className="min-w-0 flex-1">
                      <span className="font-medium">{entry.title}</span>
                      <span className="ml-2 truncate text-xs text-gray-400 dark:text-gray-500">
                        {entry.summary.length > 60
                          ? entry.summary.slice(0, 60) + "..."
                          : entry.summary}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!mounted || !open) return null;

  // Key forces fresh state (query, activeIndex) each time dialog opens
  return <SearchDialogInner key={String(open)} onClose={onClose} />;
}
