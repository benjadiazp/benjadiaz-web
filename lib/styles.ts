/** Shared style constants for visual consistency across components. */

/** Glass-morphism card base (no padding — each consumer adds its own). */
export const cardBase =
  "rounded-xl border border-gray-200/70 bg-white/60 shadow-sm backdrop-blur-sm dark:border-gray-800/70 dark:bg-gray-900/50";

/** Hover effect addon for interactive cards. */
export const cardHover =
  "transition-all hover:border-orange-200 hover:shadow-md dark:hover:border-orange-500/20";

/** Orange pill badge for tags, periods, skill pills. */
export const badgeOrange =
  "inline-flex items-center rounded-md border border-orange-200/80 bg-orange-50/80 px-2 py-0.5 font-mono text-2xs font-semibold text-orange-600 dark:border-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400";

/** Expand/collapse toggle button. */
export const expandButton =
  "mt-4 flex w-full items-center justify-center gap-1.5 py-2 font-mono text-sm text-gray-500 transition-colors hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400";
