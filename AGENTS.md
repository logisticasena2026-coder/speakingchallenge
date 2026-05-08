# AGENTS.md

## Build Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build   # Runs prisma generate && next build
npm run lint    # ESLint
```

**Important**: `npm run build` automatically runs `prisma generate` first — do not skip this when modifying the schema.

## Tailwind CSS v4

This project uses Tailwind CSS v4, not v3. There is **no `tailwind.config.ts`** — config lives in `app/globals.css` using `@theme inline` directive.

Key custom tokens:
- Colors: `brand-green`, `brand-amber`, `brand-cyan`, `brand-purple`, `surface-0` through `surface-4`, `text-primary`, `text-secondary`, `text-muted`, `border-subtle`, `border-default`, `border-strong`
- Fonts: `font-body` (Space Grotesk), `font-display` (Cinzel), `font-ui` (Inter)

## Next.js 16

This is Next.js 16.2.4 — a version with breaking changes from older Next.js. Read deprecation notices in `node_modules/next/dist/docs/` if needed. App Router only, no pages directory.

## Database

Prisma 7.8.0 with PostgreSQL. Schema in `prisma/schema.prisma`. Migrations in `prisma/migrations/`. Requires `DATABASE_URL` in `.env`.

## Components

- Custom components in `components/Landing/` and `components/layout/`
- UI primitives in `components/ui/` (button.tsx, etc.)
- Toast notifications: `components/SileoToaster.tsx` uses `sileo` package
- shadcn/ui integrated via `@import "shadcn/tailwind.css"` in globals.css

## Fonts

- Display/Headings: **Cinzel** (serif, epic/historical feel)
- Body: **Space Grotesk** (modern sans)
- UI/Badges: **Inter**

Configured in `app/layout.tsx` via `next/font/google`.

## Testing

No test runner configured (no Vitest, Jest, or Playwright in package.json). Run `npm run dev` to manually verify changes.

## Design Tokens Summary

| Token | Value | Usage |
|-------|-------|-------|
| brand-green | #3dd68c | Primary accent, buttons, glows |
| surface-0 | #07090f | Main background (dark) |
| text-primary | #f0ede8 | Main text (warm white) |
| text-secondary | #9ca3a0 | Muted text |
| border-default | rgba(255,255,255,0.10) | Subtle borders |

## Era Themes

Each era has its own color palette defined in globals.css:
- Viking: cyan/blue gradients
- Egypt: gold/brown gradients
- Rome: dark red gradients
- Cyber: deep blue/neon gradients