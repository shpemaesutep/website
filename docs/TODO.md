# TODO.md — UTEP SHPE//MAES Website

> Actionable task list for the redesign. Checked items are done. Reference AUDIT.md for issue details and MIGRATION_PLAN.md for phasing strategy.
> Last updated: 2026-07-20

---

## Phase 0 — Repository Hygiene

- [ ] Create `.gitignore` (add `.DS_Store`, `*.DS_Store`, `Thumbs.db`)
- [ ] Remove the 10 committed `.DS_Store` files
- [ ] Delete root-level `index.js` (dead jQuery shadow-div code)
- [ ] Delete `assets/img/2025/join/home/` (duplicate of `assets/img/2025/home/`)
- [ ] Delete `assets/img/Constitution_2023-2024.pdf` (superseded)
- [ ] Rename `assets/img/2025/sponsers/` → `assets/img/2025/sponsors/`
- [ ] Update sponsor image paths in `index.html` after folder rename
- [ ] Rename `"Presi and vps.JPG"` → `presi-and-vps.jpg`
- [ ] Rename `"first general meeting.jpeg"` → `first-general-meeting.jpeg`

---

## Phase 1 — Dependency Unification

- [ ] Remove `assets/js/scripts.js` references from `index.html`, `history.html`, `join.html`, `getinvolved.html`, `constitution.html`
- [ ] Replace bundled `assets/css/styles.css` with a lean `assets/css/base.css` (custom rules only)
- [ ] Add Bootstrap 5.3.3 CSS CDN link to every page head
- [ ] Update all Bootstrap JS CDN links to 5.3.3
- [ ] Replace Font Awesome 6.0.0-beta2 with 6.5.0 on `index.html`, `getinvolved.html`, `constitution.html`, `resources.html`
- [ ] Remove duplicate jQuery load from `index.html:553`
- [ ] Move all `<script>` tags to end of `<body>` (except inline scripts that must be in head)
- [ ] Standardize Google Fonts to the single canonical request (see DESIGN_SYSTEM.md)
- [ ] Remove duplicate Google Fonts loads from `index.html` and `join.html`
- [ ] Remove `Mohave` from all font requests

---

## Phase 2 — CSS Consolidation

- [ ] Add `:root { ... }` CSS custom properties block to top of `my-styles.css` (see DESIGN_SYSTEM.md)
- [ ] Replace all hardcoded `#041E42`, `#00254d`, `#FF8200`, `#86DC3D`, `#F9FAFB`, `#0f172a` in `my-styles.css` with `var(--color-*)`
- [ ] Remove `#00254d` entirely — standardize to `#041E42`
- [ ] Fix triple `body { padding-top }` — remove 125px and 72px rules, keep only 92px
- [ ] Move `.activity-card`, `.activity-image`, `.activity-tag`, `.tag-*` classes from `index.html` to `my-styles.css`
- [ ] Move `.title` class pattern to `my-styles.css` (currently repeated in 3 pages)
- [ ] Add `.section-soft` utility class to `my-styles.css` (replaces inline `style="background:#F9FAFB"`)
- [ ] Add `.page-hero` base component to `my-styles.css`
- [ ] Remove dead `<style>` content from `index.html` (`#fourth-slide`, `#points-button`, etc.)
- [ ] Remove dead `<style>` content from `join.html` (`#shpe-button`, `#maes-button`, etc.)
- [ ] Remove dead `<style>` content from `getinvolved.html` (same dead button IDs)
- [ ] Audit `assets/css/style-shpe.css` — delete file or move any still-needed rules to `my-styles.css`
- [ ] Decide fate of `assets/css/newsfeed.css` (keep if magazine pages are kept, delete otherwise)

---

## Phase 3 — HTML Structure Fixes

- [ ] Add `<!DOCTYPE html>` to `index.html:1`
- [ ] Fix carousel prev/next buttons — move inside `#carouselExampleControls` div
- [ ] Fix activity card row — change `</section>` on line ~196 to `</div>`
- [ ] Standardize activity card columns to `col-xl-4 col-md-6 col-sm-12` on all three cards
- [ ] Change `.container-center { height: 400px }` → `min-height: 400px`
- [ ] Add `background-attachment: scroll` mobile fallback to `index.html` `#home-welcome`
- [ ] Add `lang="en"` to `join.html`
- [ ] Add `lang="en"` to `constitution.html`
- [ ] Fix `constitution.html` PDF iframe path → `Constitution_2025-2026.pdf`
- [ ] Move favicon/theme-color meta out of `header.html` — add to each page's `<head>` instead
- [ ] Audit all `target="_blank"` links — add `rel="noopener noreferrer"` where missing
- [ ] Verify `<meta name="description">` on all in-nav pages

---

## Phase 4 — Navigation Expansion

- [ ] Decide on nav structure (flat vs dropdown — see MIGRATION_PLAN.md Phase 4)
- [ ] Add Bootstrap dropdown to `header.html` for "Programs" group
- [ ] Add links to `appdev2.html`, `shpetinas.html`, `minerspark.html` inside dropdown
- [ ] Add `resources.html` as a direct nav link
- [ ] Update active-link detection in `assets/js/index.js` to handle dropdown `<a>` elements
- [ ] Test mobile menu collapse with new dropdown structure
- [ ] Verify all newly linked pages have consistent `<head>` (Bootstrap, FA, fonts)

---

## Phase 5 — Dead Code Removal

- [ ] Delete `assets/js/activity-expand.js`
- [ ] Remove `<script src="assets/js/activity-expand.js">` from `index.html`
- [ ] Decide: restore or permanently remove the "Learn More" button links in `index.html`
  - If restoring: uncomment `<a href="appdev2.html">`, `<a href="shpetinas.html">`, `<a href="minerspark.html">` in the activity cards
  - If removing: delete the commented-out blocks entirely
- [ ] Remove FLIP card expand code from `assets/js/index.js` (lines 1–143) if not being used
  - If keeping: create `#expand-overlay` in `index.html` markup and wire up properly
- [ ] Remove root-level `index.js` reference if any pages still load it (should be done in Phase 0)

---

## Phase 6 — Accessibility

- [ ] Add skip-to-main-content link to `header.html` (`<a class="skip-link" href="#main-content">`)
- [ ] Add `.skip-link` CSS to `my-styles.css` (visually hidden until focused)
- [ ] Add `id="main-content"` to `<main>` on all pages
- [ ] Add `role="button"` and `tabindex="0"` to `.leader-card` elements (Leadership page)
- [ ] Add `keydown` Enter/Space handler for leader cards
- [ ] Add `aria-label` to each leader card
- [ ] Add carousel pause button (WCAG 2.2.2)
- [ ] Add `aria-label` to each carousel slide
- [ ] Add `aria-labelledby` to `#shpetinasModal` pointing to modal title ID
- [ ] Add `aria-labelledby` to `#minersparkModal`
- [ ] Audit `#86DC3D` text uses — change to `#5B9E1A` for WCAG AA compliance on text, or restrict to non-text uses
- [ ] Add descriptive `alt` text to leadership headshot `<img>` tags in gallery contexts
- [ ] Confirm purely decorative images have `alt=""`

---

## Phase 7 — Performance

- [ ] Convert hero and gallery images to WebP with JPEG/PNG fallbacks
- [ ] Add `width` and `height` attributes to all `<img>` tags
- [ ] Add `srcset` and `sizes` to leadership headshots
- [ ] Add `defer` to all external `<script>` tags
- [ ] Add `loading="lazy"` to Google Calendar iframe
- [ ] Verify all Google Fonts requests include `&display=swap`
- [ ] Delete `assets/css/styles.css` once Phase 1 replacement (`base.css`) is live

---

## Phase 8 — Orphaned Pages

- [ ] Delete `appdev.html` (superseded by `appdev2.html`)
- [ ] Delete or merge `getinvolved.html` → move social links to footer or join page
- [ ] Delete `newsfeed.html` (broken images, no purpose)
- [ ] Delete `shpetinas_magazine.html` (duplicate)
- [ ] Decide: delete or simplify `constitution.html` (constitution already in resources.html)
- [ ] Move `react-native-setup.html` reference from `appdev.html` to `appdev2.html`
- [ ] Move `branding-guide.html` and `app_structure.html` to `docs/` or link internally only
- [ ] Audit all internal links across all remaining pages after deletions

---

## Phase 9 — Content

- [ ] Update MinerSpark lead names (replace "Liz", "Add Lead Name")
- [ ] Add MinerSpark lead photos (replace `aleidadev5.JPEG` placeholder)
- [ ] Fix MinerSpark LinkedIn links (replace `href="#"`)
- [ ] Update internship resource card link from Summer2024 to current year list
- [ ] Replace `newsfeed.html` placeholder images before keeping (if keeping)
- [ ] Fill in empty Q&A fields for `natalia` and `steven` on Leadership page, or remove their entries
- [ ] Remove "DUPLICATE FOR OTHER LEADS" comment from `shpetinas.html` production markup
- [ ] Remove "swap these with cohort photos" placeholder caption from `minerspark.html`
- [ ] Complete "We'll get you onboarded" sentence in `appdev2.html`
- [ ] Review and update all `<meta name="description">` tags — most are empty or generic

---

## Ongoing / Nice to Have

- [ ] Add a `404.html` page (currently no custom 404)
- [ ] Add Open Graph meta tags (`og:title`, `og:description`, `og:image`) to all pages for link previews
- [ ] Add `robots.txt` and `sitemap.xml` for SEO
- [ ] Evaluate whether jQuery can be removed (the `.load()` pattern for header/footer is the main dependency)
- [ ] Add `prefers-reduced-motion` support to entrance animations (currently only sponsor marquee handles it)
- [ ] Consider extracting leadership data to a JSON file for easier non-developer updates
- [ ] Add `aria-live` region for carousel to announce slide changes to screen readers
