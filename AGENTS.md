# AGENTS.md

## Build Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build   # Runs prisma generate && next build
npm run start   # Start production server
npm run lint    # ESLint
```

**Important**: `npm run build` automatically runs `prisma generate` first — do not skip this when modifying the schema.

## Required Environment Variables

Create a `.env` file with:

- `DATABASE_URL` — PostgreSQL connection string
- `EMAIL_USER` — SMTP sender email
- `EMAIL_PASS` — SMTP app password
- `NEXT_PUBLIC_APP_URL` — Public URL for email links (e.g., http://localhost:3002)

## Prisma

```bash
npx prisma generate   # Regenerate client (always run before build)
npx prisma studio     # Open web DB GUI
npx prisma migrate dev --name <name>  # Create migration
```

Schema: `prisma/schema.prisma`, Migrations: `prisma/migrations/`

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

## Deployment

Live site: https://www.speakingchallenge.online

## Design Tokens Summary

| Token          | Value                  | Usage                                                |
| -------------- | ---------------------- | ---------------------------------------------------- |
| brand-green    | #3dd68c                | Primary accent, buttons, glows                       |
| surface-0      | #07090f                | Main background (dark)                               |
| text-primary   | #f0ede8                | Main text (warm white)                               |
| text-secondary | #b8bfbd                | Muted text (actualizado para contraste WCAG)         |
| text-muted     | #8a8f8c                | Disabled/hint text (actualizado para contraste WCAG) |
| border-default | rgba(255,255,255,0.10) | Subtle borders                                       |

## Era Themes

Each era has its own color palette defined in globals.css:

- Viking: cyan/blue gradients
- Egypt: gold/brown gradients
- Rome: dark red gradients
- Cyber: deep blue/neon gradients

---

## Accesibilidad (A11y) - Implementada Mayo 2026

**NO** repetir estas implementaciones — ya están completas:

### Archivos modificados y cambios realizados:

| Archivo                                                                                      | Cambios A11y                                                                                                                                                  |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/globals.css`                                                                            | Contraste colores corregido (text-secondary: #b8bfbd, text-muted: #8a8f8c), focus-visible, skip-link styles, prefers-reduced-motion, clase `.visually-hidden` |
| `app/layout.tsx`                                                                             | Skip link `<a href="#main-content">` al inicio del body                                                                                                       |
| `app/page.tsx`                                                                               | `<main id="main-content">` wrapper                                                                                                                            |
| `app/auth/register/page.tsx`                                                                 | `<main id="main-content">`, `aria-hidden` en iconos decorativos, `role="presentation"`                                                                        |
| `app/auth/iniciar_sesion/page.tsx`                                                           | Mismos cambios que register                                                                                                                                   |
| `app/auth/iniciar_sesion/recuperar_contrasena/confirmar_correo_contrasena/page.tsx`          | `<main id="main-content">`                                                                                                                                    |
| `app/auth/iniciar_sesion/recuperar_contrasena/nueva_contrasena/contrasena_cambiada/page.tsx` | `<main id="main-content">`, `role="status" aria-live="polite"`                                                                                                |
| `components/forms/auth/iniciarSesionForm.tsx`                                                | `autocomplete`, `aria-invalid`, `aria-describedby`, `role="alert" aria-live="polite"` en errores, `aria-label` en toggle contraseña, `aria-hidden` en iconos  |
| `components/forms/auth/registrarseForm.tsx`                                                  | Mismos cambios + `autocomplete="new-password"` en password y confirmPassword                                                                                  |
| `components/forms/auth/recuperarContrasenaForm.tsx`                                          | `autocomplete`, `aria-invalid`, `aria-describedby`, `role="alert" aria-live="polite"`, `aria-hidden` en iconos                                                |
| `components/forms/auth/nuevaContrasenaForm.tsx`                                              | `autocomplete="new-password"`, `aria-invalid`, `aria-describedby`, `role="alert" aria-live="polite"`, `aria-label` en toggle                                  |
| `components/layout/Header.tsx`                                                               | `aria-label="Navegación principal"`, `alt="Logo de PlayLenguage"`, `aria-label="Abrir menú de navegación"` en hamburger                                       |
| `components/layout/Footer.tsx`                                                               | `role="contentinfo" aria-label="Pie de página"`                                                                                                               |
| `components/Landing/Eras.tsx`                                                                | `role="list"`, `role="listitem"`, `tabIndex={0}`, `aria-label` en cada tarjeta                                                                                |
| `components/Landing/Actividades.tsx`                                                         | `aria-label` únicos en cada botón ("Abrir actividad: [nombre]")                                                                                               |
| `components/Landing/Sistemas.tsx`                                                            | `aria-label` en botón de video                                                                                                                                |
| `components/Landing/Presentacion.tsx`                                                        | `aria-hidden` en emojis, `role="list"`, `role="listitem"` en feature-pills                                                                                    |
| `components/Landing/Creditos.tsx`                                                            | `role="list"`, `role="listitem"` en team cards                                                                                                                |
| `components/Landing/Sophia.tsx`                                                              | `role="list"`, `role="listitem"` en capabilities, `aria-hidden` en dots decorativos                                                                           |
| `components/Landing/Mapa.tsx`                                                                | `role="list"`, `role="listitem"` en steps, `aria-hidden` en iconos SVG y emojis                                                                               |
| `components/Landing/Juegos.tsx`                                                              | `role="list"`, `role="listitem"` en game cards, `aria-hidden` en emojis                                                                                       |
| `components/sonido.tsx`                                                                      | `role="presentation" aria-hidden="true"`                                                                                                                      |
| `app/loading.tsx`                                                                            | `<main id="main-content">`, `role="status" aria-live="polite"`                                                                                                |
| `app/error.tsx`                                                                              | `<main id="main-content">`, `role="alert"`                                                                                                                    |
| `app/not-found.tsx`                                                                          | `<main id="main-content">`, `role="status" aria-live="polite"`                                                                                                |

### Reglas de accesibilidad ya aplicadas:

- Skip link para saltar navegación
- Contraste WCAG AA mínimo (4.5:1)
- prefers-reduced-motion para animaciones
- Focus states visibles con outline brand-green
- Landmarks semánticos (main, nav, footer)
- Formularios con labels asociados, autocomplete, aria-invalid, aria-live en errores
- Iconos decorativos con aria-hidden
- Botones con aria-label únicos cuando hay múltiples similares
- Target sizes recomendados (los botones ya tienen padding adecuado)
- Jerarquía de headings (H1 único por página)

---

## SEO - Implementado Mayo 2026

**NO** repetir estas implementaciones — ya están completas:

### Archivos modificados y creados:

| Archivo                                                                                      | Acción                                                                                |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `app/layout.tsx`                                                                             | Metadata completa (title, description, keywords, OpenGraph, Twitter Cards, canonical) |
| `app/auth/register/page.tsx`                                                                 | Metadata con `robots: { index: false }`                                               |
| `app/auth/iniciar_sesion/page.tsx`                                                           | Metadata con `robots: { index: false }`                                               |
| `app/auth/iniciar_sesion/recuperar_contrasena/page.tsx`                                      | Metadata con `robots: { index: false }`                                               |
| `app/auth/iniciar_sesion/recuperar_contrasena/confirmar_correo_contrasena/page.tsx`          | Metadata con `robots: { index: false }`                                               |
| `app/auth/iniciar_sesion/recuperar_contrasena/nueva_contrasena/page.tsx`                     | Metadata con `robots: { index: false }`                                               |
| `app/auth/iniciar_sesion/recuperar_contrasena/nueva_contrasena/contrasena_cambiada/page.tsx` | Metadata con `robots: { index: false }`                                               |
| `public/robots.txt`                                                                          | Creado - permite crawl, bloquea /auth/\*                                              |
| `public/sitemap.xml`                                                                         | Creado - incluye página principal                                                     |

### Configuración SEO implementada:

- Title y description optimizados con keywords
- Open Graph tags para redes sociales (usando /FoundPage.webp)
- Twitter Cards
- Canonical URL: https://www.speakingchallenge.online
- Páginas de auth con noindex
- Sitemap XML submitted
- robots.txt configurado

### URL del sitio:

- Dominio: https://www.speakingchallenge.online
- OG Image: /FoundPage.webp (1200x630)
