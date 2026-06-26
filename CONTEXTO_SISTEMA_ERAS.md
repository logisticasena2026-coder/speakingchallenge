# Contexto completo: Sistema de Eras, Imperios y Niveles — speakingchallenge

> Este archivo es un respaldo de contexto. Si en algún momento se pierde el hilo de la conversación con el agente, sube este archivo entero para retomar el trabajo desde cero sin perder ninguna decisión ni regla de negocio.

---

## 1. Qué existe hoy

La app (`speakingchallenge`, Next.js 16 + Prisma + Postgres) tiene una sección `/dashboard/estudiar` con un panel de "Focalización de Era" que hoy es **decorativo/estático**: muestra tarjetas de Antigua Era, Medieval Era, Moderna Era, Crypto Era con estados visuales de bloqueado/disponible/activo, pero no hay tablas en la base de datos que representen Eras, Imperios o Niveles. Todo el progreso del estudiante vive aplanado en dos lugares:

- `user.frases` (Int) — contador global de frases.
- `ProgresoFraseEstudiante` — una fila por (estudiante, frase) con `precision`, `tiempo`, `intentos`.
- `user.nivel` (enum `Nivel`: PRINCIPIANTE, BASICO, BASICO_INTERMEDIO, INTERMEDIO, AVANZADO) — esto es un nivel genérico de inglés, **no** el nivel dentro de un imperio. No confundir.
- Existe un enum `Skin` con 23 nombres de imperios (de Acadio hasta Cyber Anunnaki) — parece pensado para que el avatar/skin del usuario cambie según el imperio en curso, pero no está conectado a ninguna lógica de progreso real.

No existe hoy ninguna tabla `Era`, `Imperio`, `Nivel` (de imperio), ni relación de progreso jerárquico. Hay que construirla desde cero.

## 2. La idea del usuario, en sus palabras (resumen fiel)

- La página tendrá **Eras** → cada Era tiene **Imperios** → cada Imperio tiene **Niveles**.
- El usuario inicia en: Era 1, Imperio 1, Nivel 1, Estrato Social 1 (estrato/clase social empieza en 0 realmente — ver más abajo).
- Cada nivel tiene sus propias frases asignadas (igual que hoy en `FrasesDePractica`, pero agrupadas por nivel).
- El admin necesita un **CRUD** para asignar/gestionar qué frases pertenecen a qué nivel (extensión del panel admin de frases que ya existe en `/admin/frases`).
- Cada vez que el usuario completa frases de un nivel (practicando, como en la sección de práctica actual), ese nivel acumula un **% de dominio** basado en la precisión de pronunciación.
- Al promedio de todos los niveles completados de un imperio se le llama el **promedio del imperio**. Si ese promedio cumple el umbral configurado, se desbloquea el siguiente imperio. Igual para era.
- **Importante, regla explícita del usuario:** el avance NO se basa solo en el promedio. Las tres condiciones son independientes y todas deben cumplirse en cascada:
  1. Solo puedes avanzar de **nivel** si completaste el nivel anterior.
  2. Solo puedes avanzar de **imperio** si completaste el imperio anterior (todos sus niveles).
  3. Solo puedes avanzar de **era** si completaste la era anterior (todos sus imperios).
  - El promedio/porcentaje es la condición de **calidad** (¿qué tan bien lo hiciste?), pero la **secuencialidad** (¿ya pasaste por aquí?) es una condición aparte y obligatoria. No se puede saltar de nivel 1 a nivel 5 aunque el promedio acumulado alcance el umbral.
- **Clase social / Estrato social:** es un contador progresivo que sube a medida que el usuario completa niveles dentro de una era. Cuando el usuario entra a una **nueva era**, el estrato social se reinicia a 0. Es decir, el estrato es relativo a la era actual, no es un valor global de la cuenta.
- **Frases dominadas (perfil):** cuando el usuario completa un nivel, las frases de ese nivel se suman al contador de "frases dominadas" en su perfil (hoy `user.frases`). Ejemplo dado por el usuario: si el nivel 1 tiene 10 frases y el usuario completa el nivel, se le suman 10 frases dominadas a su perfil.
- El funcionamiento general debe sentirse "como Duolingo" (progresión por mapa de niveles, desbloqueo secuencial, sensación de mundo/skill tree).
- La UI debe mantener la estructura visual actual del panel de Estudiar (las tarjetas de era) y de la sección de Practicar (el modo `solitario` / `escuadron` ya existente) — no se pide rehacer esas pantallas desde cero, sino integrar la nueva jerarquía de datos dentro de lo que ya existe, adaptando donde sea necesario.
- Se pide implementar un **sistema de logros/insignias** (Bronce / Plata / Oro, ya mencionado también en el DESIGN.md y en el PDF de reglas) — empezar con un primer set de logros básicos, ampliable después.
- Usar **shadcn** (skill + MCP de shadcn si aplica) para cualquier componente nuevo de UI, en línea con lo que ya usa el proyecto (`style: radix-nova`, `base: radix`, `icons: lucide`).

## 3. Reglas de negocio extraídas del PDF "Reglas para habilitar eras e imperios"

Documento original del usuario (transcrito fielmente, incluyendo su ejemplo numérico):

> Las reglas para desbloquear una era y un imperio están determinadas por el número de frases pronunciadas.
>
> Para desbloquear el imperio Hitita (id_imperio = 4), el aprendiz debe haber practicado al menos el acumulado del 30% de cada nivel anterior. Es decir que debe tener al menos 300 frases pronunciadas.
>
> Para aprobar el porcentaje de aceptación el estudiante debe cumplir al menos con el 53% del promedio de la pronunciación. Si el acumulado de frases del nivel supera las 300 frases Y el promedio es superior a 53%, el aprendiz ha superado ese imperio y se habilita el siguiente. En caso de no pasar el porcentaje, el estudiante tendrá la opción de **resetear el imperio actual**, y con ello se borran todos los registros que tenga en ese nivel.
>
> Insignias: si el aprendiz saca sobre 98% del porcentaje del imperio gana insignia Oro; si está sobre 75% gana insignia Plata; si está sobre 65% gana insignia Bronce.

Tabla completa de imperios (30 imperios, agrupados en 6 eras) — columnas: `id_imperio`, `era`, `imperio`, `frases` (frases de ESE imperio), `acum` (frases acumuladas hasta ese imperio inclusive), `%` (umbral de aprobación de ESE imperio), y umbrales de insignia (Bronce 65 / Plata 75 / Oro 98 — constantes en toda la tabla):

| id | Era | Imperio | Frases propias | Acumulado | % aprobación |
|----|-----|---------|----------------|-----------|---------------|
| 1 | Antigua | Imperio Antiguo de Egipto | 260 | 78 | 50 |
| 2 | Antigua | Imperio Acadio | 200 | 138 | 51 |
| 3 | Antigua | Imperio Babilónico | 400 | 258 | 52 |
| 4 | Antigua | Imperio Hitita | 300 | 348 | 53 |
| 5 | Antigua | Imperio Asirio | 100 | 378 | 54 |
| 6 | Antigua | Imperio Neobabilónico | 100 | 408 | 55 |
| 7 | Antigua | Imperio Persa | 200 | 468 | 56 |
| 8 | Antigua | Imperio Macedonio | 200 | 528 | 57 |
| 9 | Antigua | Imperio Maurya | 100 | 558 | 58 |
| 10 | Antigua | Imperio Cartaginés | 100 | 588 | 59 |
| 11 | Medieval | Imperio Romano | 100 | 618 | 60 |
| 12 | Medieval | Imperio Bizantino | 110 | 651 | 62 |
| 13 | Medieval | Califato Omeya | 109 | 683 | 64 |
| 14 | Medieval | Imperio Mongol | 100 | 713 | 66 |
| 15 | Medieval | Imperio Otomano | 100 | 743 | 68 |
| 16 | Moderna | Imperio Azteca | 100 | 773 | 70 |
| 17 | Moderna | Imperio Inca | 100 | 803 | 72 |
| 18 | Moderna | Imperio Ruso | 100 | 833 | 74 |
| 19 | Moderna | Imperio Británico | 100 | 863 | 76 |
| 20 | Moderna | Imperio Japonés | 100 | 893 | 78 |
| 21 | Crypto | Imperio Satoshi | 99 | 922 | 80 |
| 22 | Crypto | Imperio Ethereum | 100 | 952 | 82 |
| 23 | Crypto | Imperio Solaria Chain | 200 | 1012 | 84 |
| 24 | Crypto | Imperio Quantum Ledger | 100 | 1042 | 86 |
| 25 | Crypto | Imperio Nexus AI | 170 | 1093 | 88 |
| 26 | Post-Humana | Imperio Titan Vanguard | 100 | 1123 | 90 |
| 27 | Post-Humana | Imperio Cyber Anunnaki | 100 | 1153 | 92 |
| 28 | Post-Humana | Imperio Atlantech Prime | 100 | 1183 | 94 |
| 29 | Post-Humana | Imperio Omega Cyborg | 100 | 1213 | 96 |
| 30 | Post-Humana | Guardianes del Pacífico | 100 | 1243 | 98 |

**Nota de inconsistencia a resolver con el usuario (dejar que opencode pregunte o que el admin lo configure):** el PDF dice que el % de aprobación de Hitita es 53%, pero también da el ejemplo numérico de "30% de cada nivel anterior = 300 frases" — esos son dos porcentajes distintos aplicados a cosas distintas (uno es umbral de desbloqueo por frases acumuladas, otro es umbral de calidad/promedio). El esquema de datos debe poder representar AMBOS valores por separado y configurables por imperio, exactamente como está en la tabla (columna `%` por fila ≠ un solo número global).

Los umbrales de insignia (65/75/98) son constantes en las 30 filas, pero el esquema debe permitir que sean configurables por imperio de todos modos (no hardcodear), ya que el PDF los presenta como columnas de la tabla, no como constantes globales.

## 4. Decisiones tomadas por Claude (a confirmar/ajustar con el usuario)

Como el usuario pidió consejo explícito sobre cantidad de niveles y frases por nivel, estas son las recomendaciones dadas, **editables**:

- **Tamaño de nivel sugerido: 10 frases por nivel.** Es el tamaño que usa Duolingo por lección y es fácil de medir/mostrar en una barra de progreso. El número de niveles por imperio sale de dividir las "frases propias" del imperio entre 10 (ej. Imperio Antiguo de Egipto = 260 frases → 26 niveles; Imperio Hitita = 300 → 30 niveles; Imperio Satoshi = 99 → se sugiere redondear a 100 o dejar un último nivel de 9 frases).
- Esto da un total de ~124 niveles en toda la Era Antigua, lo cual es mucho para un build inicial. **Sugerencia: implementar el sistema completo (todas las tablas, lógica y UI) pero poblar con datos reales (seed) solo la Era Antigua + Imperio Antiguo de Egipto + Imperio Acadio para validar el flujo end-to-end primero**, y luego el admin va llenando el resto vía el panel CRUD.
- El estrato social (clase social) se modela como un campo numérico en el progreso del usuario **por era**, no global — se resetea a 0 al entrar a cada nueva era, sube +1 (o el incremento que se defina) por cada nivel completado dentro de esa era.

## 5. Stack y convenciones obligatorias (de AGENTS.md — resumen)

- Next.js 16 App Router, sin `pages/`. `cacheComponents: true`.
- Tailwind v4, tokens en `app/globals.css` vía `@theme inline`. No `tailwind.config.ts`.
- Prisma con `@prisma/adapter-pg`, singleton en `lib/prisma.ts`. Nunca instanciar `PrismaClient` aparte.
- Cambios de esquema se aplican con `npx prisma db push --accept-data-loss` (no hay shadow DB, no usar `migrate`).
- Server actions reciben objetos planos (no FormData), devuelven `{ ok, message }` o lanzan `AppError` (`lib/errors.ts`: `ValidationError`, `UnauthorizedError`, `NotFoundError`, `ConflictError`, `DatabaseError`, `ExternalServiceError`).
- Validación con Zod antes de cualquier llamada a la DB. Schemas en `schemas/`.
- Nomenclatura en español para rutas, modelos, server actions y variables.
- Toast con `sileo` (`sileo.promise(fn, { loading, success, error })`).
- Estado en Zustand, stores en `store/`: `useFrasesStore`, `usePracticaStore`, `useSesionPracticaStore`, `useConfiguracionUsuario` (persisted), `useEmilyStore`.
- shadcn/ui: style `radix-nova`, base `radix`, iconos `lucide`, registry `@magicui`. MCP de shadcn ya configurado en `opencode.json`.
- Fuentes: Cinzel (display), Space Grotesk (body), Inter (ui).
- Rutas relevantes ya existentes: `/dashboard/estudiar` (config de misión), `/dashboard/estudiar/practicando` (modo práctica frase por frase), `/dashboard/estudiar/estadisticas`, `/admin/frases` (CRUD de frases ya existe — extender, no recrear).
- Modo práctica: filtros en cascada (tematica, dificultad, edad, creador) vía `obtenerOpcionesFiltros()` en `actions/frases.ts`. Dos modos según `protocoloGrupo` en `useFrasesStore`: `solitario` (store `usePracticaStore.estadisticas`, componente `PromedioSolitario`) y `escuadron` (store `useSesionPracticaStore.puntajesPorIntegrante`, componente `PromedioEquipos`).

## 6. Sistema de diseño (de DESIGN.md — resumen)

- Estética "Dark Epic / Game UI Premium". Superficies `--surface-0` a `--surface-4` (de #07090f a #1f2535).
- Colores de marca: verde `#3dd68c` (primario/CTA), ámbar `#f5a623` (Egipto), cian `#22d3ee` (Crypto), púrpura `#a855f7` (Boss/premium).
- Colores por era ya definidos: Antigua = ámbar oscuro, Medieval = rojo oscuro, Moderna = verde bosque, Crypto = azul neón, Post-Humana = púrpura.
- Sistema de badges ya definido en CSS: `.badge-bronze`, `.badge-silver`, `.badge-gold`, `.badge-diamond` (clases ya existentes — reutilizar para las insignias de imperio, no crear nuevas clases).
- Glass Card, System Card, Era Card (con estado `locked`: `brightness(0.5)`, `cursor: not-allowed`), Activity Card — todos ya documentados con su CSS exacto en DESIGN.md.
- Grids de eras: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5`.
- Nada de springs/bounces — todo `ease-out`.

## 7. Lo que el usuario pidió explícitamente que se preguntara o investigara

- Cualquier duda sobre el código real de `/dashboard/estudiar`, `/dashboard/estudiar/practicando`, los stores de Zustand, o componentes como `PromedioSolitario`/`PromedioEquipos` — opencode debe **leer el código fuente real del repo** antes de modificar nada, no asumir.
- Cómo conectar el enum `Skin` existente (23 nombres de imperios) con el nuevo sistema de progreso de imperios — no está definido, hay que decidirlo en el momento de implementar (probablemente: el skin/avatar del usuario cambia automáticamente al imperio en curso).
- Resolución de la inconsistencia de porcentajes del PDF (sección 3 de este documento).
