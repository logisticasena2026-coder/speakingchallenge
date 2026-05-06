export function Juegos() {
  return (
    <section
      id="juegos"
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: 'var(--surface-1)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Arcade del Tiempo</p>
          <h2 className="display-heading text-3xl sm:text-4xl lg:text-5xl mb-4">
            Elige tu <span className="text-highlight-amber">misión</span>
          </h2>
          <p
            className="text-sm sm:text-base max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Cuatro juegos, cuatro eras. Aprende inglés mientras viajas en el tiempo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="game-card">
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '28px' }}>🐍</span>
              <span className="badge badge-bronze">Bronce</span>
            </div>
            <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
              Serpiente Rúnica
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
              Era Vikinga
            </p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              Guía la serpiente hacia la traducción correcta. Evita las respuestas falsas o perderás
              una vida.
            </p>
            <div className="divider"></div>
            <p
              className="text-xs mt-3 mb-1"
              style={{
                color: 'var(--text-muted)',
                fontFamily: "'Inter',sans-serif",
                letterSpacing: '0.06em',
              }}
            >
              WASD · FLECHAS · DESLIZA
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Sin partidas aún
            </p>
          </div>

          <div className="game-card">
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '28px' }}>🎪</span>
              <span className="badge badge-silver">Plata</span>
            </div>
            <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
              Jeroglíficos
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
              Antiguo Egipto
            </p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              Encuentra los pares inglés-español. Tres errores activan penalización de tiempo.
            </p>
            <div className="divider" style={{ background: 'var(--brand-amber)' }}></div>
            <p
              className="text-xs mt-3 mb-1"
              style={{
                color: 'var(--text-muted)',
                fontFamily: "'Inter',sans-serif",
                letterSpacing: '0.06em',
              }}
            >
              CLICK / TAP
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Sin partidas aún
            </p>
          </div>

          <div className="game-card" style={{ borderColor: 'rgba(34,211,238,0.15)' }}>
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '28px' }}>🚀</span>
              <span className="badge badge-diamond">Diamante</span>
            </div>
            <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
              Carrera Cuántica
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
              Futuro Cibernético
            </p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              Escribe la traducción correcta para hacer avanzar tu nave. ¡Vence a la IA rival!
            </p>
            <div className="divider" style={{ background: 'var(--brand-cyan)' }}></div>
            <p
              className="text-xs mt-3 mb-1"
              style={{
                color: 'var(--text-muted)',
                fontFamily: "'Inter',sans-serif",
                letterSpacing: '0.06em',
              }}
            >
              TECLADO
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Sin partidas aún
            </p>
          </div>

          <div className="game-card">
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '28px' }}>🧱</span>
              <span className="badge badge-gold">Oro</span>
            </div>
            <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
              Legiones de Bloques
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
              Roma Imperial
            </p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              Apila piezas como en el Tetris clásico. Cada fila completa activa un reto de
              traducción.
            </p>
            <div className="divider" style={{ background: 'var(--brand-amber)' }}></div>
            <p
              className="text-xs mt-3 mb-1"
              style={{
                color: 'var(--text-muted)',
                fontFamily: "'Inter',sans-serif",
                letterSpacing: '0.06em',
              }}
            >
              FLECHAS · ESPACIO · DESLIZA
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Sin partidas aún
            </p>
          </div>
        </div>

        <p
          className="text-center mt-8 text-xs"
          style={{
            color: 'var(--text-muted)',
            fontFamily: "'Inter',sans-serif",
            letterSpacing: '0.1em',
          }}
        >
          4 DE 4 ERAS DESBLOQUEADAS
        </p>
      </div>
    </section>
  );
}
