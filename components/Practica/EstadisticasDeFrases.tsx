export function EstadisticasDeFrases() {
  return (
    <div
      className="ani d3 text-center rounded-2xl border border-white/10 p-5"
      style={{
        background: 'linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <p className="font-ui text-[9px] font-semibold tracking-[0.2em] uppercase text-brand-green mb-3.5">
        Precisión
      </p>

      <div className="relative w-27.5 h-27.5 mx-auto mb-3" style={{ transform: 'rotate(-90deg)' }}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="45" className="ring-track" />
          <circle cx="55" cy="55" r="45" className="ring-progress" />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ transform: 'rotate(90deg)' }}
        >
          <span className="font-display text-[28px] font-bold text-brand-green score-glow">94</span>
          <span className="font-ui text-[8px] font-semibold tracking-[0.12em] uppercase text-text-muted">
            %
          </span>
        </div>
      </div>

      <h3 className="font-display text-sm font-bold text-text-primary mb-1">Precisión Arcana</h3>
      <p className="text-[11px] text-text-secondary leading-relaxed">
        Tu pronunciación de <em className="text-brand-green">&ldquo;fate&rdquo;</em> alcanzó
        resonancia perfecta.
      </p>

      <div className="mt-3.5 flex flex-col gap-1.5 text-left">
        <div className="flex items-center justify-between">
          <span className="font-ui text-ui-badge text-text-muted">Linking sounds</span>
          <div className="flex items-center gap-1.5">
            <div className="w-15 h-1.25 rounded bg-surface-4 overflow-hidden">
              <div
                className="h-full rounded bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)]"
                style={{ width: '88%' }}
              ></div>
            </div>
            <span className="font-ui text-[9px] font-semibold text-brand-green">88%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-ui text-ui-badge text-text-muted">Entonación</span>
          <div className="flex items-center gap-1.5">
            <div className="w-15 h-1.25 rounded bg-surface-4 overflow-hidden">
              <div
                className="h-full rounded bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)]"
                style={{ width: '96%' }}
              ></div>
            </div>
            <span className="font-ui text-[9px] font-semibold text-brand-green">96%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-ui text-ui-badge text-text-muted">Fonema /ð/</span>
          <div className="flex items-center gap-1.5">
            <div className="w-15 h-1.25 rounded bg-surface-4 overflow-hidden">
              <div
                className="h-full rounded bg-brand-amber shadow-[0_0_6px_rgba(245,166,35,0.4)]"
                style={{ width: '72%' }}
              ></div>
            </div>
            <span className="font-ui text-[9px] font-semibold text-brand-amber">72%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
