import type { Metadata } from 'next';
import { DatosDelAutenticado } from '@/lib/auth';
import { obtenerEstadoProgreso } from '@/actions/progreso/obtenerEstadoProgreso';
import { EnDesarrollo } from '@/components/EnDesarrollo';
import { ViajesActivos } from '@/components/dashboard/ViajesActivos';
import {
  Flame,
  ArrowRight,
  SpellCheck2,
  Clock,
  Target,
  Map,
  Trophy,
  Crown,
  Compass,
  Zap,
  Layers,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Dashboard | speakingchallenge',
  description:
    'Tu progreso en speakingchallenge. Estadísticas, rachas, rituales diarios y acceso Link tus viajes Link través del tiempo.',
  robots: { index: false, follow: false },
};

export default async function Home() {
  const datos = await DatosDelAutenticado();
  const progreso = await obtenerEstadoProgreso();
  const usuarioStats = progreso.ok && progreso.usuario ? progreso.usuario : null;
  const estratoSocial = progreso.ok && progreso.progreso ? progreso.progreso.estrato_social : 0;
  const eraActiva = progreso.ok && progreso.progreso ? progreso.progreso.era_actual?.nombre ?? '' : '';
  const cantidadLogros = usuarioStats?.cantidad_logros ?? 0;
  const progresoExt = progreso as unknown as { ok: boolean; eras: Array<{
    id: string; nombre: string; orden: number; color: string;
    estado: 'completado' | 'activo' | 'disponible' | 'bloqueado';
    imperios: Array<{ id: string; nombre: string; orden: number; completado: boolean; activo: boolean }>;
  }> };
  const eras = progreso.ok && 'eras' in progreso ? progresoExt.eras : [];

  const diasDesdeInicio = usuarioStats?.created_at
    ? Math.floor((Date.now() - new Date(usuarioStats.created_at).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const ultimaFecha = usuarioStats?.ultima_racha_fecha
    ? new Date(usuarioStats.ultima_racha_fecha)
    : null;
  const racha = usuarioStats?.dias_racha ?? 0;
  const semanaDias: { label: string; activo: boolean; hoy: boolean }[] = [];
  const diasSemana = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  if (ultimaFecha) {
    const ultimaN = new Date(ultimaFecha.getFullYear(), ultimaFecha.getMonth(), ultimaFecha.getDate());
    for (let i = 6; i >= 0; i--) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      const fechaN = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
      const diff = Math.round((ultimaN.getTime() - fechaN.getTime()) / (1000 * 60 * 60 * 24));
      semanaDias.push({ label: diasSemana[fecha.getDay()], activo: diff >= 0 && diff < racha, hoy: i === 0 });
    }
  } else {
    for (let i = 6; i >= 0; i--) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      semanaDias.push({ label: diasSemana[fecha.getDay()], activo: false, hoy: i === 0 });
    }
  }

  return (
    <main className="pt-20 px-4 md:px-6 pb-10 relative z-10">
      <section className="ani d1 relative rounded-2xl overflow-hidden border border-white/6 p-6 md:p-8 mb-7">
        <div className="absolute inset-0 bg-linear-to-br from-brand-green/6 via-surface-1 to-brand-cyan/4"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(61, 214, 140, 0.12) 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
            opacity: 0.5,
          }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(61,214,140,0.07)_0%,transparent_60%),radial-gradient(ellipse_60%_50%_at_80%_90%,rgba(34,211,238,0.04)_0%,transparent_50%)]"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2.5">
                <Flame className="w-5 h-5 text-brand-amber" />
                <div className="inline-flex items-center gap-1.5 bg-brand-amber/12 border border-brand-amber/25 rounded-full px-3 py-1">
                  <span className="font-ui text-[11px] font-bold text-brand-amber">
                    {(usuarioStats?.dias_racha ?? 0)} días de racha
                  </span>
                </div>
                <div className="h-3 w-px bg-white/8"></div>
                <span className="font-ui text-ui-badge text-text-muted tracking-wider">
                  SEMANA DE PODER
                </span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2.5">
                Bienvenido, <span className="text-brand-green">{datos?.name}</span>
              </h1>
            </div>
            <Link
              href="/dashboard/emily"
              className="inline-flex items-center gap-2.5 bg-surface-3 border border-brand-green/15 rounded-xl px-3.5 py-2.5 cursor-pointer hover:border-brand-green/30 transition-all shrink-0"
            >
              <Image
                src="/Emily.png"
                alt="Emily"
                width={500}
                height={500}
                loading="eager"
                className="w-8 h-8 rounded-full bg-linear-to-br from-brand-green/20 to-brand-green/5 border border-brand-green/30 flex items-center justify-center font-display text-sm text-brand-green"
              />

              <div>
                <p className="font-ui text-[9px] font-bold text-brand-green tracking-wider mb-0.5">
                  EMILY · IA
                </p>
                <p className="text-[11px] text-text-secondary">
                  &ldquo;Mejoraste la <strong className="text-white">th</strong> ayer&rdquo;
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-green" />
            </Link>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 px-3 py-2 bg-brand-purple/10 border border-brand-purple/20 rounded-lg shrink-0">
              <Layers className="w-4 h-4 text-brand-purple" />
              <div>
                <p className="font-ui text-[9px] font-bold tracking-wider text-brand-purple uppercase">Estrato Social</p>
                <p className="font-display text-lg font-bold text-text-primary">{estratoSocial}</p>
              </div>
              {eraActiva && (
                <div className="border-l border-brand-purple/20 pl-3">
                  <p className="font-ui text-[9px] text-text-muted">Era activa</p>
                  <p className="font-display text-sm font-semibold text-text-primary">{eraActiva}</p>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-45">
              <div className="w-full h-2 bg-surface-4 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-between px-0.5 pointer-events-none">
                  <div className="w-px h-1.5 bg-white/8"></div>
                  <div className="w-px h-1.5 bg-white/8"></div>
                  <div className="w-px h-1.5 bg-white/8"></div>
                  <div className="w-px h-1.5 bg-white/8"></div>
                  <div className="w-px h-1.5 bg-white/8"></div>
                  <div className="w-px h-1.5 bg-white/8"></div>
                  <div className="w-px h-1.5 bg-white/8"></div>
                  <div className="w-px h-1.5 bg-white/8"></div>
                  <div className="w-px h-1.5 bg-white/8"></div>
                  <div className="w-px h-1.5 bg-white/8"></div>
                </div>
                <div
                  className="h-full rounded-full bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)] transition-all duration-500 relative"
                  style={{ width: `${usuarioStats?.precicion_global ?? 0}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_12px_rgba(61,214,140,0.7)]"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-ui text-[11px] text-text-muted self-center">
                {datos?.nivel}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7 ani d2">
        <div className="group bg-surface-2 border border-white/6 rounded-xl p-5 transition-all duration-200 hover:border-brand-green/15 hover:-translate-y-0.5 relative overflow-hidden">
          <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-brand-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-start justify-between mb-1">
            <p className="font-ui text-[9px] font-bold tracking-wider uppercase text-text-muted">
              Frases
            </p>
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center ring-1 ring-brand-green/20 group-hover:ring-brand-green/30 transition-all">
              <SpellCheck2 className="w-4 h-4 text-brand-green" />
            </div>
          </div>
          <div className="font-display text-[28px] font-bold text-brand-green leading-none tracking-wider">
            {usuarioStats?.frases ?? 0}
          </div>
          <p className="text-[11px] text-text-muted mt-1">dominadas</p>
        </div>

        <div className="group bg-surface-2 border border-white/6 rounded-xl p-5 transition-all duration-200 hover:border-brand-cyan/15 hover:-translate-y-0.5 relative overflow-hidden">
          <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-brand-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-start justify-between mb-1">
            <p className="font-ui text-[9px] font-bold tracking-wider uppercase text-text-muted">
              Tiempo
            </p>
            <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center ring-1 ring-brand-cyan/20 group-hover:ring-brand-cyan/30 transition-all">
              <Clock className="w-4 h-4 text-brand-cyan" />
            </div>
          </div>
          <div className="font-display text-[28px] font-bold text-brand-cyan leading-none tracking-wider">
            {(usuarioStats?.tiempo_promedio ?? 0).toFixed(1)}
          </div>
          <p className="text-[11px] text-text-muted mt-1">viajadas en el tiempo</p>
        </div>

        <div className="group bg-surface-2 border border-white/6 rounded-xl p-5 transition-all duration-200 hover:border-brand-amber/15 hover:-translate-y-0.5 relative overflow-hidden">
          <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-brand-amber/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-start justify-between mb-1">
            <p className="font-ui text-[9px] font-bold tracking-wider uppercase text-text-muted">
              Precisión
            </p>
            <div className="w-8 h-8 rounded-lg bg-brand-amber/10 flex items-center justify-center ring-1 ring-brand-amber/20 group-hover:ring-brand-amber/30 transition-all">
              <Target className="w-4 h-4 text-brand-amber" />
            </div>
          </div>
          <div className="font-display text-[28px] font-bold text-brand-amber leading-none tracking-wider">
            {usuarioStats?.precicion_global ?? 0}%
          </div>
          <p className="text-[11px] text-text-muted mt-1">tasa de acierto global</p>
          <div className="mt-2.5">
            <div className="w-full h-1 bg-surface-4 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-amber shadow-[0_0_8px_rgba(245,166,35,0.5)] transition-all duration-500"
                style={{ width: `${usuarioStats?.precicion_global ?? 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="flex flex-col gap-7">
          <section className="ani d3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-bold text-white flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-brand-green" />
                Acceso Rápido
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 items-start">
              <Link
                href="/dashboard/estudiar"
                className="group bg-surface-2 border border-white/6 rounded-xl p-4 text-left hover:border-brand-green/20 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-3 group-hover:bg-brand-green/15 group-hover:border-brand-green/30 transition-all">
                  <Map className="w-4 h-4 text-brand-green" />
                </div>
                <p className="font-display text-[13px] font-bold text-white mb-0.5">Estudiar</p>
                <p className="font-ui text-[9px] text-text-muted">lecciones</p>
              </Link>
              <Link
                href="/dashboard/emily"
                className="group bg-surface-2 border border-white/6 rounded-xl p-4 text-left hover:border-brand-cyan/20 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-3 group-hover:bg-brand-cyan/15 group-hover:border-brand-cyan/30 transition-all">
                  <Compass className="w-4 h-4 text-brand-cyan" />
                </div>
                <p className="font-display text-[13px] font-bold text-white mb-0.5">Emily IA</p>
                <p className="font-ui text-[9px] text-text-muted">Conversación libre</p>
              </Link>
              <Link
                href="/dashboard/logros"
                className="group bg-surface-2 border border-white/6 rounded-xl p-4 text-left hover:border-brand-amber/20 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center mb-3 group-hover:bg-brand-amber/15 group-hover:border-brand-amber/30 transition-all">
                  <Trophy className="w-4 h-4 text-brand-amber" />
                </div>
                <p className="font-display text-[13px] font-bold text-white mb-0.5">Logros</p>
                <p className="font-ui text-[9px] text-text-muted">
                  {cantidadLogros} {cantidadLogros === 1 ? 'desbloqueado' : 'desbloqueados'}
                </p>
              </Link>
            </div>
          </section>

          <section className="ani d4">
            <ViajesActivos eras={eras} maxCards={2} />
          </section>
        </div>

        <div className="flex flex-col gap-5">
          <EnDesarrollo>
            <div className="bg-surface-2 border border-white/6 rounded-xl p-5 ani d2">
              <div className="flex items-center gap-2.5 mb-4">
                <Trophy className="w-5 h-5 text-brand-amber" />
                <h2 className="font-display text-sm font-bold">Ranking Global</h2>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 bg-brand-amber/6 border border-brand-amber/15 rounded-lg mb-3">
                <div className="font-display text-[28px] font-bold text-brand-amber min-w-12 text-center">
                  5%
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white">Top 5% global</p>
                  <p className="text-[11px] text-text-muted">Superas Link 3,840 estudiantes</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-brand-green/6 border border-brand-green/12">
                  <span className="font-ui text-[11px] font-bold text-brand-green min-w-[20px] flex items-center gap-1">
                    <Crown className="w-3 h-3 text-brand-amber" />
                    #1
                  </span>
                  <div className="w-6 h-6 rounded-full bg-linear-to-br from-amber-600/30 to-amber-800/20 border border-amber-500/40 flex items-center justify-center font-display text-[9px] font-bold text-amber-400">
                    V
                  </div>
                  <span className="text-[12px] text-white flex-1">Valentina R.</span>
                  <span className="font-ui text-ui-badge text-text-muted">4,100 XP</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/2">
                  <span className="font-ui text-[11px] font-bold text-text-muted min-w-[20px]">
                    #2
                  </span>
                  <div className="w-6 h-6 rounded-full bg-linear-to-br from-gray-400/20 to-gray-600/10 border border-gray-500/30 flex items-center justify-center font-display text-[9px] font-bold text-gray-400">
                    L
                  </div>
                  <span className="text-[12px] text-text-secondary flex-1">Luis A.</span>
                  <span className="font-ui text-ui-badge text-text-muted">3,890 XP</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-brand-green/6 border border-brand-green/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(61,214,140,0.06)_0%,transparent_60%)]"></div>
                  <span className="font-ui text-[11px] font-bold text-brand-amber min-w-[20px] relative z-10">
                    Tú
                  </span>
                  <div className="w-6 h-6 rounded-full bg-linear-to-br from-brand-green/30 to-brand-green/10 border border-brand-green/50 flex items-center justify-center font-display text-[9px] font-bold text-brand-green relative z-10 shadow-[0_0_8px_rgba(61,214,140,0.2)]">
                    A
                  </div>
                  <span className="text-[12px] text-white flex-1 relative z-10">Aurelius</span>
                  <span className="font-ui text-ui-badge text-brand-amber relative z-10">
                    2,450 XP
                  </span>
                </div>
              </div>
            </div>
          </EnDesarrollo>

          <div className="bg-surface-2 border border-white/6 rounded-xl p-5 ani d3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-brand-amber" />
                <h2 className="font-display text-sm font-bold">Racha</h2>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-brand-amber/12 border border-brand-amber/25 rounded-full px-3 py-1">
                <span className="font-display text-xl font-bold text-brand-amber">
                  {usuarioStats?.dias_racha ?? 0}
                </span>
                <span className="font-ui text-ui-badge text-text-muted">días</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3 px-1">
              <span className="font-ui text-[9px] font-semibold tracking-wider text-text-muted">Desde tu registro</span>
              <span className="font-display text-sm font-bold text-text-primary">{diasDesdeInicio} días</span>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-3">
              {semanaDias.map((dia, i) => (
                <div key={i} className="text-center">
                  <div
                    className={`w-full aspect-square rounded-md flex items-center justify-center mb-0.5 ${
                      dia.hoy
                        ? 'bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.4)]'
                        : dia.activo
                          ? 'bg-brand-green/20 border border-brand-green/30'
                          : 'bg-surface-4 border border-white/6'
                    }`}
                  >
                    {dia.activo && (
                      <span className={`text-[8px] ${dia.hoy ? 'font-bold text-[#07090f]' : ''}`}>
                        ✓
                      </span>
                    )}
                  </div>
                  <span className={`font-ui text-[8px] ${dia.hoy ? 'text-brand-green' : 'text-text-muted'}`}>
                    {dia.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
