export function Eras() {
  return (
    <section id="eras" className="py-20 sm:py-28 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Línea Temporal</p>
          <h2 className="display-heading text-3xl sm:text-4xl lg:text-5xl mb-4">
            Cinco eras, <span className="text-highlight-green">una travesía</span>
          </h2>
          <p
            className="text-sm sm:text-base max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Cada nivel desbloquea una era de la humanidad con sus propios imperios, estética y retos.
            Avanza desde la Antigüedad hasta el mundo Post-Humano restaurando los verbos perdidos del tiempo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5" role="list" aria-label="Eras de la humanidad">
          {/* Era 1: Antigua — ACTIVA */}
          <div
            className="era-card"
            role="listitem"
            aria-label="Era Antigua - Nivel Bronce - Activa"
          >
            <div
              className="era-bg era-antigua flex items-end p-0"
              style={{ height: '220px', position: 'relative' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.5 }}
                viewBox="0 0 300 220"
              >
                <path fill="rgba(80,50,10,0.6)" d="M0 220v-70q150-20 300 0v70Z" />
                <path
                  fill="rgba(140,90,20,0.7)"
                  stroke="rgba(200,140,40,0.4)"
                  strokeWidth="1"
                  d="m80 170 70-90 70 90z"
                />
                <path
                  stroke="rgba(200,140,40,0.2)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                  d="M150 80v90"
                />
                <path
                  fill="rgba(120,75,15,0.5)"
                  stroke="rgba(180,120,30,0.3)"
                  strokeWidth=".5"
                  d="m200 170 40-50 40 50z"
                />
                <circle cx="60" cy="50" r="18" fill="rgba(245,166,35,0.15)" />
                <circle cx="60" cy="50" r="8" fill="rgba(245,166,35,0.4)" />
                <path fill="rgba(60,35,5,0.9)" d="M0 200q75-15 150-5t150-5v30H0Z" />
                <path stroke="#c8a84c" strokeWidth="1.5" d="M90 175q55-30 120 0" strokeDasharray="3 3" />
              </svg>
            </div>
            <div className="era-content">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-bronze">Nivel 1 · Bronce</span>
              </div>
              <div className="era-tag">Foundations</div>
              <div className="era-title">Antigua</div>
              <p className="era-desc">
                Egipto, Acadio, Babilonia, Asiria, Persia, Macedonia, Maurya, Cartago — las primeras grandes civilizaciones.
              </p>
            </div>
          </div>

          {/* Era 2: Medieval — ACTIVA */}
          <div
            className="era-card"
            role="listitem"
            aria-label="Era Medieval - Nivel Plata - Activa"
          >
            <div
              className="era-bg era-medieval flex items-end"
              style={{ height: '220px', position: 'relative' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.5 }}
                viewBox="0 0 300 220"
              >
                <path fill="rgba(80,20,20,0.6)" d="M0 220v-60q150-15 300 0v60Z" />
                <rect x="100" y="60" width="100" height="120" rx="4" fill="rgba(120,40,40,0.5)" stroke="rgba(180,60,60,0.3)" strokeWidth="1" />
                <path d="M100 60q50-30 100 0" fill="rgba(150,50,50,0.4)" stroke="rgba(200,70,70,0.3)" strokeWidth="1" />
                <rect x="140" y="100" width="20" height="30" rx="2" fill="rgba(60,15,15,0.7)" />
                <circle cx="150" cy="55" r="4" fill="rgba(200,200,200,0.3)" />
                <path stroke="#8b3a3a" strokeWidth="1.5" d="M40 180q110-40 220 0" strokeDasharray="4 4" />
                <path fill="rgba(40,10,10,0.9)" d="M0 200q75-10 150-5t150-5v30H0Z" />
              </svg>
            </div>
            <div className="era-content">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-silver">Nivel 2 · Plata</span>
              </div>
              <div className="era-tag">Building Blocks</div>
              <div className="era-title">Medieval</div>
              <p className="era-desc">
                Roma, Bizancio, Califato Omeya, Imperio Mongol, Otomano — el puente entre mundos.
              </p>
            </div>
          </div>

          {/* Era 3: Moderna — BLOQUEADA */}
          <div className="era-card locked">
            <div className="era-bg era-moderna" style={{ height: '220px' }}></div>
            <div className="lock-overlay">
              <div className="lock-icon">
                <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                BLOQUEADO
              </span>
            </div>
            <div className="era-content" style={{ opacity: 0.5 }}>
              <div className="era-tag">Mastery</div>
              <div className="era-title">Moderna</div>
              <p className="era-desc">
                Azteca, Inca, Imperio Ruso, Británico, Japonés — expansión global e industrialización.
              </p>
            </div>
          </div>

          {/* Era 4: Crypto — BLOQUEADA */}
          <div className="era-card locked">
            <div className="era-bg era-crypto" style={{ height: '220px' }}></div>
            <div className="lock-overlay">
              <div className="lock-icon">
                <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                BLOQUEADO
              </span>
            </div>
            <div className="era-content" style={{ opacity: 0.5 }}>
              <div className="era-tag">Fluency</div>
              <div className="era-title">Crypto</div>
              <p className="era-desc">
                Satoshi, Ethereum, Solaria Chain, Quantum Ledger, Nexus AI — la revolución digital descentralizada.
              </p>
            </div>
          </div>

          {/* Era 5: Post-Humana — BLOQUEADA */}
          <div className="era-card locked">
            <div className="era-bg era-posthumana" style={{ height: '220px' }}></div>
            <div className="lock-overlay">
              <div className="lock-icon">
                <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                BLOQUEADO
              </span>
            </div>
            <div className="era-content" style={{ opacity: 0.5 }}>
              <div className="era-tag">Transcendence</div>
              <div className="era-title">Post-Humana</div>
              <p className="era-desc">
                Titan Vanguard, Cyber Anunnaki, Atlantech Prime, Omega Cyborg, Guardianes del Pacífico — el despertar de la humanidad aumentada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
