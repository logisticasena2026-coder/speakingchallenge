# AGENTS.md

## Build Commands

```bash
pnpm dev      # Start dev server (http://localhost:3000)
pnpm build   # Runs prisma generate && next build
pnpm start   # Start production server
pnpm lint    # ESLint
```

**Important**: `pnpm build` auto-runs `prisma generate` — always use it after schema changes.

## Required Environment

Create `.env`:
- `DATABASE_URL` — PostgreSQL connection
- `EMAIL_USER` — SMTP sender email
- `EMAIL_PASS` — SMTP app password
- `NEXT_PUBLIC_APP_URL` — Public URL (e.g., http://localhost:3002)

## Prisma

```bash
npx prisma generate   # Always run before build after schema changes
npx prisma studio     # Web DB GUI
npx prisma migrate dev --name <name>  # Create migration
```

Schema: `prisma/schema.prisma`, Migrations: `prisma/migrations/`

## Tech Stack

- **Next.js**: 16.2.4 (App Router only, no pages directory)
- **React**: 19.2.4
- **Prisma**: 7.8.0 + PostgreSQL
- **Tailwind CSS**: v4 (no `tailwind.config.ts` — config in `app/globals.css` with `@theme inline`)

## Tailwind v4 Tokens

Colors: `brand-green`, `brand-amber`, `brand-cyan`, `brand-purple`, `surface-0`–`surface-4`, `text-primary`, `text-secondary`, `text-muted`, `border-default`

Fonts: `font-body` (Space Grotesk), `font-display` (Cinzel), `font-ui` (Inter)

## Design Tokens Summary

| Token          | Value                  | Usage                                                |
| -------------- | ---------------------- | ---------------------------------------------------- |
| brand-green    | #3dd68c                | Primary accent, buttons, glows                       |
| surface-0      | #07090f                | Main background (dark)                               |
| text-primary   | #f0ede8                | Main text (warm white)                               |
| text-secondary | #b8bfbd                | Muted text (WCAG contrast)                           |
| text-muted     | #8a8f8c                | Disabled/hint text (WCAG contrast)                   |
| border-default | rgba(255,255,255,0.10) | Subtle borders                                       |

## Era Themes (globals.css)

- **Viking**: cyan/blue gradients
- **Egypt**: gold/brown gradients
- **Rome**: dark red gradients
- **Cyber**: deep blue/neon gradients

## Component Structure

- `components/Landing/` — Landing page sections
- `components/layout/` — Header, Footer
- `components/ui/` — shadcn primitives
- `components/forms/auth/` — Auth forms
- Toast: `components/SileoToaster.tsx` uses `sileo` package

## Fonts

- Display/Headings: **Cinzel** (serif, epic)
- Body: **Space Grotesk** (modern sans)
- UI: **Inter**

Configured in `app/layout.tsx` via `next/font/google`.

## Testing

No test runner. Manual verification via `pnpm dev`.

## Deployment

Live: https://www.speakingchallenge.online

## Key Files to Check

- `app/globals.css` — Tailwind v4 theme config, era color palettes
- `next.config.ts` — CSP headers, security config (includes https://api.dicebear.com in img-src)
- `prisma/schema.prisma` — DB models
- `opencode.json` — MCP config for shadcn

---

## Already Implemented (Do Not Repeat)

### Accessibility (WCAG AA)
- Skip link, contrast colors (text-secondary: #b8bfbd, text-muted: #8a8f8c)
- prefers-reduced-motion, semantic landmarks (main, nav, footer)
- Forms: autocomplete, aria-invalid, aria-live errors
- Iconos decorativos con aria-hidden
- Focus states con outline brand-green

### SEO
- Full metadata in layout.tsx (title, description, OpenGraph, Twitter Cards, canonical)
- Auth pages: `robots: { index: false }`
- `public/robots.txt` and `public/sitemap.xml` configured
- OG Image: `/FoundPage.webp` (1200x630)