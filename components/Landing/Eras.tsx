export function Eras() {
  return (
    <section id="eras" className="py-20 sm:py-28 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Línea Temporal</p>
          <h2 className="display-heading text-3xl sm:text-4xl lg:text-5xl mb-4">
            Cuatro eras, <span className="text-highlight-green">una travesía</span>
          </h2>
          <p
            className="text-sm sm:text-base max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Cada nivel desbloquea una era histórica con su propia estética, retos y dificultad.
            Avanza de Bronce a Diamante restaurando los verbos perdidos del tiempo.
          </p>
        </div>

        {/* Era cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" role="list" aria-label="Eras históricas">
          {/* Era 1: Vikinga — ACTIVA */}
          <div 
            className="era-card" 
            role="listitem"
            tabIndex={0}
            aria-label="Era Vikinga - Nivel Bronce - Activa"
          >
            <div
              className="era-bg era-viking flex items-end p-0"
              style={{ height: '220px', position: 'relative' }}
            >
              {/* Viking ship illustration (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.5 }}
                viewBox="0 0 300 220"
              >
                <path
                  stroke="#22d3ee"
                  strokeDasharray="4 4"
                  strokeWidth=".5"
                  d="M40 160q110-80 220 0"
                />
                <circle
                  cx="150"
                  cy="110"
                  r="40"
                  fill="none"
                  stroke="rgba(61,214,140,0.2)"
                  strokeWidth=".5"
                />
                <path
                  fill="rgba(20,50,80,0.8)"
                  stroke="#1e4a70"
                  strokeWidth="1"
                  d="M80 170q70-70 140 0l10 5q-80-67-160 0Z"
                />
                <path stroke="#4a7fa0" strokeWidth="2" d="M150 80v90" />
                <path
                  fill="rgba(40,80,120,0.7)"
                  stroke="#3d7a9e"
                  strokeWidth="1"
                  d="M120 80h60l-30-35z"
                />
                <circle cx="80" cy="175" r="6" fill="none" stroke="#2a5a8a" strokeWidth="1" />
                <circle cx="120" cy="175" r="6" fill="none" stroke="#2a5a8a" strokeWidth="1" />
                <circle cx="180" cy="175" r="6" fill="none" stroke="#2a5a8a" strokeWidth="1" />
                <circle cx="220" cy="175" r="6" fill="none" stroke="#2a5a8a" strokeWidth="1" />
                <path fill="rgba(10,30,60,0.9)" d="M0 200q75-15 150-10t150-5v35H0Z" />
                <circle cx="50" cy="30" r="1" fill="#fff" opacity=".6" />
                <circle cx="90" cy="15" r=".5" fill="#fff" opacity=".4" />
                <circle cx="200" cy="25" r="1" fill="#fff" opacity=".6" />
                <circle cx="250" cy="40" r=".5" fill="#fff" opacity=".4" />
                <circle cx="30" cy="60" r=".5" fill="#fff" opacity=".3" />
                <circle cx="270" cy="20" r="1" fill="#fff" opacity=".5" />
              </svg>
            </div>
            <div className="era-content">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-bronze">Nivel 1 · Bronce</span>
              </div>
              <div className="era-tag">Foundations</div>
              <div className="era-title">Era Vikinga</div>
              <p className="era-desc">
                Primeros pasos: vocabulario base, pronunciación de palabras aisladas y diálogos
                cortos.
              </p>
            </div>
          </div>

          {/* Era 2: Antiguo Egipto — ACTIVA */}
          <div 
            className="era-card" 
            role="listitem"
            tabIndex={0}
            aria-label="Antiguo Egipto - Nivel Plata - Activa"
          >
            <div
              className="era-bg era-egypt flex items-end"
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
                <ellipse
                  cx="150"
                  cy="45"
                  fill="rgba(245,166,35,0.15)"
                  stroke="rgba(245,166,35,0.4)"
                  strokeWidth=".5"
                  rx="25"
                  ry="8"
                />
                <path fill="rgba(60,35,5,0.9)" d="M0 200q75-15 150-5t150-5v30H0Z" />
              </svg>
            </div>
            <div className="era-content">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-silver">Nivel 2 · Plata</span>
              </div>
              <div className="era-tag">Building Blocks</div>
              <div className="era-title">Antiguo Egipto</div>
              <p className="era-desc">
                Construye frases, descifra videos con apoyo visual y supera trivias bajo el reloj.
              </p>
            </div>
          </div>

          {/* Era 3: Roma Imperial — BLOQUEADA */}
          <div className="era-card locked">
            <div className="era-bg era-rome" style={{ height: '220px' }}></div>
            <div className="lock-overlay">
              <div className="lock-icon">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
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
              <div className="era-title">Roma Imperial</div>
              <p className="era-desc">
                Conversaciones largas, gramática avanzada y desafíos arcade de mayor velocidad.
              </p>
            </div>
          </div>

          {/* Era 4: Futuro Cibernético — BLOQUEADA */}
          <div className="era-card locked">
            <div className="era-bg era-cyber" style={{ height: '220px' }}></div>
            <div className="lock-overlay">
              <div className="lock-icon">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
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
              <div className="era-title">Futuro Cibernético</div>
              <p className="era-desc">
                Linking sounds, debates espontáneos y retos personalizados creados por Sophia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
