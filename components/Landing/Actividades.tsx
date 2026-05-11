export function Actividades() {
  return (
    <section id="actividades" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Actividades Destacadas</p>
          <h2 className="display-heading text-3xl sm:text-4xl lg:text-5xl mb-4">
            Vive cada sistema en <span className="text-highlight-amber">acción</span>
          </h2>
          <p
            className="text-sm sm:text-base max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Estas son las actividades que componen speakingchallenge. Cada una es jugable, evaluable y
            escala contigo de Bronce a Diamante.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Speaking Challenge */}
          <div className="activity-card">
            <div
              className="activity-preview"
              style={{ background: 'linear-gradient(135deg, #0a1a10 0%, #0d2218 100%)' }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    SPEAKING · &ldquo;THROUGH THE WOODS&rdquo;
                  </span>
                  <span className="text-highlight-green font-bold text-sm">87%</span>
                </div>
                <div className="waveform justify-start" style={{ height: '32px' }}>
                  <div
                    className="waveform-bar"
                    style={{ height: '6px', animationDelay: '0s' }}
                  ></div>
                  <div
                    className="waveform-bar"
                    style={{ height: '14px', animationDelay: '0.05s' }}
                  ></div>
                  <div
                    className="waveform-bar"
                    style={{ height: '10px', animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="waveform-bar"
                    style={{ height: '22px', animationDelay: '0.15s' }}
                  ></div>
                  <div
                    className="waveform-bar"
                    style={{ height: '18px', animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="waveform-bar"
                    style={{ height: '28px', animationDelay: '0.25s' }}
                  ></div>
                  <div
                    className="waveform-bar"
                    style={{ height: '16px', animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="waveform-bar"
                    style={{ height: '24px', animationDelay: '0.05s' }}
                  ></div>
                  <div
                    className="waveform-bar"
                    style={{ height: '12px', animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="waveform-bar"
                    style={{ height: '20px', animationDelay: '0.15s' }}
                  ></div>
                  <div
                    className="waveform-bar"
                    style={{ height: '8px', animationDelay: '0s' }}
                  ></div>
                  <div
                    className="waveform-bar"
                    style={{ height: '16px', animationDelay: '0.1s' }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="section-label mb-1" style={{ color: 'var(--text-muted)' }}>
                Pronunciación
              </p>
              <h3 className="font-semibold text-base mb-2" style={{ fontFamily: "'Cinzel',serif" }}>
                Speaking Challenge
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Espectrograma en vivo, puntaje 0–100% y detección fonema por fonema.
              </p>
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="badge badge-bronze">Bronce</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Palabras sueltas con sílabas resaltadas.
                </span>
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="badge badge-diamond">Diamante</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Frases enteras con linking sounds.
                </span>
              </div>
              <button aria-label="Abrir actividad: Speaking Challenge" className="w-full btn-primary text-sm py-2.5">Abrir actividad</button>
            </div>
          </div>

          {/* Verbose */}
          <div className="activity-card">
            <div
              className="activity-preview"
              style={{ background: 'linear-gradient(135deg, #0a1525 0%, #0d1e35 100%)' }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    VERBOSE · ROMA
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="size-1.5 rounded-full animate-pulse"
                      style={{ background: '#22c55e' }}
                    ></span>
                    <span
                      style={{
fontFamily: "'Inter',sans-serif",
                      fontSize: '11px',
                      fontWeight: 600,
                        color: '#22c55e',
                      }}
                    >
                      LIVE
                    </span>
                  </span>
                </div>
                <div
                  className="p-3 rounded-lg text-sm"
                  style={{
                    background: 'rgba(61,214,140,0.08)',
                    border: '1px solid rgba(61,214,140,0.15)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  &ldquo;I think the senate should listen.&rdquo;
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="section-label mb-1" style={{ color: 'var(--text-muted)' }}>
                Conversación IA
              </p>
              <h3 className="font-semibold text-base mb-2" style={{ fontFamily: "'Cinzel',serif" }}>
                Verbose
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Dos ventanas en tiempo real. Modo oral, escrito o mixto.
              </p>
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="badge badge-bronze">Bronce</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Diálogos guiados de 2 turnos.
                </span>
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="badge badge-diamond">Diamante</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Debates de 8 turnos con interrupciones.
                </span>
              </div>
              <button aria-label="Abrir actividad: Verbose" className="w-full btn-primary text-sm py-2.5">Abrir actividad</button>
            </div>
          </div>

          {/* Trivia Fight */}
          <div className="activity-card sm:col-span-2 lg:col-span-1">
            <div
              className="activity-preview"
              style={{ background: 'linear-gradient(135deg, #150a0a 0%, #250d0d 100%)' }}
            >
              <div className="p-4 h-full flex items-center justify-center gap-8">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'var(--brand-green)', color: '#07090f' }}
                  >
                    YOU
                  </div>
                  <div
                    className="w-16 h-1.5 rounded-full"
                    style={{ background: 'var(--brand-green)' }}
                  ></div>
                </div>
                <div className="text-xl font-bold" style={{ color: 'var(--text-muted)' }}>
                  VS
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: '#dc2626', color: '#ffffff' }}
                    aria-label="Oponente IA"
                  >
                    AI
                  </div>
                  <div
                    className="w-16 h-1.5 rounded-full"
                    style={{ background: 'rgba(239,68,68,0.4)' }}
                  ></div>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'var(--brand-amber)',
                  }}
                >
                  COMBO X4
                </span>
              </div>
            </div>
            <div className="p-5">
              <p className="section-label mb-1" style={{ color: 'var(--text-muted)' }}>
                Duelo Arcade
              </p>
              <h3 className="font-semibold text-base mb-2" style={{ fontFamily: "'Cinzel',serif" }}>
                Trivia Fight
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Combate 1v1 contra la IA con vidas, combos y bonus por racha.
              </p>
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="badge badge-bronze">Bronce</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Verdadero/falso con tiempo holgado.
                </span>
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="badge badge-diamond">Diamante</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Sintaxis avanzada con timer agresivo.
                </span>
              </div>
              <button aria-label="Abrir actividad: Trivia Fight" className="w-full btn-primary text-sm py-2.5">Abrir actividad</button>
            </div>
          </div>

          {/* Fonetic Invaders */}
          <div className="activity-card">
            <div
              className="activity-preview"
              style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0d1525 100%)' }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    FONETIC INVADERS · TARGET /ʃ/
                  </span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <span
                    className="px-3 py-1.5 rounded-lg text-sm font-medium"
                    style={{
                      background: 'rgba(61,214,140,0.15)',
                      border: '1px solid rgba(61,214,140,0.3)',
                      color: 'var(--brand-green)',
                    }}
                  >
                    ship
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-lg text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    sit
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-lg text-sm font-medium"
                    style={{
                      background: 'rgba(61,214,140,0.15)',
                      border: '1px solid rgba(61,214,140,0.3)',
                      color: 'var(--brand-green)',
                    }}
                  >
                    shoe
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-lg text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    see
                  </span>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="section-label mb-1" style={{ color: 'var(--text-muted)' }}>
                Minijuego
              </p>
              <h3 className="font-semibold text-base mb-2" style={{ fontFamily: "'Cinzel',serif" }}>
                Fonetic Invaders
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Dispara solo a las palabras que contienen el sonido objetivo.
              </p>
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="badge badge-bronze">Bronce</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Pares mínimos a baja velocidad.
                </span>
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="badge badge-diamond">Diamante</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Sonidos similares a velocidad triple.
                </span>
              </div>
              <button aria-label="Abrir actividad: Fonetic Invaders" className="w-full btn-primary text-sm py-2.5">Abrir actividad</button>
            </div>
          </div>

          {/* Grammar Runner */}
          <div className="activity-card">
            <div
              className="activity-preview"
              style={{ background: 'linear-gradient(135deg, #0a1505 0%, #0d2008 100%)' }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    GRAMMAR RUNNER
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--brand-amber)',
                    }}
                  >
                    X1.5
                  </span>
                </div>
                <div className="flex justify-center gap-3 items-end">
                  <div
                    className="h-4 w-24 rounded"
                    style={{
                      background: 'rgba(61,214,140,0.2)',
                      border: '1px solid rgba(61,214,140,0.3)',
                    }}
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: 'var(--brand-green)' }}
                  ></div>
                  <div
                    className="h-4 w-16 rounded"
                    style={{
                      background: 'rgba(239,68,68,0.3)',
                      border: '1px solid rgba(239,68,68,0.4)',
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="section-label mb-1" style={{ color: 'var(--text-muted)' }}>
                Minijuego
              </p>
              <h3 className="font-semibold text-base mb-2" style={{ fontFamily: "'Cinzel',serif" }}>
                Grammar Runner
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Salta el obstáculo eligiendo la forma verbal correcta antes de chocar.
              </p>
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="badge badge-bronze">Bronce</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Presente vs pasado simple.
                </span>
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="badge badge-diamond">Diamante</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Tiempos perfectos y subordinadas.
                </span>
              </div>
              <button aria-label="Abrir actividad: Grammar Runner" className="w-full btn-primary text-sm py-2.5">Abrir actividad</button>
            </div>
          </div>

          {/* Video Insight */}
          <div className="activity-card">
            <div
              className="activity-preview"
              style={{ background: 'linear-gradient(135deg, #0a0c10 0%, #141820 100%)' }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    VIDEO INSIGHT
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div
                    className="w-full h-12 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" viewBox="0 0 24 24"><path d="m5 3 14 9-14 9z"/></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="section-label mb-1" style={{ color: 'var(--text-muted)' }}>
                Comprensión
              </p>
              <h3 className="font-semibold text-base mb-2" style={{ fontFamily: "'Cinzel',serif" }}>
                Video Insight
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Idea principal, resumen evaluado por IA y preguntas en 3 niveles.
              </p>
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="badge badge-bronze">Bronce</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Clips cortos con apoyo visual fuerte.
                </span>
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="badge badge-diamond">Diamante</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Entrevistas auténticas a velocidad real.
                </span>
              </div>
              <button aria-label="Abrir actividad: Video Insight" className="w-full btn-primary text-sm py-2.5">Abrir actividad</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
