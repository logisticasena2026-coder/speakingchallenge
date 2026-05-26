# DESIGN.md — speakingchallenge Frontend Redesign

> Versión rediseñada de la landing page de **speakingchallenge**, una plataforma gamificada de aprendizaje de inglés contextualizada en eras históricas. El diseño mantiene la identidad oscura y épica del original, elevando craft, jerarquía visual, consistencia y responsiveness.

---

## 1. Concepto Visual

**Dirección estética:** Dark Epic / Game UI Premium

El diseño hereda la paleta oscura del original pero la ejecuta con mayor precisión: superficies con elevación real, bordes basados en opacidad, tipografía con personalidad propia (Cinzel para display, Space Grotesk para cuerpo), y una jerarquía de color que susurra estructura en lugar de gritarla.

**Una frase que lo resume:** *Control room de una nave espacial que también es un grimorio medieval.*

---

## 2. Token System (CSS Variables)

```css
/* Superficies — Elevación ascendente */
--surface-0: #07090f   /* Canvas base / fondo raíz */
--surface-1: #0d1017   /* Secciones alternas */
--surface-2: #121620   /* Cards y paneles */
--surface-3: #181d2a   /* Elementos destacados */
--surface-4: #1f2535   /* Hover states, chips */

/* Texto — Jerarquía en 4 niveles */
--text-primary:   #f0ede8   /* Títulos, contenido principal */
--text-secondary: #9ca3a0   /* Descripciones, subtextos */
--text-muted:     #5a6270   /* Labels, metadata, placeholders */

/* Bordes — Siempre basados en opacidad */
--border-subtle:  rgba(255,255,255,0.06)
--border-default: rgba(255,255,255,0.10)
--border-strong:  rgba(255,255,255,0.18)

/* Brand Colors */
--brand-green:  #3dd68c   /* Acento primario, CTAs, progreso */
--brand-amber:  #f5a623   /* Era Egipto, énfasis secundario */
--brand-cyan:   #22d3ee   /* Era Cibernética, highlights técnicos */
--brand-purple: #a855f7   /* Boss Final, elementos premium */
```

---

## 3. Tipografía

| Rol          | Fuente           | Weights    | Uso                                      |
|-------------|-----------------|------------|------------------------------------------|
| `--font-display` | Cinzel (serif) | 400, 600, 700 | Headings H1–H3, nombres de eras, nombres de sistemas |
| `--font-body`    | Space Grotesk  | 300, 400, 500, 600 | Body copy, descripciones, UI text |
| `--font-ui`      | Inter          | 400, 500, 600 | Labels, badges, metadata, números |

**Tamaños responsivos:**
- H1 hero: `clamp(36px, 7vw, 80px)` — nunca salta de golpe entre breakpoints
- H2 secciones: `text-3xl sm:text-4xl lg:text-5xl`
- Body: `text-sm sm:text-base`

**Regla:** Si el texto es navegacional o clasificatorio (badges, labels, section labels) → Inter. Si es narrativo o de marca → Cinzel o Space Grotesk.

---

## 4. Sistema de Color por Era

| Era              | Color Primario | Gradiente de Fondo                       | Badge    |
|-----------------|---------------|------------------------------------------|----------|
| Era Vikinga      | Azul marino   | `#0a1628 → #1a3a5c → #0d2a45`           | Bronce   |
| Antiguo Egipto   | Ámbar oscuro  | `#1a1200 → #3d2800 → #5c3d00`           | Plata    |
| Roma Imperial    | Rojo oscuro   | `#1a0808 → #3d1515 → #5c2020`           | Oro      |
| Futuro Cibernético| Azul digital | `#0a0a1a → #0d1a3d → #0a1628`           | Diamante |

---

## 5. Sistema de Badges

```css
.badge-bronze  { bg: rgba(180,100,30,0.2);  color: #d97706; border: rgba(217,119,6,0.3) }
.badge-silver  { bg: rgba(148,163,184,0.15); color: #94a3b8; border: rgba(148,163,184,0.25) }
.badge-gold    { bg: rgba(234,179,8,0.15);  color: #eab308; border: rgba(234,179,8,0.25) }
.badge-diamond { bg: rgba(34,211,238,0.12); color: #22d3ee; border: rgba(34,211,238,0.25) }
```

Todos los badges usan:
- Font: `Inter`
- Size: `10px`
- Weight: `600`
- Letter-spacing: `0.08em`
- Text-transform: `uppercase`
- Padding: `3px 9px`
- Border-radius: `4px`

---

## 6. Componentes Clave

### Glass Card
```css
background: rgba(18, 22, 32, 0.7);
border: 1px solid var(--border-subtle);
backdrop-filter: blur(12px);
/* hover: */
border-color: var(--border-default);
transform: translateY(-2px);
box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(61,214,140,0.06);
```
Usada en: Hero overlay elements, modal de avatar.

### System Card
```css
background: var(--surface-2);
border: 1px solid var(--border-subtle);
border-radius: 12px;
/* Top line accent on hover (green gradient) */
::before { height: 2px; background: linear-gradient(90deg, transparent, #3dd68c, transparent); }
```

### Era Card
- Imagen/ilustración de fondo con gradient overlay `to top`
- Content en `position: absolute; bottom: 0`
- Estado `locked`: `filter: brightness(0.5); cursor: not-allowed`
- Hover: `translateY(-4px)` + glow sutil en borde

### Activity Card
- Preview area: `height: 100px` con mockup contextual animado (waveform, chat bubble, VS screen)
- Body: padding 20px, badge system, botón full-width

### Botón Primario
```css
background: var(--brand-green);
color: #07090f;
border-radius: 8px;
font-weight: 600;
/* Pseudo ::before con gradiente blanco para efecto gloss */
/* hover: box-shadow 0 0 24px rgba(61,214,140,0.45) + translateY(-1px) */
```

### Botón Ghost
```css
background: transparent;
border: 1px solid var(--border-subtle);
/* hover: border-color → border-default, bg rgba(255,255,255,0.04) */
```

---

## 7. Sistema de Espaciado

Base unit: **4px** (Tailwind's default).

| Token         | Valor  | Uso                          |
|--------------|--------|------------------------------|
| `gap-2`      | 8px    | Entre badges, pills          |
| `gap-4`      | 16px   | Entre cards en móvil         |
| `gap-5`      | 20px   | Entre cards en tablet        |
| `gap-6`      | 24px   | Entre cards en desktop       |
| `p-5`        | 20px   | Padding cards compact        |
| `p-6`        | 24px   | Padding cards standard       |
| `py-20`      | 80px   | Padding sección móvil        |
| `py-28`      | 112px  | Padding sección desktop      |
| `px-4 sm:px-6` | 16px/24px | Padding horizontal global |

---

## 8. Depth Strategy

**Estrategia elegida: Surface Color Shifts + Subtle Shadows**

- Elevación entre secciones: alternar `--surface-0` y `--surface-1`
- Cards: `--surface-2`
- Hover states en cards: `shadow 0 16px 32px rgba(0,0,0,0.3)`
- No se usa `box-shadow` como único mecanismo — se combina con `border-color` transitions
- Dark backgrounds: shadows son casi invisibles, se apoya más en `border` transitions

**Regla:** Squint test. Al difuminar la vista, ¿se percibe jerarquía? Si dos cards se funden → aumentar diferencia de surface o borde.

---

## 9. Animaciones y Motion

| Elemento          | Animación                         | Duración |
|------------------|-----------------------------------|----------|
| Cards hover       | `translateY(-2px)` a `(-4px)`    | 250ms ease |
| Botones hover     | `translateY(-1px)` + glow         | 200ms ease |
| Waveform bars     | `scaleY` 0.4 → 1 loop            | 1.2s ease-in-out |
| Hero elements     | `fadeUp` staggered (delay 0→400ms)| 600ms ease-out |
| Nav links         | `::after scaleX(0→1)`            | 200ms ease |
| Online badge      | `pulse` opacity                   | 2s ease-in-out |

**Regla:** No hay springs ni bounces. Todo es `ease-out` para sensación profesional.

---

## 10. Responsive System

**Mobile-first**: base styles son móvil, se expande con `md:` y `lg:`.

### Breakpoints
| BP   | px      | Layout                              |
|------|---------|-------------------------------------|
| base | 0+      | 1 col, full-width, stacked          |
| sm   | 640px+  | 2 cols en grids                     |
| md   | 768px+  | 2 cols hero, nav full               |
| lg   | 1024px+ | 3-4 cols grids, desktop layout      |
| xl   | 1280px+ | Max-width containers                |

### Grids por sección
- **Eras:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- **Sistemas:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **Actividades:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **Juegos:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- **Créditos:** `grid-cols-1 md:grid-cols-3` con `md:row-span-2` para card featured

### Navegación
- Móvil: logo + hamburger icon únicamente
- Desktop (`md+`): nav horizontal completo
- Mobile menu: `position: fixed; inset: 0; display: flex flex-col; z-index: 100`

### Skill Tree
- Desktop: flex horizontal con conectores
- Móvil: `overflow-x: auto` (scroll horizontal sin scrollbar visible)

### Touch targets
- Todos los botones e interactivos: mínimo `h-11` (44px)

---

## 11. Efectos de Fondo

### Noise Texture
```css
body::before {
  background-image: url("data:image/svg+xml, ... feTurbulence ...");
  opacity: 0.4;
  pointer-events: none;
  position: fixed; inset: 0;
}
```
Añade textura sutil sin afectar legibilidad.

### Mesh Gradient (Hero)
```css
background:
  radial-gradient(ellipse 80% 60% at 20% 10%, rgba(61,214,140,0.07) ...),
  radial-gradient(ellipse 60% 50% at 80% 90%, rgba(34,211,238,0.05) ...),
  radial-gradient(ellipse 50% 40% at 60% 40%, rgba(168,85,247,0.04) ...);
```

### Decorative Orbs
Círculos con `filter: blur(60px)` y `opacity: 0.04–0.07`. Nunca opacos, nunca dominantes.

---

## 12. Íconos y Emojis

- Íconos de sistema: SVG inline (Heroicons style, `stroke-width: 2`)
- Íconos de juegos: emojis nativos (🐍 🎪 🚀 🧱) — encajan con la estética gamificada
- Ícono de lock: SVG lock custom para eras bloqueadas
- Waveform: SVG generativo con divs animados (CSS `scaleY`)

---

## 13. Scrollbar Custom

```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--surface-1); }
::-webkit-scrollbar-thumb { background: var(--brand-green); border-radius: 4px; }
```

Integrado con la paleta, refuerza identidad verde del sistema.

---

## 14. Estructura de Secciones (Orden)

```
1. Nav (sticky)
2. Hero — headline + CTA + feature pills + waveform deco
3. Eras — grid 4 eras con ilustraciones SVG
4. Sistemas — grid 6 sistemas (engranaje pedagógico)
5. Actividades — grid 6 actividades con previews interactivos
6. Emily — layout 2 cols (imagen + contenido)
7. Mapa / Skill Tree — 5 escalones horizontales
8. Juegos — 4 juegos arcade
9. Créditos — grid equipo
10. CTA Final — email capture
11. Footer
```

Alternancia de `--surface-0` y `--surface-1` entre secciones crea ritmo visual sin líneas divisorias explícitas.

---

## 15. Lo que NO está implementado (pendiente de lógica)

- **Autenticación / Login / Registro** — excluido por solicitud explícita
- **Crear Avatar** — modal presente en UI original, excluido
- **Lógica de progreso real** — estados de era (desbloqueado/bloqueado) son estáticos
- **Mobile menu open/close JS** — hamburger conectado pero requiere wiring del dev (`// TODO: wire up mobile menu toggle` en código)
- **Actividades reales** — botones "Abrir actividad" son placeholders
- **Backend / API** — CTA email es HTML puro, requiere integración

---

## 16. Checklist de Calidad

- [x] No hay scroll horizontal en ningún viewport
- [x] Nav colapsa en hamburger en móvil
- [x] Todas las grids van a `grid-cols-1` en base
- [x] Headings usan `clamp()` o clases responsive
- [x] Padding de secciones es responsivo (`py-20 sm:py-28`)
- [x] Botones CTA son `w-full` en móvil, `w-auto` en `sm+`
- [x] Touch targets ≥ 44px
- [x] Squint test: jerarquía legible a vista borrosa
- [x] Contenido coherente: strings reales, sin placeholders genéricos
- [x] Skill Tree scrollable horizontalmente en móvil
- [x] Waveform animado con delays escalonados orgánicos

---

*Diseñado con el skill `frontend-design-pro`. Stack: HTML + Tailwind CDN + CSS custom + Google Fonts (Cinzel, Space Grotesk, Inter).*
