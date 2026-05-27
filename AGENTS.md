# AGENTS.md

## Dev Commands

```bash
pnpm dev          # http://localhost:3000 (not 3002 despite .env)
pnpm build        # prisma generate && next build — always after schema changes
pnpm lint         # ESLint flat config v9
pnpm start        # production server
```

No test runner. Manual via `pnpm dev`.

## Required Environment (.env)

`.env*` is gitignored. If missing, copy from a teammate. Live credentials — treat with care.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Prisma Postgres (SSL) |
| `EMAIL_USER` / `EMAIL_PASS` | SMTP (Gmail app password) |
| `NEXT_PUBLIC_APP_URL` | Public URL |
| `DEEPGREEM_KEY` | Deepgram API key (typo intentional) |
| `NEXT_PUBLIC_DEEPGRAM_KEY` | Same key exposed client-side |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Gemini Live API key (moved from hardcoded in `lib/Geminilive .ts`) |

## Middleware (`proxy.ts`, not `middleware.ts`)

- Named `proxy.ts`, not `middleware.ts`. Exported as `proxy`, not `middleware`. Next.js won't auto-register this — if it currently works something else wires it in.
- Matcher: `/dashboard/:path*`
- **Browser check first**: allows Chrome / Edge / Safari only (not Brave). Firefox, Opera, etc. → `/navegador-no-valido`
- Then checks `sessions_id` cookie → `/auth/iniciar_sesion` if missing
- No standard `middleware.ts` file exists

## Auth

- Custom session auth (no NextAuth). 24h expiry. Passwords hashed with `bcrypt`.
- Server actions (`actions/auth/`) accept plain objects, not FormData. Return `{ ok, message, avatar? }`.
- Server actions validate input via Zod schemas from `schemas/auth/` before DB calls.
- `actions/auth/iniciarSesion.ts` → `iniciar_session({ correo, contrasena })` (uses `FormLoginSchema`)
- `actions/auth/registro.ts` → `registro({ nombre_usuario, correo, contrasena })` (uses `FormRegisterSchema`)
- `actions/auth/CerrarSesion.ts` → `CerrarSesion()` deletes `sessions_id` cookie
- `actions/auth/nuevaContrasena.ts` → password reset (uses `PasswordSchema`)
- `actions/auth/email/recuperacion/recuperarCuenta.tsx` → recovery form (uses `FormRecuperarSchema`, `AppError` subclasses)
- `schemas/auth/` → Zod schemas: `login.ts`, `register.ts`, `nuevaContrasena.ts`, `recuperarContrasena.ts`
- `lib/auth.ts` → `DatosDelAutenticado()` (returns user or redirects), `requiereIngreso()` (boolean). Uses `'use cache'` / `cacheLife` for session queries.
- `lib/apiVos.ts` → `getSession(sessionId)` for API routes, also uses `'use cache'` / `cacheLife({ stale: 60, revalidate: 120 })`
- `lib/errors.ts` → custom error classes: `AppError`, `ValidationError`, `UnauthorizedError`, `NotFoundError`, `ConflictError`, `DatabaseError`, `ExternalServiceError`
- `lib/prisma.ts` → singleton PrismaClient with `@prisma/adapter-pg` (not the default constructor). Import from here, never `new PrismaClient()`.

## Prisma

```bash
npx prisma generate   # Output: generated/prisma/ (gitignored)
npx prisma studio     # Web DB GUI
npx prisma migrate dev --name <name>
```

- `pnpm build` auto-runs `prisma generate`.
- `prisma.config.ts` loads `dotenv` — needed for `prisma migrate` outside of Next.js.
- Seed is **active** via `prisma.config.ts`: runs `tsx prisma/seed-etc.ts & tsx prisma/seed-logistica.ts & tsx prisma/seed-portuaria.ts`. Run with `npx prisma db seed`. `prisma/seed.ts` is old (commented out).
- `pnpm-workspace.yaml` whitelists these in `onlyBuiltDependencies`: `@google/genai`, `@prisma/engines`, `esbuild`, `msw`, `prisma`, `protobufjs`
- 4 models: `user`, `Session`, `ResetearContrasenaToken`, `FrasesDePractica`
- 2 enums: `Nivel` (5 values), `Skin` (19 empire values)

## App Routes

| Route | What it does | Key imports |
|---|---|---|
| `/` | Landing page (hero, eras, systems, activities, Mapa, games) | All `@/components/Landing/*` |
| `/auth/iniciar_sesion` | Login form | `IniciarSesionForm`, `Particles` |
| `/auth/register` | Registration form | `RegistrarseForm`, `Particles` |
| `/auth` layout | Redirects to `/dashboard` if already authenticated | `requiereIngreso` |
| `/auth/iniciar_sesion/recuperar_contrasena/*` | Password recovery flow (email, reset, confirm) | Various server actions |
| `/dashboard` | Stats, skill tree, rituals, ranking | Inline JSX (no component imports) |
| `/dashboard/configuracion` | Settings (avatar, theme, font size) | `AvatarStudio`, `SectionCard`, `FontSizeSelector`, `ThemeSelector`, `CerrarSesion` |
| `/dashboard/estudiar` | Study mission config | `Configuraciónes`, `ErasPractica`, `Stasts` |
| `/dashboard/estudiar/practicando` | Practice mode (phrase-by-phrase) | `HeaderPractica`, `MuestraDeFrases`, `Nivel` |
| `/dashboard/estudiar/estadisticas` | Practice statistics | Inline page |
| `/dashboard/emily` | AI chat with real-time audio | `TextAi`, `TextUser`, `lib/Geminilive .ts`, `lib/handel.ts` |
| `/navegador-no-valido` | Unsupported browser page | `Particles` |
| `GET /api/vos?text=...` | TTS via Deepgram, returns `audio/mpeg`. Uses `'use cache'` / `cacheLife` | `lib/apiVos`, `lib/logger` |

## Practica Component Chain

`MuestraDeFrases` (at `practicando/page.tsx`) imports internally:
- `ControlesCelular`, `EstadisticaEstudiantePractica`, `Frase`, `TuPronunciacion`, `OpcionesMicrofono`, `EstadisticasDeFrases`
- Stores: `useFrasesStore` (Zustand — frase data/pagination), `usePracticaStore` (Zustand — `texto`, `grabando`, `tiempo` for practice session state)
- Actions: `obtenerFrases`, `contarFrases` from `actions/frases.ts`

## Google Gemini Live Audio (Emily)

- `lib/Geminilive .ts` (space in filename — treat path as-is) → Google GenAI client
  - Model: `gemini-2.5-flash-native-audio-preview-12-2025`. API key from `NEXT_PUBLIC_GEMINI_API_KEY` env var.
  - Exports `createSession(callbacks)` → `{ session, mediaHandler }`. Voice: `Leda`.
  - Uses `@google/genai` SDK (`ai.live.connect()`), not the REST API.
- `lib/handel.ts` → `MediaHandler` class for Web Audio API (PCM capture/playback via AudioWorklet)
  - AudioWorklet module: `public/static/pcm-processor.js` (included in tsconfig)
- `lib/chromeSpeech.ts` → alternative Chrome Speech Recognition for browsers without AudioWorklet support

## Key Architecture

- **App Router only** — no `pages/`. All routes under `app/`.
- **Next.js 16** — uses `cacheComponents: true`, `'use cache'` directive, `cacheLife` / `cacheTag` for data caching (auth sessions, TTS audio, TTS text → audio).
- **Tailwind CSS v4** — config in `app/globals.css` via `@theme inline`. No `tailwind.config.ts`.
- **Spanish naming** everywhere: routes, DB models, server actions.
- **Toast** — `sileo`. Pattern: `sileo.promise(fn, { loading, success, error })` or `sileo.error({ title, description })`.
- **State** — Zustand stores at `store/`: `useFrasesStore`, `usePracticaStore`, `useConfiguracionUsuario` (persisted), `useEmilyStore`.
- **shadcn/ui** — style `radix-nova`, icons `lucide`. Registry `@magicui`. See `components.json`.
- **Fonts** — Cinzel (`font-display`), Space Grotesk (`font-body`), Inter (`font-ui`), Geist (`font-sans`). Configured in `app/layout.tsx`.
- **Security headers** — CSP, HSTS, X-Frame-Options, etc. configured in `next.config.ts`. CSP varies by dev/prod.
- **Design tokens** — see `DESIGN.md` for surface colors, spacing, era themes, animations.

## Conventions

- Path alias: `@/*` → project root.
- All custom CSS in `app/globals.css` — no `*.module.css`.
- 4 era themes: **Viking** (cyan), **Egypt** (gold/brown), **Rome** (dark red), **Cyber** (deep blue/neon).
- `generated/prisma/` gitignored — must run `prisma generate` after schema changes.
- ESLint flat config at `eslint.config.mjs` — uses `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`.
- `lib/utils.ts` → `cn()` helper (`clsx` + `tailwind-merge`).
- `lib/logger.ts` → structured logger (debug/info/warn/error) with context.
- `lib/rachas.ts` → streak/racha calculation logic for user dashboard.

## Already Implemented (Do Not Repeat)

**Accessibility (WCAG AA):** Skip link, `prefers-reduced-motion`, semantic landmarks, `aria-invalid` + `aria-live` on forms, decorative icons with `aria-hidden`, focus-visible outline `brand-green`.

**SEO:** Full metadata in `layout.tsx` (OG, Twitter Cards, canonical, robots). Auth pages: `robots: { index: false }`. `public/robots.txt` + `public/sitemap.xml` exist. OG image: `/FoundPage.webp`.

**Next.js Best Practices (applied):**
- Segment-level `error.tsx` (root, `/dashboard`, `/dashboard/estudiar`, `/dashboard/estudiar/practicando`, `/auth`), `loading.tsx` (root, `/dashboard`, `/dashboard/estudiar`, `/dashboard/estudiar/practicando`), `not-found.tsx` (root, `/dashboard`) all exist
- Components always consumed by `'use client'` parents carry the `'use client'` directive explicitly
- Server actions validate input via Zod before DB calls
- API routes use `NextRequest`/`NextResponse`, proper `Cache-Control`, and timeout via `AbortController`
- Session/TTS cache uses `'use cache'` directive with `cacheLife` (Next.js 16 cache components)

## Dormant / Removed

| Path | Notes |
|---|---|
| `lib/deepGrem2.ts` | **Removed** — STT replaced by Google Gemini Live Audio |
| `lib/gemini.ts` | **Removed** — no longer exists |
| `lib/streaming/`, `lib/text/`, `lib/audio/` | **Removed** — directories no longer exist |
| `prisma/seed.ts` | **Commented out** — superseded by `seed-etc.ts`, `seed-logistica.ts`, `seed-portuaria.ts` |
