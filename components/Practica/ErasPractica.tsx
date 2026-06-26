'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  CheckCircle,
  Lock,
  Hourglass,
  Trophy,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Target,
  Languages,
} from 'lucide-react';

type NivelData = {
  id: string;
  orden: number;
  frases: number;
  completado: boolean;
  precision_promedio: number | null;
};

type ImperioData = {
  id: string;
  nombre: string;
  orden: number;
  frases_propias: number;
  porcentaje_aprobacion: number;
  total_niveles: number;
  niveles: NivelData[];
  completado: boolean;
  activo: boolean;
};

type EraData = {
  id: string;
  nombre: string;
  orden: number;
  color: string;
  estado: 'completado' | 'activo' | 'disponible' | 'bloqueado';
  imperios: ImperioData[];
};

interface Props {
  eras: EraData[];
  estratoSocial: number;
  nivelActualId: string | null;
}

const imagenes: Record<string, string> = {
  Antigua: '/eras/Era_Antigua.webp',
  Medieval: '/eras/Era_medieval.webp',
  Moderna: '/eras/Era_Moderna.webp',
  Crypto: '/eras/Era_crypto.webp',
  'Post-Humana': '/eras/Era_postHUmana.webp',
};

const badgeStyles: Record<string, string> = {
  completado: 'bg-brand-green/15 text-brand-green border-brand-green/25',
  activo: 'bg-brand-green/15 text-brand-green border-brand-green/25',
  disponible: 'bg-brand-amber/15 text-brand-amber border-brand-amber/25',
  bloqueado: 'bg-white/5 text-text-muted border-white/5',
};

const badgeLabels: Record<string, string> = {
  completado: 'Completado',
  activo: 'Activo',
  disponible: 'Disponible',
  bloqueado: 'Bloqueado',
};

export function ErasPractica({ eras, estratoSocial, nivelActualId }: Props) {
  const [eraExpandida, setEraExpandida] = useState<string | null>(null);

  const toggleEra = (eraId: string) => {
    setEraExpandida((prev) => (prev === eraId ? null : eraId));
  };

  const eraSeleccionada = eras.find((e) => e.id === eraExpandida);

  return (
    <div className="relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl p-4 sm:p-6 ani delay-anim-3">
      <div className="hud-corner-sm hud-corner-tl-sm" />
      <div className="hud-corner-sm hud-corner-tr-sm" />
      <div className="hud-corner-sm hud-corner-bl-sm" />
      <div className="hud-corner-sm hud-corner-br-sm" />

      <h3 className="flex items-center gap-2.5 mb-5 relative">
        <Hourglass className="w-4 h-4 text-brand-cyan" />
        <span className="font-display text-sm font-semibold text-text-primary">
          Focalización de Era
        </span>
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-2 pt-2 snap-x snap-mandatory era-scroll">
        {eras.map((era) => {
          const esActiva = era.estado === 'activo';
          const esCompletada = era.estado === 'completado';
          const esBloqueada = era.estado === 'bloqueado';
          const estaExpandida = eraExpandida === era.id;

          const imperiosCompletados = era.imperios.filter((i) => i.completado).length;
          const totalImperios = era.imperios.length;

          const nivelesCompletadosTotales = era.imperios.reduce(
            (acc, imp) => acc + imp.niveles.filter((n) => n.completado).length,
            0,
          );
          const nivelesTotales = era.imperios.reduce(
            (acc, imp) => acc + imp.niveles.length,
            0,
          );

          return (
            <div key={era.id} className="shrink-0 min-w-[200px] sm:min-w-[240px] lg:min-w-[260px]">
              <div
                onClick={() => !esBloqueada && toggleEra(era.id)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !esBloqueada) {
                    e.preventDefault();
                    toggleEra(era.id);
                  }
                }}
                role="button"
                tabIndex={esBloqueada ? -1 : 0}
                aria-expanded={estaExpandida}
                className={`relative h-32 sm:h-36 lg:h-40 rounded-xl overflow-hidden transition-all duration-300 ${
                  esBloqueada
                    ? 'opacity-50 cursor-not-allowed border border-white/6'
                    : estaExpandida
                      ? 'border-2 border-brand-green cursor-pointer shadow-[0_0_24px_rgba(61,214,140,0.25)]'
                      : esActiva
                        ? 'border border-brand-green/40 cursor-pointer hover:border-brand-green/30 hover:-translate-y-1 shadow-[0_0_20px_rgba(61,214,140,0.15)]'
                        : esCompletada
                          ? 'border border-brand-green/20 cursor-pointer hover:border-brand-green/30 hover:-translate-y-1'
                          : 'border border-white/6 cursor-pointer hover:border-brand-green/30 hover:-translate-y-1'
                }`}
              >
                {esBloqueada && (
                  <div className="absolute inset-0" style={{ filter: 'brightness(0.5)' }}>
                    <Image
                      alt={era.nombre}
                      src={imagenes[era.nombre] || '/eras/Era_Antigua.webp'}
                      width={1536}
                      height={1024}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 640px) 200px, 260px"
                    />
                  </div>
                )}
                {!esBloqueada && (
                  <Image
                    alt={era.nombre}
                    src={imagenes[era.nombre] || '/eras/Era_Antigua.webp'}
                    width={1536}
                    height={1024}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 640px) 200px, 260px"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#07090f]/95 via-[#07090f]/20 to-transparent" />

                {esBloqueada && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-9 h-9 text-white/40" />
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="min-w-0">
                    <span
                      className={`font-ui text-[9px] font-bold tracking-widest uppercase px-1.5 py-1 rounded border mb-1.5 inline-block ${badgeStyles[era.estado]}`}
                    >
                      {badgeLabels[era.estado]}
                    </span>
                    <p
                      className={`font-display text-base font-bold text-white ${esBloqueada ? 'opacity-50' : ''}`}
                    >
                      {era.nombre} Era
                    </p>
                    {!esBloqueada && (
                      <p className="font-ui text-[10px] text-text-muted mt-0.5">
                        {nivelesCompletadosTotales}/{nivelesTotales} niveles
                      </p>
                    )}
                  </div>
                  {esCompletada && <CheckCircle className="w-6 h-6 text-brand-green shrink-0" />}
                  {esActiva && (
                    <div className="flex items-center gap-1.5 bg-brand-green/10 border border-brand-green/20 rounded-full px-2.5 py-1 shrink-0">
                      <Trophy className="w-3 h-3 text-brand-green" />
                      <span className="font-ui text-[10px] font-bold text-brand-green">
                        ES {estratoSocial}
                      </span>
                    </div>
                  )}
                  {!esBloqueada && !esCompletada && (
                    <ChevronDown
                      className={`w-5 h-5 text-text-muted transition-transform duration-200 ${estaExpandida ? 'rotate-180' : ''}`}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded era detail panel */}
      {eraSeleccionada && (
        <div className="ani d1 mt-5 rounded-xl border border-white/6 bg-surface-1/90 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display text-base font-bold text-text-primary">
              {eraSeleccionada.nombre} Era
            </h4>
            <span className="font-ui text-[10px] text-text-muted">
              {eraSeleccionada.imperios.reduce(
                (a, i) => a + i.niveles.filter((n) => n.completado).length, 0,
              )}
              /{eraSeleccionada.imperios.reduce((a, i) => a + i.niveles.length, 0)} niveles
            </span>
          </div>

          <div className="space-y-4">
            {eraSeleccionada.imperios.map((imp) => {
              const nivelesCompletados = imp.niveles.filter((n) => n.completado).length;

              return (
                <div
                  key={imp.id}
                  className="rounded-lg border border-white/6 bg-surface-2/50 p-3.5"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-semibold text-text-primary">
                        {imp.nombre}
                      </span>
                      {imp.completado && (
                        <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-ui text-[10px] text-text-muted">
                        {nivelesCompletados}/{imp.total_niveles} niveles
                      </span>
                      <Target className="w-3.5 h-3.5 text-brand-amber" />
                      <span className="font-ui text-[10px] font-semibold text-brand-amber">
                        {imp.porcentaje_aprobacion}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {imp.niveles.map((nvl) => {
                      const esActual = nvl.id === nivelActualId;
                      const puedeAcceder =
                        nvl.orden === 1 ||
                        imp.niveles.find((n) => n.orden === nvl.orden - 1)?.completado ||
                        nvl.completado;

                      return (
                        <Link
                          key={nvl.id}
                          href={
                            puedeAcceder
                              ? `/dashboard/estudiar/practicar-nivel?nivel_id=${nvl.id}`
                              : '#'
                          }
                          onClick={(e) => {
                            if (!puedeAcceder) e.preventDefault();
                          }}
                          className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-all duration-200 ${
                            nvl.completado
                              ? 'border-brand-green/25 bg-brand-green/6 hover:bg-brand-green/10 hover:border-brand-green/40'
                              : puedeAcceder
                                ? 'border-white/6 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-green/20'
                                : 'border-white/4 bg-white/[0.01] opacity-40 cursor-not-allowed'
                          } ${esActual && !nvl.completado ? 'ring-1 ring-brand-green/30' : ''}`}
                        >
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-bold font-ui shrink-0 ${
                              nvl.completado
                                ? 'bg-brand-green/20 text-brand-green'
                                : 'bg-white/8 text-text-muted'
                            }`}
                          >
                            {nvl.orden}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`font-ui text-[12px] font-semibold ${
                                  nvl.completado ? 'text-brand-green' : 'text-text-primary'
                                }`}
                              >
                                Nivel {nvl.orden}
                              </span>
                              {esActual && !nvl.completado && (
                                <span className="font-ui text-[9px] text-brand-green font-bold tracking-wider">
                                  ACTUAL
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Languages className="w-3 h-3 text-text-muted" />
                              <span className="font-ui text-[10px] text-text-muted">
                                {nvl.frases} frases
                              </span>
                              {nvl.completado && nvl.precision_promedio !== null && (
                                <span className="font-ui text-[10px] font-semibold text-brand-green">
                                  {nvl.precision_promedio.toFixed(1)}%
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0">
                            {nvl.completado ? (
                              <div className="flex items-center gap-1 text-brand-green/70">
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span className="font-ui text-[9px] font-semibold hidden sm:inline">
                                  Repetir
                                </span>
                              </div>
                            ) : puedeAcceder ? (
                              <ChevronRight className="w-4 h-4 text-text-muted" />
                            ) : (
                              <Lock className="w-3.5 h-3.5 text-text-muted/50" />
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
