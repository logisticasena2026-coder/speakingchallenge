'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFrasesStore } from '@/store/useFrasesStore';
import { usePracticaStore } from '@/store/usePracticaStore';
import { useConfiguracionUsuario } from '@/store/useConfiguracionUsuario';
import { comparacion_de_frases } from '@/utils/comparacion-de-frases';
const RADIO = 45;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;

function colorSegunPrecision(pct: number): string {
  if (pct >= 80) return '#3dd68c';
  if (pct >= 60) return '#f5a623';
  return '#ef4444';
}

function textShadowSegunPrecision(pct: number): string {
  if (pct >= 80) return '0 0 20px rgba(61,214,140,0.6)';
  if (pct >= 60) return '0 0 20px rgba(245,166,35,0.6)';
  return '0 0 20px rgba(239,68,68,0.6)';
}

function mensajeSegunPrecision(pct: number): string {
  if (pct >= 90) return 'Tu pronunciación alcanzó resonancia perfecta.';
  if (pct >= 80) return 'Excelente trabajo. Tu acento es muy preciso.';
  if (pct >= 70) return 'Muy bien, suena clara. Casi perfecto.';
  if (pct >= 60) return 'Buen intento. Intenta pronunciarlo un poco más claramente.';
  if (pct >= 40) return 'Necesita más trabajo. Escúchalo de nuevo e intenta mejorar.';
  if (pct >= 20) return 'Necesita considerable mejora. Practica más.';
  return 'Requiere más práctica. Intenta de nuevo con más cuidado.';
}

export function EstadisticasDeFrases() {
  const router = useRouter();
  const fuente = useConfiguracionUsuario((state) => state.tamanoFuente);
  const fraseActual = useFrasesStore((state) => state.indiceActual);
  const frases = useFrasesStore((store) => store.frases);
  const texto = usePracticaStore((store) => store.texto);
  const setPrecision = usePracticaStore((store) => store.setPrecision);
  const resetearTiempo = usePracticaStore((store) => store.resetTiempo);
  const resetearTodo = usePracticaStore((store) => store.resetAll);
  useEffect(() => {
    resetearTodo();
  }, [resetearTodo]);
  const precision = comparacion_de_frases(frases[fraseActual]?.fraseIngles ?? '', texto ?? '');
  useEffect(() => {
    return () => {
      setPrecision(precision);
    };
  }, [precision, setPrecision]);
  const [displayValue, setDisplayValue] = useState(0);

  const color = colorSegunPrecision(precision);
  const textShadow = textShadowSegunPrecision(precision);
  const offset = CIRCUNFERENCIA - (precision / 100) * CIRCUNFERENCIA;
  const mensaje = mensajeSegunPrecision(precision);

  useEffect(() => {
    const from = 0;
    const to = precision;
    const duration = 800;
    const start = performance.now();
    let frame: number;
    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayValue(from + (to - from) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [precision]);

  return (
    <div
      className="ani d3 text-center rounded-2xl border border-white/10 p-5"
      style={{
        background: 'linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <p
        className={`font-ui ${fuente} font-semibold tracking-[0.2em] uppercase text-brand-green mb-3.5`}
      >
        Precisión
      </p>

      <div className="relative w-27.5 h-27.5 mx-auto mb-3" style={{ transform: 'rotate(-90deg)' }}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" fill="none" stroke="#1f2535" strokeWidth="6" r={RADIO} />
          <circle
            cx="55"
            cy="55"
            fill="none"
            r={RADIO}
            stroke={color}
            strokeDasharray={CIRCUNFERENCIA}
            strokeDashoffset={offset}
            style={{
              filter: `drop-shadow(0 0 8px ${color}99)`,
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ transform: 'rotate(90deg)' }}
        >
          <span
            className="font-display text-[28px] font-bold leading-none"
            style={{ color, textShadow }}
          >
            {displayValue.toFixed(0)}
          </span>
        </div>
      </div>

      <h3 className="font-display text-sm font-bold text-text-primary mb-1">Precisión Arcana</h3>
      <p className={`${fuente} text-text-secondary leading-relaxed mb-4`}>{mensaje}</p>
      <button
        className="inline-flex items-center justify-center w-full h-11 px-5 bg-brand-green text-surface-0 font-ui text-sm font-semibold rounded-lg transition-all duration-200 ease-out hover:shadow-[0_0_24px_rgba(61,214,140,0.45)] hover:-translate-y-0.5 active:translate-y-0"
        onClick={() => {
          resetearTiempo();
          router.push('/dashboard/estudiar/estadisticas');
        }}
      >
        Finalizar práctica
      </button>
    </div>
  );
}
