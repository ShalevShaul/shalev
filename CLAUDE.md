# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
@docs/CLAUDE.md

## Commands

```bash
npm run dev          # start dev server
npm run build        # production build
npm run lint         # eslint
ANALYZE=true npm run build   # bundle analysis via @next/bundle-analyzer
npx tsc --noEmit     # type-check without building
```

There are no tests. Verify changes visually in the browser and confirm `npx tsc --noEmit` is clean before committing.

## Architecture notes

### Routing

`next-intl` with `app/[locale]/` — all routes are under `/en` or `/he`. Config lives in `i18n/routing.ts` and `i18n/request.ts`. No `middleware.ts` — locale detection handled by Next.js conventions.

### CSS / Tailwind tokens

Tailwind v4 has no `tailwind.config.ts`. All design tokens are CSS custom properties in `globals.css` (`:root` for light, `.dark` for dark) registered via `@theme inline`. Dark mode uses `@variant dark (&:where(.dark, .dark *))` — required for `next-themes` class strategy. Always use semantic token classes (`bg-bg`, `bg-surface`, `text-text-muted`, `text-accent`, etc.).

### SectionWrapper exception

`Services` manages its own `<section>` directly instead of using `SectionWrapper` — it needs to control `minHeight` and the CSS `position: sticky` stacking layout which is incompatible with `SectionWrapper`'s padding model.

### Content data

- `data/projects.ts` — `ProjectData[]`, `featured: boolean` controls `FeaturedProjects` (full-width rows) vs `OtherProjects` (compact grid)
- `data/skills.ts` — `skillsRow1` / `skillsRow2` fed into the CSS marquee in `Skills.tsx`
- `lib/skillIcons.ts` — maps `iconKey` strings to SVG icon components from `simple-icons`

### Contact form

React Hook Form + Zod, posts to `process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL`. Define this in `.env.local` (never commit it).

### Commits

`type(scope): description` — one concern per commit.
