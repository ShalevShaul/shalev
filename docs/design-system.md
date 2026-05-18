# Design System — Shalev Shaul Portfolio

> This document defines the complete visual language of the portfolio.
> All implementation decisions must align with this system.
> Do not deviate without an explicit design decision.

---

## Color System

### Philosophy
The palette is built around a deep navy-black base with indigo as the primary accent.
Peach/orange appears sparingly as a warmth accent — no more than 10–15% of accent usage.
Both dark and light modes use the same semantic token names; only the values differ.

### Dark Mode Palette
```
Background        #07080F   Deep navy-black — the primary canvas
Surface           #0D0F1C   Cards, section containers
Surface-2         #161928   Elevated elements, dropdowns, modals
Border            #1E2235   Dividers, card borders, input borders
Text-primary      #EEF0FF   Primary readable text — cool off-white
Text-muted        #6B7280   Labels, captions, secondary info
Text-disabled     #3A3A4A   Inactive states

Accent            #6366F1   Indigo — primary accent (CTAs, active states, links)
Accent-hover      #818CF8   Indigo light — hover state
Accent-alt        #FB923C   Peach/orange — used sparingly for warmth highlights
Accent-glow       rgba(99, 102, 241, 0.12)   Ambient glow for cards/hovers
```

### Light Mode Palette
```
Background        #FFFFFF   Pure white
Surface           #F8F9FF   Subtle indigo-tinted surface
Surface-2         #F1F3FE   Elevated surface
Border            #E2E5F5   Borders and dividers
Text-primary      #0A0B14   Near-black
Text-muted        #64748B   Secondary text
Text-disabled     #C1C9E0   Inactive

Accent            #4F46E5   Indigo (darker for white bg contrast)
Accent-hover      #6366F1   Hover indigo
Accent-alt        #F97316   Peach — same usage as dark mode
Accent-glow       rgba(79, 70, 229, 0.10)
```

### Usage Rules
- `Background` — page background only
- `Surface` — cards, section wrappers with visual separation
- `Surface-2` — elements elevated above Surface (e.g., active navbar, dropdowns)
- `Border` — card borders, input borders, `<hr>` dividers
- `Accent` — CTAs, active nav links, focus rings, hover underlines
- `Accent-alt` (peach) — used max once per section, only for visual emphasis (e.g., a highlight word in Hero tagline, a featured tag badge)
- Never use `Accent-alt` for interactive states

---

## Typography

### Font Families
```
Primary:   Inter — all weights (300, 400, 500, 600, 700, 800)
           Loaded via next/font/google, display: swap
Monospace: JetBrains Mono — weight 400
           Used for tech tags, code snippets only
```

### Type Scale
```
Display (hero name):    clamp(52px, 7vw, 96px)   weight: 800   lh: 1.0
H1 (page title):        clamp(40px, 5vw, 72px)   weight: 800   lh: 1.05
H2 (section heading):   clamp(28px, 4vw, 52px)   weight: 700   lh: 1.1
H3 (card heading):      24px                      weight: 600   lh: 1.2
H4 (sub-heading):       18px                      weight: 600   lh: 1.3
Body large:             18px                      weight: 400   lh: 1.7
Body:                   16px                      weight: 400   lh: 1.7
Body small:             14px                      weight: 400   lh: 1.6
Label:                  13px                      weight: 500   lh: 1.4   tracking: +0.02em
Mono/tag:               13px                      weight: 400   (JetBrains Mono)
```

### Letter Spacing
- Display, H1, H2: `letter-spacing: -0.02em` — tight, premium look
- H3, H4: `letter-spacing: -0.01em`
- Body text: default (0em)
- Labels and uppercase text: `letter-spacing: +0.05em`
- Mono tags: default

### Color Usage in Typography
- All heading text: `Text-primary`
- Body text: `Text-primary`
- Captions, meta info: `Text-muted`
- Accent text (e.g., highlighted word in hero): `Accent`
- Peach highlights: one word per hero tagline maximum

---

## Spacing System

Base unit: 4px (Tailwind default)

### Standard Values
```
4px    (1)   — icon gaps, inline tight spacing
8px    (2)   — small gaps between inline elements
12px   (3)   — tight stacking within a component
16px   (4)   — standard gap between related elements
24px   (6)   — gap between card content blocks
32px   (8)   — gap between distinct elements in a section
48px   (12)  — gap between components in a section
64px   (16)  — section padding mobile
80px   (20)  — medium section padding
96px   (24)  — section padding desktop
128px  (32)  — XL vertical spacing for hero sections
```

### Section Anatomy
```
<section>
  padding-top: 96px (py-24 desktop) / 64px (py-16 mobile)
  padding-bottom: 96px / 64px
  
  <SectionHeader>     ← mb-16 (64px) below header
    <h2>              ← Display type
    <p subtitle>      ← Body, Text-muted, mt-4
  </SectionHeader>
  
  <content>           ← section-specific
```

### Container
```
max-width: 1152px   (max-w-6xl)
padding-x: 24px     (px-6 desktop)
padding-x: 16px     (px-4 mobile)
centered:  mx-auto
```

---

## Border Radius

```
Buttons:      rounded-full   (9999px) — pill shape
Inputs:       rounded-lg     (8px)
Cards:        rounded-2xl    (16px)
Small badges: rounded-full   (9999px)
Modals:       rounded-2xl    (16px)
Avatar/image: rounded-2xl    (16px) or rounded-full for circular
```

---

## Shadows & Glows

### Card Shadow (resting)
```css
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
```

### Card Glow (hover)
```css
box-shadow: 0 0 24px rgba(99, 102, 241, 0.15),
            0 4px 24px rgba(0, 0, 0, 0.3);
```

### Button Glow (hover)
```css
box-shadow: 0 0 16px rgba(99, 102, 241, 0.2);
```

### Usage Rules
- Glows appear on hover only — never on resting state (too visually noisy)
- Light mode: reduce glow opacity by 50% — white backgrounds amplify the effect
- Never stack more than 2 glow layers on one element

---

## Hover Behavior

### Cards
```
transition: all 0.3s ease
hover:
  transform: scale(1.02)
  border-color: rgba(99, 102, 241, 0.35)
  box-shadow: card glow
```

### Buttons (primary)
```
transition: all 0.3s ease
hover:
  background: Accent-hover (#818CF8)
  box-shadow: button glow
  transform: scale(1.02)
```

### Nav Links
```
transition: color 0.2s ease
hover:
  color: Accent
underline: width transition from 0 to full on hover, 0.2s ease
```

### Icon Buttons
```
transition: all 0.2s ease
hover:
  color: Accent
  transform: scale(1.1)
```

---

## Animation Timing

All animation durations and easings are defined in `lib/motion.ts`.

```
Micro-interaction (hover color):  150ms   ease
Interactive (hover scale/glow):   300ms   easeOutQuart
Scroll reveal:                    600ms   easeOutQuart
Hero entrance:                    800ms   easeOutQuart
Stagger interval:                 100ms   (between children)
Theme/lang toggle:                300ms   ease

easeOutQuart: cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

---

## Motion Language

### Scroll Reveals (fadeUp)
Elements enter from 24px below at 0 opacity, animate up to position at 1 opacity.
Applied via `SectionWrapper` to every section, and directly to individual elements within sections.

### Hero Entrance
Sequential stagger: label → name → tagline → CTA → canvas.
Each step: 150ms delay increment, 800ms duration.

### Skills Slider
CSS `@keyframes` transform — two rows, different speeds, pause on hover.
Row 1: scrolls left, 35s duration.
Row 2: scrolls right, 45s duration.

### Page-level Motion Rule
No page transition animations — instant navigation. Content reveals are per-section.

---

## Section Density

Density: **Balanced**

This means sections feel well-paced — not claustrophobically full, not excessively airy.

```
Section header → content gap:  64px (mb-16)
Content internal gaps:         24–32px (gap-6 to gap-8)
Between sections:              96px padding (py-24)
```

---

## Button Variants

### Primary
```
Background:    Accent (#6366F1)
Text:          white
Border:        none
Radius:        rounded-full
Padding:       px-7 py-3
Font:          Inter 500, 15px
Hover:         Accent-hover bg + glow
```

### Secondary (Ghost)
```
Background:    transparent
Text:          Accent
Border:        1px solid rgba(Accent, 0.4)
Radius:        rounded-full
Padding:       px-7 py-3
Font:          Inter 500, 15px
Hover:         bg rgba(Accent, 0.06) + border Accent
```

### Icon Button
```
Background:    transparent
Text/icon:     Text-muted
Radius:        rounded-full
Padding:       p-2
Hover:         Text-primary + scale(1.1)
```

---

## Card Styling

### Standard Card
```
Background:    Surface (#0D0F1C dark / #F8F9FF light)
Border:        1px solid Border
Border-radius: rounded-2xl
Padding:       p-6 (24px)
Shadow:        card shadow resting
Hover:         card glow + scale(1.02)
Transition:    all 0.3s ease
```

### Featured Project Row
```
No card container — full-width layout with image + text columns
Image: rounded-2xl, overflow hidden, 16:9 aspect ratio
Hover on image: slight scale(1.02) with overflow:hidden parent
```

---

## Navbar Styling

```
Position: fixed, top: 0, full width, z-50
Height: 64px (h-16)

Resting (at top of page):
  background: transparent
  backdrop-filter: none
  border-bottom: none

Scrolled (scrollY > 20px):
  background: rgba(7, 8, 15, 0.85)  [dark] / rgba(255, 255, 255, 0.85)  [light]
  backdrop-filter: blur(16px)
  border-bottom: 1px solid Border
  transition: all 0.3s ease

Links:
  Text-muted → Text-primary on hover
  Active link: Text-primary + indigo underline (width transition)
  Font: Inter 500, 14px
  Letter-spacing: +0.01em

Mobile:
  Hamburger icon at right
  Drawer opens from right (RTL: from left)
  Full-height panel, backdrop-blur bg
```

---

## Skills Slider Styling

```
Container:
  overflow: hidden
  mask-image: linear-gradient(
    to right,
    transparent,
    black 12%,
    black 88%,
    transparent
  )

Skill pill:
  display: inline-flex align-items-center gap-2
  padding: px-4 py-2
  border: 1px solid rgba(99, 102, 241, 0.2)
  background: rgba(99, 102, 241, 0.04)
  border-radius: rounded-full
  color: Text-primary
  font: Inter 500, 14px

  hover:
    border-color: rgba(99, 102, 241, 0.4)
    box-shadow: 0 0 12px rgba(99, 102, 241, 0.1)
    transition: 0.3s ease

Row gap: gap-4 between pills
```

---

## Grain Overlay

A subtle noise texture overlaid on the entire page to add depth and prevent flat-looking backgrounds.

```css
/* SVG noise filter, fixed position, full coverage */
position: fixed
inset: 0
z-index: 0
pointer-events: none
opacity: 0.035 (dark) / 0.02 (light)
```

The grain must not be visible at normal viewing distance — it adds texture only when zoomed in.

---

## Visual Consistency Rules

1. **One accent color per interaction** — don't mix indigo and peach in the same hover state
2. **Whitespace is structural** — resist filling empty space with decorative elements
3. **Borders are subtle** — never use white or fully-opaque borders; always semi-transparent
4. **No solid color sections** — avoid using `Accent` or `Accent-alt` as section backgrounds
5. **3D is decoration** — the R3F canvas supports the Hero, it does not dominate it
6. **Typography leads** — strong type hierarchy communicates hierarchy before color does
7. **Icons are supporting** — size 16–20px, always with a text label or `aria-label`
8. **No gradients on text** — no `background-clip: text` gradient effects on body copy
9. **Consistent corner radius** — never mix `rounded-xl` and `rounded-2xl` on similar elements in the same section
10. **Light mode is not dark mode inverted** — test both modes and ensure they have their own coherent feel
