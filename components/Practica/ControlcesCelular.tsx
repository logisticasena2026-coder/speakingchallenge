'use client'

export function ControlesCelular({
  siguiente,
  anterior,
}: Readonly<{ siguiente: () => Promise<void>; anterior: () => void }>) {
  return (
    <div className="mobile-panel ani d3 flex-col gap-2.5 mt-3">
      <div className="flex bg-surface-2 border border-white/6 rounded-lg p-1 gap-1">
        <button
          id="tab-sophia"
          onClick={anterior}
          className="tab-btn flex-1 py-2 font-ui text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted rounded-md cursor-pointer border-none bg-transparent transition-all"
        >
          Anterior
        </button>
        <button
          id="tab-precision"
          className="tab-btn active flex-1 py-2 font-ui text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted rounded-md cursor-pointer border-none bg-transparent transition-all"
        >
          Precisión
        </button>
        <button
          id="tab-next"
          onClick={siguiente}
          className="tab-btn flex-1 py-2 font-ui text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted rounded-md cursor-pointer border-none bg-transparent transition-all"
        >
          Siguiente
        </button>
      </div>

      <div
        id="tab-content-precision"
        className="bg-surface-2 border border-white/6 rounded-3xl p-4 flex flex-col items-center justify-center gap-4"
      >
        <div className="relative w-17.5 h-17.5 shrink-0" style={{ transform: 'rotate(-90deg)' }}>
          <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="28" className="ring-track" style={{ strokeWidth: 5 }} />
            <circle
              cx="35"
              cy="35"
              r="28"
              className="ring-progress"
              style={{ strokeWidth: 5, strokeDasharray: 159, strokeDashoffset: 130 }}
            />
          </svg>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: 'rotate(90deg)' }}
          >
            <span className="font-display text-body-standard font-bold text-brand-green">94</span>
          </div>
        </div>
      </div>

      <div
        id="tab-content-sophia"
        className="hidden rounded-3xl p-3.5 bg-brand-green/5 border border-brand-green/12"
      >
        <div className="flex gap-2.5 items-start">
          <div
            className="w-7.5 h-7.5 rounded-full shrink-0 flex items-center justify-center font-display text-[11px] text-brand-green border-[1.5px] border-brand-green/30"
            style={{
              background: 'linear-gradient(135deg,rgba(61,214,140,0.2),rgba(61,214,140,0.05))',
            }}
          >
            S
          </div>
          <div>
            <p className="font-ui text-[9px] font-bold text-brand-green tracking-widest mb-1">
              SOPHIA DICE
            </p>
            <p className="text-[12px] text-text-secondary leading-relaxed">
              El fonema <strong className="text-text-primary">/ð/</strong> en &ldquo;the&rdquo; se
              forma con la lengua entre los dientes. ¡Casi lo tienes!
            </p>
          </div>
        </div>
      </div>

      <div id="tab-content-next" className="hidden">
        <button className="next-btn w-full flex items-center justify-between px-5 py-4 rounded-xl border border-white/6 bg-white/3 cursor-pointer transition-all duration-300 relative overflow-hidden hover:border-brand-green/30">
          <div className="text-left relative z-1">
            <p className="font-ui text-[9px] font-semibold tracking-[0.2em] uppercase text-brand-green mb-1">
              Siguiente enigma
            </p>
            <p className="font-display text-sm font-bold text-text-primary">Continuar práctica</p>
          </div>
          <div className="next-btn-arrow w-10 h-10 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary transition-all duration-300 shrink-0">
            <span className="mi text-body-large">arrow_forward</span>
          </div>
        </button>
      </div>
    </div>
  );
}
