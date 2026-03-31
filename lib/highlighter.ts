import { getSingletonHighlighter } from "shiki";

/**
 * Pre-initialize the Shiki highlighter at module load time so that
 * Date.now() calls (used internally by Shiki for perf timing) happen
 * during server startup — not during Next.js prerendering, which
 * would trigger the "used Date.now() before uncached data" error.
 */
export const highlighterPromise = getSingletonHighlighter({
  themes: ["github-dark-dimmed", "github-light"],
  langs: [
    "plaintext",
    "typescript",
    "javascript",
    "tsx",
    "jsx",
    "css",
    "json",
    "bash",
    "sh",
    "markdown",
    "mdx",
    "html",
    "python",
    "rust",
    "go",
  ],
});
