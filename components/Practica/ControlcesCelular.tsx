'use client'

import { useEffect, useState } from 'react';
import { useFrasesStore } from '@/store/useFrasesStore';
import { useConfiguracionUsuario } from '@/store/useConfiguracionUsuario';
import { comparacion_de_frases } from '@/utils/comparacion-de-frases';

const RADIO = 28;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;

function colorSegunPrecision(pct: number): string {
  if (pct >= 80) return '#3dd68c';
  if (pct >= 60) return '#f5a623';
  return '#ef4444';
}

export function ControlesCelular({
  siguiente,
  anterior,
}: Readonly<{ siguiente: () => Promise<void>; anterior: () => void }>) {
  const fuente = useConfiguracionUsuario((state) => state.tamanoFuente);
  const fraseActual = useFrasesStore((state) => state.indiceActual);
  const frases = useFrasesStore((store) => store.frases);
  const texto = useFrasesStore((store) => store.texto);

  const precision = comparacion_de_frases(frases[fraseActual]?.fraseIngles ?? '', texto ?? '');
  const [displayValue, setDisplayValue] = useState(0);
  const color = colorSegunPrecision(precision);
  const offset = CIRCUNFERENCIA - (precision / 100) * CIRCUNFERENCIA;

  useEffect(() => {
    const to = precision;
    const duration = 600;
    const start = performance.now();
    let frame: number;
    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayValue(to * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [precision]);

  return (
    <div className="mobile-panel ani d3 flex-col gap-2.5 mt-3">
      <div className="flex bg-surface-2 border border-white/6 rounded-lg p-1 gap-1">
        <button
          id="tab-sophia"
          onClick={anterior}
          className={`tab-btn flex-1 py-2 font-ui ${fuente} font-semibold tracking-[0.06em] uppercase text-text-muted rounded-md cursor-pointer border-none bg-transparent transition-all`}
        >
          Anterior
        </button>
        <button
          id="tab-precision"
          className={`tab-btn active flex-1 py-2 font-ui ${fuente} font-semibold tracking-[0.06em] uppercase text-text-muted rounded-md cursor-pointer border-none bg-transparent transition-all`}
        >
          Precisión
        </button>
        <button
          id="tab-next"
          onClick={siguiente}
          className={`tab-btn flex-1 py-2 font-ui ${fuente} font-semibold tracking-[0.06em] uppercase text-text-muted rounded-md cursor-pointer border-none bg-transparent transition-all`}
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
            <circle cx="35" cy="35" r={RADIO} fill="none" stroke="#1f2535" strokeWidth="5" />
            <circle
              cx="35"
              cy="35"
              r={RADIO}
              fill="none"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={CIRCUNFERENCIA}
              strokeDashoffset={offset}
              style={{
                filter: `drop-shadow(0 0 6px ${color}99)`,
                transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </svg>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: 'rotate(90deg)' }}
          >
            <span
              className="font-display text-body-standard font-bold leading-none"
              style={{ color }}
            >
              {displayValue.toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      <div
        id="tab-content-sophia"
        className="hidden rounded-3xl p-3.5 bg-brand-green/5 border border-brand-green/12"
      >
        <div className="flex gap-2.5 items-start">
          <div
            className={`w-7.5 h-7.5 rounded-full shrink-0 flex items-center justify-center font-display ${fuente} text-brand-green border-[1.5px] border-brand-green/30`}
            style={{
              background: 'linear-gradient(135deg,rgba(61,214,140,0.2),rgba(61,214,140,0.05))',
            }}
          >
            S
          </div>
          <div>
            <p className={`font-ui ${fuente} font-bold text-brand-green tracking-widest mb-1`}>
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
            <p className={`font-ui ${fuente} font-semibold tracking-[0.2em] uppercase text-brand-green mb-1`}>
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
