# MIGRATION_PLAN.md — UTEP SHPE//MAES Redesign Migration Plan

> Step-by-step plan for moving the site from its current state to a clean, consistent, accessible, and performant version. Organized into phases. Each phase can ship independently.

---

## Guiding Principles

1. **No regressions.** Every phase leaves the site in a better state than before. Nothing working today should break.
2. **Smallest safe change.** Don't refactor more than what's in scope for a phase.
3. **Pages in the nav are highest priority.** Orphaned pages can be fixed later.
4. **Shared resources first.** Fix `header.html`, `footer.html`, and the CSS files before touching individual pages — changes cascade everywhere.
5. **Document as you go.** Update `AUDIT.md` to mark issues resolved.

---

## Phase 0 — Repository Hygiene
*Estimated effort: 30 minutes. No visual changes.*

### Goals
Clean up dead files, committed system files, and broken references before any code changes.

### Tasks

- [ ] Add `.gitignore` with `.DS_Store`, `*.DS_Store`, and `Thumbs.db`
- [ ] Delete the 10 `.DS_Store` files already committed
- [ ] Delete `index.js` from the project root (dead jQuery shadow-div code; see AUDIT DE-03)
- [ ] Delete `assets/img/2025/join/home/` — duplicate of `assets/img/2025/home/` (see AUDIT DC-03, UA-05)
- [ ] Delete `assets/img/Constitution_2023-2024.pdf` — superseded (see AUDIT UA-04)
- [ ] Rename `assets/img/2025/sponsers/` → `assets/img/2025/sponsors/` and update all references in `index.html` and `my-styles.css`
- [ ] Rename image files with spaces in names to use hyphens (affects `"Presi and vps.JPG"`, `"first general meeting.jpeg"`)

---

## Phase 1 — Foundation: Shared Dependencies
*Estimated effort: 2–3 hours. Low visual change risk. Affects every page.*

### Goals
Unify Bootstrap version, Font Awesome version, and jQuery loading across all pages. Eliminate double-loading.

### Tasks

**Bootstrap unification:**
- [ ] Replace bundled `assets/css/styles.css` (11,130 lines) with a lean custom CSS file (`assets/css/base.css`) containing only actual custom rules
- [ ] Load Bootstrap 5.3.3 CSS from CDN on every page (the single source of Bootstrap)
- [ ] Remove all CDN Bootstrap 5.1.3 references
- [ ] Remove all CDN Bootstrap 5.3.0 references (commented-out relics in `index.html`)
- [ ] Update Bootstrap JS to 5.3.3 on all pages that still reference 5.1.3

**Font Awesome unification:**
- [ ] Replace all `font-awesome/6.0.0-beta2` CDN links with `6.5.0`
- [ ] Verify all icon class names work in 6.5.0 (beta icons may differ)

**jQuery:**
- [ ] Remove duplicate jQuery `<script>` from bottom of `index.html:553`
- [ ] Move all jQuery `<script>` tags to end of `<body>` (before `</body>`) with `defer` handling

**`scripts.js` (AUDIT TD-01):**
- [ ] Either create `assets/js/scripts.js` as an empty file (stops the 404) or remove all 5 references to it
- [ ] Decision: remove references — no known behavior depends on it

**Fonts:**
- [ ] Standardize to the single Google Fonts request defined in `DESIGN_SYSTEM.md`
- [ ] Remove all per-page duplicate/partial font requests
- [ ] Remove `Mohave` from all font requests

### Verification
After Phase 1, each page should:
- Load Bootstrap CSS exactly once (from CDN)
- Load Font Awesome exactly once (6.5.0)
- Load jQuery exactly once
- Load fonts exactly once
- Get no 404 errors in the browser Network tab

---

## Phase 2 — CSS Consolidation
*Estimated effort: 3–4 hours. Moderate risk — touch `my-styles.css` carefully.*

### Goals
Establish CSS custom properties. Move shared patterns out of inline `<style>` blocks. Delete dead CSS files.

### Tasks

**CSS custom properties:**
- [ ] Add the full `:root { ... }` token block from `DESIGN_SYSTEM.md` to the top of `my-styles.css`
- [ ] Replace hardcoded `#041E42`, `#00254d`, `#FF8200`, `#86DC3D`, `#F9FAFB`, `#0f172a` with `var(--color-*)` throughout `my-styles.css`
- [ ] Remove `#00254d` entirely — standardize on `#041E42` for navy

**`body { padding-top }` cleanup (AUDIT TD-04):**
- [ ] Remove the `padding-top: 125px` rule at `my-styles.css:2`
- [ ] Remove the `padding-top: 72px` rule at `my-styles.css:502`
- [ ] Keep only `body { padding-top: 92px; }` as the single canonical rule

**Move shared patterns from inline `<style>` to `my-styles.css`:**
- [ ] `.activity-card` and related tag classes (currently in `index.html`)
- [ ] `.section-soft` utility class (replaces `style="background:#F9FAFB"` inline)
- [ ] `.page-hero` base pattern (currently redefined per-page)
- [ ] `.title` class (defined in 3 pages with slightly different values)
- [ ] `li { font-size }` and `a { font-family }` declarations (repeated in 3 pages)

**Dead CSS removal:**
- [ ] Delete `assets/css/style-shpe.css` (AUDIT DE-05) — or audit each rule: only keep anything actually used, move to `my-styles.css`
- [ ] Keep `assets/css/newsfeed.css` only if `newsfeed.html` or `shpetinas_magazine.html` will be kept in the redesign; otherwise delete

**Inactive `<style>` blocks cleanup:**
- [ ] `index.html`: Remove CSS for `#fourth-slide`, `#points-button`, and any other dead IDs
- [ ] `join.html`: Remove CSS for all commented-out button IDs (`#shpe-button`, `#maes-button`, etc.)
- [ ] `getinvolved.html`: Same as above

---

## Phase 3 — Structural HTML Fixes
*Estimated effort: 2 hours. Fixes bugs, no visual change.*

### Goals
Fix structural HTML errors that cause broken behavior or accessibility failures.

### Tasks

**`index.html`:**
- [ ] Add `<!DOCTYPE html>` to line 1 (AUDIT AC-01)
- [ ] Fix carousel: move `<button class="carousel-control-prev/next">` inside the `#carouselExampleControls` div (AUDIT AC-02)
- [ ] Fix activity card grid: change `</section>` on line 196 to `</div>` (malformed row close)
- [ ] Standardize column classes on activity cards (`col-xl-4 col-md-6 col-sm-12` for all three)
- [ ] Replace inline `.container-center { height: 400px }` with `min-height: 400px` (AUDIT RP-02)
- [ ] Add `background-attachment: scroll` mobile fallback to `#home-welcome` (AUDIT RP-01)
- [ ] Remove jQuery double-load (AUDIT DC-01) — done in Phase 1

**`join.html`:**
- [ ] Add `lang="en"` to `<html>` tag (AUDIT AC-03)

**`constitution.html`:**
- [ ] Add `lang="en"` to `<html>` tag
- [ ] Fix PDF path in `<iframe>` — change `/assets/img/2025/constitution/Constitution_2025-2026.pdf` to `Constitution_2025-2026.pdf` (AUDIT TD-06)

**`header.html`:**
- [ ] Move `<link rel="icon">`, `<link rel="apple-touch-icon">`, and `<meta name="theme-color">` out of `header.html` and into each individual page's `<head>` (they shouldn't be in a body-injected partial)

**All pages:**
- [ ] Verify each page has `<!DOCTYPE html>`, `<html lang="en">`, and `<meta name="description">`
- [ ] Audit for `target="_blank"` links without `rel="noopener noreferrer"` (AUDIT AC-07)

---

## Phase 4 — Navigation Expansion
*Estimated effort: 1–2 hours. High visibility change.*

### Goals
Add all ready pages to the navigation so users can reach them.

### Decision required: nav structure
The current nav has 3 links. Options for expanding:
- **Option A:** Flat expanded nav (5–6 links, no dropdown)
- **Option B:** Dropdown menu — "Programs" contains App Dev, SHPEtinas, MinerSpark
- **Option C:** Add a secondary "Programs" page as a landing hub

**Recommendation:** Option B. Keeps nav scannable; avoids a 6-item flat bar.

### Proposed Structure
```
About | Leadership | Programs ▾ | Resources | Join
                      └── App Dev
                      └── SHPEtinas
                      └── MinerSpark
```

### Tasks
- [ ] Add Bootstrap dropdown to `header.html` for "Programs"
- [ ] Add links: `appdev2.html`, `shpetinas.html`, `minerspark.html` inside dropdown
- [ ] Add `resources.html` as a direct nav link
- [ ] Update active-link detection in `index.js` to handle dropdown items
- [ ] Test mobile collapse behavior with new dropdown structure

---

## Phase 5 — Dead Code Removal
*Estimated effort: 1 hour. No visual change.*

### Goals
Remove orphaned JavaScript and HTML that serves no purpose.

### Tasks
- [ ] Delete `assets/js/activity-expand.js` (AUDIT DE-06, DC-02) — dead, `#overlay` doesn't exist
- [ ] Remove `<script src="assets/js/activity-expand.js">` from `index.html:560`
- [ ] Evaluate `assets/js/index.js` FLIP card system: if the expand-card feature is NOT being built, remove lines 1–143; keep only lines 144–190 (navbar behavior)
- [ ] Wire up or delete the FLIP card expand system (the "Learn More" buttons in `index.html` are commented out — commit to one direction)
- [ ] Remove commented-out `<!-- <a href="appdev2.html" class="read-more-btn"> -->` blocks in `index.html` **after** deciding whether to restore or remove them
- [ ] Remove `#fourth-slide` CSS from `index.html` (no fourth slide exists)

---

## Phase 6 — Accessibility Pass
*Estimated effort: 3–4 hours.*

### Goals
Achieve WCAG 2.1 AA compliance on all pages currently in the navigation.

### Tasks

**Global:**
- [ ] Add skip-to-main-content link to `header.html`: `<a class="skip-link" href="#main-content">Skip to main content</a>` (AUDIT AC-06)
- [ ] Add CSS for `.skip-link` (visually hidden until focused)
- [ ] Add `id="main-content"` to `<main>` element on each page

**Leadership page:**
- [ ] Add `role="button"` and `tabindex="0"` to each `.leader-card` (AUDIT AC-04)
- [ ] Add `keydown` listener for Enter/Space → trigger modal (same as click)
- [ ] Add `aria-label="${leader.name}, ${leader.role} — click for details"` to each card

**Carousel:**
- [ ] Add pause button to carousel (WCAG 2.2.2)
- [ ] Add `aria-label` to each carousel slide

**Modals:**
- [ ] Add `aria-labelledby` to `#shpetinasModal` and `#minersparkModal` pointing to `.modal-title` (AUDIT AC-09)

**Color contrast:**
- [ ] Audit all uses of `#86DC3D` as text color — either darken to `#5B9E1A` or change to decorative-only use (AUDIT AC-05)
- [ ] Audit `.text-muted` (`#6C757D`) on soft backgrounds — verify still passes 4.5:1

**Images:**
- [ ] Add descriptive `alt` text to leadership headshots used in gallery contexts (AUDIT AC-08)
- [ ] Add `alt=""` to purely decorative images

---

## Phase 7 — Performance Optimization
*Estimated effort: 4–6 hours.*

### Goals
Reduce page weight, eliminate render-blocking resources, and improve image loading.

### Tasks

**Images:**
- [ ] Convert all `.jpeg`/`.JPG`/`.PNG` images to `.webp` with JPEG/PNG fallbacks using `<picture>` elements
- [ ] Add `width` and `height` attributes to all `<img>` tags to prevent layout shift (CLS)
- [ ] Add `srcset` and `sizes` for responsive image delivery on leadership headshots and hero images
- [ ] Convert large hero backgrounds from CSS `background-image` to `<img>` with `loading="eager"` (first slide) / `lazy` (others) where possible
- [ ] Standardize all image filenames to lowercase with hyphens (no spaces, no uppercase extensions)

**Fonts:**
- [ ] Add `font-display: swap` to all Google Font requests (AUDIT PF-05) — already present via `&display=swap` param, verify all requests include it

**Scripts:**
- [ ] Add `defer` to all `<script>` tags that are not inline (AUDIT PF-03)

**CSS:**
- [ ] Confirm `styles.css` is fully replaced by Phase 1 work — if so, delete it

**Caching / CDN:**
- [ ] All CDN resources already use versioned URLs — no action needed for cache-busting

**Lazy loading:**
- [ ] Add `loading="lazy"` to iframe (Google Calendar) (AUDIT PF-06)

---

## Phase 8 — Orphaned Pages: Decide & Clean Up
*Estimated effort: 2–4 hours depending on decisions.*

### Goals
Resolve the orphaned page problem. Each page gets one of three fates.

### Decision Matrix

| Page | Recommendation | Rationale |
|---|---|---|
| `resources.html` | **Keep & add to nav** | Fully built and polished |
| `shpetinas.html` | **Keep & add to nav** | Complete, just needs a link |
| `minerspark.html` | **Keep, update placeholder data, add to nav** | Needs real lead names/photos |
| `appdev2.html` | **Keep & add to nav** | Complete |
| `appdev.html` | **Delete** | Superseded by appdev2.html |
| `getinvolved.html` | **Delete or merge into join.html** | Mostly commented out, social links can go in footer |
| `constitution.html` | **Simplify or delete** | Broken, old-style, constitution PDF already in resources.html |
| `newsfeed.html` | **Delete** | Broken images, no defined purpose |
| `shpetinas_magazine.html` | **Delete** | Duplicate of shpetinas.html with different visual treatment |
| `react-native-setup.html` | **Move to /docs or keep as internal link** | Useful for app dev team; not a public nav item |
| `branding-guide.html` | **Move to /docs** | Developer artifact |
| `app_structure.html` | **Move to /docs** | Developer artifact |

### Tasks
- [ ] Complete Phase 4 (nav expansion) first
- [ ] Delete pages marked for deletion
- [ ] Update `react-native-setup.html` link in `appdev2.html` to reflect new location
- [ ] Audit all internal links across the site after deletions

---

## Phase 9 — Content Updates
*Separate from technical work — assign to content team.*

### Known Content Issues
- [ ] MinerSpark leads: "Liz" has no last name, "Add Lead Name" placeholder still present, `href="#"` LinkedIn links, `aleidadev5.JPEG` used as Liz's photo
- [ ] Internship resource card links to `Summer2024-Internships` GitHub list but title says "Summer 2026"
- [ ] `newsfeed.html` has two broken placeholder image references (`placeholder-room.jpg`, `placeholder-portrait.jpg`)
- [ ] Some leadership Q&A fields are empty (`natalia`, `steven` have empty `qa` objects)
- [ ] `shpetinas.html` lead section: "DUPLICATE FOR OTHER LEADS" comment left in production markup
- [ ] `minerspark.html` gallery caption: "swap these with cohort photos, workshops, and poster sessions" left in production markup
- [ ] `appdev2.html`: "We'll get you onboarded" sentence is unfinished

---

## Sequencing Summary

| Phase | What it fixes | Risk | Dependency |
|---|---|---|---|
| 0 | File hygiene | None | None |
| 1 | Dependency unification | Low | Phase 0 |
| 2 | CSS consolidation | Medium | Phase 1 |
| 3 | HTML structure bugs | Low | Phase 1 |
| 4 | Nav expansion | Low-Medium | Phases 1–3 |
| 5 | Dead code removal | Low | Phase 4 |
| 6 | Accessibility | Low | Phase 3 |
| 7 | Performance | Medium | Phases 1–2 |
| 8 | Orphaned pages | Low | Phase 4 |
| 9 | Content | None | Any phase |

Phases 0–3 can be done sequentially in one sitting. Phase 4 requires a design decision (nav structure). Phases 5–9 can be done in any order after Phase 4.
