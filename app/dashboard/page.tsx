import type { Metadata } from 'next';
import {
  Flame,
  ArrowRight,
  SpellCheck2,
  TrendingUp,
  Clock,
  Timer,
  Target,
  Map,
  Trophy,
  Crown,
  Compass,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard | speakingchallenge',
  description:
    'Tu progreso en speakingchallenge. Estadísticas, rachas, rituales diarios y acceso a tus viajes a través del tiempo.',
  robots: { index: false, follow: false },
};

export default function Home() {
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
                    12 días de racha
                  </span>
                </div>
                <div className="h-3 w-[1px] bg-white/8"></div>
                <span className="font-ui text-[10px] text-text-muted tracking-wider">
                  SEMANA DE PODER
                </span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2.5">
                Bienvenido, <span className="text-brand-green">Aurelius</span>
              </h1>
              <p className="text-sm text-text-secondary max-w-md leading-relaxed">
                Tu bitácora de viaje. 3 eras descubiertas, 1,432 palabras dominadas y una racha
                encendida.
              </p>
            </div>
            <div className="inline-flex items-center gap-2.5 bg-surface-3 border border-brand-green/15 rounded-xl px-3.5 py-2.5 cursor-pointer hover:border-brand-green/30 transition-all shrink-0">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-brand-green/20 to-brand-green/5 border border-brand-green/30 flex items-center justify-center font-display text-sm text-brand-green">
                E
              </div>
              <div>
                <p className="font-ui text-[9px] font-bold text-brand-green tracking-wider mb-0.5">
                  EMILY · IA
                </p>
                <p className="text-[11px] text-text-secondary">
                  &ldquo;Mejoraste la <strong className="text-white">th</strong> ayer&rdquo;
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-green" />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 min-w-45">
              <div className="flex justify-between mb-1.5">
                <span className="font-ui text-[9px] font-bold tracking-wider uppercase text-text-muted">
                  XP · Era Vikinga
                </span>
                <span className="font-ui text-ui-badge font-bold text-brand-green">
                  2,450 / 3,000
                </span>
              </div>
              <div className="w-full h-2 bg-surface-4 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-between px-0.5 pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-px h-1.5 bg-white/8"></div>
                  ))}
                </div>
                <div
                  className="h-full rounded-full bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)] transition-all duration-500 relative"
                  style={{ width: '81%' }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_12px_rgba(61,214,140,0.7)]"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[rgba(180,100,30,0.2)] text-[#d97706] border border-[rgba(217,119,6,0.3)]">
                Era Vikinga
              </span>
              <span className="font-ui text-[11px] text-text-muted self-center">
                Nivel 1 activo
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
              Palabras
            </p>
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center ring-1 ring-brand-green/20 group-hover:ring-brand-green/30 transition-all">
              <SpellCheck2 className="w-4 h-4 text-brand-green" />
            </div>
          </div>
          <div className="font-display text-[28px] font-bold text-brand-green leading-none tracking-wider">
            1,432
          </div>
          <p className="text-[11px] text-text-muted mt-1">dominadas</p>
          <div className="mt-2.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-brand-green" />
            <span className="font-ui text-ui-badge text-brand-green">+48 esta semana</span>
          </div>
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
            42h
          </div>
          <p className="text-[11px] text-text-muted mt-1">viajadas en el tiempo</p>
          <div className="mt-2.5 flex items-center gap-1">
            <Timer className="w-3 h-3 text-brand-cyan" />
            <span className="font-ui text-ui-badge text-brand-cyan">15m hoy</span>
          </div>
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
            88%
          </div>
          <p className="text-[11px] text-text-muted mt-1">tasa de acierto global</p>
          <div className="mt-2.5">
            <div className="w-full h-1 bg-surface-4 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-amber shadow-[0_0_8px_rgba(245,166,35,0.5)] transition-all duration-500"
                style={{ width: '88%' }}
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <a
                href="/dashboard/estudiar"
                className="group bg-surface-2 border border-white/6 rounded-xl p-4 text-left hover:border-brand-green/20 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-3 group-hover:bg-brand-green/15 group-hover:border-brand-green/30 transition-all">
                  <Map className="w-4 h-4 text-brand-green" />
                </div>
                <p className="font-display text-[13px] font-bold text-white mb-0.5">Estudiar</p>
                <p className="font-ui text-[9px] text-text-muted">Era Vikinga · 3 lecciones</p>
              </a>
              <a
                href="/dashboard/emily"
                className="group bg-surface-2 border border-white/6 rounded-xl p-4 text-left hover:border-brand-cyan/20 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-3 group-hover:bg-brand-cyan/15 group-hover:border-brand-cyan/30 transition-all">
                  <Compass className="w-4 h-4 text-brand-cyan" />
                </div>
                <p className="font-display text-[13px] font-bold text-white mb-0.5">Emily IA</p>
                <p className="font-ui text-[9px] text-text-muted">Conversación libre</p>
              </a>
              <button className="group bg-surface-2 border border-white/6 rounded-xl p-4 text-left hover:border-brand-amber/20 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="w-9 h-9 rounded-lg bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center mb-3 group-hover:bg-brand-amber/15 group-hover:border-brand-amber/30 transition-all">
                  <Trophy className="w-4 h-4 text-brand-amber" />
                </div>
                <p className="font-display text-[13px] font-bold text-white mb-0.5">Logros</p>
                <p className="font-ui text-[9px] text-text-muted">12 desbloqueados</p>
              </button>
            </div>
          </section>

          <section className="ani d4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-bold text-white flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-brand-green" />
                Viajes Activos
              </h2>
              <button className="bg-transparent text-text-muted border border-white/6 font-ui text-ui-badge font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg flex items-center gap-1.5 hover:border-white/10 hover:text-white hover:bg-white/3 transition-all">
                Ver todos
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group relative rounded-xl overflow-hidden border border-white/6 cursor-pointer transition-all duration-300 hover:border-brand-green/25 hover:-translate-y-1 hover:shadow-2xl">
                <div className="w-full h-60 relative overflow-hidden bg-linear-to-br from-[#0a1628] via-[#1a3a5c] to-era-viking-end">
                  <svg
                    fill="none"
                    className="w-full h-full absolute inset-0 opacity-45"
                    viewBox="0 0 300 240"
                  >
                    <path
                      fill="rgba(20,50,80,0.8)"
                      stroke="#1e4a70"
                      strokeWidth="1"
                      d="M20 200q130-80 260 0l10 10q-140-80-280 0Z"
                    />
                    <path stroke="#4a7fa0" strokeWidth="2" d="M150 70v130" />
                    <path
                      fill="rgba(40,80,120,0.7)"
                      stroke="#3d7a9e"
                      strokeWidth="1"
                      d="M115 70h70l-35-45z"
                    />
                    <path fill="rgba(10,30,60,0.9)" d="M0 220q75-20 150-10t150-5v35H0Z" />
                    <circle cx="50" cy="30" r="1" fill="#fff" opacity=".6" />
                    <circle cx="90" cy="15" r=".5" fill="#fff" opacity=".4" />
                    <circle cx="200" cy="25" r="1" fill="#fff" opacity=".6" />
                    <circle cx="250" cy="40" r=".5" fill="#fff" opacity=".4" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[rgba(7,9,15,0.95)] via-[rgba(7,9,15,0.3)] to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[rgba(180,100,30,0.2)] text-[#d97706] border border-[rgba(217,119,6,0.3)]">
                      75% Dominio
                    </span>
                    <span className="font-ui text-[9px] text-text-muted">550 XP para Nv.2</span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-display text-base font-bold text-white">
                        Era Vikinga
                      </span>
                    </div>
                    <p className="text-[11px] text-text-secondary mb-2">
                      Mitología Nórdica · Vocabulario base
                    </p>
                    <div className="w-full h-1.5 bg-surface-4 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)]"
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-ui text-[9px] font-bold uppercase tracking-wider bg-brand-green text-[#07090f] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-[0_0_20px_rgba(61,214,140,0.3)]">
                    <Zap className="w-3 h-3" />
                    Viajar
                  </span>
                </div>
              </div>

              <div className="group relative rounded-xl overflow-hidden border border-white/6 cursor-pointer transition-all duration-300 hover:border-brand-green/25 hover:-translate-y-1 hover:shadow-2xl">
                <div className="w-full h-60 relative overflow-hidden bg-linear-to-br from-era-egypt-start via-[#3d2800] to-era-egypt-end">
                  <svg
                    fill="none"
                    className="w-full h-full absolute inset-0 opacity-45"
                    viewBox="0 0 300 240"
                  >
                    <path
                      fill="rgba(140,90,20,0.7)"
                      stroke="rgba(200,140,40,0.4)"
                      strokeWidth="1"
                      d="m60 200 80-110 80 110z"
                    />
                    <path
                      fill="rgba(120,75,15,0.5)"
                      stroke="rgba(180,120,30,0.3)"
                      strokeWidth=".5"
                      d="m190 200 50-60 50 60z"
                    />
                    <circle cx="60" cy="55" r="18" fill="rgba(245,166,35,0.15)" />
                    <circle cx="60" cy="55" r="8" fill="rgba(245,166,35,0.4)" />
                    <path fill="rgba(60,35,5,0.9)" d="M0 215q75-15 150-5t150-5v35H0Z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[rgba(7,9,15,0.95)] via-[rgba(7,9,15,0.3)] to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[rgba(148,163,184,0.15)] text-[#94a3b8] border border-[rgba(148,163,184,0.25)]">
                      32% Dominio
                    </span>
                    <span className="font-ui text-[9px] text-text-muted">1,360 XP para Nv.2</span>
                  </div>
                  <div>
                    <span className="font-display text-base font-bold text-white block mb-1">
                      Antiguo Egipto
                    </span>
                    <p className="text-[11px] text-text-secondary mb-2">
                      Jeroglíficos · Construcción de frases
                    </p>
                    <div className="w-full h-1.5 bg-surface-4 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-amber shadow-[0_0_8px_rgba(245,166,35,0.5)]"
                        style={{ width: '32%' }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-ui text-[9px] font-bold uppercase tracking-wider bg-brand-green text-[#07090f] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-[0_0_20px_rgba(61,214,140,0.3)]">
                    <Zap className="w-3 h-3" />
                    Viajar
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-5">
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
                <p className="text-[11px] text-text-muted">Superas a 3,840 estudiantes</p>
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

          <div className="bg-surface-2 border border-white/6 rounded-xl p-5 ani d3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-brand-amber" />
                <h2 className="font-display text-sm font-bold">Racha</h2>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-brand-amber/12 border border-brand-amber/25 rounded-full px-3 py-1">
                <span className="font-display text-xl font-bold text-brand-amber">12</span>
                <span className="font-ui text-ui-badge text-text-muted">días</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-3">
              <div className="text-center">
                <div className="w-full aspect-square rounded-md bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mb-0.5">
                  <span className="text-[8px]">✓</span>
                </div>
                <span className="font-ui text-[8px] text-text-muted">L</span>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-md bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mb-0.5">
                  <span className="text-[8px]">✓</span>
                </div>
                <span className="font-ui text-[8px] text-text-muted">M</span>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-md bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mb-0.5">
                  <span className="text-[8px]">✓</span>
                </div>
                <span className="font-ui text-[8px] text-text-muted">M</span>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-md bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mb-0.5">
                  <span className="text-[8px]">✓</span>
                </div>
                <span className="font-ui text-[8px] text-text-muted">J</span>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-md bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mb-0.5">
                  <span className="text-[8px]">✓</span>
                </div>
                <span className="font-ui text-[8px] text-text-muted">V</span>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-md bg-brand-green flex items-center justify-center mb-0.5 shadow-[0_0_8px_rgba(61,214,140,0.4)]">
                  <span className="text-[8px] font-bold text-[#07090f]">H</span>
                </div>
                <span className="font-ui text-[8px] text-brand-green">S</span>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-md bg-surface-4 border border-white/6 mb-0.5"></div>
                <span className="font-ui text-[8px] text-text-muted">D</span>
              </div>
            </div>

            <p className="text-[11px] text-text-muted text-center">
              Semana de poder · <span className="text-brand-green">100% activo</span>
            </p>
          </div>


        </div>
      </div>
    </main>
  );
}
