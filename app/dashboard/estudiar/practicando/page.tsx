import { X, Timer, Flame, Bell, Volume2, Mic, RotateCcw, ArrowRight } from "lucide-react";

export default function Practicando() {
  return (
    <>
      {' '}
      <div className="mesh-bg"></div>
      <div className="noise-layer"></div>
      <div className="particle-layer"></div>
      <div
        id="bgWave"
        className="fixed bottom-0 left-0 right-0 h-25 flex items-end justify-center gap-0.75 opacity-6 pointer-events-none z-0 px-6"
      ></div>
      <header className="sticky top-0 h-16 bg-[rgba(7,9,15,0.92)] border-b border-white/10 backdrop-blur-xl z-40 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
            <X className="w-5 h-5 text-brand-green" />
            <div className="hidden sm:flex flex-col gap-px">
              <span className="font-display text-[13px] font-bold text-brand-green tracking-[0.06em]">
                PlayLenguage
              </span>
              <span className="font-ui text-[9px] font-semibold tracking-[0.14em] uppercase text-text-muted">
                Speaking Challenge
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1.5 bg-[rgba(18,22,32,0.6)] border border-white/6 rounded-full px-3.5 py-1.25 backdrop-blur-sm">
            <Timer className="w-3.5 h-3.5 text-brand-green" />
            <span
              id="timer"
              className="font-ui text-xs font-semibold tracking-[0.12em] text-text-secondary"
            >
              04:12
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex md:hidden items-center gap-1.5 bg-[rgba(18,22,32,0.6)] border border-white/6 rounded-full px-3 py-1.25 backdrop-blur-sm">
            <Timer className="w-[13px] h-[13px] text-brand-green" />
            <span
              id="timer-mobile"
              className="font-ui text-[11px] font-semibold text-text-secondary"
            >
              04:12
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-brand-amber">
            <Flame className="w-4 h-4 text-brand-amber" />
            <span className="hidden sm:block font-display text-[13px] font-bold text-brand-amber">
              12
            </span>
          </div>

          <div className="relative cursor-pointer">
            <Bell className="w-4 h-4 text-text-muted hover:text-white/80 transition-colors" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-brand-amber border-[1.5px] border-surface-0"></span>
          </div>

          <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#1a3a5c] to-[#0d2240] border-2 border-brand-green/30 flex items-center justify-center font-display text-[11px] font-bold text-brand-green cursor-pointer">
            A
          </div>
        </div>
      </header>
      <div className="relative z-1 h-[calc(100vh-64px)] flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden px-4 py-5 md:px-6 md:py-6">
          <div className="ani d1 mb-4 w-full max-w-250 mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
              <div className="flex items-center gap-2.5">
                <span className="font-ui text-[9px] font-bold tracking-[0.08em] uppercase px-2 py-0.75 rounded bg-[rgba(180,100,30,0.2)] text-[#d97706] border border-[rgba(217,119,6,0.3)]">
                  Era Vikinga
                </span>
                <span className="font-ui text-ui-badge font-semibold tracking-[0.12em] uppercase text-text-muted">
                  Speaking Challenge
                </span>
                <span className="font-ui text-ui-badge text-text-muted">· Frase 3 de 8</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="text-[13px]">❤️</span>
                  <span className="text-[13px]">❤️</span>
                  <span className="text-[13px]">❤️</span>
                </div>
                <div className="w-px h-3.5 bg-white/6"></div>
                <span className="font-ui text-[11px] font-semibold text-brand-green">+50 XP</span>
              </div>
            </div>
            <div className="h-1.25 rounded bg-surface-4 overflow-hidden">
              <div
                className="h-full rounded bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)]"
                style={{width: "37.5%", transition: "width 0.8s ease"}}
              ></div>
            </div>
          </div>

          <div className="practice-grid ani d2 flex-1 min-h-0">
            <div className="flex flex-col gap-4 h-full justify-center">
              <div className="glass-crystal relative rounded-3xl overflow-hidden p-8 md:px-7">
                <div className="hud-corner tl"></div>
                <div className="hud-corner tr"></div>
                <div className="hud-corner bl"></div>
                <div className="hud-corner br"></div>

                <div
                  className="absolute -top-10 -left-10 w-30 h-30 rounded-full pointer-events-none"
                  style={{background: "radial-gradient(circle,rgba(61,214,140,0.12),transparent)"}}
                ></div>
                <div
                  className="absolute -bottom-8 -right-8 w-25 h-25 rounded-full pointer-events-none"
                  style={{background: "radial-gradient(circle,rgba(168,85,247,0.1),transparent)"}}
                ></div>

                <div className="relative z-1 text-center">
                  <p className="font-ui text-[9px] font-semibold tracking-[0.2em] uppercase text-brand-green mb-4">
                    Incantación objetivo
                  </p>

                  <h1
                    className="font-display font-bold italic text-text-primary leading-[1.35] mb-5"
                    style={{fontSize: "clamp(18px,3.5vw,30px)"}}
                  >
                    &ldquo;The winds of fate guide the brave.&rdquo;
                  </h1>

                  <div
                    className="w-20 h-px mx-auto mb-5"
                    style={{background: "linear-gradient(90deg,transparent,rgba(61,214,140,0.4),transparent)"}}
                  ></div>

                  <div className="flex flex-wrap gap-1.5 justify-center mb-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-ui text-[11px] font-semibold tracking-[0.04em] bg-brand-green/12 text-brand-green border border-brand-green/25">
                      The
                      <span className="opacity-60">✓</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-ui text-[11px] font-semibold tracking-[0.04em] bg-brand-green/12 text-brand-green border border-brand-green/25">
                      winds
                      <span className="opacity-60">✓</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-ui text-[11px] font-semibold tracking-[0.04em] bg-brand-amber/10 text-brand-amber border border-brand-amber/22">
                      of
                      <span className="opacity-60">~</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-ui text-[11px] font-semibold tracking-[0.04em] bg-brand-green/12 text-brand-green border border-brand-green/25">
                      fate
                      <span className="opacity-60">✓</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-ui text-[11px] font-semibold tracking-[0.04em] bg-brand-green/12 text-brand-green border border-brand-green/25">
                      guide
                      <span className="opacity-60">✓</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-ui text-[11px] font-semibold tracking-[0.04em] bg-red-500/10 text-red-400 border border-red-500/[0.22]">
                      the
                      <span className="opacity-60">✗</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-ui text-[11px] font-semibold tracking-[0.04em] bg-brand-green/12 text-brand-green border border-brand-green/25">
                      brave
                      <span className="opacity-60">✓</span>
                    </span>
                  </div>
                  <p className="font-ui text-ui-badge text-text-muted mt-2">
                    Toca cada palabra para ver el fonema objetivo
                  </p>
                </div>
              </div>

              <div className="bg-surface-2 border border-white/6 rounded-xl px-5 py-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-ui text-[9px] font-semibold tracking-[0.14em] uppercase text-text-muted">
                    Tu pronunciación
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block rec-blink"></span>
                    <span className="font-ui text-[9px] font-semibold text-red-500 tracking-widest">
                      REC
                    </span>
                  </div>
                </div>
                <div id="waveform" className="flex items-center gap-0.75 h-10"></div>
              </div>

              <div className="flex items-center justify-center gap-5">
                <button
                  title="Escuchar frase"
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-text-secondary cursor-pointer transition-all duration-200 shrink-0 hover:border-brand-green/30 hover:text-brand-green hover:bg-brand-green/8"
                >
                  <Volume2 className="w-5 h-5" />
                </button>

                <div className="relative">
                  <button
                    id="micBtn"
                    title="Grabar pronunciación"
                    className="mic-btn relative w-18 h-18 rounded-full bg-brand-green flex items-center justify-center border-none cursor-pointer transition-all duration-200 shrink-0 hover:scale-[1.06] hover:shadow-[0_0_40px_rgba(61,214,140,0.5)] active:scale-[0.96]"
                  >
                    <Mic id="micIcon" className="w-[30px] h-[30px] text-surface-0" />
                  </button>
                </div>

                <button
                  title="Volver a intentar"
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-text-secondary cursor-pointer transition-all duration-200 shrink-0 hover:border-brand-green/30 hover:text-brand-green hover:bg-brand-green/8"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              <p className="text-center font-ui text-ui-badge text-text-muted md:hidden">
                Toca el micrófono y pronuncia la frase
              </p>
            </div>

            <div className="side-panel flex flex-col gap-3.5 h-full justify-center">
              <div
                className="ani d3 text-center rounded-2xl border border-white/10 p-5"
                style={{background: "linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", backdropFilter: "blur(20px)"}}
              >
                <p className="font-ui text-[9px] font-semibold tracking-[0.2em] uppercase text-brand-green mb-3.5">
                  Precisión
                </p>

                <div
                  className="relative w-27.5 h-27.5 mx-auto mb-3"
style={{transform: "rotate(-90deg)"}}
                >
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle cx="55" cy="55" r="45" className="ring-track" />
                    <circle cx="55" cy="55" r="45" className="ring-progress" />
                  </svg>
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
style={{transform: "rotate(90deg)"}}
                  >
                    <span className="font-display text-[28px] font-bold text-brand-green score-glow">
                      94
                    </span>
                    <span className="font-ui text-[8px] font-semibold tracking-[0.12em] uppercase text-text-muted">
                      %
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-sm font-bold text-text-primary mb-1">
                  Precisión Arcana
                </h3>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Tu pronunciación de <em className="text-brand-green">&ldquo;fate&rdquo;</em> alcanzó
                  resonancia perfecta.
                </p>

                <div className="mt-3.5 flex flex-col gap-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-ui-badge text-text-muted">Linking sounds</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-15 h-1.25 rounded bg-surface-4 overflow-hidden">
                        <div
                          className="h-full rounded bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)]"
                          style={{width: "88%"}}
                        ></div>
                      </div>
                      <span className="font-ui text-[9px] font-semibold text-brand-green">88%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-ui-badge text-text-muted">Entonación</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-15 h-1.25 rounded bg-surface-4 overflow-hidden">
                        <div
                          className="h-full rounded bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)]"
                          style={{width: "96%"}}
                        ></div>
                      </div>
                      <span className="font-ui text-[9px] font-semibold text-brand-green">96%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-ui-badge text-text-muted">Fonema /ð/</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-15 h-1.25 rounded bg-surface-4 overflow-hidden">
                        <div
                          className="h-full rounded bg-brand-amber shadow-[0_0_6px_rgba(245,166,35,0.4)]"
                          style={{width: "72%"}}
                        ></div>
                      </div>
                      <span className="font-ui text-[9px] font-semibold text-brand-amber">72%</span>
                    </div>
                  </div>
                </div>
              </div>

<button className="next-btn ani d4 w-full flex items-center justify-between px-5 py-4 rounded-xl border border-white/6 bg-white/3 cursor-pointer transition-all duration-300 relative overflow-hidden hover:border-brand-green/30">
                <div className="text-left relative z-1">
                  <p className="font-ui text-[9px] font-semibold tracking-[0.2em] uppercase text-brand-green mb-1">
                    Siguiente enigma
                  </p>
                  <p className="font-display text-sm font-bold text-text-primary">
                    Continuar práctica
                  </p>
                </div>
                <div className="next-btn-arrow w-10 h-10 rounded-ui-badge bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary transition-all duration-300 shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>

              <div className="ani d4 rounded-ui-badge p-3 bg-brand-green/5 border border-brand-green/12">
                <div className="flex gap-2.5 items-start">
                  <div
                    className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-display text-ui-badge text-brand-green border-[1.5px] border-brand-green/30"
style={{background: "linear-gradient(135deg,rgba(61,214,140,0.2),rgba(61,214,140,0.05))"}}
                  >
                    S
                  </div>
                  <div>
                    <p className="font-ui text-[9px] font-bold text-brand-green tracking-widest mb-1">
                      SOPHIA DICE
                    </p>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
El fonema <strong className="text-text-primary">/ð/</strong> en &ldquo;the&rdquo; se forma
                      con la lengua entre los dientes. ¡Casi lo tienes!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-panel ani d3 flex-col gap-2.5 mt-3">
            <div className="flex bg-surface-2 border border-white/6 rounded-lg p-1 gap-1">
              <button
                id="tab-precision"
                className="tab-btn active flex-1 py-2 font-ui text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted rounded-md cursor-pointer border-none bg-transparent transition-all"
              >
                Precisión
              </button>
              <button
                id="tab-sophia"
                className="tab-btn flex-1 py-2 font-ui text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted rounded-md cursor-pointer border-none bg-transparent transition-all"
              >
                Sophia
              </button>
              <button
                id="tab-next"
                className="tab-btn flex-1 py-2 font-ui text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted rounded-md cursor-pointer border-none bg-transparent transition-all"
              >
                Siguiente
              </button>
            </div>

            <div
              id="tab-content-precision"
              className="bg-surface-2 border border-white/6 rounded-ui-badge p-4 flex items-center gap-4"
            >
              <div className="relative w-17.5 h-17.5 shrink-0" style={{transform: "rotate(-90deg)"}}>
                <svg width="70" height="70" viewBox="0 0 70 70">
                  <circle cx="35" cy="35" r="28" className="ring-track" style={{strokeWidth: 5}} />
                  <circle
                    cx="35"
                    cy="35"
                    r="28"
                    className="ring-progress"
                    style={{strokeWidth: 5, strokeDasharray: 176, strokeDashoffset: 11}}
                  />
                </svg>
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{transform: "rotate(90deg)"}}
                >
                  <span className="font-display text-body-standard font-bold text-brand-green">
                    94
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-[13px] font-bold mb-1">Precisión Arcana</h3>
                <p className="text-[11px] text-text-secondary">
                  Fonema <em className="text-brand-amber">/ð/</em> necesita más práctica.
                </p>
              </div>
            </div>

            <div
              id="tab-content-sophia"
              className="hidden rounded-ui-badge p-3.5 bg-brand-green/5 border border-brand-green/12"
            >
              <div className="flex gap-2.5 items-start">
                <div
                  className="w-7.5 h-7.5 rounded-full shrink-0 flex items-center justify-center font-display text-[11px] text-brand-green border-[1.5px] border-brand-green/30"
                  style={{background: "linear-gradient(135deg,rgba(61,214,140,0.2),rgba(61,214,140,0.05))"}}
                >
                  S
                </div>
                <div>
                  <p className="font-ui text-[9px] font-bold text-brand-green tracking-widest mb-1">
                    SOPHIA DICE
                  </p>
                  <p className="text-[12px] text-text-secondary leading-relaxed">
                    El fonema <strong className="text-text-primary">/ð/</strong> en &ldquo;the&rdquo; se forma
                    con la lengua entre los dientes. ¡Casi lo tienes!
                  </p>
                </div>
              </div>
            </div>

            <div id="tab-content-next" className="hidden">
              <button className="next-btn w-full flex items-center justify-between px-5 py-4 rounded-xl border border-white/6 bg-white/3 cursor-pointer transition-all duration-300 relative overflow-hidden hover:border-brand-green/30">
                <div className="text-left relative z-1">
                  <p className="font-ui text-[9px] font-semibold tracking-[0.2em] uppercase text-brand-green mb-1">
                    Siguiente enigma
                  </p>
                  <p className="font-display text-sm font-bold text-text-primary">
                    Continuar práctica
                  </p>
                </div>
                <div className="next-btn-arrow w-10 h-10 rounded-ui-badge bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary transition-all duration-300 shrink-0">
                  <span className="mi text-body-large">arrow_forward</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none px-6 pb-4 hidden md:flex justify-between items-end">
          <div className="flex flex-col gap-1 opacity-55">
            <span className="font-ui text-[9px] font-bold tracking-[0.3em] uppercase text-brand-green">
              Era Vikinga · Nivel 1
            </span>
            <div className="w-35 h-1.25 rounded bg-surface-4 overflow-hidden">
              <div className="h-full w-[75%] rounded bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)]"></div>
            </div>
          </div>
          <div className="text-right opacity-45">
            <span className="font-ui text-[9px] tracking-[0.3em] uppercase text-text-muted">
              Módulo: Pronunciación · Linking Sounds
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
