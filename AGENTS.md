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

`.env*` is gitignored. Live credentials.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Prisma Postgres (SSL) |
| `EMAIL_USER` / `EMAIL_PASS` | SMTP (Gmail app password) |
| `NEXT_PUBLIC_APP_URL` | Public URL |
| `DEEPGREEM_KEY` / `NEXT_PUBLIC_DEEPGRAM_KEY` | Deepgram (typo intentional) |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Gemini Live Audio |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin login (plaintext compare, NOT bcrypt) |

## Dead Code — proxy.ts

`proxy.ts` is **not** auto-registered — Next.js only wires `middleware.ts`. The client-side equivalent is `lib/validarNavegador.ts` (imported via hooks `useValidarNavegador`). Do not touch proxy.ts.

## Auth

- Custom session auth (no NextAuth). 24h expiry. Passwords hashed with `bcrypt`.
- **Admin login**: compares credentials against `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars in plaintext. Creates/updates user with `rol: 'ADMIN'` on success. Password reset via email does NOT affect admin login (it uses env vars, not DB hash).
- Server actions accept plain objects, not FormData. Return `{ ok, message }` or throw `AppError`.
- Zod schemas at `schemas/auth/` — validate before DB calls.
- `DatosDelAutenticado()` / `requiereIngreso()` in `lib/auth.ts` call Prisma directly (no cache — fast PK lookup).
- `getSession(sessionId)` in `lib/apiVos.ts` also calls Prisma directly (no cache).
- `lib/prisma.ts` → singleton PrismaClient with `@prisma/adapter-pg`. Never `new PrismaClient()` elsewhere.
- `lib/errors.ts` → `AppError`, `ValidationError`, `UnauthorizedError`, `NotFoundError`, `ConflictError`, `DatabaseError`, `ExternalServiceError`.

## Prisma

```bash
npx prisma generate   # Output: generated/prisma/ (gitignored)
npx prisma studio     # Web DB GUI
npx prisma db push    # USE THIS instead of migrate — no shadow DB available
npx prisma db seed    # runs seed-etc.ts, seed-logistica.ts, seed-portuaria.ts concurrently
```

- `pnpm build` auto-runs `prisma generate`.
- `prisma.config.ts` loads `dotenv` — needed for `prisma` CLI outside Next.js.
- **`db push --accept-data-loss` is the safe way to apply schema changes** — migration history is out of sync with the DB.
- Full model list: `user`, `Session`, `ResetearContrasenaToken`, `FrasesDePractica`, `ProgresoFraseEstudiante`, `EstudianteProfesor`, `Examen`, `Pregunta`, `Grupo`, `GrupoEstudiante`, `AsignacionExamen`, `RespuestaEstudiante`. Enums: `Rol`, `Nivel`, `TipoPregunta`, `Skin`.

## App Routes

| Route | Purpose |
|---|---|
| `/` | Landing |
| `/auth/iniciar_sesion` | Login |
| `/auth/register` | Student register |
| `/auth/iniciar_sesion/recuperar_contrasena/` | Password recovery flow |
| `/dashboard` | Student: stats, skill tree, rituals, ranking |
| `/dashboard/configuracion` | Settings (avatar, theme, font) |
| `/dashboard/estudiar` | Study mission config |
| `/dashboard/estudiar/practicando` | Practice mode (phrase-by-phrase) |
| `/dashboard/estudiar/estadisticas` | Practice statistics |
| `/dashboard/emily` | AI chat with Gemini Live Audio |
| `/dashboard/actividades-profesor` | Student: assigned exams from professors |
| `/dashboard/actividades-profesor/[examenId]` | Resolve an exam |
| `/profesor/*` | Professor panel: dashboard, estudiantes, examenes, grupos, resultados |
| `/profesor/register` | Professor self-registration (invite code) |
| `/admin/*` | Admin panel: dashboard, estudiantes, profesores, frases (CRUD) |
| `/navegador-no-valido` | Unsupported browser page |
| `GET /api/vos?text=...` | TTS via Deepgram, returns `audio/mpeg` |

## Practice Mode

Filters (tematica, dificultad, edad, creador) use **cascading dropdowns** — selecting one filter limits the options in the others. Options computed via `obtenerOpcionesFiltros()` in `actions/frases.ts` (each dimension excludes itself from the WHERE clause).

Two modes controlled by `protocoloGrupo` in `useFrasesStore`:

| Mode | Scoring store | UI component |
|---|---|---|
| `solitario` | `usePracticaStore.estadisticas` | `PromedioSolitario` (side panel) |
| `escuadron` | `useSesionPracticaStore.puntajesPorIntegrante` | `PromedioEquipos` (horizontal row, hidden on mobile) |

**Team setup** (`ModoEstudio.tsx` + `Configuraciones.tsx` drawer):
- Groups managed via `agregarGrupo` / `quitarGrupo`.
- All groups saved at once via `setAllGruposConfig(formData)` on "Iniciar practica".
- Validation: all groups need name + integrants filled (`gruposInsuficientes`).

## Exam/Group Duplicate Protection

Professors cannot have two exams with the same `titulo` or two groups with the same `nombre` (case-insensitive). Protected at both app layer (`findFirst` checks with `mode: 'insensitive'`) and DB layer (`@@unique([profesor_id, titulo])`, `@@unique([profesor_id, nombre])`).

## Admin Phrases Page

Full CRUD + search + cascading filters (tematica, dificultad, edad, creador). Filters stored in URL searchParams. Filter options computed server-side via `obtenerOpcionesFiltros()` in `actions/admin/obtenerOpcionesFiltros.ts`.

## Avatar Generation

Students and professors get DiceBear avatars on creation: `https://api.dicebear.com/9.x/glass/svg?seed=${name}&radius=50`. CSP whitelisted for `api.dicebear.com`.

## Google Gemini Live Audio (Emily)

- `lib/Geminilive .ts` (space in filename — treat path as-is) → Google GenAI client
  - Model: `gemini-2.5-flash-native-audio-preview-12-2025`. Voice: `Leda`.
  - Uses `@google/genai` SDK (`ai.live.connect()`), not the REST API.
- `lib/handel.ts` → `MediaHandler` class for Web Audio API (PCM via AudioWorklet)
  - Keep `audioContext` alive across mic stop/start cycles (close crashes AudioWorkletNode). Disconnect nodes explicitly instead.
- `lib/chromeSpeech.ts` → Chrome Speech Recognition fallback.

## Key Architecture

- **Next.js 16 App Router** — no `pages/`. `cacheComponents: true` enabled.
- **Tailwind CSS v4** — config in `app/globals.css` via `@theme inline`. No `tailwind.config.ts`. PostCSS: `@tailwindcss/postcss`.
- **Spanish naming** everywhere: routes, DB models, server actions, variables.
- **Toast** — `sileo`. Pattern: `sileo.promise(fn, { loading, success, error })`.
- **State** — 5 Zustand stores at `store/`: `useFrasesStore`, `usePracticaStore`, `useSesionPracticaStore`, `useConfiguracionUsuario` (persisted), `useEmilyStore`.
- **shadcn/ui** — style `radix-nova`, base `radix`, icons `lucide`. Registry `@magicui`.
- **Fonts** — Cinzel (display), Space Grotesk (body), Inter (ui), Geist (sans). See `app/layout.tsx`.
- **Path alias** — `@/*` → project root.
- **All custom CSS** in `app/globals.css` — no `*.module.css`.
- **4 era themes**: Viking (cyan), Egypt (gold/brown), Rome (dark red), Cyber (deep blue/neon).

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
