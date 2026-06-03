'use client';

import { useSesionPracticaStore } from '@/store/useSesionPracticaStore';
import { useFrasesStore } from '@/store/useFrasesStore';

const COLORES_EQUIPO = [
  '#3dd68c',
  '#6b5bff',
  '#f5a623',
  '#ff6b8a',
  '#4fc3f7',
  '#ff8a65',
];

export function PromedioEquipos() {
  const puntajesPorIntegrante = useSesionPracticaStore((s) => s.puntajesPorIntegrante);
  const protocoloGrupo = useFrasesStore((s) => s.protocoloGrupo);
  const gruposConfig = useFrasesStore((s) => s.gruposConfig);

  if (protocoloGrupo !== 'escuadron') return null;

  const entries = Object.entries(puntajesPorIntegrante);
  if (entries.length === 0) return null;

  const equipos: Record<string, { nombre: string; puntajes: number[] }> = {};

  for (const [key, puntajes] of entries) {
    const match = key.match(/^g(\d+)-i\d+$/);
    if (!match) continue;
    const gi = match[1];
    const nombre = gruposConfig[Number(gi)]?.nombre || `Escuadrón ${Number(gi) + 1}`;

    if (!equipos[gi]) {
      equipos[gi] = { nombre, puntajes: [] };
    }
    equipos[gi].puntajes.push(...puntajes);
  }

  const equipoList = Object.entries(equipos).map(([gi, eq]) => {
    const total = eq.puntajes.reduce((a, b) => a + b, 0);
    const promedio = eq.puntajes.length > 0 ? total / eq.puntajes.length : 0;
    return { id: Number(gi), nombre: eq.nombre, promedio, total, count: eq.puntajes.length };
  });

  if (equipoList.length === 0) return null;

  return (
    <div className="ani d2 mb-3 mx-auto w-full max-w-250 overflow-x-auto scrollbar-none max-md:hidden">
      <div className="flex items-stretch gap-2 min-w-0">
        {equipoList
          .sort((a, b) => b.promedio - a.promedio)
          .map((eq) => {
            const color = COLORES_EQUIPO[eq.id % COLORES_EQUIPO.length];
            return (
              <div
                key={eq.id}
                className="flex-1 min-w-0 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                }}
              >
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <span
                    className="font-ui text-[10px] font-bold tracking-[0.06em] uppercase truncate"
                    style={{ color }}
                  >
                    {eq.nombre}
                  </span>
                  <span
                    className="font-display text-xs font-bold leading-none shrink-0"
                    style={{ color, textShadow: `0 0 10px ${color}55` }}
                  >
                    {eq.promedio.toFixed(0)}%
                  </span>
                </div>
                <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${eq.promedio}%`,
                      background: `linear-gradient(90deg, ${color}55, ${color})`,
                      boxShadow: `0 0 6px ${color}33`,
                    }}
                  />
                </div>
                <p className="font-ui text-[9px] text-text-muted mt-1 tracking-wider">
                  {eq.count} {eq.count === 1 ? 'frase' : 'frases'}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
