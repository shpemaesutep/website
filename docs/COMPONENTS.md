# COMPONENTS.md — UTEP SHPE//MAES Component Catalog

> Every reusable UI pattern in the site. Documents current implementation (what exists now) and target implementation (what it should become). Use this before building anything new — check if a component already exists.

---

## Table of Contents

1. [Layout: Navbar](#1-navbar)
2. [Layout: Footer](#2-footer)
3. [Layout: Page Hero](#3-page-hero)
4. [Layout: Section Wrapper](#4-section-wrapper)
5. [Cards: Activity Card](#5-activity-card)
6. [Cards: Leader Card](#6-leader-card)
7. [Cards: Resource Card](#7-resource-card)
8. [Cards: Pillar Card](#8-pillar-card)
9. [Cards: Committee Card](#9-committee-card)
10. [Cards: Join Step Card](#10-join-step-card)
11. [Cards: Team Card (SHPEtinas / MinerSpark)](#11-team-card)
12. [Interactive: Sponsor Marquee](#12-sponsor-marquee)
13. [Interactive: Leader Modal](#13-leader-modal)
14. [Interactive: Carousel](#14-hero-carousel)
15. [Interactive: Collapse / Accordion](#15-collapse--accordion)
16. [Decorative: Tags / Badges](#16-tags--badges)
17. [Decorative: Section Pills](#17-section-pills)
18. [Data: Google Calendar Embed](#18-google-calendar-embed)
19. [Navigation: Active Link Detection](#19-active-link-detection)
20. [Animation: Scroll Reveal](#20-scroll-reveal)

---

## 1. Navbar

### Current Implementation
- **File:** `header.html`
- **CSS:** `assets/css/my-styles.css` (lines 371–498)
- **JS:** `assets/js/index.js` (lines 144–190)
- **Class:** `.shpe-navbar` (Bootstrap `.navbar.navbar-expand-lg.fixed-top`)

**Structure:**
```html
<nav class="navbar navbar-expand-lg fixed-top shpe-navbar">
  <div class="container px-4">
    <a class="navbar-brand" href="index.html">
      <img src="assets/img/websiteHeader.png" class="navbar-logo">
    </a>
    <button class="navbar-toggler" ...>
    <div class="collapse navbar-collapse" id="mainNavbar">
      <ul class="navbar-nav ms-auto align-items-lg-center">
        <li class="nav-item"><a class="nav-link" href="history.html">About</a></li>
        <li class="nav-item"><a class="nav-link" href="Leadership.html">Leadership</a></li>
        <li class="nav-item"><a class="nav-link" href="join.html">Join</a></li>
      </ul>
    </div>
  </div>
</nav>
```

**Behaviors:**
- Glassmorphism background (`backdrop-filter: blur(12px)`)
- Shrinks on scroll: JS adds `.is-scrolled` at `12px` depth → logo shrinks `48px → 42px`, padding tightens
- Link hover: orange underline animation via `::after` pseudo-element (`scaleX(0) → scaleX(1)`)
- Active page: JS adds `.active` class by comparing `location.pathname` to `href`
- Mobile: collapses to hamburger, panel has frosted-glass appearance

**Known Issues:**
- Only 3 nav links — many built pages are unreachable
- `body { padding-top: 92px }` in `my-styles.css` offsets the fixed navbar (overrides an earlier 125px and 72px rule in the same file)
- `header.html` injects its own `<link>` for favicon/theme-color — these should be in the page `<head>` instead

**Target:**
- Add dropdown or expanded nav to include Resources, SHPEtinas, MinerSpark, App Dev
- Clean up the triple `body { padding-top }` declarations
- Move favicon/theme-color meta out of header partial and into page heads

---

## 2. Footer

### Current Implementation
- **File:** `footer.html`
- **CSS:** `assets/css/my-styles.css` (lines 294–370)
- **JS:** Inline `<script>` in `footer.html` (auto-populates copyright year)

**Structure:** 3-column grid (logo | social icons | contact email), divider, copyright bar.

**Social links:** Instagram, Facebook, LinkedIn
**Contact:** `maesshpe@utep.edu`

**Known Issues:**
- Footer blurb paragraph is commented out (`<!-- <p class="footer-text"> ... -->`) — empty logo column
- No nav links / sitemap in footer
- Font Awesome and `footer.html` both must be loaded for icons to render — if FA fails, icons are blank

**Target:**
- Add brief org description or secondary nav links to the logo column
- Verify Font Awesome loads before footer injection

---

## 3. Page Hero

### Variants in use

| Variant | Pages | Pattern |
|---|---|---|
| **Carousel hero** | `index.html` | Bootstrap carousel, 3 slides, 600px tall, full-bleed |
| **Static full-bleed** | `join.html`, `getinvolved.html` | Fixed-height div with `background-attachment: fixed` |
| **Centered text hero** | `history.html`, `resources.html`, `Leadership.html`, `appdev2.html`, `shpetinas.html`, `minerspark.html` | `min-height: 390–560px`, flex center, dark overlay |

### Current Issues
- No consistent hero component — every page rolls its own inline CSS
- `background-attachment: fixed` on `index.html` and `getinvolved.html` breaks on iOS Safari with no mobile fallback (join.html has the fallback; index does not)
- `join.html` hero: `height: 700px` (unusually tall), text only says "BECOME A MEMBER!" — wasted space
- Fixed `height: 600px` on carousel slides causes overflow on small screens

### Target Hero Pattern
```html
<section class="page-hero" style="--hero-img: url('assets/img/...')">
  <div class="container text-center text-white">
    <h1 class="hero-title">Page Title</h1>
    <p class="hero-subtitle">Supporting line</p>
  </div>
</section>
```
```css
.page-hero {
  min-height: 420px;
  background: linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), var(--hero-img) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 575.98px) {
  .page-hero { background-attachment: scroll; }
}
```

---

## 4. Section Wrapper

### Patterns used

| Pattern | Class/markup | Usage |
|---|---|---|
| Light section | `<section class="py-5 bg-light">` | Alternating background sections |
| White section | `<section class="py-5 bg-white">` | Default |
| Soft background | `<section class="py-5" style="background:#F9FAFB">` | Inline — should be a class |
| Bordered bottom | `<section class="bg-light py-5 border-bottom">` | Events/sponsors on homepage |

**Target:** Define `.section-soft { background: var(--color-soft-bg); }` and `.section-white` — eliminate inline style backgrounds.

---

## 5. Activity Card

### Current Implementation
- **Pages:** `index.html`
- **CSS:** Inline `<style>` block in `index.html` (lines ~429–545)
- **Classes:** `.activity-card`, `.activity-image`, `.activity-tag`, `.activity-content`, `.activity-title`, `.activity-description`

**Structure:**
```html
<div class="activity-card shadow-sm">
  <div class="activity-image">
    <img src="..." alt="..." loading="lazy">
    <span class="activity-tag tag-green">App Dev</span>
  </div>
  <div class="activity-content">
    <h5 class="activity-title">Mobile App Development</h5>
    <p class="activity-description">...</p>
    <!-- read-more-btn commented out -->
  </div>
</div>
```

**Known Issues:**
- "Learn More" / "Read More" anchor tags are commented out — cards have no call to action
- Card max-width is `400px` but used inside Bootstrap grid columns — can cause alignment inconsistency
- The third card uses different column classes (`col-lg-4 col-md-6`) vs first two (`col-xl-4 col-md-6 col-sm-12`)
- Closing `</section>` for the row is missing — `</section>` appears where `</div>` should be (line 196)
- Tag classes (`.tag-green`, `.tag-pink`, `.tag-orange`) defined inline; should move to shared CSS

**Target:**
- Move all `.activity-card` CSS to `my-styles.css`
- Restore and wire up the "Learn More" links
- Standardize column classes across all three cards
- Close the row `<div>` properly

---

## 6. Leader Card

### Current Implementation
- **Pages:** `Leadership.html`
- **CSS:** Inline `<style>` block in `Leadership.html`
- **JS:** Rendered by `leaderCardHTML()` function inside `Leadership.html`

**Rendered markup:**
```html
<div class="col-sm-6 col-md-4 col-lg-3 reveal">
  <div class="leader-card p-3 text-center" data-leader-id="thomas">
    <div class="avatar-wrap">
      <img class="leader-avatar" data-src="..." alt="Thomas Del Palacio" loading="lazy">
    </div>
    <div class="pt-3">
      <div class="leader-name">Thomas Del Palacio</div>
      <div class="leader-role">President</div>
      <div class="leader-major">Aerospace Engineering</div>
      <div class="leader-links"><a href="..."><i class="fab fa-linkedin"></i></a></div>
    </div>
  </div>
</div>
```

**Data source:** `LEADERS` object literal in `Leadership.html` — three arrays (`exec`, `directors`, `chairs`).

**Known Issues (accessibility):**
- Card is a `<div>` with a click listener — not focusable, not keyboard-accessible
- No `role="button"` or `tabindex="0"` or `aria-label`
- Avatar uses `data-src` for lazy loading (manual IntersectionObserver) — not native `loading="lazy"` pattern
- Two leaders (`natalia`, `steven`) have empty `img` fields — fallback renders a Font Awesome user icon, but img src still flashes before check
- `Damian Pacha` has an empty `linkedin` field (empty string `""`) — no LinkedIn icon rendered, no placeholder

**Target:**
- Add `role="button" tabindex="0"` to `.leader-card`
- Add `keydown` handler (Enter/Space triggers modal)
- Switch to native `<img loading="lazy">` instead of manual `data-src` swap
- Add aria-label to each card

---

## 7. Resource Card

### Current Implementation
- **Pages:** `resources.html`
- **CSS:** Inline `<style>` block in `resources.html`
- **Classes:** `.resource-card`, `.resource-media`, `.resource-overlay`, `.resource-pill`, `.resource-body`, `.resource-title`, `.resource-text`, `.btn-pill-outline`

**Structure:**
```html
<article class="resource-card">
  <div class="resource-media">
    <img src="..." alt="..." loading="lazy">
    <div class="resource-overlay">
      <span class="resource-pill pill-orange"><i class="..."></i> Internships</span>
    </div>
  </div>
  <div class="resource-body">
    <h3 class="resource-title">...</h3>
    <p class="resource-text">...</p>
    <a class="btn-pill-outline" target="_blank" rel="noopener" href="...">
      Apply <i class="fa-solid fa-arrow-up-right-from-square"></i>
    </a>
  </div>
</article>
```

**Current resources:** Summer Tech Internships, Free Coursera Courses, Resumé Samples, Chapter Bylaws

**Known Issues:**
- Internship link points to a 2024 GitHub list (`Summer2024-Internships`) — title says "Summer 2026"
- All CSS is inline — none is shared or reusable
- `resources.html` is not in the nav

**Target:** Move to shared CSS. Add to nav.

---

## 8. Pillar Card

### Current Implementation
- **Pages:** `history.html`
- **CSS:** Inline `<style>` block in `history.html`
- **Markup:** `<article class="pillar-card">`

**6 pillars:** Academic Development, Chapter Development, Community Outreach, Leadership Development, Professional Development, Technical Development

**Icon coloring:** `nth-child` alternates orange → green → navy

**Known Issues:**
- All CSS inline; not reusable
- Grid collapses to 1 column on mobile (correct behavior, but breakpoint triggers at 767.98px — tablet intermediate gets 3 columns crammed together)

---

## 9. Committee Card

### Current Implementation
- **Pages:** `join.html`
- **CSS:** Inline `<style>` block in `join.html`
- **Classes:** `.committee-card`, `.committee-num`, `.committee-title`, `.committee-sub`, `.committee-chevron`, `.committee-details`, `.committee-details-inner`
- **Behavior:** Bootstrap `data-bs-toggle="collapse"` — expands a `.committee-details` div below

**8 committees:** Academic, Website, Community Engagement, Operations, Outreach, Marketing, MemberSHPE, SHPEtinas

**Known Issues:**
- All CSS inline — large block (~80 lines) in `join.html`'s `<style>`
- Chevron icon does not rotate on expand (no CSS animation for open/closed state)
- Numbered badge uses hardcoded `#143B6B` (different from `--color-navy`) — inconsistency

**Target:** Add `.committee-card[aria-expanded="true"] .committee-chevron { transform: rotate(180deg); }`. Move to shared CSS.

---

## 10. Join Step Card

### Current Implementation
- **Pages:** `join.html`
- **CSS:** Inline `<style>` block in `join.html`
- **Classes:** `.join-step-card`, `.join-step-badge`

**3 steps:** Join on MineTracker → Choose National Membership → Join a Committee

**Structure:**
```html
<div class="join-step-card h-100">
  <div class="join-step-badge">1</div>
  <h5 class="fw-bold mb-2">Join on MineTracker</h5>
  <p class="text-muted mb-3">...</p>
  <a class="btn btn-sm btn-primary w-100" href="...">Join Campus Membership</a>
</div>
```

**Known Issues:**
- Step 3 button (`<a class="btn btn-sm btn-dark" href="#committees">`) uses Bootstrap dark — inconsistent with navy brand color
- `.btn-primary` inside step cards uses Bootstrap's default blue, not brand navy

---

## 11. Team Card

### Current Implementation
- **Pages:** `shpetinas.html`, `minerspark.html`
- **CSS:** `my-styles.css` (`.team-card`, `.middle-card`, `.left-card`, `.right-card`) + Bootstrap `.card`
- **Classes:** `.team-card` (with stagger animation delay variants)

**Structure:**
```html
<div class="card border-0 shadow-sm text-center p-4 team-card left-card">
  <img src="..." class="rounded-circle mx-auto" style="width:120px; height:120px; object-fit:cover;" alt="">
  <h5 class="mt-3 mb-0">Name</h5>
  <p class="text-muted small mb-2">Role • Major • Year</p>
  <a href="..." class="text-primary" style="font-size:1.5rem;"><i class="fab fa-linkedin"></i></a>
</div>
```

**Known Issues:**
- MinerSpark leads have placeholder content: "Liz" with no last name, "Add Lead Name", `href="#"` LinkedIn links
- Inline `style="width:120px; height:120px; object-fit:cover;"` should be a CSS class
- `text-primary` for LinkedIn icon uses Bootstrap's blue — should use brand navy or orange
- `aleidadev5.JPEG` used as "Liz"'s photo — clearly a placeholder that was never updated

---

## 12. Sponsor Marquee

### Current Implementation
- **Pages:** `index.html`
- **CSS:** `assets/css/my-styles.css` (lines 100–193)
- **Classes:** `.sponsor-marquee`, `.sponsor-logos`, `.sponsor-card`

**How it works:**
- Two identical `.sponsor-logos` sets (the second has `aria-hidden="true"`)
- CSS `@keyframes sponsor-scroll` translates from `calc(-100% - 2rem)` to `0`
- Duration: `28s linear infinite`
- Hover pauses: `.sponsor-marquee:hover .sponsor-logos { animation-play-state: paused; }`
- Fade edges: `::before` and `::after` gradient overlays

**Sponsors (8):** Apple, Bloomberg, Freeport-McMoRan, NVIDIA, Cummins, Blue Origin, ExxonMobil, Texas Instruments

**Known Issues:**
- `apple.jpg` is a `.jpg` (JPEG); others are `.png` — inconsistent, affects transparency
- Folder is named `sponsers` (typo — missing 'o')
- Second set of sponsor logos has empty `alt=""` — correct for `aria-hidden` elements, but alt text on first set is just the company name (acceptable)
- No pause button for keyboard/screen reader users (WCAG 2.1 Success Criterion 2.2.2)

---

## 13. Leader Modal

### Current Implementation
- **Pages:** `Leadership.html`
- **Trigger:** Click anywhere on a `.leader-card` (event delegation via `document.addEventListener`)
- **Component:** Bootstrap Modal (`id="leaderModal"`)
- **Layout:** Two-column flex (`min-width:170px` photo + flex-grow Q&A text)

**Known Issues:**
- Modal triggered by clicking a `<div>` — not keyboard accessible (see Leader Card issue)
- `titleEl.textContent = '${leader.role} — ${leader.name}'` — no aria update when modal opens
- If `leader.img` is empty string, no image element renders (correct) but the left column still occupies `min-width:170px` (extra whitespace)

---

## 14. Hero Carousel

### Current Implementation
- **Pages:** `index.html`
- **Component:** Bootstrap Carousel (`id="carouselExampleControls"`, `data-bs-ride="carousel"`, `data-bs-interval="3000"`)
- **3 slides:**
  1. Neon logo on dark photo (`home2.jpeg`)
  2. Leadership Team CTA on group photo (`slide2.JPG`)
  3. Become a Member CTA on members photo (`members.JPG`)

**Known Issues (critical):**
- Carousel prev/next `<button>` elements appear **after** the closing `</div>` of the carousel wrapper — outside the component they're meant to control. This is a structural bug. The `</div>` at line 98 is an extra stray tag.
- Auto-play at 3000ms with no pause control — fails WCAG 2.1 SC 2.2.2 (Pause, Stop, Hide)
- No `aria-label` on carousel slides (only `aria-hidden` on prev/next icon spans)
- `#fourth-slide` CSS defined but no fourth slide exists
- Hero images are background-images (CSS) not `<img>` tags — cannot be lazy-loaded

---

## 15. Collapse / Accordion

### Current Implementation
- **Pages:** `join.html`
- **Component:** Bootstrap Collapse (`data-bs-toggle="collapse"`)
- **Used for:** Committee details expansion

**Known Issues:**
- Chevron icon (`.committee-chevron`) does not animate rotation when open/closed
- Only one committee can be expanded at a time if they share a `data-bs-parent` attribute — but no parent is set, so all can be open simultaneously. This may or may not be the intended behavior.

---

## 16. Tags / Badges

### Activity Card Tags

| Class | Color | Used for |
|---|---|---|
| `.tag-green` | `#86DC3D` | App Dev |
| `.tag-pink` | `#FC5CFF` | SHPEtinas |
| `.tag-orange` | `#FF8200` | MinerSpark |

All defined inline in `index.html`. Should move to `my-styles.css`.

### Resource Overlay Pills

| Class | Color (bg) | Used for |
|---|---|---|
| `.pill-orange` | `rgba(255,130,0,0.35)` | Internships, Chapter |
| `.pill-green` | `rgba(134,220,61,0.28)` | Learning |
| `.pill-blue` | `rgba(0,37,77,0.35)` | Career |

All defined inline in `resources.html`.

### Section Pills (Leadership)

- `.section-pill`: navy background `rgba(4,30,66,0.08)`, navy text, rounded-full
- Currently all commented out (`<!-- <span class="section-pill"> -->`)

---

## 17. Section Pills

Used as optional eyebrow labels above section titles on `Leadership.html`. All commented out currently. Pattern is clean — consider uncommenting.

---

## 18. Google Calendar Embed

### Current Implementation
- **Pages:** `index.html`
- **Type:** `<iframe>` embed
- **Calendar:** `shpemaesutep@gmail.com`
- **Has:** `title="UTEP SHPE//MAES Calendar"` (good for accessibility)
- **Mode:** Month view, no title, no print, no timezone display, no extra calendars
- **Width:** 100%, Height: 600px

**Known Issues:**
- No `loading="lazy"` on the iframe
- 600px height is fixed — on mobile this results in a very cramped calendar view
- Google Calendar embeds can block page load if the CDN is slow

---

## 19. Active Link Detection

### Current Implementation
- **File:** `assets/js/index.js` (lines 156–172)
- Runs after DOM load
- Reads `location.pathname`, extracts filename
- Iterates `.shpe-navbar .nav-link` elements, compares `href` to current filename
- Adds/removes `.active` class

**Known Issues:**
- Runs after `header.html` is injected via jQuery's `$(function(){...}.load(...)` — but `index.js` is loaded before jQuery's `load()` callback fires on some pages, meaning the nav may not be in the DOM when this code runs
- Only works for exact filename matches — `index.html` matches but `/` (root path) would not match

---

## 20. Scroll Reveal

### Current Implementation
- **Pages:** `Leadership.html`
- **Class:** `.reveal` applied to leader card columns
- **JS:** IntersectionObserver in `Leadership.html` inline script
- **Trigger:** `threshold: 0.12` (12% of element visible)
- **Effect:** Adds `.is-visible` → CSS transitions `opacity 0.5s ease, transform 0.5s ease`
- **Also handles:** Lazy image loading (swaps `data-src` → `src` on intersection)

**Known Issues:**
- Only implemented on Leadership page — homepage cards, pillar cards, etc. have no scroll reveal
- Uses manual `data-src` image lazy loading instead of native `<img loading="lazy">`
- Once observed and revealed, `io.unobserve(entry.target)` is called — correct behavior

**Target:** Extract to `my-styles.css` (CSS side) and a shared JS utility. Apply site-wide to cards.
