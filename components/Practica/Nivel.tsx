'use client';

import { useFrasesStore } from '@/store/useFrasesStore';

export function Nivel() {
  const indiceActual = useFrasesStore((s) => s.indiceActual);
  const totalFrases = useFrasesStore((s) => s.totalFrases);
  const progreso = totalFrases > 0 ? ((indiceActual + 1) / totalFrases) * 100 : 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none px-6 pb-4 hidden md:flex justify-between items-end">
      <div className="flex flex-col gap-1 opacity-55">
        <span className="font-ui text-[9px] font-bold tracking-[0.3em] uppercase text-brand-green">
          Frase {indiceActual + 1} de {totalFrases}
        </span>
        <div className="w-35 h-1.25 rounded bg-surface-4 overflow-hidden">
          <div
            className="h-full rounded bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)] transition-all duration-300"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>
    </div>
  );
}
