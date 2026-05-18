# CLAUDE.md — Portfolio Project Guidelines

> This file is the primary source of truth for all implementation decisions.
> Read it before writing any component, hook, or configuration.

---

## Project Vision

This is the personal portfolio of **Shalev Shaul**, a Full-Stack Developer with expertise in
UI/UX, animation, branding, and modern frontend architecture.

The portfolio should communicate:
- **Craft** — every detail is intentional
- **Vision** — creative tech director aesthetic, not a developer template
- **Performance** — premium feel backed by fast, clean code
- **Accessibility** — inclusive by design, not as an afterthought

The target audience is agencies, startups, and clients looking for a senior-level developer
with strong design sensibility. The site should make them feel they are in the hands of
someone who cares deeply about quality.

---

## Coding Philosophy

### TypeScript
- Strict mode enabled — no `any`, no type assertions without justification
- Define types/interfaces close to where they are used
- Export types from `types/` only when shared across 3+ files

### React / Next.js
- **Server Components by default** — add `"use client"` only when the component requires:
  - Browser APIs (`window`, `document`, `localStorage`)
  - React state (`useState`, `useReducer`)
  - React effects (`useEffect`)
  - Event listeners
  - Third-party client-only libraries (Framer Motion, R3F)
- Prefer async Server Components for data fetching — no `useEffect` for data
- No `pages/` directory — App Router only

### File Organization
- One component per file
- File name matches the component name (PascalCase for components, camelCase for utils/hooks)
- Co-locate styles with components — no global style overrides unless absolutely necessary
- Keep files under 200 lines; split if they grow larger

### Naming
- Components: `PascalCase` — `HeroCanvas.tsx`
- Hooks: `useNoun` — `useScrolled.ts`
- Utils/lib: `camelCase` — `motion.ts`
- Constants: `UPPER_SNAKE` only for truly global app-level constants
- CSS classes: Tailwind utility classes only — no custom class names unless a CSS variable or animation keyframe requires it

---

## Component Philosophy

- Build for **composition** — small, focused components assembled into larger ones
- `SectionWrapper` wraps every section for scroll-reveal — never inline that logic
- `SectionHeader` renders every section `h2` + subtitle — never inline heading markup
- `Button` is the only place button styles live — never recreate button styling inline
- Props should be the minimum needed — no prop drilling beyond 2 levels, use composition instead
- No default exports from `lib/` or `hooks/` — named exports only for discoverability
- Avoid `React.memo`, `useMemo`, `useCallback` unless there is a measured performance problem

---

## Motion Philosophy

Motion is **ambient** — it supports the content, never competes with it.

### Rules
- All scroll animations use shared variants from `lib/motion.ts` — never inline `initial`/`animate` values
- `whileInView` with `viewport={{ once: true }}` — sections animate in once, never on scroll back
- Default easing: `[0.25, 0.46, 0.45, 0.94]` — `easeOutQuart`. Do not use Framer's built-in named easings.
- Default duration: 0.6s for reveals, 0.3s for micro-interactions
- Stagger children at 0.1s intervals — never more than 0.15s
- No spring physics on layout reveals — springs are for hover micro-interactions only
- Hero entrance is the only place for longer durations (up to 1.0s)

### Prohibited
- No `bounce` easing anywhere
- No `rotate` animations on section reveals
- No `clip-path` reveals unless explicitly requested
- No AnimatePresence for basic scroll reveals
- Never animate `width` or `height` directly — use `scaleX`/`scaleY` or `max-height` trick for performance

### Reduced Motion
Every animated component must respect `prefers-reduced-motion`.
Use the `useReducedMotion()` hook from Framer Motion:
```tsx
const prefersReducedMotion = useReducedMotion()
const variants = prefersReducedMotion ? {} : fadeUp
```

---

## Tailwind Usage Rules

- Design tokens are defined in `tailwind.config.ts` — always use token names, not arbitrary values
- Arbitrary values `[...]` are allowed only for one-off sizes that don't belong in the design system (e.g., `w-[420px]` for a very specific layout)
- Never override Tailwind defaults with `!important`
- Dark mode: `dark:` prefix only — never `[data-theme]` or CSS variable overrides for color switching
- Responsive: mobile-first (`sm:` → `md:` → `lg:`) — never desktop-first
- `group` and `peer` are preferred over JS-driven hover state where possible
- Avoid more than 8 utility classes on a single element inline — extract to a component if it grows larger

---

## Animation Consistency Rules

All motion across the site must feel like it comes from one consistent system.

| Pattern | Implementation | File |
|---|---|---|
| Section fade-up | `fadeUp` variant | `lib/motion.ts` |
| Stagger container | `staggerContainer` | `lib/motion.ts` |
| Scale reveal | `scaleIn` variant | `lib/motion.ts` |
| Hover glow/scale | Tailwind `transition` + inline `whileHover` | per component |
| Skill slider scroll | CSS `@keyframes scroll` | `SkillsSlider.tsx` |
| Navbar blur transition | CSS `transition` via Tailwind | `Navbar.tsx` |

Never create new motion patterns without adding them to `lib/motion.ts` first.

---

## R3F (React Three Fiber) Constraints

R3F is used **only** in `components/three/HeroCanvas.tsx`.

### Rules
- The canvas must be loaded with `dynamic(() => import(...), { ssr: false })`
- No postprocessing effects (bloom, SSAO, depth of field) — performance cost too high
- Target: < 1ms render time on mid-range mobile
- Use `PerformanceMonitor` from `@react-three/drei` to auto-reduce quality on slow devices
- Canvas: `gl={{ antialias: true, alpha: true }}` — transparent background to blend with Hero
- `frameloop="demand"` on initial load, switch to `"always"` once user interaction begins
- Icosphere: `IcosahedronGeometry`, detail level 2 maximum
- Mouse interaction: `useFrame` delta-based rotation — never `requestAnimationFrame` outside R3F
- Add `aria-hidden="true"` to the canvas wrapper — it is decorative

---

## i18n Requirements

- All user-visible strings must come from translation files in `/messages/`
- **No hardcoded English or Hebrew strings** in components
- Use `useTranslations()` from `next-intl` in client components
- Use `getTranslations()` in Server Components and `generateMetadata`
- RTL support is critical — test every layout in Hebrew locale
- `dir="rtl"` is set on `<html>` by the locale layout — do not override in components
- Flex/grid layouts must work correctly in both directions — use `space-x-*` carefully (prefer `gap`)
- Icons with directional meaning (arrows) must flip in RTL: `rtl:rotate-180` or logical CSS properties

---

## Accessibility Requirements

Minimum standard: **WCAG 2.1 AA** + Israeli accessibility standard (IS 5568).

### Mandatory
- One `<h1>` per page; logical heading hierarchy `h1 → h2 → h3`
- All interactive elements keyboard-accessible via `Tab`
- `:focus-visible` ring on all focusable elements — indigo, 2px offset
- `aria-label` on all icon-only buttons
- `aria-labelledby` on `<section>` elements pointing to their `<h2>`
- Form fields: `<label htmlFor>`, `aria-invalid`, `aria-describedby` for errors
- Images: meaningful `alt` text; decorative images/canvas: `alt=""` or `aria-hidden`
- Reduced motion: all animations respect `prefers-reduced-motion`
- Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text

### Prohibited
- No `tabindex` values other than `0` or `-1`
- No `outline: none` without a visible `:focus-visible` replacement
- No `div` or `span` as interactive elements without `role` + keyboard handlers
- No ARIA roles that override semantic HTML unnecessarily

---

## SEO Requirements

- `generateMetadata()` in every `layout.tsx` — title, description, OG, canonical
- Dynamic title format: `Page | Shalev Shaul`
- OpenGraph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- `hreflang` alternate links for `/en` ↔ `/he` in `<head>`
- JSON-LD `Person` schema in root layout
- `/public/robots.txt` and `/public/sitemap.xml` present before deploy
- All page routes must return HTTP 200 — no broken links at launch

---

## Performance Requirements

- Lighthouse Performance score ≥ 90 on mobile
- No layout shift (CLS ≈ 0) — reserve space for images, 3D canvas, fonts
- Fonts: preloaded via `next/font`, never a flash of unstyled text
- Images: `next/image` with explicit `width`/`height` or `fill` — no raw `<img>`
- Bundle: check with `@next/bundle-analyzer` before deploy — no unexpectedly large chunks
- `HeroCanvas`: lazy-loaded, SSR disabled — never blocks initial page render
- Animations: `transform` and `opacity` only — never animate `top`, `left`, `margin`, `padding`

---

## Dark / Light Mode Philosophy

- **Dark is the default** — the portfolio's primary aesthetic is dark navy/indigo
- Light mode is clean white — not a washed-out version of dark mode
- Both modes use the same design tokens — only the color values differ
- Never hardcode color hex values in components — always use Tailwind token classes (`bg-surface`, `text-primary`, etc.)
- `next-themes` injects `class="dark"` on `<html>` — use `dark:` Tailwind prefix
- Transition between themes: CSS `transition-colors duration-300` on `<html>` body

---

## Do / Don't

### Do
- Write semantic HTML first, add styling second
- Keep components small and composable
- Use the design system — colors, spacing, and type sizes are already decided
- Test RTL layout every time you add a new layout component
- Commit after every working feature, not at the end of the day
- Read `/docs/design-system.md` before adding any new visual element

### Don't
- Add new npm packages without considering the bundle impact
- Use inline styles (`style={{...}}`) — use Tailwind classes
- Add `console.log` statements to committed code
- Use magic numbers — extract to a named constant or design token
- Create a new animation that isn't in `lib/motion.ts`
- Use `useEffect` for anything that can be done in Server Components
- Add comments explaining what code does — name things clearly instead
