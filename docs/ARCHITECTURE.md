# ARCHITECTURE.md — UTEP SHPE//MAES Website Architecture

> Documents the current structure of the site and the target architecture for the redesign.

---

## Current Architecture

### Type
Static multi-page website. No framework, no build system, no package manager.

### Folder Structure

```
website/
├── index.html                  # Homepage
├── history.html                # About / History
├── Leadership.html             # Leadership team
├── join.html                   # Membership & committees
├── resources.html              # Student resources (orphaned)
├── shpetinas.html              # SHPEtinas subgroup (orphaned)
├── minerspark.html             # MinerSpark program (orphaned)
├── appdev2.html                # App Dev program (orphaned)
├── appdev.html                 # OLD App Dev page (orphaned)
├── getinvolved.html            # Social media (orphaned)
├── constitution.html           # Constitution / old-style (orphaned)
├── newsfeed.html               # Editorial layout (orphaned, broken images)
├── shpetinas_magazine.html     # Magazine SHPEtinas duplicate (orphaned)
├── react-native-setup.html     # React Native setup guide (dev artifact)
├── branding-guide.html         # Mobile app branding (dev artifact)
├── app_structure.html          # App structure doc (dev artifact)
├── footer.html                 # Footer partial (loaded via jQuery)
├── header.html                 # Navbar partial (loaded via jQuery)
├── favicon.png                 # Site favicon
├── index.js                    # Root-level jQuery shadow effects (dead)
├── Constitution_2025-2026.pdf  # Chapter constitution
│
├── assets/
│   ├── css/
│   │   ├── styles.css          # 11,130-line bundle: Bootstrap 5.1.3 + Start Bootstrap theme
│   │   ├── my-styles.css       # 569-line sitewide custom overrides
│   │   ├── style-shpe.css      # 65-line old eboard CSS (largely dead)
│   │   └── newsfeed.css        # 69-line editorial layout (only orphaned pages)
│   │
│   ├── js/
│   │   ├── index.js            # FLIP card expand + navbar scroll + active link + mobile menu
│   │   └── activity-expand.js  # Overlay card expand (dead — #overlay doesn't exist)
│   │
│   ├── docs/
│   │   └── AppDevKickoff.pdf   # App Dev onboarding doc
│   │
│   └── img/
│       ├── websiteHeader.png           # Navbar logo
│       ├── logoWfooter.png             # Footer logo
│       ├── favicon.png                 # Duplicate favicon
│       ├── Constitution_2023-2024.pdf  # Old constitution (unused)
│       │
│       ├── 2025/
│       │   ├── home/           # Homepage images
│       │   ├── leadership/
│       │   │   ├── Faces/      # Leader headshots (21 photos)
│       │   │   └── team.JPG    # Leadership hero
│       │   ├── appdev/
│       │   │   ├── utep_logos/ # 20 UTEP SVG logos (unused on website)
│       │   │   └── *.jpeg/png  # App dev mockup screenshots
│       │   ├── sponsers/       # Sponsor logos (note: misspelled folder)
│       │   ├── history/        # About page images
│       │   ├── shpetinas/      # SHPEtinas event photos
│       │   ├── resources/      # Resources hero image
│       │   └── join/
│       │       ├── home/       # DUPLICATE of 2025/home/ (8 files, unused)
│       │       ├── get_involved.JPG
│       │       └── join3.jpeg
│       │
│       ├── 2024Event/          # Old 2024 event photos (unused)
│       ├── Convention24/       # Convention photos (still in use by some pages)
│       └── [root-level old images]  # ~15 old images, most unused
```

### Routing Model
All routing is filesystem-based. Every URL maps to a `.html` file. There is no client-side router, no server-side routing, and no redirect logic.

### Header / Footer Loading
Both `header.html` and `footer.html` are injected into every page at runtime via jQuery:
```js
$(function () {
  $("#page-header").load("header.html");
  $("#page-footer").load("footer.html");
});
```
This means the page renders without a header/footer until jQuery fires, causing a layout flash on every load. It also means the active nav link detection must run after `header.html` is injected (handled in `assets/js/index.js`).

### External Dependencies (current)

| Dependency | Version | Loaded via |
|---|---|---|
| Bootstrap CSS | 5.1.3 (bundled in styles.css) | Local file |
| Bootstrap CSS | 5.3.3 | CDN (newer pages) |
| Bootstrap JS | 5.1.3 | CDN (older pages) |
| Bootstrap JS | 5.3.3 | CDN (newer pages) |
| jQuery | 3.6.0 | CDN (every page) |
| Bootstrap Icons | 1.4.1 | CDN (every page) |
| Font Awesome | 6.0.0-beta2 | CDN (older pages) |
| Font Awesome | 6.5.0 | CDN (newer pages) |
| Google Fonts | varies | CDN (every page) |

### Navigation (current)
Three links only: About (`history.html`), Leadership (`Leadership.html`), Join (`join.html`).

All other built pages — resources, shpetinas, minerspark, appdev, constitution — are not reachable from the nav.

---

## Page Inventory

### Pages in Navigation

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero carousel, activity cards, calendar, sponsors |
| About | `history.html` | Org history, mission/vision, pillars, demographics |
| Leadership | `Leadership.html` | JS-rendered leader cards + click-to-open modal |
| Join | `join.html` | 3-step join process + committee accordion cards |

### Pages Built but Orphaned

| Page | File | Status |
|---|---|---|
| Resources | `resources.html` | Complete, polished — ready to add to nav |
| SHPEtinas | `shpetinas.html` | Complete — needs nav link |
| MinerSpark | `minerspark.html` | Complete — placeholder lead data |
| App Dev | `appdev2.html` | Complete — needs nav link |
| Get Involved | `getinvolved.html` | Mostly commented out, old style |
| Constitution | `constitution.html` | Old style, broken PDF path |
| Newsfeed | `newsfeed.html` | Broken images, editorial layout |
| SHPEtinas Magazine | `shpetinas_magazine.html` | Duplicate of shpetinas.html content |

### Developer Artifacts (not for public)

| File | Purpose |
|---|---|
| `react-native-setup.html` | App Dev onboarding guide |
| `branding-guide.html` | Mobile app brand reference |
| `app_structure.html` | Mobile app architecture visual |

---

## JavaScript Architecture

### `assets/js/index.js`
Two distinct behaviors in a single file:

**1. FLIP Card Animation (lines 1–143)**
- Listens for clicks on `.expand-open-btn` inside `.js-expand-card` elements
- Animates card from its grid position into a full-screen modal overlay using the FLIP technique
- Requires `#expand-overlay` element in the DOM (not currently present on any page)
- Also handles ESC key to close, click-outside-to-close, and a flip/back face toggle

**2. Navbar Behavior (lines 144–190)**
- Adds `.is-scrolled` to `.shpe-navbar` after 12px of scroll
- Detects current page from `location.pathname` and adds `.active` class to the matching nav link
- On mobile, closes the nav collapse when a link is clicked

### `assets/js/activity-expand.js`
- Listens for clicks on `.js-expand` buttons inside `.activity-card` elements
- Adds `.expanded` class to the card and shows `#overlay`
- Neither `#overlay` nor `.js-expand` buttons exist on any current page
- Dead code

### `index.js` (root level)
- jQuery shadow hover effects on `.shadow-div`
- `.shadow-div` class does not appear on any live page
- Dead code

---

## CSS Architecture

### Load Order (most pages)
```
1. Bootstrap 5.x (CDN) — or bundled in styles.css
2. Bootstrap Icons (CDN)
3. Font Awesome (CDN)
4. assets/css/styles.css  — Bootstrap 5.1.3 bundle + Start Bootstrap theme
5. assets/css/my-styles.css — sitewide custom overrides
6. assets/css/style-shpe.css — old eboard CSS (some pages)
7. assets/css/newsfeed.css — editorial layout (orphaned pages only)
8. <style> block in the HTML file itself — page-specific inline styles
```

The cascade is chaotic because (a) Bootstrap is loaded twice on newer pages, (b) the specificity ordering between `my-styles.css` and inline `<style>` blocks is inconsistent, and (c) `my-styles.css` itself has three competing `body { padding-top }` rules.

### CSS Responsibilities (current, informal)

| File | Intended role | Actual state |
|---|---|---|
| `styles.css` | Base theme | Bundled Bootstrap + theme; most rules unused |
| `my-styles.css` | Sitewide custom | Mixed: navbar, footer, animations, sponsor marquee, some dead rules |
| `style-shpe.css` | Old about/eboard | Almost entirely dead |
| `newsfeed.css` | Editorial layout | Only used by orphaned pages |
| `<style>` in HTML | Page-specific | Overused; contains site-wide patterns that belong in shared CSS |

---

## Data Model

### Leadership Data
All leader data is hard-coded as a JavaScript object literal (`LEADERS`) in `Leadership.html`. Structure:

```js
LEADERS = {
  exec: [ { id, name, role, major, img, linkedin, qa: { question: answer } } ],
  directors: [ ... ],
  chairs: [ ... ]
}
```

No external data source. To add/update a leader, the HTML file must be edited directly.

### Sponsors
Sponsor logos are hard-coded HTML in `index.html` (duplicate set for the marquee animation). No data structure.

### Events
Google Calendar embedded as an `<iframe>` — no data management needed.

---

## Target Architecture (for the redesign)

### What stays the same
- Static HTML files (no framework required for this scale)
- Bootstrap as the layout/component foundation
- jQuery for header/footer loading (until a better solution is chosen)
- The existing URL structure (`history.html`, `Leadership.html`, etc.)

### What needs to change

**Dependency unification:**
- Single Bootstrap version (5.3.3) everywhere
- Single Font Awesome version (6.5.0)
- Bootstrap CSS loaded only from CDN (remove from `styles.css` or replace `styles.css` entirely)

**CSS consolidation:**
- Eliminate `<style>` blocks inside HTML files — move to `my-styles.css` or page-specific CSS files
- Establish CSS custom properties for brand tokens (see `DESIGN_SYSTEM.md`)
- Delete or replace `styles.css` with a lean custom CSS file + CDN Bootstrap

**Navigation expansion:**
- Add Resources, SHPEtinas, MinerSpark, App Dev to nav (dropdown or expanded nav)

**Image pipeline:**
- Convert photos to WebP with JPEG fallback
- Add `srcset` for responsive images
- Standardize filename casing (all lowercase, no spaces)

**Accessibility baseline:**
- Add `<!DOCTYPE html>` and `lang="en"` to all pages
- Add skip-to-main-content link in header
- Make leader cards keyboard-accessible
- Fix carousel markup structure

**Dead code removal:**
- Delete `style-shpe.css` (or keep only `.shadow-div` if needed)
- Delete `assets/js/activity-expand.js`
- Delete root-level `index.js`
- Remove `#overlay`, `#expand-overlay` references or wire them properly
