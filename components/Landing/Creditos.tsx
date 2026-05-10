export function Creditos() {
  return (
    <section id="creditos" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label mb-3">El Equipo</p>
          <h2 className="display-heading text-3xl sm:text-4xl lg:text-5xl mb-4">
            <span className="text-highlight-green">Speaking Challenge</span>
          </h2>
          <p
            className="text-sm sm:text-base max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Gestión Logística · Aprendices e Instructor que construyeron este viaje
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
          <div className="team-card md:row-span-2 flex flex-col" role="listitem">
            <div className="photo-placeholder era-viking" style={{ height: '320px' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="avatar-circle avatar-viking" style={{ fontSize: '24px', color: 'var(--brand-green)' }}>
                  M
                </div>
                <div
                  style={{
                    background: 'rgba(0,100,50,0.3)',
                    border: '1px solid rgba(0,200,100,0.3)',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    display: 'inline-block',
                    marginBottom: '12px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#22c55e',
                      letterSpacing: '0.08em',
                    }}
                  >
                    SENA
                  </p>
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  CREADOR DEL Speaking-Challenge
                </p>
                <p
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginTop: '8px',
                  }}
                >
                  MANUEL MONTALVO
                  <br />
                  VALLE
                </p>
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--brand-green)',
                    letterSpacing: '0.08em',
                    fontFamily: "'Inter',sans-serif",
                    marginTop: '4px',
                  }}
                >
                  INSTRUCTOR
                </p>
              </div>
            </div>
            <div className="p-6 flex-1">
              <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
                Manuel Montalvo Valle
              </h3>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--brand-green)' }}>
                Instructor
              </p>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Creador del Speaking-Challenge
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  className="badge"
                  style={{
                    background: 'rgba(34,211,238,0.1)',
                    color: 'var(--brand-cyan)',
                    borderColor: 'rgba(34,211,238,0.2)',
                  }}
                >
                  SPEAKING-CHALLENGE
                </span>
                <span
                  className="badge"
                  style={{
                    background: 'rgba(0,150,70,0.1)',
                    color: '#4ade80',
                    borderColor: 'rgba(74,222,128,0.2)',
                  }}
                >
                  SENA
                </span>
                <span
                  className="badge"
                  style={{
                    background: 'rgba(245,166,35,0.1)',
                    color: 'var(--brand-amber)',
                    borderColor: 'rgba(245,166,35,0.2)',
                  }}
                >
                  INGLÉS
                </span>
              </div>
            </div>
          </div>

          <div className="team-card" role="listitem">
            <div className="photo-placeholder era-egypt" style={{ height: '180px' }}>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg,#3d2800,#5c3d00)',
                    border: '2px solid rgba(245,166,35,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Cinzel',serif",
                    fontSize: '20px',
                    color: 'var(--brand-amber)',
                    margin: '0 auto',
                  }}
                >
                  V
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
                Valentina Rodriguez R.
              </h3>
              <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--brand-amber)' }}>
                Agente Comercial · Ventas
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Aprendiz · Gestión Logística
              </p>
            </div>
          </div>

          <div className="team-card" role="listitem">
            <div className="photo-placeholder era-rome" style={{ height: '180px' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="avatar-circle avatar-rome" style={{ width: '60px', height: '60px', fontSize: '20px' }}>
                  L
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
                Luis A. Acuña
              </h3>
              <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--brand-cyan)' }}>
                Soporte Técnico
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Aprendiz · Gestión Logística
              </p>
            </div>
          </div>

          <div className="team-card" role="listitem">
            <div className="photo-placeholder era-cyber" style={{ height: '180px' }}>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg,#0d1a3d,#0a1628)',
                    border: '2px solid rgba(34,211,238,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Cinzel',serif",
                    fontSize: '20px',
                    color: 'var(--brand-cyan)',
                    margin: '0 auto',
                  }}
                >
                  I
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
                Isabel S. Lambis
              </h3>
              <p className="text-xs font-medium mb-0.5" style={{ color: '#f97316' }}>
                Testing · Ventas
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Aprendiz · Gestión Logística
              </p>
            </div>
          </div>

          <div className="team-card" style={{ borderColor: 'rgba(61,214,140,0.15)' }} role="listitem">
            <div
              style={{
                height: '180px',
                background: 'linear-gradient(135deg, #0a1a10 0%, #0d2218 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg,rgba(61,214,140,0.2),rgba(61,214,140,0.05))',
                    border: '2px solid rgba(61,214,140,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Cinzel',serif",
                    fontSize: '20px',
                    color: 'var(--brand-green)',
                    margin: '0 auto',
                  }}
                >
                  S
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--brand-green)',
                    letterSpacing: '0.1em',
                    fontFamily: "'Inter',sans-serif",
                    marginTop: '8px',
                    fontWeight: 600,
                  }}
                >
                  IA MENTORA
                </p>
              </div>
            </div>
            <div className="p-5">
              <h3
                className="font-semibold text-sm mb-1"
                style={{ fontFamily: "'Cinzel',serif", color: 'var(--brand-green)' }}
              >
                Sophia
              </h3>
              <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--brand-green)' }}>
                Mentora IA
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Compañera de viaje · PlayLenguage
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
