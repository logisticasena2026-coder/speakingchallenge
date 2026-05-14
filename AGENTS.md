# AGENTS.md

## Dev Commands

```bash
pnpm dev          # http://localhost:3000 (not 3002 despite .env)
pnpm build        # prisma generate && next build — always run after schema changes
pnpm lint         # ESLint flat config v9 — run before committing
pnpm install      # sync pnpm-lock.yaml after pulling
```

No test runner exists. Manual verification via `pnpm dev`.

## Required Environment (.env)

Live credentials committed to `.env` (gitignored by `.env*` but file is committed — treat with care).

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Prisma Postgres (SSL required) |
| `EMAIL_USER` / `EMAIL_PASS` | SMTP (Gmail app password) |
| `NEXT_PUBLIC_APP_URL` | Public URL |
| `DEEPGREEM_KEY` | Deepgram API key (typo in name intentional) |
| `NEXT_PUBLIC_DEEPGRAM_KEY` | Same key exposed client-side |

## Prisma

```bash
npx prisma generate   # Output: generated/prisma/ (non-standard path, gitignored)
npx prisma studio     # Web DB GUI
npx prisma migrate dev --name <name>
```

- Uses `@prisma/adapter-pg` (not `@prisma/client` default driver). See `lib/prisma.ts`.
- 4 models: `user`, `Session`, `ResetearContrasenaToken`, `FrasesDePractica` + 2 enums.
- `pnpm build` auto-runs `prisma generate`.
- Seed file `prisma/seed.ts` exists but is fully commented out.

## Middleware & Auth

- `proxy.ts` exports `proxy` (not `middleware`). Standard Next.js `middleware.ts` does **not** exist.
- Matcher: `/dashboard/:path*`. Checks `sessions_id` cookie; redirects to `/auth/iniciar_sesion` if missing.
- Custom session auth (no NextAuth). Sessions expire in 24h. Passwords hashed with `bcrypt`.
- `actions/auth/iniciarSesion.ts` returns `{ ok, message, avatar }` pattern — not throwing errors for most cases.
- `lib/apiVos.ts` provides `getSession()` with in-memory cache for API routes.

## API Routes

| Route | Purpose |
|---|---|
| `GET /api/vos?text=...` | TTS via Deepgram `aura-2-thalia-en`, returns `audio/mpeg` |
| `GET /api/transcriptor` | Returns transient Deepgram API token (for client-side STT) |

Both validate session cookie before processing.

## Deepgram STT (Client-side)

- `lib/deepGrem2.ts` — WebSocket streaming client. Used in `OpcionesMicrofono.tsx` via mic button.
- Connects to `wss://api.deepgram.com/v1/listen` with model `nova-3`.
- Uses callbacks: `onTranscript(text, isFinal)`, `onError`, `onOpen`, `onClose`.
- Language defaults to `'en'`. Auto-detects audio codec (no `encoding` param sent).
- Mic permission denied → `sileo.error()` toast. Runtime errors also toast via `sileo.error()`.
- CSP in `next.config.ts` whitelists `wss://api.deepgram.com` and `microphone=(self)`.

## Key Architecture

- **App Router only** — no `pages/`. All routes under `app/`.
- **Tailwind CSS v4** — config in `app/globals.css` via `@theme inline`. No `tailwind.config.ts`.
- **Spanish naming** everywhere: routes (`iniciar_sesion/`, `recuperar_contrasena/`), DB models, server actions.
- **Toast** — `sileo` package. Pattern: `sileo.promise(() => asyncFn(), { loading, success, error })` or `sileo.error({ title, description })`.
- **State** — Zustand at `store/useFrasesStore.ts` (holds `texto`, `grabando`, frase pagination).
- **shadcn/ui** — style `radix-nova`, icons `lucide`. Registry includes `@magicui`. MCP configured in `opencode.json`.
- **Fonts** — `font-display` (Cinzel), `font-body` (Space Grotesk), `font-ui` (Inter). Configured in `app/layout.tsx`.

## WIP / Dormant Files

| File | Status |
|---|---|
| `lib/gemini.ts` | Fully commented out |
| `lib/Geminilive .ts` | Space in filename — treat as dormant |
| `lib/streaming/` | Directory exists but unused |
| `lib/text/` | Directory exists but unused |
| `lib/audio/` | Directory exists but unused |
| `prisma/seed.ts` | Fully commented out |

## Conventions

- Path alias: `@/*` → project root.
- All custom CSS lives in `app/globals.css` (single source of truth, ~1758 lines) — no `*.module.css` or other CSS files.
- 4 era themes in globals.css: **Viking** (cyan), **Egypt** (gold/brown), **Rome** (dark red), **Cyber** (deep blue/neon).
- Design token reference: `DESIGN.md` (321 lines) — comprehensive surface/text/border tokens.
- `generated/prisma/` is gitignored — must run `prisma generate` after schema changes.
- ESLint flat config at `eslint.config.mjs` — no `.eslintrc.*`.

## Already Implemented (Do Not Repeat)

### Accessibility (WCAG AA)
Skip link, `prefers-reduced-motion`, semantic landmarks (`main`, `nav`, `footer`), `aria-invalid` + `aria-live` on forms, decorative icons with `aria-hidden`, focus-visible `outline brand-green`.

### SEO
Full metadata in `layout.tsx` (OG, Twitter Cards, canonical, robots). Auth pages: `robots: { index: false }`. `public/robots.txt` + `public/sitemap.xml` exist. OG image: `/FoundPage.webp`.
