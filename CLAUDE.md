# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website (benjadiaz.com) — a static bilingual site built with Next.js 16 App Router, TypeScript (strict), Tailwind CSS, next-intl for i18n, and next-mdx-remote for content rendering. Uses Bun as package manager.

## Commands

```bash
bun dev            # Start dev server
bun run build      # Production build
bun run lint       # ESLint (next/core-web-vitals)
bun run format     # Prettier format all files
```

No test framework is configured (Playwright is available for e2e but no unit tests).

## Repository Structure

```
app/
  layout.tsx                     # Root layout (minimal wrapper)
  globals.css                    # Tailwind directives + custom animations/theming
  ClientProviders.tsx            # next-themes provider
  sitemap.ts                     # Dynamic sitemap (projects, blog, pages)
  robots.ts                      # SEO robots.txt
  not-found.tsx                  # Global 404
  [locale]/
    layout.tsx                   # Locale layout (NextIntlClientProvider, Header, Footer)
    page.tsx                     # Home (server component: Hero, Links, Projects, Articles, Contact)
    loading.tsx                  # Loading skeleton
    error.tsx                    # Error boundary
    not-found.tsx                # Locale 404
    [...rest]/page.tsx           # Catch-all → notFound()
    about/page.tsx               # About page (bio, interests, skills, work history, certs)
    privacy/page.tsx             # Privacy policy
    projects/
      page.tsx                   # All projects grid with tag filters
      [slug]/page.tsx            # Project detail with MDX body
    blog/
      page.tsx                   # Blog listing with type tabs + tag filters
      [slug]/page.tsx            # Blog post detail with MDX body

content/
  projects/
    index.ts                     # Barrel: exports projects array
    {slug}/
      meta.ts                    # Typed metadata (ProjectMeta, uses satisfies)
      en-US.mdx                  # English long-form content
      es-CL.mdx                  # Spanish long-form content
  articles/
    index.ts                     # Barrel: exports articles array
    {slug}/
      meta.ts                    # Typed metadata (ArticleMeta, uses satisfies)
      en-US.mdx                  # English long-form content
      es-CL.mdx                  # Spanish long-form content

components/
  Hero.tsx                       # Homepage hero (client component, uses t.rich)
  Links.tsx                      # Social media links grid
  Projects.tsx                   # Homepage featured projects (compact cards + CTA)
  Articles.tsx                   # Homepage featured articles (compact cards + CTA)
  ProjectCard.tsx                # Full project card (used on detail-related contexts)
  ProjectCardCompact.tsx         # Compact horizontal card (homepage projects)
  ProjectCardGrid.tsx            # Vertical grid card (projects listing)
  ProjectLink.tsx                # External link with icon by LinkType
  ProjectsGrid.tsx               # Client component: tag filters + grid layout
  BlogCardCompact.tsx            # Compact horizontal card (homepage articles)
  BlogCardGrid.tsx               # Vertical grid card (blog listing)
  BlogGrid.tsx                   # Client component: type tabs + tag filters + grid
  Contact.tsx                    # Contact section with email CTA
  Skills.tsx                     # Skills by category
  WorkHistory.tsx                # Work experience timeline (expandable)
  Certificates.tsx               # Certifications list (expandable)
  Header.tsx                     # Sticky header: site name + nav + utilities + mobile menu
  Navigation.tsx                 # Desktop nav links (Projects, Blog, About)
  UtilityBar.tsx                 # Desktop utility icons (search, theme, language)
  MobileMenu.tsx                 # Mobile hamburger dropdown menu
  SearchDialog.tsx               # Command palette search (Cmd+K)
  Footer.tsx                     # Footer
  ClarityAnalytics.tsx           # Microsoft Clarity tracking
  inputs/
    ThemeSwitch.tsx              # Dark/light toggle
    LanguageSwitch.tsx           # EN/ES locale switcher
  mdx/
    Video.tsx                    # Video embed (YouTube/Vimeo/self-hosted, multiple aspect ratios)
    MdxImage.tsx                 # next/image wrapper with caption
    Callout.tsx                  # Info/warning/tip callout box
    LinkCard.tsx                 # Styled external link card
    mdx-components.ts            # Component map for MDXRemote
  ui/
    toast.tsx                    # Toast primitives (Radix UI)
    toaster.tsx                  # Toast container
    use-toast.ts                 # Toast hook

lib/
  content-types.ts               # Types: Locale, Localized<T>, ProjectMeta, ArticleMeta, ExternalLink
  content.ts                     # Content utilities: projects + articles (getAllProjects, getArticleBySlug, etc.)
  search.ts                      # Search index builder + matching (client-side search)
  styles.ts                      # Shared style constants (cards, badges, buttons)
  utils.ts                       # cn() — clsx + tailwind-merge

i18n/
  routing.ts                     # Locale config, pathnames
  request.ts                     # Message loading + fallback merging

messages/
  en-US.json                     # English translations (UI labels only, not content)
  es-CL.json                     # Spanish translations

public/img/                      # Project images, social logos, company logos
```

## Architecture

### Routing

App Router with `[locale]` dynamic segment. Proxy middleware (`proxy.ts`) handles locale detection/routing via next-intl. Locale prefix is "as-needed" (omitted for default `en-US`). Route pathnames are defined in `i18n/routing.ts`.

### Locales

`en-US` (default), `es-CL`. UI translations live in `/messages/{locale}.json`. Components access them via `useTranslations("SectionName")` (client) or `getTranslations()` (server). The `i18n/request.ts` config deep-merges locale messages with the default locale as fallback.

### Content Layer

File-based content system using TypeScript metadata + MDX for long-form content:

- **Metadata** in `content/{type}/{slug}/meta.ts` — typed with `satisfies ProjectMeta` or `satisfies ArticleMeta`, contains localized strings via `Localized<string>` (`Record<Locale, string>`)
- **Body content** in `content/{type}/{slug}/{locale}.mdx` — rendered via `next-mdx-remote/rsc` (server component). Falls back to `en-US.mdx` if locale-specific file is missing
- **Barrel files** in `content/{type}/index.ts` — export all metadata as arrays. Adding content requires creating the directory + adding an import to the barrel
- **Article types**: `"blog"` (written), `"video"` (video-first), `"reel"` (short-form), `"poc"` (experiments)

Content metadata is importable from both client and server components (plain TS objects). MDX body reading uses `fs` and is server-only (used in `[slug]/page.tsx` detail pages).

### Header & Navigation

- **Desktop**: `[Site Name] ··· [Projects] [Blog] [About] | [Search] [Theme] [Language]`
- **Mobile**: `[Site Name] ··· [Hamburger]` → dropdown with nav links, search, toggles
- Site name ("Benjamín Díaz") acts as home link
- Glass-morphism sticky header with backdrop blur

### Search

Client-side command palette search (Cmd+K / Ctrl+K):
- `lib/search.ts` builds a `SearchEntry[]` index from projects, articles, and static pages
- Simple case-insensitive string matching (designed for easy upgrade to MiniSearch/Fuse.js)
- Results grouped by type (Projects, Blog, Pages) with keyboard navigation

### Layout Chain

`RootLayout` → `LocaleLayout` (wraps with `NextIntlClientProvider`, `ClientProviders`, `Header`, `Footer`, `Toaster`). The homepage is a server component composing client components (`Hero`, `Links`, `Projects`, `Articles`, `Contact`).

### Styling

Tailwind utility classes with CSS variable-based theming in `globals.css`. Dark mode is class-based via next-themes. Font: Geist Mono. Shared style constants in `lib/styles.ts`:

- `cardBase` / `cardHover` — glass-morphism cards
- `badgeOrange` — orange pill tags
- `btnPrimary` — gradient CTA (red→orange, white text)
- `btnSecondary` — orange outline CTA (light fill)
- `btnText` — text-only back/nav link
- `expandButton` — full-width expand/collapse toggle

### UI Components

Toast system follows shadcn/ui pattern (Radix UI primitives). Utility `cn()` in `lib/utils.ts` combines clsx + tailwind-merge.

## Content Workflow

### Adding a new project

1. Create `content/projects/{slug}/` with `meta.ts`, `en-US.mdx`, `es-CL.mdx`
2. Add an import to `content/projects/index.ts`

The `meta.ts` file uses `satisfies ProjectMeta` for type safety. Set `featured: true` and `order` to show on the homepage. The `links` array supports typed external links with auto-icons by `LinkType` (website, github, npm, video, article, demo, itchio, youtube, tiktok, instagram) or custom icon via `icon` field.

### Adding a new blog post

1. Create `content/articles/{slug}/` with `meta.ts`, `en-US.mdx`, `es-CL.mdx`
2. Add an import to `content/articles/index.ts`

The `meta.ts` file uses `satisfies ArticleMeta`. Set `type` to one of: `"blog"`, `"video"`, `"reel"`, `"poc"`. Set `featured: true` and `order` to show on the homepage. Optional `links` for external platform links, `relatedProjects` for cross-referencing.

### Adding user-visible UI text

Add keys to both `/messages/en-US.json` and `/messages/es-CL.json`. Parameterized strings use `{placeholder}` syntax (e.g., `"viewAll": "View all projects ({count})"`).

### MDX components available in content

`Video` (YouTube/Vimeo/self-hosted, supports aspect ratios: 16:9, 9:16, 4:3, 1:1), `Image` (next/image with caption), `Callout` (info/warning/tip), `LinkCard` (styled external link).
