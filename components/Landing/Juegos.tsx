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
            Cinco juegos, cinco eras. Aprende inglés mientras viajas por la historia de la humanidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" role="list">
          <div className="game-card" role="listitem">
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '28px' }} aria-hidden="true">🏛️</span>
              <span className="badge badge-bronze">Bronce</span>
            </div>
            <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
              Jeroglíficos
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
              Era Antigua
            </p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              Encuentra los pares inglés-español. Tres errores activan penalización de tiempo.
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
              CLICK / TAP
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Sin partidas aún
            </p>
          </div>

          <div className="game-card" role="listitem">
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '28px' }} aria-hidden="true">⚔️</span>
              <span className="badge badge-silver">Plata</span>
            </div>
            <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
              Legiones de Bloques
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
              Era Medieval
            </p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              Apila piezas como en el Tetris clásico. Cada fila completa activa un reto de traducción.
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
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Sin partidas aún
            </p>
          </div>

          <div className="game-card" role="listitem">
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '28px' }} aria-hidden="true">🚂</span>
              <span className="badge badge-gold">Oro</span>
            </div>
            <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
              Rutas del Imperio
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
              Era Moderna
            </p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              Conecta palabras para formar rutas comerciales. Cada ruta completada desbloquea vocabulario nuevo.
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
              ARRASTRA · CONECTA
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Sin partidas aún
            </p>
          </div>

          <div className="game-card" style={{ borderColor: 'rgba(34,211,238,0.15)' }} role="listitem">
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '28px' }} aria-hidden="true">₿</span>
              <span className="badge badge-diamond">Diamante</span>
            </div>
            <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
              Carrera Cuántica
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
              Era Crypto
            </p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              Escribe la traducción correcta para hacer avanzar tu nodo. ¡Vence a la IA rival en la blockchain!
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
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Sin partidas aún
            </p>
          </div>

          <div className="game-card" style={{ borderColor: 'rgba(168,85,247,0.15)' }} role="listitem">
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '28px' }} aria-hidden="true">🤖</span>
              <span className="badge" style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)' }}>Élite</span>
            </div>
            <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Cinzel',serif" }}>
              Nexo Sintético
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
              Era Post-Humana
            </p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              Combina estructuras gramaticales complejas en tiempo real. Solo los mejores alcanzan la trascendencia.
            </p>
            <div className="divider" style={{ background: '#a855f7' }}></div>
            <p
              className="text-xs mt-3 mb-1"
              style={{
                color: 'var(--text-muted)',
                fontFamily: "'Inter',sans-serif",
                letterSpacing: '0.06em',
              }}
            >
              VOZ · TECLADO
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Sin partidas aún
            </p>
          </div>
        </div>

        <p
          className="text-center mt-8 text-xs"
          style={{
            color: 'var(--text-muted)',
            fontFamily: "'Inter',sans-serif",
            letterSpacing: '0.05em',
          }}
        >
          5 DE 5 ERAS DESBLOQUEADAS
        </p>
      </div>
    </section>
  );
}
