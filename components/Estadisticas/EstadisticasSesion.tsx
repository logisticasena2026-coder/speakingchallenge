'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Hourglass, Target, Users, Shield, Trophy } from 'lucide-react';
import { usePracticaStore } from '@/store/usePracticaStore';
import { useSesionPracticaStore } from '@/store/useSesionPracticaStore';
const RADIO = 42;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;

const WAVE_HEIGHTS = [
  12, 22, 34, 42, 50, 46, 38, 28, 18, 22, 30, 40, 48, 44, 36, 26, 16, 20, 28, 38, 46, 42, 34, 24,
];

const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

function formatearTiempo(segundos: number): string {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function colorPrecision(pct: number): string {
  if (pct >= 95) return '#22d3ee';
  if (pct >= 80) return '#3dd68c';
  if (pct >= 60) return '#f5a623';
  return '#ef4444';
}

function sombraPrecision(pct: number): string {
  if (pct >= 95) return 'drop-shadow(0 0 12px rgba(34,211,238,0.5))';
  if (pct >= 80) return 'drop-shadow(0 0 10px rgba(61,214,140,0.5))';
  if (pct >= 60) return 'drop-shadow(0 0 10px rgba(245,166,35,0.5))';
  return 'drop-shadow(0 0 10px rgba(239,68,68,0.5))';
}

function rating(pct: number): { letra: string; clase: string } {
  if (pct >= 95) return { letra: 'S', clase: 'text-brand-cyan border-cyan-500/25 bg-cyan-500/8' };
  if (pct >= 85)
    return { letra: 'A', clase: 'text-brand-green border-green-500/25 bg-green-500/8' };
  if (pct >= 75)
    return { letra: 'B', clase: 'text-brand-amber border-amber-500/25 bg-amber-500/8' };
  if (pct >= 60)
    return { letra: 'C', clase: 'text-yellow-400 border-yellow-400/25 bg-yellow-400/8' };
  return { letra: 'D', clase: 'text-red-400 border-red-400/25 bg-red-400/8' };
}

function mensajePrecision(pct: number): string {
  if (pct >= 95) return 'Pronunciación de élite. Dominio absoluto.';
  if (pct >= 85) return 'Excelente. Precisión muy alta.';
  if (pct >= 75) return 'Muy buen trabajo. Pulir detalles.';
  if (pct >= 60) return 'Bien, pero puedes mejorar.';
  return 'Requiere más práctica. Intenta de nuevo.';
}

function AnilloPrecision({ precision }: Readonly<{ precision: number }>) {
  const [valor, setValor] = useState(0);
  const color = colorPrecision(precision);
  const sombra = sombraPrecision(precision);
  const offset = CIRCUNFERENCIA - (precision / 100) * CIRCUNFERENCIA;

  useEffect(() => {
    const desde = 0;
    const hasta = precision;
    const duracion = 1200;
    const inicio = performance.now();
    let id: number;
    function tick(ahora: number) {
      const t = Math.min((ahora - inicio) / duracion, 1);
      const suave = 1 - Math.pow(1 - t, 3);
      setValor(desde + (hasta - desde) * suave);
      if (t < 1) id = requestAnimationFrame(tick);
    }
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [precision]);

  return (
    <div className="relative w-25 h-25 mx-auto mb-2" style={{ transform: 'rotate(-90deg)' }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" fill="none" stroke="#1f2535" strokeWidth="5" r={RADIO} />
        <circle
          cx="50"
          cy="50"
          fill="none"
          r={RADIO}
          stroke={color}
          strokeDasharray={CIRCUNFERENCIA}
          strokeDashoffset={offset}
          style={{
            filter: sombra,
            transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
            strokeLinecap: 'round',
          }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: 'rotate(90deg)' }}
      >
        <span
          className="font-display text-[28px] font-bold leading-none tracking-tight"
          style={{ color, textShadow: `0 0 16px ${color}55` }}
        >
          {valor.toFixed(0)}
        </span>
      </div>
    </div>
  );
}

function fechaFormateada(): string {
  const d = new Date();
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

const HUD_CORNERS = [
  { text: 'top-2.5 left-2.5 border-t border-l rounded-tl', id: 1 },
  { text: 'top-2.5 right-2.5 border-t border-r rounded-tr', id: 2 },
  { text: 'bottom-2.5 left-2.5 border-b border-l rounded-bl', id: 3 },
  { text: 'bottom-2.5 right-2.5 border-b border-r rounded-br', id: 4 },
] as const;

function HudCorners() {
  return (
    <>
      {HUD_CORNERS.map((pos) => (
        <div
          key={pos.id}
          className={`absolute ${pos.text} w-3 h-3 border-white/8 opacity-0 transition-all duration-350 ease-out group-hover:opacity-100 pointer-events-none`}
        />
      ))}
    </>
  );
}

export function EstadisticasSesion() {
  const estadisticas = usePracticaStore((store) => store.estadisticas);
  const router = useRouter();

  const historialGrupos = useSesionPracticaStore((store) => store.historialGrupos);
  const cargarHistorial = useSesionPracticaStore((store) => store.cargarHistorial);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    cargarHistorial();
    setReady(true);
  }, [cargarHistorial]);

  const tieneSquadReciente =
    ready &&
    historialGrupos.length > 0 &&
    Date.now() - new Date(historialGrupos[historialGrupos.length - 1].fecha).getTime() < 60000;

  useEffect(() => {
    if (!ready) return;
    if (estadisticas.length === 0 && !tieneSquadReciente) {
      router.replace('/dashboard/estudiar');
    }
  }, [estadisticas, router, tieneSquadReciente, ready]);

  const tiempoTotal = usePracticaStore((store) => store.tiempoTotal);
  const sesion = {
    tiempoSegundos: tiempoTotal,
    totalFrases: estadisticas.length + 1,
    precisionMedia:
      estadisticas.reduce((acc, e) => acc + e.precision, 0) / estadisticas.length || 0,
  };

  const promedioPorFrase = sesion.tiempoSegundos / sesion.totalFrases;
  const { letra, clase } = rating(sesion.precisionMedia);

  const gruposStats = tieneSquadReciente ? historialGrupos : [];

  return (
    <>
      <div className="orb orb--1" />
      <div className="orb orb--2" />
      <div className="orb orb--3" />

      <div className="fixed bottom-0 left-0 right-0 h-22 flex items-end justify-center gap-75 opacity-15 pointer-events-none z-0 px-6">
        {WAVE_HEIGHTS.map((h, i) => (
          <span
            key={i}
            className="waveform-bar"
            style={{
              height: `${i}px`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <main className="relative z-10 px-6 py-8 max-w-250 mx-auto w-full min-w-0">
        <div className="mb-6 ani d1">
          <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
            Estadísticas de Práctica
          </h1>
          <p className="text-sm text-text-secondary max-w-100">
            Resultados de tu sesión de práctica de pronunciación
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap text-[11px] font-ui text-text-muted mb-7 ani d2">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-text-muted-alt" />
            {fechaFormateada()}
          </span>
          <span className="w-px h-3.5 bg-white/8" />
          <span className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-text-muted-alt" />
            {sesion.totalFrases} frases
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="group relative overflow-hidden rounded-xl border border-white/6 bg-white/3 p-5 ani-scale d2 transition-all duration-250 ease-out hover:-translate-y-1 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(61,214,140,0.06)]">
            <HudCorners />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-linear-to-r from-transparent via-brand-cyan to-transparent rounded-full transition-all duration-350 ease-out group-hover:w-4/5 pointer-events-none" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand-cyan/15 to-brand-cyan/5 border border-brand-cyan/20 flex items-center justify-center shrink-0 transition-all duration-250 group-hover:shadow-[0_0_16px_rgba(34,211,238,0.15)] group-hover:border-brand-cyan/30">
                <Clock className="w-5 h-5 text-brand-cyan" />
              </div>
              <div className="min-w-0">
                <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-1">
                  Tiempo de Práctica
                </p>
                <p className="font-display text-2xl font-bold text-text-primary tracking-wider">
                  {formatearTiempo(sesion.tiempoSegundos)}
                </p>
                <p className="font-body text-[11px] text-text-muted mt-0.5">
                  duración total de la sesión
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-white/6 bg-white/3 p-5 ani-scale d3 transition-all duration-250 ease-out hover:-translate-y-1 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(61,214,140,0.06)]">
            <HudCorners />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-linear-to-r from-transparent via-brand-purple to-transparent rounded-full transition-all duration-350 ease-out group-hover:w-4/5 pointer-events-none" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand-purple/15 to-brand-purple/5 border border-brand-purple/20 flex items-center justify-center shrink-0 transition-all duration-250 group-hover:shadow-[0_0_16px_rgba(168,85,247,0.15)] group-hover:border-brand-purple/30">
                <Hourglass className="w-5 h-5 text-brand-purple" />
              </div>
              <div className="min-w-0">
                <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-1">
                  Promedio por Frase
                </p>
                <p className="font-display text-2xl font-bold text-text-primary">
                  {promedioPorFrase.toFixed(1)}
                  <span className="text-lg font-body text-text-muted ml-0.5">s</span>
                </p>
                <p className="font-body text-[11px] text-text-muted mt-0.5">
                  tiempo medio por pronunciación
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-white/6 bg-white/3 p-5 text-center ani-scale d4 transition-all duration-250 ease-out hover:-translate-y-1 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(61,214,140,0.06)]">
            <HudCorners />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-linear-to-r from-transparent via-brand-green to-transparent rounded-full transition-all duration-350 ease-out group-hover:w-4/5 pointer-events-none" />
            <div className="absolute top-3 right-3">
              <span
                className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border text-[11px] font-bold font-display transition-all duration-250 group-hover:scale-110 ${clase}`}
              >
                {letra}
              </span>
            </div>
            <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-brand-green mb-2">
              Precisión de Pronunciación
            </p>
            <AnilloPrecision precision={sesion.precisionMedia} />
            <p className="font-body text-[11px] text-text-muted">
              {mensajePrecision(sesion.precisionMedia)}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center ani d5">
          <Link
            href="/dashboard/estudiar"
            className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/5 px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-250 hover:bg-white/10 hover:border-white/15 hover:-translate-y-0.5"
          >
            Finalizar sesión
          </Link>
        </div>

        {tieneSquadReciente && estadisticas.length === 0 && (
          <section className="mt-12 ani d3">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-brand-amber" />
              <h2 className="font-display text-xl font-bold text-text-primary">
                Estadísticas de Escuadrón
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {gruposStats.map((grupo, gi) => {
                const colorGrupo = gi % 3 === 0 ? '#22d3ee' : gi % 3 === 1 ? '#f5a623' : '#a855f7';
                return (
                  <div
                    key={gi}
                    className="group relative overflow-hidden rounded-xl border border-white/6 bg-white/3 p-5 transition-all duration-250 ease-out hover:-translate-y-1 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                  >
                    <HudCorners />

                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-5 h-5 shrink-0" style={{ color: colorGrupo }} />
                      <div className="min-w-0">
                        <h3 className="font-display text-sm font-bold text-text-primary">
                          {grupo.nombre}
                        </h3>
                        <p className="font-ui text-[10px] text-text-muted tracking-wider">
                          {grupo.totalFrases} frases ·{' '}
                          {grupo.precisionMedia.toFixed(1)}% precisión media
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-white/4 border border-white/6">
                      <Trophy className="w-4 h-4 shrink-0" style={{ color: colorGrupo }} />
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <span className="font-ui text-[10px] font-semibold tracking-wider uppercase text-text-muted">
                            Precisión grupal
                          </span>
                          <span
                            className="font-display text-lg font-bold"
                            style={{ color: colorGrupo }}
                          >
                            {grupo.precisionMedia.toFixed(0)}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-white/8 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${grupo.precisionMedia}%`,
                              backgroundColor: colorGrupo,
                              boxShadow: `0 0 8px ${colorGrupo}66`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-text-muted">
                        Desglose por integrante
                      </p>
                      {grupo.integrantes.map((integrante, ii) => {
                        const promedio =
                          integrante.puntajes.length > 0
                            ? integrante.puntajes.reduce((a, b) => a + b, 0) /
                              integrante.puntajes.length
                            : 0;
                        return (
                          <div
                            key={ii}
                            className="flex items-center justify-between gap-3 rounded-lg border border-white/6 bg-white/3 px-3.5 py-2.5"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/6 font-ui text-[10px] font-bold text-text-muted">
                                {ii + 1}
                              </span>
                              <span className="font-ui text-sm font-semibold text-text-primary truncate">
                                {integrante.nombre}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="font-ui text-[10px] text-text-muted tabular-nums">
                                {integrante.puntajes.length} respuestas
                              </span>
                              <span
                                className="font-display text-sm font-bold min-w-[3ch] text-right"
                                style={{ color: promedio >= 60 ? '#3dd68c' : '#ef4444' }}
                              >
                                {promedio.toFixed(0)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
