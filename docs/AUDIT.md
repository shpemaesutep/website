# AUDIT.md — UTEP SHPE//MAES Website Audit

> Full findings from the pre-redesign code review. Every issue is logged here before any fix is applied.
> Status: **complete as of 2026-07-20**. Update entries as issues are resolved.

---

## Table of Contents

1. [Technical Debt](#1-technical-debt)
2. [Duplicate Code](#2-duplicate-code)
3. [Dead Code](#3-dead-code)
4. [Unused Assets](#4-unused-assets)
5. [Orphaned Pages](#5-orphaned-pages)
6. [Inconsistent Styling](#6-inconsistent-styling)
7. [Accessibility Issues](#7-accessibility-issues)
8. [Responsiveness Issues](#8-responsiveness-issues)
9. [Performance Bottlenecks](#9-performance-bottlenecks)

---

## 1. Technical Debt

### TD-01 — `scripts.js` does not exist
- **Severity:** High
- **Affected files:** `index.html:27`, `history.html:20`, `join.html:44`, `getinvolved.html:24`, `constitution.html:23`
- **Description:** Every one of these pages references `assets/js/scripts.js` but the file does not exist anywhere in the project. The browser silently gets a 404 on every page load.
- **Status:** Open

---

### TD-02 — Three Bootstrap versions loaded simultaneously
- **Severity:** High
- **Description:**
  - `assets/css/styles.css` is a 11,130-line file that bundles Bootstrap 5.1.3 internally (the first ~9,000 lines are Bootstrap source).
  - Older pages (`index.html`, `getinvolved.html`, `constitution.html`, `resources.html`) also pull Bootstrap JS `5.1.3` from CDN.
  - Newer pages (`Leadership.html`, `join.html`, `minerspark.html`, `shpetinas.html`, `appdev2.html`, `shpetinas_magazine.html`) load Bootstrap `5.3.3` CSS + JS from CDN.
  - Result: those newer pages parse Bootstrap CSS **twice** (once bundled in `styles.css`, once from CDN), and the two versions have behavioral differences.
- **Status:** Open

---

### TD-03 — Two Font Awesome versions
- **Severity:** Medium
- **Affected files:**
  - `6.0.0-beta2`: `index.html`, `getinvolved.html`, `constitution.html`, `resources.html`
  - `6.5.0`: `history.html`, `Leadership.html`, `join.html`, `minerspark.html`, `shpetinas.html`, `appdev2.html`, `shpetinas_magazine.html`
- **Description:** Beta and stable release loaded across different pages. Icon names changed between versions — some icons may silently fall back to nothing.
- **Status:** Open

---

### TD-04 — Triple `body { padding-top }` declarations
- **Severity:** Medium
- **File:** `assets/css/my-styles.css`
- **Lines:** 2 (125px), 502 (72px), 506 (92px)
- **Description:** Three competing `body` padding-top rules in the same file. The 92px rule wins due to cascade order, but the stale 125px and 72px rules cause confusion and override risk.
- **Status:** Open

---

### TD-05 — Bootstrap comment relics
- **Severity:** Low
- **File:** `index.html:33–34`
- **Description:** Two commented-out Bootstrap 5.3.0 `<link>` and `<script>` tags left in `<head>`. Dead markup with no purpose.
- **Status:** Open

---

### TD-06 — `constitution.html` references non-existent PDF path
- **Severity:** Medium
- **File:** `constitution.html:42`
- **Description:** `<iframe src="/assets/img/2025/constitution/Constitution_2025-2026.pdf">` — that path does not exist. The actual files are at `Constitution_2025-2026.pdf` (root) and `assets/img/Constitution_2023-2024.pdf`.
- **Status:** Open

---

## 2. Duplicate Code

### DC-01 — jQuery loaded twice on `index.html`
- **Severity:** High
- **Lines:** `index.html:22` (in `<head>`) and `index.html:553` (bottom of `<body>`)
- **Description:** jQuery 3.6.0 is loaded twice on the homepage. The second load reinitializes all registered handlers and increases page weight.
- **Status:** Open

---

### DC-02 — Two card-expand systems that conflict
- **Severity:** High
- **Files:** `assets/js/index.js` (FLIP animation, refs `#expand-overlay`) and `assets/js/activity-expand.js` (simple overlay, refs `#overlay`)
- **Description:** Both scripts are loaded on `index.html`. Neither `#expand-overlay` nor `#overlay` exist in `index.html`'s markup. Both systems are attempting to control "expand a card" behavior but use different element IDs, different animation strategies, and are never triggered because the "Learn More" buttons are commented out.
- **Status:** Open

---

### DC-03 — Duplicate image directory
- **Severity:** Medium
- **Paths:** `assets/img/2025/home/` and `assets/img/2025/join/home/`
- **Description:** The `join/home/` folder is an exact copy of `home/` — 8 files duplicated (appdev.jpg, home1.jpeg, home2.jpeg, logoneon8.png, member5.jpeg, members.JPG, shpetinas.jpeg, shpetinas4.jpeg, slide2.JPG). The `join/home/` copies are not referenced by any HTML file.
- **Status:** Open

---

### DC-04 — `#join-welcome` block copy-pasted across two files
- **Severity:** Low
- **Files:** `join.html` and `getinvolved.html`
- **Description:** The CSS for `#join-welcome` (background image, height, attachment, responsive override) is copy-pasted identically into the `<style>` blocks of both files. Any change must be made twice.
- **Status:** Open

---

### DC-05 — `fadeInUp` / `fadeUp` duplicate keyframe animations
- **Severity:** Low
- **Files:** `assets/css/my-styles.css:231` (`fadeInUp`) and `my-styles.css:242` (`fadeUp`)
- **Description:** Two `@keyframes` blocks with different names but identical from/to values. Both animate `opacity: 0 → 1` and `translateY(25px) → 0`. Referenced by different class names (`.fade-in-up` and `.fade-title`/`.fade-subtitle`/`.team-card`).
- **Status:** Open

---

### DC-06 — Repeated inline `li { font-size: 20px }` and `a { font-family }` declarations
- **Severity:** Low
- **Files:** `index.html`, `join.html`, `getinvolved.html` (each in their own `<style>` block)
- **Description:** The same `li { font-size: 20px }` and `a { font-family: 'Oswald' }` rules are hard-coded in multiple pages' inline `<style>` blocks. These belong in the shared CSS.
- **Status:** Open

---

### DC-07 — Google Fonts loaded twice on `index.html` and `join.html`
- **Severity:** Medium
- **Description:** Playfair Display and Oswald are requested in `<head>` and then again via a second `<link>` at the bottom of `<body>`. This triggers two separate font fetches for the same families.
- **Files:** `index.html:13–14`, `index.html:562–566`; `join.html:18–20`, `join.html:638–643`
- **Status:** Open

---

### DC-08 — Two separate App Dev pages
- **Severity:** Medium
- **Files:** `appdev.html` and `appdev2.html`
- **Description:** Both pages cover App Development content. `react-native-setup.html` links back to `appdev.html`, while the newer site architecture uses `appdev2.html`. One of these is dead weight.
- **Status:** Open

---

### DC-09 — Two SHPEtinas layouts for the same content
- **Severity:** Medium
- **Files:** `shpetinas.html` and `shpetinas_magazine.html`
- **Description:** Entirely separate HTML/CSS pages covering identical SHPEtinas content with different visual treatments. Neither is linked from the nav.
- **Status:** Open

---

## 3. Dead Code

### DE-01 — All three "Learn More" buttons on `index.html` are commented out
- **Severity:** High
- **File:** `index.html:134–136`, `164–166`, `186–189`
- **Description:** The three activity cards (App Dev, SHPEtinas, MinerSpark) exist visually but have no clickable destination. The anchor tags linking to `appdev2.html`, `shpetinas.html`, and `minerspark.html` are commented out. The cards are decorative dead ends.
- **Status:** Open

---

### DE-02 — `#fourth-slide` CSS defined for a non-existent slide
- **Severity:** Low
- **File:** `index.html:412–418`
- **Description:** CSS rule for `#fourth-slide` (background-image, height, sizing) exists in the inline `<style>`, but the carousel only has 3 `.carousel-item` elements. No `#fourth-slide` ever renders.
- **Status:** Open

---

### DE-03 — `index.js` (root level) targets non-existent `.shadow-div` elements
- **Severity:** Low
- **File:** `index.js` (root, not `assets/js/index.js`)
- **Description:** Adds mouse hover shadow effects to `.shadow-div` elements. This class exists in `style-shpe.css` but no current live page uses it. The script runs and registers handlers on every page but fires on nothing.
- **Status:** Open

---

### DE-04 — Large dead CSS blocks in `join.html` and `getinvolved.html`
- **Severity:** Medium
- **Description:** Both files contain CSS for IDs `#points-button`, `#shpe-button`, `#maes-button`, `#minetracker-button`, `#facebook-button`, `#slack-button`, `#internships-button`, `#coursera-button`, `#resume-button`. The HTML elements that these IDs targeted are all commented out. The CSS rules are orphaned.
- **Status:** Open

---

### DE-05 — `style-shpe.css` is almost entirely dead
- **Severity:** Medium
- **File:** `assets/css/style-shpe.css`
- **Description:** Contains `#eboard-welcome`, `.img-eboard`, `.who-are-we`, `#board-of-directors h2`, `#board-of-chairs h2`, `.shadow-div`. None of these selectors match any element on any current live page. Loaded by 5 pages.
- **Status:** Open

---

### DE-06 — `activity-expand.js` references a non-existent `#overlay` element
- **Severity:** Low
- **File:** `assets/js/activity-expand.js:2`
- **Description:** The script immediately queries `document.getElementById("overlay")`. No page has an element with `id="overlay"`. The script exits on line 5 via early return (`if (!overlay || !modal) return`), making the entire file a no-op.
- **Status:** Open

---

## 4. Unused Assets

### UA-01 — `assets/img/2025/appdev/utep_logos/` — 20 unused SVG files
- **Description:** A complete UTEP brand SVG collection (pickmarks, boxmarks, wordmarks, flat logos in every color). Referenced by nothing in the website HTML. These are assets for the mobile app's branding guide.
- **Status:** Open

---

### UA-02 — `assets/img/2024Event/` — 7 old event photos
- **Description:** Photos from 2024 events (athletics, general meetings, volunteering). Not referenced by any current page.
- **Status:** Open

---

### UA-03 — Unreferenced root-level images
- **Files:** `background.png`, `logoshpe2.png`, `logoshpe2 copy.png`, `prism.png`, `slackimage.jpeg`, `history.jpg`, `welcome.jpg`, `welcome2.jpg`, `table.jpg`, `shpe2023.jpeg`, `fall2023.jpeg`
- **Description:** Images present in `assets/img/` not referenced by any `.html` file. Likely from a previous version of the site.
- **Status:** Open

---

### UA-04 — `assets/img/Constitution_2023-2024.pdf`
- **Description:** Old constitution, superseded by `Constitution_2025-2026.pdf` (now at root level). Not referenced anywhere but still served.
- **Status:** Open

---

### UA-05 — `assets/img/2025/join/home/` — duplicate of `assets/img/2025/home/`
- **Description:** 8-file exact copy of the home image folder. Zero references in any HTML file.
- **Status:** Open (see also DC-03)

---

### UA-06 — 10 `.DS_Store` files committed to the repository
- **Description:** macOS metadata files present throughout `assets/img/`. Should be gitignored.
- **Status:** Open

---

### UA-07 — Placeholder images in `newsfeed.html` that don't exist
- **Files:** `newsfeed.html:57` (`placeholder-room.jpg`), `newsfeed.html:70` (`placeholder-portrait.jpg`)
- **Description:** Two `<img>` tags reference files that do not exist in `assets/img/`. Result: broken image icons on a page that is itself orphaned.
- **Status:** Open

---

## 5. Orphaned Pages

Pages that exist in the project but have no path to them from the navigation (and are not linked from any other live page):

| Page | Notes |
|---|---|
| `appdev.html` | Old App Dev page; linked from `react-native-setup.html` only |
| `resources.html` | Student resources; fully built, not in nav |
| `shpetinas.html` | SHPEtinas page; fully built, not in nav |
| `minerspark.html` | MinerSpark page; fully built, not in nav |
| `getinvolved.html` | Social media page; largely commented-out content |
| `constitution.html` | Old-style constitution page; broken PDF iframe |
| `newsfeed.html` | Editorial layout; two broken image references |
| `shpetinas_magazine.html` | Magazine layout duplicate of `shpetinas.html` |
| `react-native-setup.html` | Dev guide; links back to `appdev.html` (old page) |
| `branding-guide.html` | Mobile app branding; developer artifact, not for public |
| `app_structure.html` | Mobile app architecture doc; developer artifact |

---

## 6. Inconsistent Styling

### IS-01 — Two navy blue values used interchangeably
- **Values:** `#00254d` and `#041E42`
- **Description:** Both represent "UTEP Navy" with no documented rule about when to use which. They appear on the same page in different components. The difference is visible (~5% lightness difference).
- **Status:** Open

---

### IS-02 — Orange color case inconsistency
- **Values:** `#FF8200` (uppercase) and `#ff8200` (lowercase)
- **Description:** Same color, different casing. No functional difference but signals lack of a token system.
- **Status:** Open

---

### IS-03 — Large `<style>` blocks inside HTML files instead of shared CSS
- **Affected files:** `index.html` (2 blocks, ~250 lines), `join.html` (2 blocks, ~300 lines), `getinvolved.html` (2 blocks), `history.html` (1 block, ~190 lines), `Leadership.html` (1 block, ~120 lines), `resources.html` (1 block, ~185 lines), `shpetinas_magazine.html` (1 block, ~310 lines)
- **Description:** Page-specific styles are embedded inline rather than in external CSS files. Many rules across these blocks overlap or duplicate patterns already in `my-styles.css`.
- **Status:** Open

---

### IS-04 — Font loading inconsistency across pages
- **Description:** Each page independently requests different subsets of the same font families.
  - Some load Oswald + Playfair + Roboto + Mohave
  - Some load only Playfair + Oswald
  - Some load fonts in `<head>`, some at end of `<body>`
  - `history.html` loads `Mohave:wght@500` and `Roboto:wght@300;400;500` which no other page does
- **Status:** Open

---

### IS-05 — Bootstrap `.btn` overridden globally in `index.html`
- **File:** `index.html:298–314`
- **Description:** A `<style>` block inside `index.html` overrides Bootstrap's `.btn` class globally with `font-family: 'Playfair Display'`, `font-size: 1.5rem`, `padding: 16px 48px`, `border-radius: 50px`. This affects carousel call-to-action buttons. These overrides exist nowhere else, making the homepage buttons visually inconsistent with every other page.
- **Status:** Open

---

### IS-06 — `shpetinas.html` is missing `styles.css`
- **File:** `shpetinas.html` head section
- **Description:** Loads `my-styles.css`, `style-shpe.css`, and Bootstrap 5.3.3 — but does NOT load `styles.css`. As a result, it gets Bootstrap only from CDN (5.3.3), missing all Start Bootstrap theme customizations.
- **Status:** Open

---

### IS-07 — `minerspark.html` same issue as IS-06
- **File:** `minerspark.html` head section
- **Description:** Same CSS load order problem — missing `styles.css`.
- **Status:** Open

---

## 7. Accessibility Issues

### AC-01 — `index.html` missing `<!DOCTYPE html>`
- **Severity:** High
- **File:** `index.html:1`
- **Description:** File begins with `<html>` with no doctype declaration. Browser falls back to quirks mode, which can break layout and CSS behavior in unexpected ways.
- **Status:** Open

---

### AC-02 — Carousel controls placed outside the carousel container
- **Severity:** Medium
- **File:** `index.html:88–97`
- **Description:** The `<button class="carousel-control-prev">` and `<button class="carousel-control-next">` buttons appear after the closing `</div>` of `#carouselExampleControls` (line 98 has an extra `</div>`). Bootstrap's ARIA wiring (`aria-controls`) expects them inside the carousel wrapper.
- **Status:** Open

---

### AC-03 — `join.html` and `constitution.html` missing `lang` attribute
- **Severity:** Medium
- **Files:** `join.html:1`, `constitution.html:1`
- **Description:** `<html>` with no `lang="en"`. Screen readers cannot determine language.
- **Status:** Open

---

### AC-04 — Leadership cards not keyboard-accessible
- **Severity:** High
- **File:** `Leadership.html`
- **Description:** Leader cards are `<div>` elements with click event listeners (`data-leader-id` clicked via event delegation). No `tabindex`, no `role="button"`, no `aria-label`. Keyboard-only users cannot activate them.
- **Status:** Open

---

### AC-05 — `#86dc3d` green on white fails WCAG AA contrast
- **Severity:** High
- **Description:** The MAES green (`#86dc3d`) on a white background has a contrast ratio of approximately 2.9:1. WCAG AA requires 4.5:1 for normal text and 3:1 for large text (18pt / 14pt bold). Used in `.text-maes-green` and on various headings.
- **Status:** Open

---

### AC-06 — No skip-to-main-content link
- **Severity:** Medium
- **Description:** No skip navigation link exists in `header.html` or any page. Keyboard and screen reader users must tab through all nav items on every page.
- **Status:** Open

---

### AC-07 — Some `target="_blank"` links missing `rel="noopener noreferrer"`
- **Severity:** Low
- **Files:** `getinvolved.html`, `constitution.html`, older pages
- **Description:** External links opened in a new tab without `rel="noopener"` expose the site to reverse tab-nabbing. Newer pages (`join.html`, `resources.html`) already include it.
- **Status:** Open

---

### AC-08 — Images with empty or missing `alt` attributes
- **Severity:** Medium
- **Files:** `shpetinas.html` gallery images (three `<img>` with no `alt`), `minerspark.html` gallery images, `index.html:53` logo (`alt=""`)
- **Description:** Purely decorative images should have `alt=""` (correct), but functional images (leadership photos, gallery) need descriptive alt text.
- **Status:** Open

---

### AC-09 — Modal in `shpetinas.html` missing `aria-labelledby`
- **Severity:** Low
- **File:** `shpetinas.html:169`
- **Description:** `<div class="modal fade" id="shpetinasModal" aria-hidden="true">` has `aria-hidden` but no `aria-labelledby` pointing to the modal title. Same in `minerspark.html`.
- **Status:** Open

---

## 8. Responsiveness Issues

### RP-01 — `background-attachment: fixed` on `index.html` hero without mobile fallback
- **Severity:** High
- **File:** `index.html:389–394` (`#home-welcome`)
- **Description:** `background-attachment: fixed` renders incorrectly on iOS Safari (background disappears or shows white). `join.html` and `getinvolved.html` have the correct mobile fallback (`background-attachment: initial` at `max-width: 575.98px`). `index.html` does not.
- **Status:** Open

---

### RP-02 — Fixed `height: 400px` container in `index.html`
- **File:** `index.html:362–364` (`.container-center`)
- **Description:** `.container-center { height: 400px }` sets a fixed height on the carousel content container. On small screens the logo image can overflow or be clipped.
- **Status:** Open

---

### RP-03 — Mixed responsive column breakpoints on activity cards
- **File:** `index.html:117–194`
- **Description:** Three activity cards use inconsistent Bootstrap column classes:
  - Card 1: `col-xl-4 col-md-6 col-sm-12`
  - Card 2: `col-xl-4 col-md-6 col-sm-12`
  - Card 3: `col-lg-4 col-md-6` (no `sm` class)
  The third card will be full width at `sm` but the other two collapse differently. The row also closes prematurely — `</section>` is used instead of closing the `</div class="row">`.
- **Status:** Open

---

### RP-04 — `card-img-top { height: 15vw }` at small screens
- **File:** `index.html:376–379`
- **Description:** Card image height is tied to viewport width. At 375px width (iPhone SE), `15vw` = ~56px — far too short to display any meaningful image content.
- **Status:** Open

---

### RP-05 — Carousel hero height is fixed at 600px
- **File:** `index.html` (inline `<style>` blocks for `#home-welcome`, `#second-slide`, `#third-slide`, `#fourth-slide`)
- **Description:** All carousel slides have `height: 600px` with no responsive override. On mobile, text content may overflow or be cut off.
- **Status:** Open

---

## 9. Performance Bottlenecks

### PF-01 — Bootstrap CSS loaded twice on most pages
- **Severity:** High
- **Description:** `styles.css` bundles Bootstrap 5.1.3 (~9,000 lines). Any page that also loads Bootstrap from CDN downloads Bootstrap twice. Total redundant CSS download: ~25–30KB gzipped per affected page.
- **Status:** Open (see TD-02)

---

### PF-02 — No image optimization
- **Severity:** High
- **Description:** All images are `.jpeg`/`.JPG`/`.PNG`. No `.webp` or `.avif` alternatives exist. No `srcset` or `sizes` attributes for responsive delivery. Leadership headshots are served at full resolution for 150×150px display targets. Some image filenames contain spaces (`"Presi and vps.JPG"`, `"first general meeting.jpeg"`), which require URL encoding and can cause issues.
- **Status:** Open

---

### PF-03 — Render-blocking scripts in `<head>` without `defer`
- **Severity:** Medium
- **Description:** Bootstrap JS bundle and jQuery are loaded as synchronous `<script>` tags in `<head>`. These block HTML parsing until downloaded and executed. Adding `defer` or moving them before `</body>` would improve First Contentful Paint.
- **Status:** Open

---

### PF-04 — Multiple CDN origins per page
- **Severity:** Medium
- **Description:** Each page initiates connections to 5–7 separate CDN origins: `fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.jsdelivr.net` (×2), `code.jquery.com`, `cdnjs.cloudflare.com`. Each requires a separate DNS lookup + TLS handshake.
- **Status:** Open

---

### PF-05 — Google Fonts requested without `display=swap`
- **Severity:** Low
- **Description:** Some font `<link>` tags are missing `&display=swap` parameter, which causes invisible text during font load (FOIT) instead of showing fallback text immediately (FOUT).
- **Status:** Open

---

### PF-06 — No lazy loading on carousel hero images
- **Severity:** Low
- **File:** `index.html` carousel
- **Description:** The second and third carousel slides (`#second-slide`, `#third-slide`) load their background images eagerly via CSS `background-image`. There is no lazy loading mechanism; all three 600px-tall hero backgrounds are fetched immediately.
- **Status:** Open

---

### PF-07 — 10 `.DS_Store` files served in the repository
- **Severity:** Low
- **Description:** macOS system metadata files are committed and would be served if the directory is browsable. Should be added to `.gitignore`.
- **Status:** Open

---

### PF-08 — `styles.css` is 11,130 lines (no minification, no purging)
- **Severity:** Medium
- **Description:** The CSS file contains the full Bootstrap source, full Start Bootstrap theme source, and all custom overrides. No unused CSS has been purged. Estimated unused rules: >80% of the file.
- **Status:** Open
