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

## Middleware (`proxy.ts`, not `middleware.ts`)

- Named `proxy.ts`, not `middleware.ts`. Function is exported as `proxy`, not `middleware`. Next.js won't auto-register this — if it currently works something else wires it in.
- Matcher: `/dashboard/:path*`
- **Browser check first**: allows Chrome / Edge / Safari only. Firefox, Opera, etc. → `/navegador-no-valido`
- Then checks `sessions_id` cookie → `/auth/iniciar_sesion` if missing
- No standard `middleware.ts` file exists

## Auth

- Custom session auth (no NextAuth). 24h expiry. Passwords hashed with `bcrypt`.
- Server actions (`actions/auth/`) accept plain objects, not FormData. Return `{ ok, message, avatar? }`.
- `actions/auth/iniciarSesion.ts` → `iniciar_session({ correo, contrasena })`
- `actions/auth/registro.ts` → `registro({ nombre_usuario, correo, contrasena })`
- `actions/auth/CerrarSesion.ts` → `CerrarSesion()` **BUG**: deletes `session_id` cookie but the real cookie is `sessions_id`
- `actions/auth/nuevaContrasena.ts` → password reset action (also `schemas/auth/` for Zod schemas)
- `schemas/auth/login.ts`, `schemas/auth/register.ts` → Zod schemas for form validation
- `lib/auth.ts` → `DatosDelAutenticado()` (returns user or redirects), `requiereIngreso()` (boolean)
- `lib/apiVos.ts` → `getSession(sessionId)` with in-memory cache for API routes
- `lib/errors.ts` → custom error classes: `AppError`, `ValidationError`, `UnauthorizedError`, `NotFoundError`, `ConflictError`, `DatabaseError`, `ExternalServiceError`

## Prisma

```bash
npx prisma generate   # Output: generated/prisma/ (gitignored)
npx prisma studio     # Web DB GUI
npx prisma migrate dev --name <name>
```

- `pnpm build` auto-runs `prisma generate`. Seed file `prisma/seed.ts` is commented out.
- `prisma.config.ts` loads `dotenv` — needed for `prisma migrate` outside of Next.js.
- `pnpm-workspace.yaml` whitelists `prisma` and `@prisma/engines` in `onlyBuiltDependencies`.
- 4 models: `user`, `Session`, `ResetearContrasenaToken`, `FrasesDePractica`
- 2 enums: `Nivel` (5 values), `Skin` (18 empire values)

## App Routes

| Route | What it does | Key imports |
|---|---|---|
| `/` | Landing page (hero, eras, systems, activities, Mapa, games) | All `@/components/Landing/*` |
| `/auth/iniciar_sesion` | Login form | `IniciarSesionForm`, `Particles` |
| `/auth/register` | Registration form | `RegistrarseForm`, `Particles` |
| `/auth` layout | Redirects to `/dashboard` if already authenticated | `requiereIngreso` |
| `/dashboard` | Stats, skill tree, rituals, ranking | Inline JSX (no component imports) |
| `/dashboard/configuracion` | Settings (avatar, theme, font size) | `AvatarStudio`, `SectionCard`, `FontSizeSelector`, `ThemeSelector`, `CerrarSesion` |
| `/dashboard/estudiar` | Study mission config | `Configuraciónes`, `ErasPractica`, `Stasts` |
| `/dashboard/estudiar/practicando` | Practice mode (phrase-by-phrase) | `HeaderPractica`, `MuestraDeFrases`, `Nivel` |
| `/dashboard/sophia` | AI chat with real-time audio | `TextAi`, `TextUser`, `lib/Geminilive .ts`, `lib/handel.ts` |
| `/navegador-no-valido` | Unsupported browser page | `Particles` |
| `GET /api/vos?text=...` | TTS via Deepgram, returns `audio/mpeg` | `lib/apiVos`, `lib/logger` |

## Practica Component Chain

`MuestraDeFrases` (at `practicando/page.tsx`) imports internally:
- `ControlesCelular`, `EstadisticaEstudiantePractica`, `Frase`, `TuPronunciacion`, `OpcionesMicrofono`, `EstadisticasDeFrases`
- Stores: `useFrasesStore` (Zustand — frase data/pagination), `usePracticaStore` (Zustand — `texto`, `grabando`, `tiempo` for practice session state)
- Actions: `obtenerFrases`, `contarFrases` from `actions/frases.ts`

## Google Gemini Live Audio (Sophia)

- `lib/Geminilive .ts` (space in filename — treat path as-is) → Google GenAI client
  - Model: `gemini-2.5-flash-native-audio-preview-12-2025`. API key hardcoded in file.
  - Exports `createSession(callbacks)` → `{ session, mediaHandler }`
- `lib/handel.ts` → `MediaHandler` class for Web Audio API (PCM capture/playback via AudioWorklet)
  - AudioWorklet module: `public/static/pcm-processor.js` (included in tsconfig)

## Key Architecture

- **App Router only** — no `pages/`. All routes under `app/`.
- **Tailwind CSS v4** — config in `app/globals.css` via `@theme inline`. No `tailwind.config.ts`.
- **Spanish naming** everywhere: routes, DB models, server actions.
- **Toast** — `sileo`. Pattern: `sileo.promise(fn, { loading, success, error })` or `sileo.error({ title, description })`.
- **State** — Zustand stores at `store/`: `useFrasesStore`, `usePracticaStore`, `useConfiguracionUsuario` (persisted), `useSophiaStore`.
- **shadcn/ui** — style `radix-nova`, icons `lucide`. Registry `@magicui`. See `components.json`.
- **Fonts** — Cinzel (`font-display`), Space Grotesk (`font-body`), Inter (`font-ui`), Geist (`font-sans`). Configured in `app/layout.tsx`.
- **Security headers** — CSP, HSTS, X-Frame-Options, etc. configured in `next.config.ts`.
- **Design tokens** — see `DESIGN.md` for surface colors, spacing, era themes, animations.

## Conventions

- Path alias: `@/*` → project root.
- All custom CSS in `app/globals.css` (~1832 lines) — no `*.module.css`.
- 4 era themes: **Viking** (cyan), **Egypt** (gold/brown), **Rome** (dark red), **Cyber** (deep blue/neon).
- `generated/prisma/` gitignored — must run `prisma generate` after schema changes.
- ESLint flat config at `eslint.config.mjs` — no `.eslintrc.*`.
- `lib/utils.ts` → `cn()` helper (`clsx` + `tailwind-merge`).
- `lib/logger.ts` → structured logger (debug/info/warn/error) with context.

## Already Implemented (Do Not Repeat)

**Accessibility (WCAG AA):** Skip link, `prefers-reduced-motion`, semantic landmarks, `aria-invalid` + `aria-live` on forms, decorative icons with `aria-hidden`, focus-visible outline `brand-green`.

**SEO:** Full metadata in `layout.tsx` (OG, Twitter Cards, canonical, robots). Auth pages: `robots: { index: false }`. `public/robots.txt` + `public/sitemap.xml` exist. OG image: `/FoundPage.webp`.

## Dormant / Removed

| Path | Notes |
|---|---|
| `lib/deepGrem2.ts` | **Removed** — STT replaced by Google Gemini Live Audio |
| `lib/gemini.ts` | **Removed** — no longer exists |
| `lib/streaming/`, `lib/text/`, `lib/audio/` | **Removed** — directories no longer exist |
| `prisma/seed.ts` | Exists but fully commented out |
