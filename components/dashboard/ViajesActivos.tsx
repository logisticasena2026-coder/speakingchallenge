import Image from 'next/image';
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';

type ImperioEstado = {
  id: string;
  nombre: string;
  orden: number;
  completado: boolean;
  activo: boolean;
};

type EraData = {
  id: string;
  nombre: string;
  orden: number;
  color: string;
  estado: 'completado' | 'activo' | 'disponible' | 'bloqueado';
  imperios: ImperioEstado[];
};

const imagenes: Record<string, string> = {
  Antigua: '/eras/Era_Antigua.webp',
  Medieval: '/eras/Era_medieval.webp',
  Moderna: '/eras/Era_Moderna.webp',
  Crypto: '/eras/Era_crypto.webp',
  'Post-Humana': '/eras/Era_postHUmana.webp',
};

const gradientMap: Record<string, string> = {
  Antigua: 'from-era-egypt-start/60 via-[#3d2800]/40 to-era-egypt-end/60',
  Medieval: 'from-era-rome-start/60 via-[#3d1515]/40 to-era-rome-end/60',
  Moderna: 'from-[#0a1a10]/60 via-[#153020]/40 to-[#204030]/60',
  Crypto: 'from-[#0a0a1a]/60 via-[#1a1040]/40 to-[#0d1a3d]/60',
  'Post-Humana': 'from-[#0a0a0a]/60 via-[#1a0a2a]/40 to-[#2a1040]/60',
};

const progressColorMap: Record<string, string> = {
  Antigua: 'bg-brand-amber shadow-[0_0_8px_rgba(245,166,35,0.5)]',
  Medieval: 'bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.5)]',
  Moderna: 'bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)]',
  Crypto: 'bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]',
  'Post-Humana': 'bg-brand-purple shadow-[0_0_8px_rgba(168,85,247,0.5)]',
};

interface Props {
  eras: EraData[];
  maxCards?: number;
}

export function ViajesActivos({ eras, maxCards }: Props) {
  const viajes = eras.filter((e) => e.estado === 'activo' || e.estado === 'disponible');
  const mostrar = maxCards ? viajes.slice(0, maxCards) : viajes;
  const hayMas = maxCards ? viajes.length > maxCards : false;

  if (mostrar.length === 0) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-base font-bold text-white flex items-center gap-2.5">
          <Zap className="w-4 h-4 text-brand-green" />
          Viajes Activos
        </h2>
        {hayMas && (
          <Link
            href="/dashboard/viajes"
            className="bg-transparent text-text-muted border border-white/6 font-ui text-ui-badge font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg flex items-center gap-1.5 hover:border-white/10 hover:text-white hover:bg-white/3 transition-all"
          >
            Ver todos
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>

      <div className={`grid grid-cols-1 gap-4 ${mostrar.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {mostrar.map((era) => {
          const completados = era.imperios.filter((i) => i.completado).length;
          const total = era.imperios.length;
          const progreso = total > 0 ? (completados / total) * 100 : 0;

          return (
            <Link
              key={era.id}
              href="/dashboard/estudiar"
              className="group relative rounded-xl overflow-hidden border border-white/6 cursor-pointer transition-all duration-300 hover:border-brand-green/25 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className={`w-full h-60 relative overflow-hidden bg-linear-to-br ${gradientMap[era.nombre] || gradientMap['Antigua']}`}>
                <Image
                  alt={era.nombre}
                  src={imagenes[era.nombre] || '/eras/Era_Antigua.webp'}
                  width={1536}
                  height={1024}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-[rgba(7,9,15,0.95)] via-[rgba(7,9,15,0.3)] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div>
                  <span className="font-display text-base font-bold text-white block mb-1">
                    {era.nombre}
                  </span>
                  <p className="text-[11px] text-text-secondary mb-2">
                    {completados}/{total} imperios completados
                  </p>
                  <div className="w-full h-1.5 bg-surface-4 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${progressColorMap[era.nombre] || progressColorMap['Antigua']} transition-all duration-500`}
                      style={{ width: `${progreso}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-ui text-[9px] font-bold uppercase tracking-wider bg-brand-green text-[#07090f] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-[0_0_20px_rgba(61,214,140,0.3)]">
                  <Zap className="w-3 h-3" />
                  Viajar
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
