# AGENTS.md

## Dev Commands

```bash
pnpm dev          # http://localhost:3000 (not 3002 despite .env)
pnpm build        # prisma generate && next build — always after schema changes
pnpm lint         # ESLint flat config v9
pnpm start        # production server
pnpm doctor       # npx react-doctor@latest
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
| `NEXT_PUBLIC_GEMINI_API_KEY` | Gemini Live API key |

## Dead Code — proxy.ts

`proxy.ts` is **not** auto-registered** — Next.js only wires `middleware.ts`. The file contains browser-check + session logic for `/dashboard/:path*` that never runs. The client-side equivalent is `lib/validarNavegador.ts` (imported via hooks `useValidarNavegador`). Do not try to "fix" proxy.ts — it's intentionally disconnected.

## Auth

- Custom session auth (no NextAuth). 24h expiry. Passwords hashed with `bcrypt`.
- Server actions (`actions/auth/`) accept plain objects, not FormData. Return `{ ok, message, avatar? }`.
- Zod schemas at `schemas/auth/` — validate before DB calls.
- `DatosDelAutenticado()` / `requiereIngreso()` in `lib/auth.ts` use `'use cache'` / `cacheLife`.
- `getSession(sessionId)` in `lib/apiVos.ts` for API routes, also uses `cacheLife({ stale: 60, revalidate: 120 })`.
- `lib/prisma.ts` → singleton PrismaClient with `@prisma/adapter-pg`. Never `new PrismaClient()` elsewhere.
- `lib/errors.ts` → `AppError`, `ValidationError`, `UnauthorizedError`, `NotFoundError`, `ConflictError`, `DatabaseError`, `ExternalServiceError`.

## Prisma

```bash
npx prisma generate   # Output: generated/prisma/ (gitignored)
npx prisma studio     # Web DB GUI
npx prisma migrate dev --name <name>
npx prisma db seed    # runs seed-etc.ts, seed-logistica.ts, seed-portuaria.ts concurrently
```

- `pnpm build` auto-runs `prisma generate`.
- `prisma.config.ts` loads `dotenv` — needed for `prisma migrate` outside Next.js.
- 4 models: `user`, `Session`, `ResetearContrasenaToken`, `FrasesDePractica`
- 2 enums: `Nivel` (5 levels), `Skin` (19 empire values)
- `pnpm-workspace.yaml` whitelists `onlyBuiltDependencies`: `@google/genai`, `@prisma/engines`, `esbuild`, `msgpackr-extract`, `msw`, `prisma`, `protobufjs`

## App Routes

| Route | Purpose |
|---|---|
| `/` | Landing (hero, eras, systems, activities, map, games) |
| `/auth/iniciar_sesion` | Login |
| `/auth/register` | Register |
| `/auth/iniciar_sesion/recuperar_contrasena/` | Password recovery flow |
| `/dashboard` | Stats, skill tree, rituals, ranking |
| `/dashboard/configuracion` | Settings (avatar, theme, font size) |
| `/dashboard/estudiar` | Study mission config |
| `/dashboard/estudiar/practicando` | Practice mode (phrase-by-phrase) |
| `/dashboard/estudiar/estadisticas` | Practice statistics |
| `/dashboard/emily` | AI chat with real-time Gemini Live Audio |
| `/navegador-no-valido` | Unsupported browser page |
| `GET /api/vos?text=...` | TTS via Deepgram, returns `audio/mpeg` |

## Practice Modes

Two modes controlled by `protocoloGrupo` in `useFrasesStore`:

| Mode | Scoring store | UI component |
|---|---|---|
| `solitario` | `usePracticaStore.estadisticas` | `PromedioSolitario` (side panel) |
| `escuadron` | `useSesionPracticaStore.puntajesPorIntegrante` | `PromedioEquipos` (horizontal row, hidden on mobile) |

**Team setup** (`ModoEstudio.tsx` + `Configuraciones.tsx` drawer):
- Groups added/removed via `agregarGrupo` / `quitarGrupo` (push/pop single group, preserve existing data)
- **No per-group "Guardar"** — all saved at once via `setAllGruposConfig(formData)` on "Iniciar practica"
- Validation: all groups need name + integrants filled (`gruposInsuficientes`)

## Key Architecture

- **Next.js 16 App Router** — no `pages/`. `cacheComponents: true` enabled.
- **Tailwind CSS v4** — config in `app/globals.css` via `@theme inline`. No `tailwind.config.ts`. PostCSS: `@tailwindcss/postcss`.
- **Spanish naming** everywhere: routes, DB models, server actions, variables.
- **Toast** — `sileo`. Pattern: `sileo.promise(fn, { loading, success, error })` or `sileo.error({ title, description })`.
- **State** — 5 Zustand stores at `store/`: `useFrasesStore`, `usePracticaStore`, `useSesionPracticaStore`, `useConfiguracionUsuario` (persisted), `useEmilyStore`.
- **shadcn/ui** — style `radix-nova`, icons `lucide`. Registry `@magicui`.
- **Fonts** — Cinzel (display), Space Grotesk (body), Inter (ui), Geist (sans). Configured in `app/layout.tsx`.
- **Design tokens** — see `DESIGN.md` for surface colors, spacing, era themes, animations.
- **Path alias** — `@/*` → project root.
- **All custom CSS** in `app/globals.css` — no `*.module.css`.
- **4 era themes**: Viking (cyan), Egypt (gold/brown), Rome (dark red), Cyber (deep blue/neon).

## Google Gemini Live Audio (Emily)

- `lib/Geminilive .ts` (space in filename — treat path as-is) → Google GenAI client
  - Model: `gemini-2.5-flash-native-audio-preview-12-2025`. API key: `NEXT_PUBLIC_GEMINI_API_KEY`.
  - Exports `createSession(callbacks)` → `{ session, mediaHandler }`. Voice: `Leda`.
  - Uses `@google/genai` SDK (`ai.live.connect()`), not the REST API.
- `lib/handel.ts` → `MediaHandler` class for Web Audio API (PCM capture/playback via AudioWorklet)
- `lib/chromeSpeech.ts` → alternative Chrome Speech Recognition fallback

## Already Built (Do Not Re-implement)

**Accessibility (WCAG AA):** Skip link, `prefers-reduced-motion`, semantic landmarks, `aria-invalid` / `aria-live` on forms, decorative icons `aria-hidden`, focus-visible outline.

**SEO:** Full metadata in `layout.tsx` (OG, Twitter Cards, canonical, robots). Auth pages: `robots: { index: false }`. `public/robots.txt` + `public/sitemap.xml` exist. OG image: `/FoundPage.webp`.

**Vercel monitoring:** `@vercel/analytics` and `@vercel/speed-insights` both present in `app/layout.tsx`.

**Error/loading boundaries:** Segment-level `error.tsx`, `loading.tsx`, and `not-found.tsx` files exist for root, `/dashboard`, `/dashboard/estudiar`, `/dashboard/estudiar/practicando`, and `/auth`.

## Conventions

- Server actions accept plain objects, not FormData.
- Zod schemas validate before any DB operation.
- API routes use `NextRequest`/`NextResponse`, `Cache-Control`, `AbortController` timeout.
- `CLAUDE.md` is a pointer to `AGENTS.md` — edit AGENTS.md directly.
- `opencode.json` only configures shadcn MCP.
