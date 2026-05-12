import { ChevronRight, Clock, Flame, Hourglass, Languages, Trophy } from "lucide-react";

export function Stasts() {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 ani delay-anim-1">
          <div className="flex items-center gap-4 p-5 bg-white/3 border border-white/6 rounded-xl">
            <Clock className="w-8 h-8 text-brand-cyan" />
            <div>
              <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-1">
                Tiempo
              </p>
              <p className="font-display text-xl font-bold text-text-primary">15 min</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 bg-white/3 border border-white/6 rounded-xl">
            <Languages className="w-8 h-8 text-brand-purple" />
            <div>
              <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-1">
                Frases
              </p>
              <p className="font-display text-xl font-bold text-text-primary">15</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 bg-white/3 border border-white/6 rounded-xl">
            <Flame className="w-8 h-8 text-brand-amber" />
            <div>
              <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-1">
                Racha
              </p>
              <p className="font-display text-xl font-bold text-text-primary">5 días</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 ani delay-anim-2">
          <div className="rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-brand-green">
                Tu Progreso
              </span>
              <span className="font-ui text-sm text-text-muted">Nivel 4 · 850 XP</span>
            </div>
            <div className="flex items-center gap-4 flex-col sm:flex-row">
              <div className="flex-1 w-full">
                <div className="h-1.5 bg-surface-4 rounded overflow-hidden mb-2">
                  <div className="h-full w-[65%] rounded bg-linear-to-r from-brand-green to-[#2dd4a8] shadow-[0_2px_8px_rgba(61,214,140,0.3)]"></div>
                </div>
                <p className="font-ui text-ui-badge text-text-muted">650 / 1000 XP hasta nivel 5</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-brand-green/8 border border-brand-green/20 rounded-full shrink-0">
                <Trophy className="w-4 h-4 text-brand-green" />
                <span className="font-display text-sm font-bold text-brand-green">12</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/15 bg-surface-2/70 backdrop-blur-xl p-5">
            <div className="flex items-center gap-4 flex-col sm:flex-row sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <Hourglass className="w-5 h-5 text-brand-amber" />
                </div>
                <div>
                  <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-brand-amber mb-1">
                    Próxima práctica
                  </p>
                  <p className="font-display text-base font-semibold text-text-primary">
                    &ldquo;Ganga og þér&rdquo;
                  </p>
                  <p className="font-ui text-xs text-text-muted">Saludos vikingos</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted hidden sm:block" />
            </div>
          </div>
        </div>
      </>
    );
}
