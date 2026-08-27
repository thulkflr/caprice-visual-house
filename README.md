# Caprice Visual House

A bilingual, responsive website for Caprice Visual House. It is deliberately built as a zero-dependency static site: any static host can publish it without a build step, while the content, contact configuration, projects, presentation, and behavior remain separated.

## Run locally

ES modules require an HTTP server rather than opening the HTML file directly:

```bash
npm run serve
```

Then visit `http://localhost:4173/`. The root route chooses Arabic or English from the browser language; direct routes are `/ar/` and `/en/`.

## Project structure

- `ar/index.html`, `en/index.html`: language entry points and language-specific SEO copy.
- `assets/content.js`: the approved Arabic and English copy as independent objects.
- `assets/config.js`: all contact details and the future production domain.
- `assets/projects.js`: typed project model, empty published archive, and disabled future-section flags.
- `assets/logos/`: official Arabic, English, and symbol SVG artwork for both themes.
- `assets/app.js`: shared semantic page rendering and interactions.
- `assets/styles.css`: design tokens, responsive presentation, motion, themes, RTL/LTR, and accessibility preferences.
- `404.html`, `robots.txt`, `sitemap.xml`: deployment support.

## Editing content and contact details

Edit site copy only in `assets/content.js`. Do not generate Arabic from English at runtime; each locale is intentionally maintained independently.

Edit phone, WhatsApp, Instagram, email, and future Facebook URL only in `assets/config.js`. A null Facebook URL hides it rather than rendering a dead link. The current email spelling (`buss`) and other contact values remain pending confirmation.

## Adding a project

Add an object matching the documented `Project` shape to the `projects` array in `assets/projects.js`. A project supports bilingual title/category/description, slug, year, client, cover, gallery, services, credits, featured state, and SEO fields. The public archive intentionally remains empty until authentic work is supplied. Case-study routes are prepared conceptually but disabled.

## Theme and language behavior

The first visit follows `prefers-color-scheme`; a manual choice is stored as `caprice-theme` before paint to avoid a theme flash. The language switch preserves the current hash/section. Arabic is document-level RTL and English is LTR. Motion is removed when `prefers-reduced-motion` is active.

## Contact form

There is no backend in this version. The form validates required fields and prepares a transparent `mailto:` draft; it never reports that a message was delivered. WhatsApp, phone, email, and Instagram are also available directly.

## Before production launch

1. Add the confirmed production origin to `assets/config.js`.
2. Add absolute localized URLs to `sitemap.xml` and its absolute URL to `robots.txt`.
3. Add a branded Open Graph image based on the supplied official logo assets.
4. Confirm the phone, WhatsApp, Instagram, and especially the current `buss` email spelling.

## Checks

There is no dependency install, bundling, or compilation step. Run `npm run check`, serve the site, and inspect both locale routes at mobile and desktop widths in light and dark themes.
