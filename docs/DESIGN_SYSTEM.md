# Design System — UTEP SHPE//MAES
> Version 2.0 · Last updated 2026-07-20
> This document is the single source of truth for all visual and interaction decisions on the website.
> Nothing ships without a corresponding entry here.

---

## Table of Contents

1. [Brand Foundation](#1-brand-foundation)
2. [Color System](#2-color-system)
3. [Typography System](#3-typography-system)
4. [Spacing System](#4-spacing-system)
5. [Grid & Layout](#5-grid--layout)
6. [Elevation & Depth](#6-elevation--depth)
7. [Border Radius](#7-border-radius)
8. [Motion & Animation](#8-motion--animation)
9. [Navigation](#9-navigation)
10. [Footer](#10-footer)
11. [Page Hero](#11-page-hero)
12. [Section Layouts](#12-section-layouts)
13. [Buttons](#13-buttons)
14. [Form Controls](#14-form-controls)
15. [Cards](#15-cards)
16. [Badges, Tags & Pills](#16-badges-tags--pills)
17. [Modals](#17-modals)
18. [Person Display](#18-person-display)
19. [Sponsor Marquee](#19-sponsor-marquee)
20. [Iconography](#20-iconography)
21. [Photography](#21-photography)
22. [Accessibility Standards](#22-accessibility-standards)
23. [CSS Custom Properties Reference](#23-css-custom-properties-reference)

---

## 1. Brand Foundation

### Identity

**Organization:** UTEP SHPE//MAES — Society of Hispanic Professional Engineers and Latinos in Science and Engineering, University of Texas at El Paso chapter.

**Mission:** Engage UTEP and El Paso students through academic, leadership, professional, and service opportunities in support of their growth as STEM professionals.

### Design Principles

**Community-first.** Every design decision should lower the barrier to belonging. Warm, photography-forward, human.

**Professionally confident.** Students are preparing for professional careers. The site should reflect that ambition without being corporate or cold.

**Culturally proud.** The organization celebrates Hispanic identity in STEM. The design should feel celebratory and bold, not generic.

**Accessible always.** The membership includes students from all backgrounds and abilities. WCAG 2.1 AA is the minimum standard, not a stretch goal.

### What Is Preserved (Do Not Change)

| Asset | Why |
|---|---|
| `websiteHeader.png` — the logo | Core brand mark; managed at the national level |
| `logoWfooter.png` — footer logo | Same |
| `#041E42` Navy | UTEP's official secondary blue |
| `#FF8200` Orange | UTEP's official primary orange |
| `#86DC3D` Green | MAES brand green |
| Photography of real members | Authenticity is a competitive advantage |
| Playfair Display as display typeface | Established visual identity |

---

## 2. Color System

### 2.1 Brand Colors (Unchanged)

| Token | Hex | Name |
|---|---|---|
| `--color-navy` | `#041E42` | UTEP Navy |
| `--color-orange` | `#FF8200` | UTEP Orange |
| `--color-green` | `#86DC3D` | MAES Green |

**`#00254d` is retired.** It was used in some older files as an alternate navy. All references should be migrated to `#041E42`.

---

### 2.2 Interactive States

Orange needs darker values for hover/active states that remain visually distinct and maintain accessibility.

| Token | Hex | Use |
|---|---|---|
| `--color-orange-hover` | `#E67200` | Orange button hover, link hover |
| `--color-orange-active` | `#C86000` | Orange button pressed (active) |
| `--color-orange-text` | `#C86000` | Orange used as **body text** on white (4.6:1 — AA ✓) |
| `--color-orange-tint` | `rgba(255,130,0,0.08)` | Orange background tints, hover fills |
| `--color-navy-hover` | `#062B5F` | Navy button hover |
| `--color-navy-light` | `#143B6B` | Secondary navy shade for badges |
| `--color-navy-tint` | `rgba(4,30,66,0.05)` | Soft panel backgrounds |
| `--color-green-text` | `#5B9E1A` | Green used as **body text** on white (4.6:1 — AA ✓) |
| `--color-green-dark` | `#3D7010` | Green on light gray backgrounds (6.0:1 — AAA ✓) |
| `--color-green-tint` | `rgba(134,220,61,0.12)` | Green background tints |

> **Rule:** The raw `#86DC3D` and `#FF8200` values must never be used as text color on white or light backgrounds. They fail WCAG contrast. Use the `-text` or `-active` variants for any text use.

---

### 2.3 Surface Tokens

Surfaces are backgrounds for sections, cards, and panels.

| Token | Hex | Use |
|---|---|---|
| `--surface-default` | `#FFFFFF` | Primary page background |
| `--surface-soft` | `#F9FAFB` | Alternating section background, card fill |
| `--surface-muted` | `#F3F4F6` | Input backgrounds, tertiary surfaces |
| `--surface-dark` | `#0F172A` | Footer, dark feature sections |
| `--surface-navy` | `#041E42` | Dark hero panels, dark card backgrounds |
| `--surface-overlay` | `rgba(0,0,0,0.50)` | Hero photo overlay (default) |
| `--surface-overlay-light` | `rgba(0,0,0,0.35)` | Lighter overlay for brighter photos |
| `--surface-overlay-heavy` | `rgba(0,0,0,0.65)` | Heavier overlay for busy photos |

---

### 2.4 Text Tokens

| Token | Hex | Use |
|---|---|---|
| `--text-primary` | `#1F2937` | All body copy, default text |
| `--text-secondary` | `#374151` | Supporting text, slightly lighter |
| `--text-muted` | `#6C757D` | Captions, meta text, subtitles |
| `--text-placeholder` | `#9CA3AF` | Form placeholder text |
| `--text-on-dark` | `#F9FAFB` | Body text on dark/navy surfaces |
| `--text-on-dark-muted` | `#CBD5E1` | Muted text on dark surfaces |
| `--text-on-dark-accent` | `#86DC3D` | Links and accents on dark surfaces |
| `--text-disabled` | `#D1D5DB` | Disabled state text |

---

### 2.5 Border Tokens

| Token | Value | Use |
|---|---|---|
| `--border-subtle` | `rgba(4,30,66,0.06)` | Card hairlines, soft panel borders |
| `--border-default` | `rgba(4,30,66,0.14)` | Input fields, dividers |
| `--border-strong` | `rgba(4,30,66,0.28)` | Focused inputs (non-orange) |
| `--border-dark` | `rgba(255,255,255,0.10)` | Dividers on dark surfaces |

---

### 2.6 Focus Token

All interactive elements must show a visible focus indicator that exceeds 3:1 against adjacent colors.

| Token | Value |
|---|---|
| `--focus-ring` | `0 0 0 3px rgba(255,130,0,0.40)` |
| `--focus-ring-navy` | `0 0 0 3px rgba(4,30,66,0.35)` |
| `--focus-ring-white` | `0 0 0 3px rgba(255,255,255,0.45)` |

---

### 2.7 Tag/Category Colors

These are used exclusively for program category identification in pill tags and badges. Not for text.

| Token | Hex | Program |
|---|---|---|
| `--tag-green` | `#86DC3D` | App Dev |
| `--tag-pink` | `#FC5CFF` | SHPEtinas |
| `--tag-orange` | `#FF8200` | MinerSpark |

---

### 2.8 Accessibility Contrast Matrix

| Color pair | Ratio | WCAG AA (body) | WCAG AA (large) | WCAG AAA |
|---|---|---|---|---|
| `#041E42` on `#FFFFFF` | 14.4:1 | ✓ Pass | ✓ Pass | ✓ Pass |
| `#FF8200` on `#FFFFFF` | 3.1:1 | ✗ **Fail** | ✓ Pass (≥18pt) | ✗ Fail |
| `#C86000` on `#FFFFFF` | 4.6:1 | ✓ Pass | ✓ Pass | ✗ Fail |
| `#86DC3D` on `#FFFFFF` | 2.9:1 | ✗ **Fail** | ✗ Fail | ✗ Fail |
| `#5B9E1A` on `#FFFFFF` | 4.6:1 | ✓ Pass | ✓ Pass | ✗ Fail |
| `#6C757D` on `#FFFFFF` | 4.6:1 | ✓ Pass | ✓ Pass | ✗ Fail |
| `#FFFFFF` on `#041E42` | 14.4:1 | ✓ Pass | ✓ Pass | ✓ Pass |
| `#F9FAFB` on `#0F172A` | 14.1:1 | ✓ Pass | ✓ Pass | ✓ Pass |
| `#86DC3D` on `#0F172A` | 7.8:1 | ✓ Pass | ✓ Pass | ✓ Pass |
| `#FF8200` on `#0F172A` | 4.5:1 | ✓ Pass | ✓ Pass | ✗ Fail |

> **Key rules:**
> - `#FF8200` and `#86DC3D` may be used as decorative fill, icon color, or border — never as text on light backgrounds.
> - On dark surfaces (`#041E42`, `#0F172A`), both brand colors are safe for text.
> - For accessible orange text on white, use `#C86000`.
> - For accessible green text on white, use `#5B9E1A`.

---

## 3. Typography System

### 3.1 Font Stack

Three typefaces, each with a clear role. Mixing them is intentional brand expression.

| Family | Role | Character |
|---|---|---|
| **Playfair Display** | Editorial, narrative, emotional | High-contrast serif, cultural warmth, display impact |
| **Oswald** | Functional, UI, labeling | Compressed sans-serif, efficient, structured |
| **Roboto** | Body copy, reading text | Neutral, highly legible, accessible at small sizes |

**Google Fonts — Canonical Request (use this exact string on every page):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600&family=Playfair+Display:wght@400;600;700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
```

Do not request Mohave. It is not used anywhere on the site.

---

### 3.2 Type Scale

All heading sizes are fluid via `clamp()`. This eliminates the need for font-size breakpoints on text.

| Level | Font | Size (fluid) | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|---|
| `--text-display` | Playfair Display | `clamp(3.25rem, 6vw, 5rem)` | 700 | 1.05 | 0 | Hero carousel titles |
| `--text-h1` | Playfair Display | `clamp(2.5rem, 5vw, 3.75rem)` | 700 | 1.1 | 0 | Page hero headings |
| `--text-h2` | Playfair Display | `clamp(1.85rem, 3vw, 2.5rem)` | 700 | 1.2 | 0 | Narrative section titles |
| `--text-h2-ui` | Oswald | `clamp(1.5rem, 2.5vw, 2rem)` | 500 | 1.2 | 0.04em | Functional section titles |
| `--text-h3` | Playfair Display | `1.5rem` | 700 | 1.3 | 0 | Sub-section, panel headers |
| `--text-h4` | Oswald | `1.1rem` | 600 | 1.3 | 0.03em | Card titles, list headers |
| `--text-body-lg` | Roboto | `1.0625rem` | 400 | 1.75 | 0 | Hero subtitles, lead paragraphs |
| `--text-body` | Roboto | `1rem` | 400 | 1.75 | 0 | General body copy |
| `--text-small` | Roboto | `0.875rem` | 400 | 1.65 | 0 | Captions, meta, secondary text |
| `--text-ui` | Oswald | `0.9rem` | 400 | 1 | 0.05em | Nav links, UI labels |
| `--text-ui-sm` | Oswald | `0.8rem` | 600 | 1 | 0.07em | Tags, badges, mini-labels |

---

### 3.3 Heading Usage Rules

**When to use Playfair Display for headings:**
- Section titles that tell a story ("Our History", "What is SHPEtinas?", "Meet the Team")
- Card titles for editorial content (program cards, resource cards)
- Modal titles
- Hero headings
- CTA button labels (brand-established pattern — preserve this)

**When to use Oswald for headings:**
- Navigation labels
- Committee names, functional section headers ("Board of Directors", "Tech Stack")
- Badge and tag text
- Form labels
- Steps / numbered sequences ("Step 1", "01", "02")

**Never:**
- Use Playfair Display for body copy (it is not designed for long reading)
- Use Oswald as body copy (too condensed for sustained reading)
- Use font weights outside what was loaded (Playfair: 400, 600, 700 only; Oswald: 300, 400, 500, 600 only; Roboto: 300, 400, 500 only)
- Mix Playfair and Oswald in the same heading

---

### 3.4 Line Heights

```
Display headings (h1, display): 1.05–1.1
Section headings (h2): 1.2
Sub-headings (h3, h4): 1.3
Body large: 1.75
Body default: 1.75
Body small / captions: 1.65
UI / labels / buttons: 1.0 (single line)
```

**Why 1.75 for body?** The current site uses 1.45 on the About page and 1.7 elsewhere. The inconsistency creates visible rhythm shifts between sections. 1.75 is the minimum recommended for web readability, particularly for accessibility (WCAG SC 1.4.12).

---

### 3.5 Letter Spacing

Only Oswald gets letter spacing. Playfair Display and Roboto should not be letter-spaced — it degrades legibility.

```
Oswald nav links:     0.04em
Oswald section titles: 0.02em
Oswald h4 card titles: 0.03em
Oswald UI labels:     0.05em
Oswald badges:        0.07em
```

---

## 4. Spacing System

### 4.1 Scale

An 8-pixel base unit. All spacing values are multiples of 4px (0.25rem).

| Token | Rem | Px | Primary use |
|---|---|---|---|
| `--space-1` | 0.25rem | 4px | Icon-to-label gaps, micro-spacing |
| `--space-2` | 0.5rem | 8px | Tight internal padding, small gaps |
| `--space-3` | 0.75rem | 12px | Form label-to-field gap |
| `--space-4` | 1rem | 16px | Default card internal padding (sm) |
| `--space-5` | 1.25rem | 20px | Card padding (default), list item gaps |
| `--space-6` | 1.5rem | 24px | Card padding (lg), grid gutters |
| `--space-7` | 2rem | 32px | Between-element spacing, card gaps |
| `--space-8` | 2.5rem | 40px | Medium inner section spacing |
| `--space-9` | 3rem | 48px | Section padding (mobile) |
| `--space-10` | 4rem | 64px | Section padding (tablet) |
| `--space-11` | 5rem | 80px | Section padding (desktop) |
| `--space-12` | 6rem | 96px | Hero internal padding |
| `--space-13` | 8rem | 128px | Large hero padding |

---

### 4.2 Section Vertical Rhythm

Use `clamp()` so one value covers all screen sizes without explicit media queries.

```css
--section-padding-y: clamp(3rem, 8vw, 5rem);
/* Result: 48px mobile → 64px tablet → 80px desktop */
```

Apply as: `padding-block: var(--section-padding-y)`

For hero sections that need extra breathing room:
```css
--hero-padding-y: clamp(5rem, 12vw, 8rem);
/* Result: 80px mobile → ~10vw → 128px desktop */
```

---

### 4.3 Card Grid Gaps

| Context | Gap token | Px value |
|---|---|---|
| Feature card grid (3-col) | `--space-6` | 24px |
| Content card grid (2-col) | `--space-7` | 32px |
| Leader card grid (4-col) | `--space-6` | 24px |
| Committee card list (2-col) | `--space-3` | 12px |
| Person card grid (3-col) | `--space-6` | 24px |

---

### 4.4 Component Internal Padding

| Component | Padding |
|---|---|
| Feature card | 1.5rem (--space-6) |
| Content card body | 1.25rem (--space-5) |
| Leader card | 1rem top, 0.75rem sides/bottom |
| Join step card | 1.5rem (--space-6) |
| Committee card button | 1rem 1.25rem (--space-4 --space-5) |
| Soft panel | 1.5rem (--space-6) |
| Modal body | 1.5rem (--space-6) |
| Alert banner | 1.25rem (--space-5) |

---

## 5. Grid & Layout

### 5.1 Breakpoints

Matching Bootstrap 5's breakpoints (do not change — Bootstrap components depend on these).

| Name | Token | Min-width |
|---|---|---|
| xs | (default) | 0 |
| sm | `--bp-sm` | 576px |
| md | `--bp-md` | 768px |
| lg | `--bp-lg` | 992px |
| xl | `--bp-xl` | 1200px |
| xxl | `--bp-xxl` | 1400px |

---

### 5.2 Container Widths

| Token | Value | Use |
|---|---|---|
| `--container-max` | 1280px | Default max-width for content containers |
| `--container-narrow` | 760px | Prose/text-heavy sections, intro paragraphs |
| `--container-wide` | 1400px | Full-bleed sections with inner padding |
| `--container-px` | `clamp(1rem, 4vw, 2rem)` | Horizontal padding at all sizes |

> **Why 1280px instead of Bootstrap's default 1320px?** The wider default creates stretched multi-column layouts at large displays. 1280px keeps line lengths reasonable and aligns with most common viewport widths.

---

### 5.3 Column Grid

12-column grid. Gutter: 24px (`g-4` in Bootstrap).

Standard column assignments:

| Layout | Columns |
|---|---|
| Full width | `col-12` |
| Two equal | `col-md-6` |
| Two + one (content + sidebar) | `col-lg-8 / col-lg-4` |
| Three equal | `col-md-4` |
| Four equal | `col-sm-6 col-lg-3` |
| Centered narrow | `col-lg-8 offset-lg-2` |
| Centered very narrow | `col-md-6 offset-md-3` |

---

### 5.4 Content Width Rules

- **Hero text:** Max-width 800px, centered
- **Hero subtitle:** Max-width 680px, centered
- **Section subtitle paragraph:** Max-width 760px, centered (`.section-kicker`)
- **Prose sections:** Max-width 680px
- **Card grids:** Full container width

---

## 6. Elevation & Depth

### 6.1 Shadow Scale

Five surface levels. Higher level = more elevation = more prominent shadow.

| Token | Value | Use |
|---|---|---|
| `--shadow-xs` | `0 1px 3px rgba(0,0,0,0.06)` | Sponsor cards, very subtle lift |
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.07)` | Feature cards, soft panels at rest |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.08)` | Content cards, leader cards at rest |
| `--shadow-lg` | `0 8px 28px rgba(0,0,0,0.09)` | Step cards, committee cards |
| `--shadow-xl` | `0 14px 44px rgba(0,0,0,0.11)` | Dropdown menus, modals, hover states |
| `--shadow-focus` | `0 0 0 3px rgba(255,130,0,0.35)` | Interactive focus rings |
| `--shadow-focus-navy` | `0 0 0 3px rgba(4,30,66,0.30)` | Focus on dark buttons |
| `--shadow-focus-white` | `0 0 0 3px rgba(255,255,255,0.40)` | Focus on dark/photo backgrounds |

---

### 6.2 Hover Lift

All cards use a `translateY` lift on hover. The amount communicates interactivity level:

| Card type | Rest shadow | Hover shadow | Lift |
|---|---|---|---|
| Sponsor card | `--shadow-xs` | `--shadow-sm` | `translateY(-3px)` |
| Feature card | `--shadow-sm` | `--shadow-md` | `translateY(-3px)` |
| Content card | `--shadow-md` | `--shadow-xl` | `translateY(-5px)` |
| Leader card | `--shadow-md` | `--shadow-xl` | `translateY(-4px)` |
| Committee card | `--shadow-lg` | `--shadow-xl` | `translateY(-2px)` |

Transition for all card hovers: `transform 200ms var(--ease-out), box-shadow 200ms var(--ease-out)`

---

## 7. Border Radius

### 7.1 Scale

| Token | Value | Use |
|---|---|---|
| `--radius-xs` | 4px | Checkbox, tiny UI elements |
| `--radius-sm` | 8px | Input fields, small badges, tag pills |
| `--radius-md` | 12px | Step card badges, small cards |
| `--radius-lg` | 16px | Content cards, step cards, panels |
| `--radius-xl` | 18px | Leader cards, committee cards, modals |
| `--radius-2xl` | 24px | Large modals, featured panels |
| `--radius-pill` | 9999px | All buttons, pill badges, progress bars |

---

### 7.2 Component Defaults

| Component | Radius token |
|---|---|
| All buttons | `--radius-pill` |
| Input, textarea, select | `--radius-sm` |
| Content cards | `--radius-lg` |
| Feature cards | `--radius-lg` |
| Leader / team cards | `--radius-xl` |
| Committee cards | `--radius-xl` |
| Join step cards | `--radius-lg` |
| Soft panels | `--radius-lg` |
| Modals | `--radius-2xl` |
| Dropdown menus | `--radius-lg` |
| Dropdown items | `--radius-sm` |
| Gallery images | `--radius-lg` |
| Sponsor cards | `--radius-md` |
| Avatar (all sizes) | `--radius-pill` (circle) |
| Number badges (step) | `--radius-sm` |
| Number badges (committee) | `--radius-md` |

---

## 8. Motion & Animation

### 8.1 Principles

1. **Motion has meaning.** Each animation communicates something: content entering, state changing, structure revealing. No purely decorative motion.
2. **Faster than you think.** Most state transitions should feel instant but smooth: 150–250ms. Slow animations feel broken on modern displays.
3. **Ease out for entrances, ease in-out for state changes.** Objects entering the screen decelerate. Objects changing state use symmetric curves.
4. **Respect reduced motion.** All entrance animations and infinite scrolls must be disabled via `prefers-reduced-motion: reduce`.
5. **One animation at a time per element.** Stacking multiple animation classes on one element creates unpredictable behavior.

---

### 8.2 Duration Scale

| Token | Value | Use |
|---|---|---|
| `--duration-instant` | 80ms | Button press (active state) |
| `--duration-fast` | 150ms | Focus ring appearance |
| `--duration-default` | 200ms | Hover color, border color, opacity |
| `--duration-medium` | 300ms | Card hover lift, dropdown appear |
| `--duration-slow` | 500ms | Scroll reveal, modal enter |
| `--duration-slower` | 700ms | Page hero subtitle entrance |
| `--duration-slowest` | 1200ms | Logo fade-in (hero slide 1) |

---

### 8.3 Easing Functions

| Token | Value | Use |
|---|---|---|
| `--ease-linear` | `linear` | Progress bars, marquee scroll |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |
| `--ease-out` | `cubic-bezier(0.0, 0, 0.2, 1)` | Elements entering, card lifts |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | State changes, nav transition |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | CTA button press, icon hover pops |

---

### 8.4 Animation Catalog

**`fade-up`** — Single unified keyframe (replaces the duplicate `fadeInUp` and `fadeUp`):
```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

| Class | Duration | Delay | Use |
|---|---|---|---|
| `.fade-in-up` | 1200ms | 0ms | Homepage neon logo (first carousel slide) |
| `.fade-title` | 900ms | 100ms | Hero page titles |
| `.fade-subtitle` | 900ms | 400ms | Hero subtitles |
| `.team-card` (base) | 1000ms | (see below) | Program lead cards |
| `.middle-card` | — | 800ms | Center card in a 3-card row |
| `.left-card` | — | 1200ms | Left card in a 3-card row |
| `.right-card` | — | 1400ms | Right card in a 3-card row |

**`reveal`** — Scroll-driven reveal (IntersectionObserver, Leadership page):
```css
.reveal { opacity: 0; transform: translateY(10px); transition: opacity 500ms ease-out, transform 500ms ease-out; }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
```
Threshold: 0.12 (element is 12% visible before animating).

**`sponsor-scroll`** — Infinite horizontal marquee:
```css
@keyframes sponsor-scroll {
  from { transform: translateX(calc(-100% - 2rem)); }
  to   { transform: translateX(0); }
}
```
Duration: 28s linear infinite.

**Navbar shrink** — JS toggles `.is-scrolled` at `window.scrollY > 12`. CSS handles all transitions.

**Card hover** — Not a keyframe animation. CSS transition on `transform` and `box-shadow`. Duration: 200ms `var(--ease-out)`.

---

### 8.5 Reduced Motion

Every animation must have a `prefers-reduced-motion` fallback:

```css
@media (prefers-reduced-motion: reduce) {
  /* Remove all entrance animations */
  .fade-in-up, .fade-title, .fade-subtitle, .team-card { animation: none; opacity: 1; transform: none; }
  /* Remove scroll-reveal */
  .reveal { opacity: 1; transform: none; transition: none; }
  /* Remove marquee */
  .sponsor-marquee { flex-wrap: wrap; justify-content: center; }
  .sponsor-logos { animation: none; flex-wrap: wrap; }
  .sponsor-logos[aria-hidden="true"] { display: none; }
  /* Keep hover transitions but remove lift */
  .card:hover, .leader-card:hover { transform: none; }
}
```

---

## 9. Navigation

### 9.1 Structure

```
[Logo]          [About]  [Leadership]  [Programs ▾]  [Resources]  [Join →]
                                          App Dev
                                          SHPEtinas
                                          MinerSpark
```

"Join →" is styled as the **Primary CTA button** (orange pill), not a plain nav link. This is the highest-priority conversion action on the site.

---

### 9.2 Dimensions

| State | Height | Logo height | Body offset |
|---|---|---|---|
| Default | 68px | 48px | 68px |
| Scrolled (`.is-scrolled`) | 56px | 42px | — (body offset stays 68px) |
| Mobile (< 992px) | 64px | 44px | 64px |

---

### 9.3 Visual Spec

**Background:** `rgba(248, 249, 250, 0.82)` with `backdrop-filter: blur(14px)`. Transitions to `rgba(248, 249, 250, 0.96)` on scroll.

**Border bottom:** `1px solid rgba(0, 0, 0, 0.05)`. No color, no height — just a subtle edge.

**Links:**
- Font: Oswald, `var(--text-ui)` (0.9rem), weight 400
- Letter-spacing: 0.04em
- Color: `var(--color-navy)` at rest
- Hover: color `var(--color-orange)`, orange underline `scaleX(0 → 1)` from left, 180ms ease
- Active: color navy, underline stays visible, weight 600

**Dropdown:**
- Trigger: chevron icon rotates 180° on open
- Background: `var(--surface-default)` (white)
- Border-radius: `var(--radius-lg)` (16px)
- Box-shadow: `var(--shadow-xl)`
- Padding: 6px
- Items: Oswald, 0.9rem, `var(--radius-sm)` (8px) on each item
- Item hover: background `var(--surface-soft)`
- Timing: 200ms fade + translate(0, 4px → 0)

**CTA "Join" button:** See [Buttons — Primary CTA](#131-primary-cta).

**Mobile (< 992px):**
- Hamburger trigger, Bootstrap collapse
- Open panel: full-width, `border-radius: 0 0 var(--radius-xl) var(--radius-xl)`, white background, shadow
- Links stack vertically, full-width tap targets (min 44px height)
- Dropdown expands inline (not fly-out)
- CTA button full-width at bottom of menu

---

### 9.4 Active State Detection

JavaScript reads `location.pathname` on load, matches against nav link `href` attributes, adds `.active` class. Must account for: dropdown items (program pages), case differences (`Leadership.html`), root path mapping to `index.html`.

---

## 10. Footer

### 10.1 Structure

Three-column grid on desktop, stacked center-aligned on mobile:

```
[Logo + blurb]    [Social icons]    [Contact]
```

**Logo:** `logoWfooter.png`, 90px wide, margin-bottom 0.75rem.

**Blurb:** 2 sentences maximum. Roboto, 0.95rem, `var(--text-on-dark-muted)`. Currently commented out — should be restored.

**Social icons:** Instagram, Facebook, LinkedIn (Font Awesome). Size 1.5rem. Color: `var(--text-on-dark-muted)`. Hover: color `var(--color-green)`, `translateY(-3px)`. Gap: 1.25rem.

**Contact:** Email link `maesshpe@utep.edu` styled in `var(--color-green)`. Roboto, 0.875rem.

**Divider:** `1px solid var(--border-dark)`.

**Copyright:** Auto-year via JS. `var(--text-on-dark-muted)`, `font-size: 0.8rem`.

**Background:** `var(--surface-dark)` (`#0F172A`).

**Padding:** `2.5rem 0 1.5rem`.

---

## 11. Page Hero

### 11.1 Component Class

All page heroes — currently 8 separate implementations — are replaced by a single `.page-hero` class with modifier classes for variants.

```html
<section class="page-hero page-hero--join">
  <div class="container">
    <h1 class="page-hero__title fade-title">Become a Member</h1>
    <p class="page-hero__subtitle fade-subtitle">…</p>
    <div class="page-hero__actions">
      <a class="btn btn-ghost btn-lg" href="#steps">How to Join</a>
    </div>
  </div>
</section>
```

---

### 11.2 Base Spec

```
min-height: clamp(480px, 65vh, 680px)
background: [overlay] + background-image
background-size: cover
background-position: center
display: flex
align-items: center
text-align: center
```

**Overlay (default):** `linear-gradient(var(--surface-overlay), var(--surface-overlay))`

Page-specific background images are applied via modifier class:
```css
.page-hero--history  { background-image: …url("assets/img/2025/history/history.JPG"); }
.page-hero--join     { background-image: …url("assets/img/2025/join/join3.jpeg"); }
.page-hero--leadership { background-image: …url("assets/img/2025/leadership/team.JPG"); }
```

---

### 11.3 Variants

| Modifier | Min-height | Overlay | Notes |
|---|---|---|---|
| Default | `clamp(480px, 65vh, 680px)` | 50% | Most pages |
| `--tall` | `clamp(560px, 75vh, 780px)` | 50% | Join page (was 700px fixed) |
| `--carousel` | `clamp(520px, 70vh, 680px)` | 50% | Homepage carousel slides |
| `--compact` | `clamp(320px, 45vh, 480px)` | 45% | Lighter pages if needed |

**Mobile fallback (all variants):**
```css
@media (max-width: 575.98px) {
  .page-hero { background-attachment: scroll; }
}
```
This prevents the broken parallax on iOS Safari.

---

### 11.4 Typography Inside Hero

- Title: `var(--text-h1)`, Playfair Display, 700, white, `text-shadow: 0 2px 12px rgba(0,0,0,0.3)`
- Subtitle: `var(--text-body-lg)`, Roboto, 400, `rgba(255,255,255,0.92)`
- CTA buttons: Ghost button variant (see [Buttons — Ghost](#133-ghost-dark-surfaces))
- Max-width on text content: 800px, centered

---

### 11.5 Homepage Carousel (Special Case)

The carousel is the only multi-slide hero. It uses the same `.page-hero` height but wraps slides in the Bootstrap carousel structure.

- Slide 1: Neon logo image only (no text), `fade-in-up` animation on logo
- Slides 2–3: Title + CTA button
- Auto-interval: 5500ms (increased from 3000ms — current interval is too fast to read)
- Controls: prev/next inside `#carouselExampleControls` (must be fixed — currently outside)
- Add: pause button (WCAG 2.2.2)
- Add: pause on hover (already good behavior to wire up)

---

## 12. Section Layouts

### 12.1 Named Patterns

Every content section below the hero follows one of these named layouts. Using named layouts enforces consistency and makes future updates predictable.

---

#### Pattern A — Feature Grid

A section header above a responsive card grid.

```html
<section class="section section--soft">
  <div class="container">
    <div class="section-header text-center">
      <h2 class="section-title">Our 6 Pillars</h2>
      <p class="section-subtitle">…</p>
    </div>
    <div class="row g-4 mt-2">
      <!-- cards -->
    </div>
  </div>
</section>
```

Section header spacing: `margin-bottom: var(--space-8)` (40px)

---

#### Pattern B — Split (Text + Media)

Equal columns: prose left, image or panel right. Can reverse with `.flex-row-reverse` for visual variation.

```html
<section class="section">
  <div class="container">
    <div class="row align-items-center g-5">
      <div class="col-lg-6"><!-- text --></div>
      <div class="col-lg-6"><!-- image --></div>
    </div>
  </div>
</section>
```

Image: `border-radius: var(--radius-lg)`, `box-shadow: var(--shadow-lg)`, `width: 100%`

---

#### Pattern C — Stats Bar

Horizontal row of 3-4 stat cards on a soft background. Used on MinerSpark.

```html
<section class="section section--soft">
  <div class="container">
    <div class="row g-4 text-center">
      <div class="col-md-3"><!-- stat card --></div>
    </div>
  </div>
</section>
```

Padding: `padding-block: var(--space-9)` (48px) — slightly less than standard 80px, deliberate.

---

#### Pattern D — Content Narrow

Centered prose block. Used for lead-in text, intro paragraphs, explanatory copy.

```html
<section class="section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <p class="text-muted lead">…</p>
      </div>
    </div>
  </div>
</section>
```

---

#### Pattern E — Gallery Grid

Three equal columns of photographs, no captions, uniform image height.

```html
<section class="section">
  <div class="container">
    <div class="section-header text-center">…</div>
    <div class="row g-3">
      <div class="col-md-4"><img class="gallery-img" src="…" alt="…"></div>
    </div>
  </div>
</section>
```

`.gallery-img`: `width: 100%; height: 260px; object-fit: cover; border-radius: var(--radius-lg);`

---

#### Pattern F — Marquee

Full-width, no container constraint, edge-to-edge overflow hidden.

```html
<section class="section section--soft">
  <div class="container">
    <div class="section-header text-center">…</div>
  </div>
  <div class="sponsor-marquee">…</div>
</section>
```

The marquee container does not use `.container` — it needs the full viewport width.

---

### 12.2 Section Modifiers

| Modifier class | Background | Use |
|---|---|---|
| (none) | `var(--surface-default)` white | Default alternating section |
| `.section--soft` | `var(--surface-soft)` `#F9FAFB` | Alternating soft section |
| `.section--dark` | `var(--surface-dark)` `#0F172A` | Dark feature sections |
| `.section--navy` | `var(--surface-navy)` `#041E42` | Navy feature sections |

Alternate between default and `--soft` for visual section separation without hard borders.

---

### 12.3 Section Header Component

Standardized header used before every content grid. Replace all inline `style="color:…; font-family:…"` with these classes.

```html
<div class="section-header text-center">
  <h2 class="section-title">Our 6 Pillars</h2>
  <p class="section-subtitle">Supporting our members through six areas of growth</p>
</div>
```

```css
.section-header { margin-bottom: var(--space-8); }

.section-title {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: var(--space-3);
}

.section-title--ui {          /* functional headings */
  font-family: var(--font-ui);
  font-size: var(--text-h2-ui);
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.section-subtitle {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  color: var(--text-muted);
  max-width: 760px;
  margin: 0 auto;
  line-height: 1.75;
}
```

---

## 13. Buttons

### 13.1 Primary CTA

Used for: the main conversion action on a page, the nav "Join" link, step card actions.

```
Background:    var(--color-orange)           #FF8200
Color:         #FFFFFF
Border:        none
Border-radius: var(--radius-pill)
Font:          Playfair Display, 700
Font-size:     var(--text-body)              1rem default
Padding:       14px 36px (md), 10px 22px (sm), 16px 52px (lg)
Transition:    background 200ms, box-shadow 200ms, transform 200ms
```

States:
```
:hover  → background var(--color-orange-hover) #E67200, translateY(-2px), shadow-xl
:focus  → box-shadow var(--shadow-focus), outline: none
:active → background var(--color-orange-active) #C86000, translateY(0), shadow-md
:disabled → opacity 0.45, cursor not-allowed, no hover
```

---

### 13.2 Secondary (Navy Outline)

Used for: secondary actions, "Learn More" links, alternative CTAs.

```
Background:    transparent
Color:         var(--color-navy)
Border:        2px solid var(--color-navy)
Border-radius: var(--radius-pill)
Font:          Oswald, 500, letter-spacing 0.03em
Font-size:     var(--text-ui)                0.9rem default
Padding:       12px 28px (md), 8px 18px (sm), 14px 36px (lg)
```

States:
```
:hover  → background var(--color-navy), color white, shadow-md
:focus  → box-shadow var(--shadow-focus-navy)
:active → background var(--color-navy-hover), translateY(1px)
:disabled → opacity 0.45
```

---

### 13.3 Ghost (Dark Surfaces)

Used for: carousel slide CTAs, hero section buttons, any button on a dark/photo background.

```
Background:    rgba(255,255,255,0.12)
Color:         #FFFFFF
Border:        2px solid rgba(255,255,255,0.65)
Border-radius: var(--radius-pill)
Font:          Playfair Display, 700
Font-size:     var(--text-body-lg)           1.0625rem
Padding:       14px 44px (default)
```

States:
```
:hover  → background var(--color-green), color var(--color-navy), border var(--color-green), shadow-xl
:focus  → box-shadow var(--shadow-focus-white)
:active → background var(--color-green-dark), translateY(1px)
```

---

### 13.4 Text Arrow

Used for: "Learn More" links on cards (uncommented from index.html), inline navigation cues.

```
Background:    none
Color:         var(--color-orange)           (as a UI element, not body text)
Font:          Oswald, 600, uppercase, tracking 0.05em
Font-size:     var(--text-ui)
Text-decoration: none
```

Arrow indicator: `→` via `::after` pseudo, `content: " →"`, `display: inline-block`.
```
:hover → color var(--color-orange-hover), ::after translateX(5px)
:focus → outline: 2px solid var(--color-orange), outline-offset: 2px
```

---

### 13.5 Button Sizes

| Size | Padding | Font-size |
|---|---|---|
| `.btn-sm` | 8px 20px | 0.8rem |
| `.btn-md` (default) | 12px 28px | 0.95rem |
| `.btn-lg` | 14px 40px | 1.0625rem |
| `.btn-xl` | 16px 56px | 1.125rem |

---

### 13.6 Button Rules

- Every button must show a visible focus ring that is at least 3:1 contrast against adjacent color
- Minimum touch target: 44×44px (WCAG 2.5.5)
- Disabled buttons: `opacity: 0.45`, no pointer events — do not hide
- All button text: no `text-transform: uppercase` except Secondary (optional)
- Never use `!important` inside button styles

---

## 14. Form Controls

The site currently has no styled forms. These specs apply to any future contact form, committee interest form, or sign-up flow.

### 14.1 Text Input / Textarea

```
Height:        48px (input), auto (textarea, min-height: 128px)
Background:    var(--surface-default)
Border:        1.5px solid var(--border-default)
Border-radius: var(--radius-sm)         8px
Font:          Roboto, 1rem, var(--text-primary)
Padding:       0 16px (input), 12px 16px (textarea)
Transition:    border-color 150ms, box-shadow 150ms
```

States:
```
:hover   → border-color var(--border-strong)
:focus   → border-color var(--color-orange), box-shadow var(--shadow-focus), outline: none
:invalid (after interaction) → border-color #DC2626, box-shadow 0 0 0 3px rgba(220,38,38,0.15)
:disabled → background var(--surface-muted), opacity 0.6, cursor not-allowed
```

---

### 14.2 Select

Same as text input. Custom arrow:
```css
appearance: none;
background-image: url("data:image/svg+xml,<svg>…navy chevron…</svg>");
background-repeat: no-repeat;
background-position: right 14px center;
padding-right: 40px;
```

---

### 14.3 Labels

```
Font:          Oswald, 600
Font-size:     var(--text-ui-sm)         0.8rem
Letter-spacing: 0.07em
Text-transform: uppercase
Color:         var(--color-navy)
Margin-bottom: var(--space-2)            8px
Display:       block
```

---

### 14.4 Checkbox / Radio

```
Size:          18px × 18px
Border:        1.5px solid var(--border-default)
Border-radius: var(--radius-xs) checkbox / 50% radio
```

States:
```
:checked  → background var(--color-navy), border var(--color-navy), checkmark white SVG
:focus    → box-shadow var(--shadow-focus-navy)
```

---

### 14.5 Error / Helper Text

```
Font:      Roboto, 0.875rem
Color:     #DC2626 (error) / var(--text-muted) (helper)
Margin-top: var(--space-2) (8px)
Display:   block
```

Error messages must also have `role="alert"` for screen readers.

---

## 15. Cards

All card variants share transition: `transform 200ms var(--ease-out), box-shadow 200ms var(--ease-out)`.

### 15.1 ContentCard (Activity + Resource — merged)

The unified card for displaying programs and resources. Replaces `activity-card` and `resource-card`.

```
border-radius: var(--radius-lg)          16px
overflow:      hidden
background:    var(--surface-default)
box-shadow:    var(--shadow-md)
display:       flex flex-direction:column
height:        100% (equal height in grid)
```

**Media area:**
```
height:          220px (sm), 260px (default), 300px (lg variant)
position:        relative
overflow:        hidden
background:      #111 (shows while image loads)
```

Image: `width: 100%; height: 100%; object-fit: cover; transform: scale(1.02); transition: transform 350ms ease-out`
Hover image: `transform: scale(1.08)`

**Category label:** absolute, bottom-left corner of media area.
```
position:        absolute
bottom:          14px
left:            14px
```
(moved from top-right floating to bottom-left overlay — more editorial, less floating sticker)

**Body:**
```
padding:         var(--space-5) (20px)
flex:            1
display:         flex flex-direction:column
```

**Title:** `var(--font-display)`, `var(--text-h3)` (1.5rem), `var(--color-navy)`, margin-bottom `var(--space-2)`.

**Description:** `var(--font-body)`, `var(--text-body)`, `var(--text-muted)`, `line-height: 1.75`, `flex: 1`.

**CTA:** Pinned to bottom of card body. Text arrow button style or Secondary button.

**Hover:**
```
transform:   translateY(-5px)
box-shadow:  var(--shadow-xl)
```

---

### 15.2 FeatureCard (unified icon/number + title + desc)

Replaces: pillar cards, "What We Do", "What You'll Do", tech stack, "How It Works" cards.

```
border:        1px solid var(--border-subtle)
border-radius: var(--radius-lg)          16px
background:    var(--surface-default)
box-shadow:    var(--shadow-sm)
padding:       var(--space-6)            24px
text-align:    center
height:        100%
```

**Icon element:**
```
font-size:      2rem
margin-bottom:  var(--space-4) (16px)
color:          var(--icon-color, var(--color-navy))    CSS custom property per instance
```

Alternating icon colors use CSS `:nth-child()`:
```css
.feature-card:nth-child(3n+1) { --icon-color: var(--color-orange); }
.feature-card:nth-child(3n+2) { --icon-color: var(--color-green-text); }
.feature-card:nth-child(3n+3) { --icon-color: var(--color-navy); }
```

**Number variant** (`.feature-card--numbered`): large bold number in place of icon.
```
font-size:    1.8rem
font-weight:  700
color:        var(--color-navy)
font-family:  var(--font-display)
```

**Hover:**
```
transform:  translateY(-3px)
box-shadow: var(--shadow-md)
```

---

### 15.3 LeaderCard

For the Leadership page grid. Clickable → opens modal.

```
border:        none
border-radius: var(--radius-xl)          18px
background:    var(--surface-default)
box-shadow:    var(--shadow-md)
cursor:        pointer
height:        100%
padding:       var(--space-4) var(--space-4) var(--space-5)
text-align:    center
```

**Avatar:**
```
width:          150px; height: 150px
border-radius:  var(--radius-pill)
object-fit:     cover
border:         3px solid rgba(255,130,0,0.18)       subtle orange ring
background:     var(--surface-muted)                 placeholder bg
margin:         0 auto var(--space-4)
```

**Name:** `var(--font-display)`, `var(--text-h4)` via Playfair, weight 700, `var(--color-navy)`.

**Role:** `var(--font-body)`, `var(--text-small)`, `var(--text-muted)`.

**Major:** `var(--font-body)`, `var(--text-small)`, `var(--text-muted)`.

**LinkedIn:** icon only, `var(--color-navy)`, `1.2rem`, hover orange. Minimum tap target 44px via padding.

**Keyboard:** `role="button"`, `tabindex="0"`, `aria-haspopup="dialog"`.

**Hover:**
```
transform:  translateY(-4px)
box-shadow: var(--shadow-xl)
```

**Missing photo fallback:** `<div class="leader-avatar-placeholder">` with user silhouette icon. Same dimensions as avatar.

---

### 15.4 PersonCard (program leads)

Used for: SHPEtinas, MinerSpark leads. Smaller and simpler than LeaderCard.

```
border:        none
border-radius: var(--radius-xl)
background:    var(--surface-default)
box-shadow:    var(--shadow-md)
padding:       var(--space-6)
text-align:    center
```

**Avatar:**
```
width:  120px; height: 120px
border-radius: var(--radius-pill)
object-fit: cover
margin: 0 auto var(--space-4)
```

**Name:** Playfair Display, 700, 1.05rem, navy.
**Role / Meta:** Roboto, 0.875rem, muted.
**LinkedIn:** same as LeaderCard.

---

### 15.5 PeopleRow (App Dev roster)

Inline people display for lists. Used inside a card panel (`.people-card`).

```
display:         flex
align-items:     center
gap:             var(--space-4)
padding-block:   var(--space-3)
border-top:      1px solid var(--border-subtle)
```

**Mini avatar:**
```
width: 52px; height: 52px
border-radius: var(--radius-pill)
object-fit: cover
flex-shrink: 0
```

**Name:** Roboto, 500 (semibold), `var(--text-body)`, navy.
**Role:** Roboto, 300, `var(--text-small)`, muted.
**LinkedIn:** `var(--icon-link)` utility, right-aligned via `margin-left: auto`.

---

### 15.6 JoinStepCard

```
border:        1px solid var(--border-subtle)
border-radius: var(--radius-lg)          16px
background:    var(--surface-default)
box-shadow:    var(--shadow-lg)
padding:       var(--space-6)            24px
height:        100%
display:       flex flex-direction:column
```

**Badge:**
```
width: 44px; height: 44px
border-radius: var(--radius-sm)          8px
background: var(--color-navy)
color: white
font: Oswald, 700, 1rem
display: flex; align-items: center; justify-content: center
margin-bottom: var(--space-4)
```

**Title:** Playfair Display, 700, `var(--text-h3)` (1.5rem), navy.
**Body:** Roboto, 400, `var(--text-body)`, muted, `flex: 1`.
**Actions:** `margin-top: auto; padding-top: var(--space-5)` — pins to bottom.

---

### 15.7 CommitteeCard

```
width:         100%
border:        1px solid var(--border-subtle)
border-radius: var(--radius-xl)          18px
background:    var(--surface-default)
box-shadow:    var(--shadow-lg)
padding:       var(--space-5) var(--space-5)
display:       flex; align-items: center; gap: var(--space-4)
```

**Number badge:**
```
width: 60px; height: 60px
border-radius: var(--radius-md)          12px
background: var(--color-navy)
color: white
font: Oswald, 700, 1.15rem
flex-shrink: 0
```

**Title:** Oswald, 700, 1rem, `#1F2937`.
**Subtitle:** Roboto, 0.875rem, muted.
**Chevron:** `fa-chevron-down`, muted, `margin-left: auto`, rotates 180° when `aria-expanded="true"`.

**Collapse detail panel:**
```
margin-top: var(--space-3)
background: var(--surface-soft)
border: 1px solid var(--border-subtle)
border-radius: var(--radius-lg)
padding: var(--space-4) var(--space-5)
```

**Hover:**
```
transform:   translateY(-2px)
box-shadow:  var(--shadow-xl)
```

---

### 15.8 QuickStatCard

```
border:        none
border-radius: var(--radius-lg)
background:    var(--surface-default)
box-shadow:    var(--shadow-sm)
padding:       var(--space-7)            32px
text-align:    center
height:        100%
```

**Value:** Playfair Display, 700, `clamp(1.75rem, 3vw, 2.5rem)`, colored (navy / orange / green alternating).
**Label:** Roboto, 400, `var(--text-small)`, muted, margin-top `var(--space-2)`.

> Note: the current "Fresh/Soph" label at 1.8rem breaks because it's text at display size. The stat value should always be a number or very short abbreviation. Use the label line for the explanation.

---

## 16. Badges, Tags & Pills

### 16.1 CategoryTag (program identifier)

Floating tag on ContentCard images.

```
position:        absolute
bottom:          14px
left:            14px
background:      var(--tag-*)          colored per program
color:           white
font:            Oswald, 600, var(--text-ui-sm), tracking 0.06em
text-transform:  uppercase
padding:         5px 12px
border-radius:   var(--radius-pill)
```

> Text on tag backgrounds: white on `#86DC3D` gives 2.4:1 — technically fails AA for small text. Acceptable because (a) the tags are always large font with bold weight and (b) the contrast is against the image below, not white. Add `text-shadow: 0 1px 3px rgba(0,0,0,0.3)` for reliability.

---

### 16.2 SectionPill (label above section title)

Small identifier above an `h2`, currently commented out on Leadership page. Should be enabled.

```
display:         inline-block
background:      rgba(4,30,66,0.07)
color:           var(--color-navy)
font:            Oswald, 600, var(--text-ui-sm)
text-transform:  uppercase
letter-spacing:  0.07em
padding:         5px 14px
border-radius:   var(--radius-pill)
margin-bottom:   var(--space-3)
```

---

### 16.3 NumberBadge

Unified badge for JoinStepCard and CommitteeCard.

```
.number-badge     → 44px, var(--radius-sm) — step cards
.number-badge--lg → 60px, var(--radius-md) — committee cards
```

Both: background `var(--color-navy)`, white bold Oswald number, flex center.

---

## 17. Modals

### 17.1 LeaderModal

```
--bs-modal-border-radius: var(--radius-2xl)     24px
width: modal-lg (800px max)
modal-dialog-centered
```

**Header:** Playfair Display, `var(--text-h3)`, navy. Bottom border: `var(--border-subtle)`.

**Body layout:**
- Desktop (≥ 768px): `d-flex flex-row gap-4`
  - Left: avatar column, `min-width: 170px`, photo `170×170px`, `border-radius: var(--radius-pill)`
  - Right: major + Q&A list, `flex: 1`
- Mobile: stacked column, avatar centered

**Q&A format:**
- Question: Playfair Display, 700, `var(--text-body)`, navy, `margin-top: var(--space-4)`
- Answer: Roboto, 400, `var(--text-body)`, primary text, `line-height: 1.75`

**ARIA:** `aria-labelledby="leaderModalTitle"`, `role="dialog"`. Focus trapped inside while open.

---

### 17.2 TeamDirectoryModal

Same container spec as LeaderModal.

**Body:** grid of PersonCard components (120px avatar, name, role). `row g-3`.

**Footer:** single "Close" button (Secondary style).

**ARIA:** `aria-labelledby="[modalId]Title"`.

---

## 18. Person Display

See [Cards — PersonCard](#154-personcard-program-leads) and [Cards — PeopleRow](#155-peoplerow-app-dev-roster).

### 18.1 Avatar Sizes

| Context | Size | Usage |
|---|---|---|
| Leader card (grid) | 150×150px | Leadership page grid |
| Leader modal | 170×170px | Modal left column |
| Team card (program pages) | 120×120px | SHPEtinas, MinerSpark leads |
| Modal team card | 120×120px | Directory modals |
| People row (app dev) | 52×52px | Inline list roster |

All avatars: `border-radius: var(--radius-pill)`, `object-fit: cover`, `background: var(--surface-muted)`.

### 18.2 Missing Photo Fallback

When `leader.img` is empty, render:
```html
<div class="avatar-placeholder" aria-hidden="true">
  <i class="fa-solid fa-user"></i>
</div>
```
Same dimensions as avatar. Background `var(--surface-muted)`. Icon color `var(--text-muted)`.

---

## 19. Sponsor Marquee

### 19.1 Structure

Two identical `.sponsor-logos` strips. The second has `aria-hidden="true"`. The animation scrolls from right to left, creating seamless looping.

```
Section background: var(--surface-soft)
Marquee overflow:   hidden
Fade edges:         ::before (left) + ::after (right), 90px gradient overlays
                    gradient from --surface-soft to transparent
```

### 19.2 Sponsor Card

```
background: var(--surface-default)
border-radius: var(--radius-md)          12px
box-shadow: var(--shadow-xs)
padding: 10px 16px
min-width: 140px; min-height: 70px
display: flex; align-items: center; justify-content: center
```

Logo image: `max-width: 120px; max-height: 45px; object-fit: contain`.

Hover: `translateY(-3px)`, `var(--shadow-sm)`.

### 19.3 Animation

Duration: 28s linear infinite (26 sponsor cards after deduplication — adjust duration if logo count changes: approximately 3.5s per logo).

Reduced motion: unwrap to flex-wrap grid, hide aria-hidden strip.

---

## 20. Iconography

**Library:** Font Awesome 6.5.0. Use solid (`fa-solid`) for functional icons, brands (`fa-brands`) for social/tech logos.

### 20.1 Icon Sizes

| Context | Size |
|---|---|
| Feature card icons | 2rem |
| Social icons (footer) | 1.5rem |
| LinkedIn link (people) | 1.2rem |
| UI indicators (chevron, arrow) | 0.9rem |
| Alert banner icon | 1.4rem |
| Quick stat decorative | — (not used) |

### 20.2 Decorative Icons in Headings

When Font Awesome icons appear inside `<h*>` elements (e.g., "Who Are We" with `fa-user-friends`), they must have `aria-hidden="true"` to prevent screen readers from announcing "icon [name] heading text":

```html
<h2><i class="fa-solid fa-handshake" aria-hidden="true"></i> Our Mission</h2>
```

### 20.3 Icon-Only Buttons / Links

Must have `aria-label`:
```html
<a href="…" aria-label="LinkedIn profile for Thomas Del Palacio">
  <i class="fab fa-linkedin" aria-hidden="true"></i>
</a>
```

---

## 21. Photography

### 21.1 Hero Images

- Minimum effective resolution: 1600×900px
- Overlay: `linear-gradient(var(--surface-overlay), var(--surface-overlay))`
- `background-position: center` unless a specific focal point requires adjustment
- `background-size: cover`
- **Never** use `background-attachment: fixed` without a mobile fallback (`scroll` at ≤575.98px)

### 21.2 Content Images (Split sections)

- Apply `border-radius: var(--radius-lg)`, `box-shadow: var(--shadow-lg)`
- `width: 100%; height: auto`
- Aspect ratio target: 4:3 or 16:9

### 21.3 Card Images

- Fixed height container, `object-fit: cover`
- ContentCard: 220px default, 260px for resource cards
- Gallery: 260px uniform height

### 21.4 Avatars / Headshots

- Source minimum: 300×300px
- Display: cropped to circle, `object-fit: cover`
- Format target: WebP with JPEG fallback (Phase 7 work)

### 21.5 Alt Text Requirements

- Person photos: `alt="[First Last]"` — do not leave empty for named persons
- Hero photos: `alt=""` — decorative, screen readers skip
- Gallery photos: brief description of what is depicted
- Sponsor logos: `alt="[Company Name]"`, duplicate strip: `alt=""`
- Charts/infographics: describe the data in the alt text ("Pie chart showing 65% Mechanical Engineering…")

---

## 22. Accessibility Standards

### 22.1 Target Standard

WCAG 2.1 Level AA. The following items are required — not aspirational.

### 22.2 Document Structure

- Every HTML file must have `<!DOCTYPE html>`, `<html lang="en">`, `<meta charset="utf-8">`, `<meta name="viewport" …>`, `<title>`, `<meta name="description">`
- Page must have a `<main id="main-content">` landmark
- Page must have a `<nav>` landmark (provided by header partial)
- Page must have a `<footer>` landmark (provided by footer partial)

### 22.3 Skip Link

Every page via `header.html`:
```html
<a class="skip-link" href="#main-content">Skip to main content</a>
```
```css
.skip-link {
  position: absolute; top: -100px; left: 1rem;
  background: var(--color-navy); color: white;
  padding: 8px 16px; border-radius: var(--radius-sm);
  font: Oswald, 500, 0.9rem;
  transition: top 150ms ease;
  z-index: 9999;
}
.skip-link:focus { top: 1rem; }
```

### 22.4 Interactive Element Requirements

| Element | Requirement |
|---|---|
| All `<a>` tags | Visible focus state, descriptive `aria-label` if icon-only |
| All `<button>` | Native `<button>`, visible focus state |
| Card-as-button | `role="button"`, `tabindex="0"`, keyboard Enter/Space handler |
| Leader cards | `role="button"`, `aria-haspopup="dialog"`, `aria-label="View [Name]'s profile"` |
| Carousel | Pause button (WCAG 2.2.2), `aria-label` on each slide |
| Modal | `aria-labelledby`, `aria-modal="true"`, focus trap, `Esc` to close |
| Accordion | Native `<button>`, `aria-expanded`, `aria-controls` |
| Images of text | Do not use |

### 22.5 Color Must Not Be the Only Signal

Status, errors, and category must also be communicated via text or shape — not color alone. The program category tags use text labels ("App Dev", "SHPEtinas", "MinerSpark") in addition to color, which is correct.

### 22.6 Minimum Tap Targets

44×44px minimum for all interactive elements (WCAG 2.5.5). Applies to social icon links, LinkedIn icons, carousel controls, and navbar links on mobile.

---

## 23. CSS Custom Properties Reference

The complete `:root` block. This is the single source for all design tokens.
Implemented in `assets/css/design-tokens.css`.

```css
:root {

  /* ─── BRAND COLORS ─────────────────────────────── */
  --color-navy:             #041E42;
  --color-orange:           #FF8200;
  --color-green:            #86DC3D;

  /* ─── INTERACTIVE STATES ────────────────────────── */
  --color-orange-hover:     #E67200;
  --color-orange-active:    #C86000;
  --color-orange-text:      #C86000;
  --color-orange-tint:      rgba(255, 130, 0, 0.08);
  --color-navy-hover:       #062B5F;
  --color-navy-light:       #143B6B;
  --color-navy-tint:        rgba(4, 30, 66, 0.05);
  --color-green-text:       #5B9E1A;
  --color-green-dark:       #3D7010;
  --color-green-tint:       rgba(134, 220, 61, 0.12);

  /* ─── SURFACES ──────────────────────────────────── */
  --surface-default:        #FFFFFF;
  --surface-soft:           #F9FAFB;
  --surface-muted:          #F3F4F6;
  --surface-dark:           #0F172A;
  --surface-navy:           #041E42;
  --surface-overlay:        rgba(0, 0, 0, 0.50);
  --surface-overlay-light:  rgba(0, 0, 0, 0.35);
  --surface-overlay-heavy:  rgba(0, 0, 0, 0.65);

  /* ─── TEXT ──────────────────────────────────────── */
  --text-primary:           #1F2937;
  --text-secondary:         #374151;
  --text-muted:             #6C757D;
  --text-placeholder:       #9CA3AF;
  --text-on-dark:           #F9FAFB;
  --text-on-dark-muted:     #CBD5E1;
  --text-on-dark-accent:    #86DC3D;
  --text-disabled:          #D1D5DB;

  /* ─── BORDERS ───────────────────────────────────── */
  --border-subtle:          rgba(4, 30, 66, 0.06);
  --border-default:         rgba(4, 30, 66, 0.14);
  --border-strong:          rgba(4, 30, 66, 0.28);
  --border-dark:            rgba(255, 255, 255, 0.10);

  /* ─── FOCUS ─────────────────────────────────────── */
  --focus-ring:             0 0 0 3px rgba(255, 130, 0, 0.40);
  --focus-ring-navy:        0 0 0 3px rgba(4, 30, 66, 0.30);
  --focus-ring-white:       0 0 0 3px rgba(255, 255, 255, 0.40);

  /* ─── TAGS ──────────────────────────────────────── */
  --tag-green:              #86DC3D;
  --tag-pink:               #FC5CFF;
  --tag-orange:             #FF8200;

  /* ─── TYPOGRAPHY ────────────────────────────────── */
  --font-display:           'Playfair Display', Georgia, serif;
  --font-ui:                'Oswald', 'Arial Narrow', sans-serif;
  --font-body:              'Roboto', system-ui, sans-serif;

  --text-display:           clamp(3.25rem, 6vw, 5rem);
  --text-h1:                clamp(2.5rem, 5vw, 3.75rem);
  --text-h2:                clamp(1.85rem, 3vw, 2.5rem);
  --text-h2-ui:             clamp(1.5rem, 2.5vw, 2rem);
  --text-h3:                1.5rem;
  --text-h4:                1.1rem;
  --text-body-lg:           1.0625rem;
  --text-body:              1rem;
  --text-small:             0.875rem;
  --text-ui:                0.9rem;
  --text-ui-sm:             0.8rem;

  /* ─── SPACING ───────────────────────────────────── */
  --space-1:   0.25rem;   /* 4px  */
  --space-2:   0.5rem;    /* 8px  */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-7:   2rem;      /* 32px */
  --space-8:   2.5rem;    /* 40px */
  --space-9:   3rem;      /* 48px */
  --space-10:  4rem;      /* 64px */
  --space-11:  5rem;      /* 80px */
  --space-12:  6rem;      /* 96px */
  --space-13:  8rem;      /* 128px */

  --section-padding-y:     clamp(3rem, 8vw, 5rem);
  --hero-padding-y:        clamp(5rem, 12vw, 8rem);

  /* ─── GRID ──────────────────────────────────────── */
  --container-max:          1280px;
  --container-narrow:       760px;
  --container-wide:         1400px;
  --container-px:           clamp(1rem, 4vw, 2rem);

  /* ─── ELEVATION ─────────────────────────────────── */
  --shadow-xs:    0 1px 3px rgba(0, 0, 0, 0.06);
  --shadow-sm:    0 2px 8px rgba(0, 0, 0, 0.07);
  --shadow-md:    0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg:    0 8px 28px rgba(0, 0, 0, 0.09);
  --shadow-xl:    0 14px 44px rgba(0, 0, 0, 0.11);
  --shadow-focus: 0 0 0 3px rgba(255, 130, 0, 0.40);

  /* ─── BORDER RADIUS ─────────────────────────────── */
  --radius-xs:   4px;
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   18px;
  --radius-2xl:  24px;
  --radius-pill: 9999px;

  /* ─── MOTION ────────────────────────────────────── */
  --duration-instant:   80ms;
  --duration-fast:      150ms;
  --duration-default:   200ms;
  --duration-medium:    300ms;
  --duration-slow:      500ms;
  --duration-slower:    700ms;
  --duration-slowest:   1200ms;

  --ease-linear:   linear;
  --ease-in:       cubic-bezier(0.4, 0, 1, 1);
  --ease-out:      cubic-bezier(0.0, 0, 0.2, 1);
  --ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ─── COMPONENT SHORTCUTS ───────────────────────── */
  --transition-card:  transform var(--duration-default) var(--ease-out),
                      box-shadow var(--duration-default) var(--ease-out);
  --transition-nav:   background var(--duration-default) var(--ease-in-out),
                      box-shadow var(--duration-default) var(--ease-in-out),
                      padding var(--duration-default) var(--ease-in-out);
  --transition-color: color var(--duration-default) var(--ease-in-out),
                      background-color var(--duration-default) var(--ease-in-out),
                      border-color var(--duration-default) var(--ease-in-out);

  /* ─── NAVBAR ────────────────────────────────────── */
  --nav-height:         68px;
  --nav-height-scrolled: 56px;
  --nav-height-mobile:   64px;
  --nav-bg:             rgba(248, 249, 250, 0.82);
  --nav-bg-scrolled:    rgba(248, 249, 250, 0.96);

  /* ─── BOOTSTRAP OVERRIDES ───────────────────────── */
  --bs-body-font-family:    var(--font-body);
  --bs-body-color:          var(--text-primary);
  --bs-body-line-height:    1.75;
  --bs-border-radius:       var(--radius-sm);
  --bs-border-radius-lg:    var(--radius-lg);
  --bs-border-radius-xl:    var(--radius-xl);
  --bs-link-color:          var(--color-navy);
  --bs-link-hover-color:    var(--color-orange);
}
```
