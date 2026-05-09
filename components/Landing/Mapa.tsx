export function Mapa() {
  return (
    <section id="mapa" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="section-label mb-3">Skill Tree</p>
        <h2 className="display-heading text-3xl sm:text-4xl lg:text-5xl mb-4">
          Cinco escalones <span className="text-highlight-cyan">por tema</span>
        </h2>
        <p
          className="text-sm sm:text-base max-w-2xl mx-auto mb-16"
          style={{ color: 'var(--text-secondary)' }}
        >
          Cada tema gramatical se conquista en 5 pasos. Avanzas en un mapa visual estilo árbol —
          perfecto para sentir el progreso.
        </p>

        <div className="scroll-x pb-4">
          <div
            className="flex items-start gap-0 min-w-max mx-auto mt-5"
            style={{ width: 'fit-content' }}
            role="list"
          >
            <div className="flex flex-col items-center w-28 sm:w-32" role="listitem">
              <div style={{ position: 'relative' }}>
                <div
                  className="step-circle"
                  style={{
                    background: 'rgba(61,214,140,0.15)',
                    border: '2px solid var(--brand-green)',
                  }}
                >
                  <svg width="22" height="22" fill="none" stroke="var(--brand-green)" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'var(--brand-green)',
                    color: '#07090f',
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  1
                </div>
              </div>
              <p
                className="text-sm font-semibold mt-3 mb-1"
                style={{ fontFamily: "'Cinzel',serif" }}
              >
                Lección
              </p>
              <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                Concepto en contexto narrativo.
              </p>
            </div>

            <div
              className="step-connector mt-7 hidden sm:block"
              style={{
                width: '40px',
                background: 'linear-gradient(90deg, rgba(61,214,140,0.5), rgba(61,214,140,0.2))',
              }}
            ></div>

            <div className="flex flex-col items-center w-28 sm:w-32" role="listitem">
              <div style={{ position: 'relative' }}>
                <div
                  className="step-circle"
                  style={{
                    background: 'rgba(61,214,140,0.12)',
                    border: '2px solid rgba(61,214,140,0.5)',
                  }}
                >
                  <svg width="22" height="22" fill="none" stroke="var(--brand-green)" strokeWidth="2" opacity={0.8} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z"/></svg>
                </div>
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'rgba(61,214,140,0.7)',
                    color: '#07090f',
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  2
                </div>
              </div>
              <p
                className="text-sm font-semibold mt-3 mb-1"
                style={{ fontFamily: "'Cinzel',serif" }}
              >
                Práctica
              </p>
              <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                Repetición guiada con feedback.
              </p>
            </div>

            <div
              className="step-connector mt-7 hidden sm:block"
              style={{
                width: '40px',
                background: 'linear-gradient(90deg, rgba(61,214,140,0.2), rgba(245,166,35,0.2))',
              }}
            ></div>

            <div className="flex flex-col items-center w-28 sm:w-32" role="listitem">
              <div style={{ position: 'relative' }}>
                <div
                  className="step-circle"
                  style={{
                    background: 'rgba(245,166,35,0.12)',
                    border: '2px solid rgba(245,166,35,0.4)',
                  }}
                >
                  <svg width="22" height="22" fill="none" stroke="var(--brand-amber)" strokeWidth="2" opacity={0.8} viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>
                </div>
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'rgba(245,166,35,0.7)',
                    color: '#07090f',
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  3
                </div>
              </div>
              <p
                className="text-sm font-semibold mt-3 mb-1"
                style={{ fontFamily: "'Cinzel',serif" }}
              >
                Quiz
              </p>
              <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                Comprueba dominio del tema.
              </p>
            </div>

            <div
              className="step-connector mt-7 hidden sm:block"
              style={{
                width: '40px',
                background: 'linear-gradient(90deg, rgba(245,166,35,0.2), rgba(239,68,68,0.2))',
              }}
            ></div>

            <div className="flex flex-col items-center w-28 sm:w-32" role="listitem">
              <div style={{ position: 'relative' }}>
                <div
                  className="step-circle"
                  style={{
                    background: 'rgba(239,68,68,0.12)',
                    border: '2px solid rgba(239,68,68,0.4)',
                  }}
                >
                  <span style={{ fontSize: '22px' }} aria-hidden="true">🔥</span>
                </div>
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'rgba(239,68,68,0.7)',
                    color: 'white',
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  4
                </div>
              </div>
              <p
                className="text-sm font-semibold mt-3 mb-1"
                style={{ fontFamily: "'Cinzel',serif" }}
              >
                Desafío
              </p>
              <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                Aplica bajo presión de tiempo.
              </p>
            </div>

            <div
              className="step-connector mt-7 hidden sm:block"
              style={{
                width: '40px',
                background: 'linear-gradient(90deg, rgba(239,68,68,0.2), rgba(168,85,247,0.3))',
              }}
            ></div>

            <div className="flex flex-col items-center w-28 sm:w-32" role="listitem">
              <div style={{ position: 'relative' }}>
                <div
                  className="step-circle"
                  style={{
                    background: 'rgba(168,85,247,0.12)',
                    border: '2px solid rgba(168,85,247,0.5)',
                  }}
                >
                  <span style={{ fontSize: '22px' }} aria-hidden="true">💀</span>
                </div>
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'rgba(168,85,247,0.7)',
                    color: 'white',
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  5
                </div>
              </div>
              <p
                className="text-sm font-semibold mt-3 mb-1"
                style={{ fontFamily: "'Cinzel',serif", color: 'var(--brand-purple)' }}
              >
                Boss Final
              </p>
              <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                Combate que desbloquea la era.
              </p>
              <span
                className="badge mt-2"
                style={{
                  background: 'rgba(168,85,247,0.15)',
                  color: '#c084fc',
                  border: '1px solid rgba(168,85,247,0.3)',
                  fontSize: '9px',
                }}
              >
                DESBLOQUEA ERA
              </span>
            </div>
          </div>
        </div>

        <div
          className="mt-12 p-5 rounded-xl inline-flex items-start gap-3 max-w-xl mx-auto"
          style={{ background: 'rgba(61,214,140,0.06)', border: '1px solid rgba(61,214,140,0.15)' }}
        >
          <span className="text-highlight-green font-bold text-sm shrink-0">Tip:</span>
          <p className="text-sm text-left" style={{ color: 'var(--text-secondary)' }}>
            Si tu Quiz supera <strong style={{ color: 'var(--text-primary)' }}>90%</strong>, puedes
            saltar directamente al Desafío. El árbol se adapta a tu nivel.
          </p>
        </div>
      </div>
    </section>
  )
}
