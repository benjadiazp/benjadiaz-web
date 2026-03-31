/** Shared style constants for visual consistency across components. */

/** Glass-morphism card base (no padding — each consumer adds its own). */
export const cardBase =
  "rounded-xl border border-gray-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-gray-800/70 dark:bg-gray-900/80";

/** Glass backdrop for long-form content sections (detail pages). */
export const contentBlock =
  "rounded-xl border border-gray-200/40 bg-white/15 px-6 py-10 backdrop-blur-sm sm:px-10 dark:border-gray-800/40 dark:bg-black/35 dark:backdrop-blur-sm";

/** Hover effect addon for interactive cards. */
export const cardHover =
  "transition-all hover:border-orange-200 hover:shadow-md dark:hover:border-orange-500/20";

/** Orange pill badge for tags, periods, skill pills. */
export const badgeOrange =
  "inline-flex items-center rounded-md border border-orange-200/80 bg-orange-50/80 px-2 py-0.5 font-mono text-2xs font-semibold text-orange-600 dark:border-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400";

/** Expand/collapse toggle button. */
export const expandButton =
  "mt-4 flex w-full items-center justify-center gap-1.5 py-2 font-mono text-sm text-gray-500 transition-colors hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-2";

/** Primary CTA — gradient fill, white text, lift on hover. */
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-red-400 to-orange-400 px-5 py-2.5 font-mono text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:from-red-300 hover:to-orange-300 hover:shadow-lg dark:from-red-500 dark:to-orange-500 dark:hover:from-red-400 dark:hover:to-orange-400";

/** Secondary CTA — orange outline, light fill, lift on hover. */
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-md border border-orange-300/80 bg-orange-50/80 px-5 py-2.5 font-mono text-sm font-bold text-orange-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-orange-100 hover:shadow-md dark:border-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20";

/** Text-style back/nav link — no background, icon + label. */
export const btnText =
  "inline-flex items-center gap-1.5 font-mono text-sm text-gray-500 transition-colors hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400";
