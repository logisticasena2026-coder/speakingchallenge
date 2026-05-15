import { CheckCircle, Hourglass, Lock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function ErasPractica() {
    return (
      <div className="mt-5 relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl p-4 sm:p-6 ani delay-anim-3">
        <div className="hud-corner-sm hud-corner-tl-sm"></div>
        <div className="hud-corner-sm hud-corner-tr-sm"></div>
        <div className="hud-corner-sm hud-corner-bl-sm"></div>
        <div className="hud-corner-sm hud-corner-br-sm"></div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="flex items-center gap-2.5 mb-5 cursor-help relative">
                <Hourglass className="w-4 h-4 text-brand-cyan" />
                <span className="font-display text-sm font-semibold text-text-primary">
                  Focalización de Era
                </span>
              </h3>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Selecciona la era histórica para tu inmersión lingüística. Cada era tiene vocabulario único.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex gap-4 overflow-x-auto pb-2 pt-2 snap-x snap-mandatory era-scroll">
          <div className="relative shrink-0 min-w-[200px] sm:min-w-[240px] lg:min-w-[260px] h-32 sm:h-36 lg:h-40 rounded-xl overflow-hidden border border-brand-green/40 cursor-pointer transition-all duration-300 hover:border-brand-green/30 hover:-translate-y-1 shadow-[0_0_20px_rgba(61,214,140,0.15)]">
            <img
              className="w-full h-full object-cover opacity-[0.85]"
              src="data:image/svg+xml,%3Csvg viewBox='0 0 300 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='100%25' x2='0%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%230a1628'/%3E%3Cstop offset='50%25' stop-color='%231a3a5c'/%3E%3Cstop offset='100%25' stop-color='%230d2a45'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='160' fill='url(%23g)'/%3E%3Cpath d='M0,130 Q150,80 300,130 L300,160 L0,160 Z' fill='%23102a40'/%3E%3Cpolygon points='150,40 200,90 100,90' fill='%23183050'/%3E%3Ccircle cx='50' cy='30' r='1' fill='white' opacity='0.6'/%3E%3Ccircle cx='250' cy='20' r='1.5' fill='white' opacity='0.5'/%3E%3C/svg%3E"
              alt="Viking"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#07090f]/95 via-[#07090f]/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <span className="font-ui text-[9px] font-bold tracking-widest uppercase px-1.5 py-1 rounded bg-brand-green/15 text-brand-green border border-brand-green/25 mb-1.5 inline-block">
                  Activo
                </span>
                <p className="font-display text-base font-bold text-white">Viking Era</p>
              </div>
              <CheckCircle className="w-6 h-6 text-brand-green" />
            </div>
          </div>

          <div className="relative shrink-0 min-w-[200px] sm:min-w-[240px] lg:min-w-[260px] h-32 sm:h-36 lg:h-40 rounded-xl overflow-hidden border border-white/6 cursor-pointer transition-all duration-300 hover:border-brand-green/30 hover:-translate-y-1">
            <img
              className="w-full h-full object-cover transition-all duration-500 hover:brightness-75 hover:saturate-110 opacity-[0.85]"
              src="data:image/svg+xml,%3Csvg viewBox='0 0 300 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='g2' x1='0%25' y1='100%25' x2='0%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%231a1200'/%3E%3Cstop offset='50%25' stop-color='%233d2800'/%3E%3Cstop offset='100%25' stop-color='%235c3d00'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='160' fill='url(%23g2)'/%3E%3Cpolygon points='80,120 150,50 220,120' fill='%232a1a00'/%3E%3Ccircle cx='60' cy='40' r='12' fill='%23f5a623' opacity='0.2'/%3E%3C/svg%3E"
              alt="Egypt"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#07090f]/95 via-[#07090f]/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <span className="font-ui text-[9px] font-bold tracking-widest uppercase px-1.5 py-1 rounded bg-brand-amber/15 text-brand-amber border border-brand-amber/25 mb-1.5 inline-block">
                  Disponible
                </span>
                <p className="font-display text-base font-bold text-white">Ancient Egypt</p>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 min-w-[200px] sm:min-w-[240px] lg:min-w-[260px] h-32 sm:h-36 lg:h-40 rounded-xl overflow-hidden border border-white/6 opacity-50 cursor-not-allowed">
            <img
              className="w-full h-full object-cover"
              src="data:image/svg+xml,%3Csvg viewBox='0 0 300 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='g3' x1='0%25' y1='100%25' x2='0%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%231a0808'/%3E%3Cstop offset='50%25' stop-color='%23301010'/%3E%3Cstop offset='100%25' stop-color='%235c2020'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='160' fill='url(%23g3)'/%3E%3Cellipse cx='150' cy='80' rx='80' ry='50' fill='%23201010'/%3E%3C/svg%3E"
              alt="Roman"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#07090f]/95 via-[#07090f]/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="w-9 h-9 text-white/40" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <span className="font-ui text-[9px] font-bold tracking-widest uppercase px-1.5 py-1 rounded bg-white/5 text-text-muted border border-white/5 mb-1.5 inline-block">
                  Nivel 5 Requerido
                </span>
                <p className="font-display text-base font-bold text-white opacity-50">
                  Roman Empire
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
