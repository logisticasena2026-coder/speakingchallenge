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
  Bolt,
  ChevronRight,
  MessageCircle,
  Gamepad2,
  GitBranch,
  Lock,
  Lightbulb,
  Sparkles,
  Check,
  Wand2,
  Trophy,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard | speakingchallenge',
  description:
    'Tu progreso en speakingchallenge. Estadísticas, rachas, rituales diarios y acceso a tus viajes a través del tiempo.',
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <main className="pt-20 px-4 md:px-6 relative z-10">
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
              </div>
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2.5">
                Bienvenido, <span className="text-brand-green">Aurelius</span>
              </h1>
              <p className="text-sm text-text-secondary max-w-md leading-relaxed">
                Tu viaje a través del tiempo continúa. Tienes 3 rituales diarios pendientes para
                mantener tu racha de aprendizaje.
              </p>
            </div>
            <div className="inline-flex items-center gap-2.5 bg-surface-3 border border-brand-green/15 rounded-xl px-3.5 py-2.5 cursor-pointer hover:border-brand-green/30 transition-all">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-brand-green/20 to-brand-green/5 border border-brand-green/30 flex items-center justify-center font-display text-sm text-brand-green">
                S
              </div>
              <div>
                <p className="font-ui text-[9px] font-bold text-brand-green tracking-wider mb-0.5">
                  EMILY
                </p>
                <p className="text-[11px] text-text-secondary">
                  ¡Mejoraste la <strong className="text-white">th</strong> ayer! 🎯
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
              <div className="w-full h-2 bg-surface-4 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)] transition-all duration-500"
                  style={{ width: '81%' }}
                ></div>
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
        <div className="bg-surface-2 border border-white/6 rounded-xl p-5 transition-all duration-200 hover:border-brand-green/15 hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-start justify-between mb-1">
            <p className="font-ui text-[9px] font-bold tracking-wider uppercase text-text-muted">
              Palabras
            </p>
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center">
              <SpellCheck2 className="w-4 h-4 text-brand-green" />
            </div>
          </div>
          <div className="font-display text-[28px] font-bold text-brand-green leading-none">
            1,432
          </div>
          <p className="text-[11px] text-text-muted mt-1">dominadas</p>
          <div className="mt-2.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-brand-green" />
            <span className="font-ui text-ui-badge text-brand-green">+48 esta semana</span>
          </div>
        </div>

        <div className="bg-surface-2 border border-white/6 rounded-xl p-5 transition-all duration-200 hover:border-brand-cyan/15 hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-start justify-between mb-1">
            <p className="font-ui text-[9px] font-bold tracking-wider uppercase text-text-muted">
              Tiempo
            </p>
            <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-brand-cyan" />
            </div>
          </div>
          <div className="font-display text-[28px] font-bold text-brand-cyan leading-none">42h</div>
          <p className="text-[11px] text-text-muted mt-1">viajadas en el tiempo</p>
          <div className="mt-2.5 flex items-center gap-1">
            <Timer className="w-3 h-3 text-brand-cyan" />
            <span className="font-ui text-ui-badge text-brand-cyan">15m hoy</span>
          </div>
        </div>

        <div className="bg-surface-2 border border-white/6 rounded-xl p-5 transition-all duration-200 hover:border-brand-amber/15 hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-start justify-between mb-1">
            <p className="font-ui text-[9px] font-bold tracking-wider uppercase text-text-muted">
              Precisión
            </p>
            <div className="w-8 h-8 rounded-lg bg-brand-amber/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-brand-amber" />
            </div>
          </div>
          <div className="font-display text-[28px] font-bold text-brand-amber leading-none">
            88%
          </div>
          <p className="text-[11px] text-text-muted mt-1">tasa de acierto global</p>
          <div className="mt-2.5">
            <div className="w-full h-1 bg-surface-4 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-amber shadow-[0_0_8px_rgba(245,166,35,0.5)]"
                style={{ width: '88%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="flex flex-col gap-7">
          <section className="ani d3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-bold text-white flex items-center gap-2.5">
                <Map className="w-4 h-4 text-brand-green" />
                Viajes Activos
              </h2>
              <button className="bg-transparent text-text-muted border border-white/6 font-ui text-ui-badge font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg flex items-center gap-1.5 hover:border-white/10 hover:text-white hover:bg-white/3 transition-all">
                Ver todos
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden border border-white/6 cursor-pointer transition-all duration-300 hover:border-brand-green/25 hover:-translate-y-1 hover:shadow-2xl">
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
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[rgba(180,100,30,0.2)] text-[#d97706] border border-[rgba(217,119,6,0.3)] inline-block mb-2">
                    75% Dominio
                  </span>
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
              </div>

              <div className="relative rounded-xl overflow-hidden border border-white/6 cursor-pointer transition-all duration-300 hover:border-brand-green/25 hover:-translate-y-1 hover:shadow-2xl">
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
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[rgba(148,163,184,0.15)] text-[#94a3b8] border border-[rgba(148,163,184,0.25)] inline-block mb-2">
                    32% Dominio
                  </span>
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
              </div>
            </div>
          </section>

          <section className="ani d4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-bold text-white flex items-center gap-2.5">
                <Bolt className="w-4 h-4 text-brand-amber" />
                Continuar Practicando
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-surface-3 border border-white/6 cursor-pointer transition-all duration-200 hover:border-white/10 hover:translate-x-1">
                <div className="w-10 h-10 rounded-lg bg-brand-green/12 border border-brand-green/20 flex items-center justify-center shrink-0">
                  <div className="flex items-center gap-0.5 h-5">
                    <div
                      className="w-0.5 rounded bg-brand-green animate-pulse"
                      style={{ height: '6px', animationDelay: '0s' }}
                    ></div>
                    <div
                      className="w-0.5 rounded bg-brand-green animate-pulse"
                      style={{ height: '14px', animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-0.5 rounded bg-brand-green animate-pulse"
                      style={{ height: '10px', animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-0.5 rounded bg-brand-green animate-pulse"
                      style={{ height: '18px', animationDelay: '0.05s' }}
                    ></div>
                    <div
                      className="w-0.5 rounded bg-brand-green animate-pulse"
                      style={{ height: '8px', animationDelay: '0.15s' }}
                    ></div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white mb-0.5">Speaking Challenge</p>
                  <p className="text-[11px] text-text-muted">Pronunciación · Era Vikinga</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-brand-green/12 text-brand-green border border-brand-green/25 block mb-1">
                    +50 XP
                  </span>
                  <span className="font-ui text-[9px] text-text-muted">~5 min</span>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-surface-3 border border-white/6 cursor-pointer transition-all duration-200 hover:border-white/10 hover:translate-x-1">
                <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/18 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-brand-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white mb-0.5">Verbose con Emily</p>
                  <p className="text-[11px] text-text-muted">Conversación IA · Roma Imperial</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-brand-cyan/12 text-brand-cyan border border-brand-cyan/25 block mb-1">
                    +100 XP
                  </span>
                  <span className="font-ui text-[9px] text-text-muted">~10 min</span>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-surface-3 border border-white/6 cursor-pointer transition-all duration-200 hover:border-white/10 hover:translate-x-1">
                <div className="w-10 h-10 rounded-lg bg-brand-amber/10 border border-brand-amber/18 flex items-center justify-center shrink-0">
                  <Gamepad2 className="w-4 h-4 text-brand-amber" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white mb-0.5">Trivia Fight</p>
                  <p className="text-[11px] text-text-muted">Duelo Arcade · 1v1 vs IA</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[rgba(234,179,8,0.15)] text-[#eab308] border border-[rgba(234,179,8,0.25)] block mb-1">
                    +200 XP
                  </span>
                  <span className="font-ui text-[9px] text-text-muted">~8 min</span>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-surface-3 border border-white/6 cursor-pointer transition-all duration-200 hover:border-white/10 hover:translate-x-1">
                <div className="w-10 h-10 rounded-lg bg-brand-purple/10 border border-brand-purple/18 flex items-center justify-center shrink-0">
                  <Gamepad2 className="w-4 h-4 text-brand-purple" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white mb-0.5">Serpiente Rúnica</p>
                  <p className="text-[11px] text-text-muted">Arcade · Era Vikinga</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-brand-purple/12 text-brand-purple border border-brand-purple/25 block mb-1">
                    +80 XP
                  </span>
                  <span className="font-ui text-[9px] text-text-muted">~6 min</span>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </div>
            </div>
          </section>

          <section className="ani d5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-bold text-white flex items-center gap-2.5">
                <GitBranch className="w-4 h-4 text-brand-cyan" />
                Skill Tree · Presente Simple
              </h2>
              <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[rgba(180,100,30,0.2)] text-[#d97706] border border-[rgba(217,119,6,0.3)]">
                Era Vikinga
              </span>
            </div>

            <div className="bg-surface-2 border border-white/6 rounded-xl p-5">
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-3 border border-white/6">
                  <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-[11px] font-bold text-[#07090f]">
                    ✓
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-semibold text-white">Lección</p>
                    <p className="text-ui-badge text-text-muted">Concepto en contexto narrativo</p>
                  </div>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-brand-green/12 text-brand-green border border-brand-green/25">
                    Completado
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-brand-green/4 border border-brand-green/20">
                  <div className="w-6 h-6 rounded-full bg-transparent border-1.5 border-brand-green text-brand-green flex items-center justify-center text-[11px] font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-semibold text-brand-green">Práctica</p>
                    <p className="text-ui-badge text-text-muted">Repetición guiada con feedback</p>
                  </div>
                  <button className="bg-brand-green text-[#07090f] font-ui text-ui-badge font-bold uppercase px-3 py-1.5 rounded-lg flex items-center gap-1 hover:shadow-[0_0_20px_rgba(61,214,140,0.4)] transition-all">
                    Continuar
                  </button>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-3 border border-white/6 opacity-50 cursor-not-allowed">
                  <div className="w-6 h-6 rounded-full bg-surface-4 text-text-muted flex items-center justify-center text-[11px] font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] text-text-muted">Quiz</p>
                    <p className="text-ui-badge text-text-muted">Comprueba dominio del tema</p>
                  </div>
                  <Lock className="w-4 h-4 text-text-muted" />
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-3 border border-white/6 opacity-40 cursor-not-allowed">
                  <div className="w-6 h-6 rounded-full bg-surface-4 text-text-muted flex items-center justify-center text-[11px] font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] text-text-muted">Desafío 🔥</p>
                    <p className="text-ui-badge text-text-muted">Aplica bajo presión de tiempo</p>
                  </div>
                  <Lock className="w-4 h-4 text-text-muted" />
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-3 border border-white/6 opacity-35 cursor-not-allowed">
                  <div className="w-6 h-6 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center text-[11px] font-bold">
                    💀
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] text-text-muted">Boss Final</p>
                    <p className="text-ui-badge text-text-muted">Desbloquea la siguiente era</p>
                  </div>
                  <span className="font-ui text-[9px] text-brand-purple/50 border border-brand-purple/20 px-1.5 py-0.5 rounded">
                    DESBLOQUEA ERA
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-brand-green/5 border border-brand-green/12 flex gap-2.5 items-start">
                <Lightbulb className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  <strong className="text-brand-green">Tip:</strong> Si tu Quiz supera el{' '}
                  <strong className="text-white">90%</strong>, puedes saltar al Desafío
                  directamente.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-surface-1 border border-white/6 rounded-2xl p-6 ani d2">
            <div className="flex items-center gap-2.5 mb-1">
              <Sparkles className="w-5 h-5 text-brand-amber" />
              <h2 className="font-display text-base font-bold text-white">Rituales Diarios</h2>
            </div>
            <p className="text-[11px] text-text-muted mb-5">1 de 3 completados hoy</p>

            <div className="mb-5">
              <div className="w-full h-1.5 bg-surface-4 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)] transition-all"
                  style={{ width: '33%' }}
                ></div>
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="font-ui text-[9px] text-text-muted">0 XP ganados hoy</span>
                <span className="font-ui text-[9px] text-brand-green">350 XP disponibles</span>
              </div>
            </div>

            <ul className="list-none p-0">
              <li
                className="flex items-center gap-3.5 py-3 border-b border-white/6 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="ritual-check w-5.5 h-5.5 rounded-md border border-white/10 flex items-center justify-center transition-all done:bg-brand-green/12 done:border-brand-green">
                  <Check className="w-4 h-4 text-brand-green" />
                </div>
                <span className="ritual-label text-[13px] text-text-secondary flex-1 transition-all">
                  Completar 1 lección
                </span>
                <span className="font-ui text-ui-badge font-bold text-text-muted shrink-0">
                  +50 XP
                </span>
              </li>
              <li
                className="flex items-center gap-3.5 py-3 border-b border-white/6 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="ritual-check w-5.5 h-5.5 rounded-md border border-white/10 flex items-center justify-center transition-all"></div>
                <span className="ritual-label text-[13px] text-text-secondary flex-1 transition-all">
                  Practicar con Emily
                </span>
                <span className="font-ui text-ui-badge font-bold text-text-muted shrink-0">
                  +100 XP
                </span>
              </li>
              <li
                className="flex items-center gap-3.5 py-3 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="ritual-check w-5.5 h-5.5 rounded-md border border-white/10 flex items-center justify-center transition-all"></div>
                <span className="ritual-label text-[13px] text-text-secondary flex-1 transition-all">
                  Ganar 1 Trivia Fight
                </span>
                <span className="font-ui text-ui-badge font-bold text-text-muted shrink-0">
                  +200 XP
                </span>
              </li>
            </ul>

            <div className="mt-5 pt-5 border-t border-white/6">
              <div className="flex gap-3 items-start mb-4">
                <div className="w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center shrink-0">
                  <Wand2 className="w-4 h-4 text-brand-green" />
                </div>
                <div>
                  <p className="font-display text-[12px] font-bold text-white mb-0.5">
                    Consejo de Emily
                  </p>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    Revisar eras anteriores aumenta la retención a largo plazo un 40%.
                  </p>
                </div>
              </div>
              <button className="w-full bg-transparent text-text-muted border border-white/6 font-ui text-ui-badge font-bold uppercase tracking-wider px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 hover:border-white/10 hover:text-white hover:bg-white/3 transition-all">
                Ver todos los retos
              </button>
            </div>
          </div>

          <div className="bg-surface-2 border border-white/6 rounded-xl p-5 ani d3">
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
                <span className="font-ui text-[11px] font-bold text-brand-green min-w-[20px]">
                  #1
                </span>
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#1a3a5c] to-[#0d2240] border border-brand-green/30 flex items-center justify-center font-display text-[9px] font-bold text-brand-green">
                  V
                </div>
                <span className="text-[12px] text-white flex-1">Valentina R.</span>
                <span className="font-ui text-ui-badge text-text-muted">4,100 XP</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/2">
                <span className="font-ui text-[11px] font-bold text-text-muted min-w-[20px]">
                  #2
                </span>
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#2a2a3c] to-[#1a1a28] border border-white/10 flex items-center justify-center font-display text-[9px] font-bold text-text-muted">
                  L
                </div>
                <span className="text-[12px] text-text-secondary flex-1">Luis A.</span>
                <span className="font-ui text-ui-badge text-text-muted">3,890 XP</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-brand-amber/6 border border-brand-amber/12">
                <span className="font-ui text-[11px] font-bold text-brand-amber min-w-[20px]">
                  Tú
                </span>
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#1a3a5c] to-[#0d2240] border border-brand-green/30 flex items-center justify-center font-display text-[9px] font-bold text-brand-green">
                  A
                </div>
                <span className="text-[12px] text-white flex-1">Aurelius</span>
                <span className="font-ui text-ui-badge text-brand-amber">2,450 XP</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-2 border border-white/6 rounded-xl p-5 ani d4">
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
              ¡No pierdas tu racha! Completa un ritual hoy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
