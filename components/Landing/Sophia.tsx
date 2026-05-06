export function Sophia() {
  return (
    <section
      id="sophia"
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: 'var(--surface-1)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sophia image */}
          <div
            className="sophia-image-frame aspect-3/4 max-w-sm mx-auto lg:mx-0"
            style={{ position: 'relative' }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(160deg, #0d1825 0%, #0a1a30 60%, #051015 100%)',
                minHeight: '400px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  border: '1px solid rgba(61,214,140,0.1)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: '1px solid rgba(61,214,140,0.06)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                }}
              ></div>
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1a3a5c, #0d2240)',
                    border: '2px solid rgba(61,214,140,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontFamily: "'Cinzel',serif",
                    fontSize: '36px',
                    color: 'var(--brand-green)',
                  }}
                >
                  S
                </div>
                <p
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                  }}
                ></p>
              </div>
            </div>
            {/* Online badge */}
            <div
              className="absolute bottom-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(7,9,15,0.8)', border: '1px solid var(--border-subtle)' }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: '#22c55e', boxShadow: '0 0 6px #22c55e' }}
              ></span>
              <span
                style={{
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                En línea contigo
              </span>
            </div>
            {/* IA badge */}
            <div
              className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-center"
              style={{ background: 'rgba(7,9,15,0.8)', border: '1px solid rgba(61,214,140,0.2)' }}
            >
              <p
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  color: 'var(--brand-green)',
                  letterSpacing: '0.1em',
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                IA MENTORA
              </p>
              <p
                style={{
                  fontSize: '8px',
                  color: 'var(--text-muted)',
                  fontFamily: "'Inter',sans-serif",
                  marginTop: '1px',
                }}
              >
                Personalizada
              </p>
            </div>
          </div>

          {/* <!-- Sophia content --> */}
          <div>
            <p className="section-label mb-3">Tu Mentora</p>
            <h2 className="display-heading text-3xl sm:text-4xl lg:text-5xl mb-4">
              Conoce a <span className="text-highlight-green">Sophia</span>
            </h2>
            <p
              className="text-sm sm:text-base mb-6"
              style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}
            >
              Lingüista viajera del tiempo y narradora del juego. Une los seis sistemas en una
              experiencia coherente: convierte tus errores en retos y tus logros en historia.
            </p>

            <div className="sophia-quote mb-8">
              <p
                className="text-sm sm:text-base italic mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                &ldquo;Veo que mejoraste la <strong style={{ color: 'var(--brand-green)' }}>th</strong>{' '}
                desde la última vez. ¡Esta vez probemos un debate corto en la Roma Imperial!&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'var(--brand-green)', color: '#07090f' }}
                >
                  S
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  Sophia, mentora PlayLenguage
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                fontFamily: "'Inter',sans-serif",
                marginBottom: '14px',
              }}
            >
              Sophia recuerda y aprende
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="capability-item">
                <span className="capability-dot"></span>Recuerda tu nombre
              </div>
              <div className="capability-item">
                <span className="capability-dot"></span>Sigue tu nivel actual
              </div>
              <div className="capability-item">
                <span className="capability-dot"></span>Guarda tus puntajes
              </div>
              <div className="capability-item">
                <span className="capability-dot"></span>Detecta errores frecuentes
              </div>
              <div className="capability-item">
                <span
                  className="capability-dot"
                  style={{ background: 'var(--brand-amber)' }}
                ></span>
                Celebra tus logros
              </div>
              <div className="capability-item">
                <span className="capability-dot" style={{ background: 'var(--brand-cyan)' }}></span>
                Crea retos a medida
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
