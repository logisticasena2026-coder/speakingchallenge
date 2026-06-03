'use client';

import { usePracticaStore } from '@/store/usePracticaStore';
import { useFrasesStore } from '@/store/useFrasesStore';
import { useEffect, useState } from 'react';

function colorSegunPromedio(pct: number): string {
  if (pct >= 80) return '#3dd68c';
  if (pct >= 60) return '#f5a623';
  return '#ef4444';
}

export function PromedioSolitario() {
  const estadisticas = usePracticaStore((state) => state.estadisticas);
  const precision = usePracticaStore((state) => state.precision);
  const protocoloGrupo = useFrasesStore((state) => state.protocoloGrupo);

  const [animado, setAnimado] = useState(0);

  const sumaPasadas = estadisticas.reduce((a, b) => a + b.precision, 0);
  const tieneActual = precision > 0;
  const count = estadisticas.length + (tieneActual ? 1 : 0);
  const mostrar = protocoloGrupo === 'solitario' && count > 0;
  const promedio = mostrar ? (sumaPasadas + (tieneActual ? precision : 0)) / count : 0;
  const color = colorSegunPromedio(promedio);

  useEffect(() => {
    if (!mostrar) return;
    const from = 0;
    const to = promedio;
    const duration = 600;
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimado(from + (to - from) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [promedio, mostrar]);

  if (!mostrar) return null;

  return (
    <div
      className="ani d3 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      <p className="font-ui text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-2.5 text-center">
        Promedio general
      </p>

      <div className="flex items-baseline justify-center gap-2">
        <span
          className="font-display text-2xl font-bold leading-none"
          style={{ color, textShadow: `0 0 16px ${color}55` }}
        >
          {animado.toFixed(0)}
          <span className="font-ui text-sm font-normal" style={{ color: `${color}aa` }}>%</span>
        </span>
        <span className="font-ui text-[10px] text-text-muted tracking-wider">
          · {count} {count === 1 ? 'frase' : 'frases'}
        </span>
      </div>

      <div className="mt-2.5 h-1 rounded-full bg-white/8 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${promedio}%`,
            background: `linear-gradient(90deg, ${color}55, ${color})`,
            boxShadow: `0 0 8px ${color}33`,
          }}
        />
      </div>
    </div>
  );
}
