# Architecture — Shalev Shaul Portfolio

> This document describes the technical architecture of the project.
> Refer to it when making structural decisions about routing, components, data, or infrastructure.

---

## Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSG/SSR, file-based routing, React Server Components, built-in i18n support via next-intl |
| Language | TypeScript (strict) | Type safety, better DX, fewer runtime errors |
| Styling | Tailwind CSS | Utility-first, no runtime CSS, design tokens via config |
| Animation | Framer Motion | Production-grade React animations, `useReducedMotion` support |
| 3D | React Three Fiber + Drei | R3F abstracts Three.js for React; Drei provides ready helpers |
| i18n | next-intl | App Router-native locale routing, RSC-compatible |
| Theming | next-themes | SSR-safe dark/light toggle without flash |
| Forms | React Hook Form + Zod | Uncontrolled form performance + schema validation |
| Contact backend | n8n webhook | No backend needed; n8n handles routing, notifications, storage |
| Hosting | Vercel | First-class Next.js support, edge functions, analytics, preview URLs |

---

## Folder Structure

```
shalev/
│
├── app/
│   └── [locale]/                   # Dynamic segment — "en" or "he"
│       ├── layout.tsx              # Locale root layout: html lang/dir, fonts, ThemeProvider, metadata
│       └── page.tsx                # Single-page: assembles all sections in order
│
├── components/
│   ├── layout/                     # Global layout components (rendered once per page)
│   │   ├── Navbar.tsx              # Fixed nav: transparent → blur, anchor links, LangToggle, ThemeToggle
│   │   ├── ThemeToggle.tsx         # Dark/light toggle button
│   │   └── LangToggle.tsx          # Language switcher He ⇄ En
│   │
│   ├── sections/                   # One file per page section (order matches page.tsx)
│   │   ├── Hero.tsx                # Split layout: text left, R3F canvas right
│   │   ├── About.tsx               # Bio, stats, photo
│   │   ├── Skills.tsx              # Infinite slider + static fallback
│   │   ├── Services.tsx            # What I offer
│   │   ├── FeaturedProjects.tsx    # 2–3 full-width case studies
│   │   ├── OtherProjects.tsx       # Compact 3-column project grid
│   │   ├── Contact.tsx             # Form + n8n webhook + social links
│   │   └── Footer.tsx              # Nav links, lang toggle, copyright
│   │
│   ├── ui/                         # Shared, reusable UI primitives
│   │   ├── SectionWrapper.tsx      # Framer Motion scroll-reveal wrapper
│   │   ├── SectionHeader.tsx       # h2 + subtitle — used by every section
│   │   ├── Button.tsx              # Primary and Secondary button variants
│   │   ├── TechTag.tsx             # Mono pill for technology labels
│   │   ├── ProjectRow.tsx          # Featured project: full-width row layout
│   │   ├── ProjectTile.tsx         # Compact project card for the grid
│   │   ├── ServiceCard.tsx         # Service offering card
│   │   ├── SkillTrack.tsx          # Single infinite-scroll row (used by Skills)
│   │   └── GrainOverlay.tsx        # Fixed SVG noise texture, z-0
│   │
│   └── three/
│       └── HeroCanvas.tsx          # R3F icosphere — loaded dynamically, SSR disabled
│
├── data/                           # Static typed content — edit here to update site content
│   ├── projects.ts                 # ProjectData[] — all project info
│   └── skills.ts                   # skill arrays for slider rows
│
├── hooks/                          # Custom React hooks
│   ├── useScrolled.ts              # Returns boolean: page scrolled past threshold
│   └── useReducedMotion.ts         # Wraps Framer's useReducedMotion for convenience
│
├── lib/                            # Non-component utilities
│   ├── motion.ts                   # Shared Framer Motion variants (fadeUp, stagger, scaleIn)
│   └── metadata.ts                 # generateMetadata helper for locale-aware metadata
│
├── messages/                       # i18n translation files
│   ├── en.json                     # English copy — all UI strings
│   └── he.json                     # Hebrew copy — all UI strings
│
├── public/
│   ├── images/                     # Static images (profile photo, project screenshots)
│   ├── og/                         # Pre-rendered OpenGraph images
│   ├── sitemap.xml                 # Both locale paths
│   └── robots.txt
│
├── docs/                           # Project documentation (this folder)
│   ├── CLAUDE.md                   # Implementation rules and philosophy
│   ├── design-system.md            # Visual design reference
│   └── architecture.md             # This file
│
├── middleware.ts                   # next-intl locale detection and redirect
├── i18n.ts                         # next-intl configuration
├── tailwind.config.ts              # Design tokens, custom utilities
├── next.config.ts                  # Next.js config (next-intl plugin, bundle analyzer)
└── .env.local                      # NEXT_PUBLIC_N8N_WEBHOOK_URL (never committed)
```

---

## Routing Architecture

### URL Structure
```
/           → redirects to /en or /he (based on Accept-Language)
/en         → English portfolio (LTR)
/he         → Hebrew portfolio (RTL)
```

### Why a Single Page?
The portfolio is a single long-scrolling page. All "sections" are on the same route.
There is no sub-routing (no `/en/projects/slug`). If case study detail pages are needed
in the future, they would be added as `app/[locale]/projects/[slug]/page.tsx`.

### Middleware (middleware.ts)
next-intl handles locale detection and redirect:
1. No locale in URL → detect from `Accept-Language` header
2. Default locale: `en`
3. Fallback: `en` if language is not supported

```ts
// middleware.ts
export { default } from 'next-intl/middleware'
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
}
```

### i18n Config (i18n.ts)
```ts
export const locales = ['en', 'he'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
```

---

## Component Architecture

### Server vs Client Boundary

Default: **Server Component**.
Only these components require `"use client"`:

| Component | Reason |
|---|---|
| `Navbar.tsx` | `useScrolled` hook (window.scrollY), LangToggle navigation |
| `ThemeToggle.tsx` | `useTheme` from next-themes |
| `LangToggle.tsx` | `useRouter`, `usePathname` from next-intl |
| `HeroCanvas.tsx` | R3F, Three.js — browser-only |
| `Hero.tsx` | Contains animated Framer Motion elements + mouse event handlers |
| `SectionWrapper.tsx` | `whileInView` Framer Motion (requires DOM) |
| `SkillTrack.tsx` | CSS animation pause on hover requires event handlers |
| `Contact.tsx` | React Hook Form, form submission state |
| Any component using `useReducedMotion`, `useScrolled`, `useState`, `useEffect` | |

### Component Composition Pattern

Sections are **thin orchestrators** — they import UI primitives and assemble layout:

```tsx
// Good — thin section, composed from primitives
export default function FeaturedProjects() {
  return (
    <SectionWrapper id="projects">
      <SectionHeader title={t('projects.title')} subtitle={t('projects.subtitle')} />
      <div className="space-y-24">
        {featuredProjects.map((project, i) => (
          <ProjectRow key={project.id} project={project} reverse={i % 2 !== 0} />
        ))}
      </div>
    </SectionWrapper>
  )
}
```

### Data Flow

Content lives in `/data/` as typed TypeScript arrays — no API calls, no CMS.
Sections import data directly. Translation strings come from `messages/`.

```
/data/projects.ts  →  FeaturedProjects.tsx, OtherProjects.tsx
/data/skills.ts    →  Skills.tsx → SkillTrack.tsx
/messages/en.json  →  every component via useTranslations() / getTranslations()
```

---

## Shared UI Strategy

All visual primitives in `components/ui/` follow these rules:

- **SectionWrapper**: Every section uses this. It wraps children in a Framer Motion container with `whileInView="visible"` and the `staggerContainer` variant. Children receive `fadeUp` automatically when they are `motion.` elements.

- **SectionHeader**: Renders `<h2>` + optional `<p>` subtitle. Accepts `title` and `subtitle` props. The `id` is set on the containing `<section>` in SectionWrapper, not here.

- **Button**: Two variants — `primary` (filled indigo) and `secondary` (ghost). Accepts `href` for link-buttons (renders as `<a>`) or `onClick` for action buttons (renders as `<button>`). Never create button styles elsewhere.

- **TechTag**: Mono-font pill for displaying technology names. Accepts `name` (string). Non-interactive by default.

---

## Animation Architecture

### Shared Variants (`lib/motion.ts`)

All scroll animations reference variants from this file. Never inline `initial`/`animate` values.

```ts
export const fadeUp: Variants       // opacity 0→1, y 24→0, 0.6s
export const staggerContainer: Variants  // staggerChildren: 0.1
export const scaleIn: Variants      // opacity 0→1, scale 0.96→1, 0.5s
```

### SectionWrapper Pattern

```tsx
<motion.section
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  <motion.div variants={fadeUp}>...</motion.div>
  <motion.div variants={fadeUp}>...</motion.div>
</motion.section>
```

The `viewport.margin: "-100px"` delays trigger slightly so the element is visibly
entering the viewport before animation starts.

### Reduced Motion

Every component that animates wraps its motion logic:

```tsx
const prefersReduced = useReducedMotion()
const sectionVariants = prefersReduced ? {} : staggerContainer
const itemVariants = prefersReduced ? {} : fadeUp
```

---

## i18n Architecture

### How Strings Are Organized

```json
// messages/en.json
{
  "nav": { "home": "Home", "about": "About", ... },
  "hero": { "role": "Full-Stack Developer", "name": "Shalev Shaul", "tagline": "...", "cta": "View Work" },
  "about": { "title": "About", "body": "..." },
  "skills": { "title": "Skills", "subtitle": "..." },
  "projects": { "title": "Projects", "subtitle": "..." },
  "contact": { "title": "Contact", "name": "Name", "email": "Email", ... },
  "a11y": { "themeToggle": "Toggle theme", "langToggle": "Switch language", ... }
}
```

### In Server Components
```tsx
import { getTranslations } from 'next-intl/server'
const t = await getTranslations('hero')
```

### In Client Components
```tsx
import { useTranslations } from 'next-intl'
const t = useTranslations('hero')
```

### RTL Handling
- `dir="rtl"` is set on `<html>` based on locale in `app/[locale]/layout.tsx`
- Tailwind's `rtl:` prefix handles directional adjustments
- Flexbox row direction is automatically reversed in RTL — verify layouts
- Icons with arrows: add `rtl:rotate-180` class
- Text alignment: use `text-start`/`text-end` instead of `text-left`/`text-right`

---

## SEO Architecture

### Metadata Generation
```ts
// lib/metadata.ts
export function buildMetadata(locale: Locale, page: string): Metadata {
  return {
    title: `${pageTitle[page][locale]} | Shalev Shaul`,
    description: descriptions[page][locale],
    alternates: {
      canonical: `https://shalevshaul.com/${locale}`,
      languages: { en: '/en', he: '/he' }
    },
    openGraph: { ... }
  }
}
```

### JSON-LD (in root layout)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shalev Shaul",
  "jobTitle": "Full-Stack Developer",
  "url": "https://shalevshaul.com",
  "sameAs": ["https://github.com/...", "https://linkedin.com/in/..."]
}
```

---

## Accessibility Architecture

### Landmark Structure (per page)
```html
<header>       <!-- Navbar -->
  <nav>
<main>
  <section aria-labelledby="hero-heading">    <!-- Hero -->
  <section aria-labelledby="about-heading">   <!-- About -->
  <section aria-labelledby="skills-heading">  <!-- Skills -->
  ...
<footer>
```

### Focus Management
- Initial page load: no forced focus
- Language switch: focus returns to `<body>` (next-intl handles navigation naturally)
- All interactive elements: Tab order follows visual reading order

### Skip Navigation
A "Skip to main content" link is the first focusable element in the DOM:
```html
<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 ...">
  Skip to main content
</a>
```

---

## Form Architecture (Contact)

### Validation Flow
```
User input → React Hook Form (uncontrolled, fast)
           → Zod schema validates on submit
           → Field-level errors shown inline with aria-describedby
```

### Submission Flow
```
handleSubmit()
  → set state: loading
  → POST { name, email, message } to NEXT_PUBLIC_N8N_WEBHOOK_URL
  → success: set state: success, clear form
  → error (network/server): set state: error, show retry message
```

### n8n Payload Shape
```ts
interface ContactPayload {
  name: string
  email: string
  message: string
  locale: 'en' | 'he'
  timestamp: string
}
```

---

## Performance Architecture

### Code Splitting
- `HeroCanvas` (R3F + Three.js): `dynamic(() => import(...), { ssr: false })` — ~180KB not loaded until component mounts
- Section components are Server Components — no JS bundle cost
- Client components are automatically split by Next.js at the `"use client"` boundary

### Image Strategy
- All images via `next/image`
- Hero: `priority={true}` — eager load, above the fold
- All others: default lazy load
- Profile photo: explicit `width`/`height` to prevent CLS
- Project screenshots: `fill` with `sizes` prop for responsive

### Font Strategy
```ts
// app/[locale]/layout.tsx
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' })
```
Both fonts are preloaded. `display: swap` prevents FOIT.

### Animation Performance
- All animations use `transform` and `opacity` — compositor-only, no layout/paint
- CSS skill slider uses `will-change: transform` on the track element
- Framer Motion's `LazyMotion` can reduce bundle if needed (future optimization)

---

## R3F Strategy

`HeroCanvas.tsx` is the only file that imports from `@react-three/fiber` or `three`.

### Scene Setup
```tsx
<Canvas
  camera={{ position: [0, 0, 5], fov: 45 }}
  gl={{ antialias: true, alpha: true }}
  frameloop="demand"
  aria-hidden="true"
>
  <PerformanceMonitor onDecline={handleDecline} />
  <Icosphere />
  <ambientLight intensity={0.4} />
  <pointLight position={[10, 10, 10]} color="#6366F1" />
  <pointLight position={[-8, -5, 5]} color="#FB923C" intensity={0.3} />
</Canvas>
```

### Icosphere Component (within HeroCanvas.tsx)
```tsx
// Uses IcosahedronGeometry detail=2
// MeshStandardMaterial — wireframe false, emissive indigo, roughness 0.2
// useFrame: delta-based rotation + mouse influence
// PerformanceMonitor: on decline, switch to detail=1 geometry
```

### Mouse Interaction
Mouse position is passed via `useRef` updated on `pointermove` event.
`useFrame` smoothly interpolates `mesh.rotation` toward target — no snapping.

---

## Scalability Considerations

- **New sections**: add to `components/sections/`, import in `page.tsx`, add translation keys
- **New languages**: add locale to `i18n.ts`, create `messages/[locale].json`, add to `middleware.ts`
- **Case study pages**: add `app/[locale]/projects/[slug]/page.tsx` + data in `data/projects.ts`
- **CMS migration**: data in `/data/` is already typed — swap static arrays for async fetch calls without touching component interfaces
- **New design tokens**: add to `tailwind.config.ts` under the appropriate scale — never add one-off hex values to components

---

## Maintainability Considerations

- **Content updates**: all text is in `/messages/`, all project data in `/data/` — no component changes needed for content updates
- **Design changes**: color and spacing tokens in `tailwind.config.ts` propagate everywhere — change once, update everywhere
- **Animation changes**: `lib/motion.ts` centralizes all variants — update once, affects all sections
- **Git history**: atomic commits per feature make `git blame` and `git bisect` useful for debugging
