import { CheckCircle, Grid3X3, Users, Zap } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Configuraciónes() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ani delay-anim-3">
      <div className="relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl p-4 sm:p-6 flex flex-col gap-4 transition-all duration-300 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.35)]">
        <div className="hud-corner-sm hud-corner-tl-sm"></div>
        <div className="hud-corner-sm hud-corner-tr-sm"></div>
        <div className="hud-corner-sm hud-corner-bl-sm"></div>
        <div className="hud-corner-sm hud-corner-br-sm"></div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-2.5 cursor-help relative">
              <Users className="w-4 h-4 text-brand-green" />
              <span className="font-display text-sm font-semibold text-text-primary">
                Protocolo de Grupo
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Elige entre práctica individual o en grupo. Afecta la dificultad y recompensas.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col gap-2">
          <button className="flex items-center justify-between p-3.5 bg-brand-green/8 border-2 border-brand-green/30 rounded-xl cursor-pointer transition-all duration-200 hover:bg-brand-green/12">
            <div>
              <p className="font-ui text-sm font-semibold text-text-primary">Viajero Solitario</p>
              <p className="font-ui text-[11px] text-text-muted">Inmersión profunda individual</p>
            </div>
            <CheckCircle className="w-5 h-5 text-brand-green" />
          </button>
          <button className="flex items-center justify-between p-3.5 bg-white/2 border border-white/6 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/4 hover:border-white/10">
            <div>
              <p className="font-ui text-sm font-semibold text-text-secondary">
                Escuadrón Cronista
              </p>
              <p className="font-ui text-[11px] text-text-muted">Cooperación táctica múltiple</p>
            </div>
          </button>
        </div>
      </div>

      <div className="relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl p-4 sm:p-6 flex flex-col gap-4 transition-all duration-300 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.35)]">
        <div className="hud-corner-sm hud-corner-tl-sm"></div>
        <div className="hud-corner-sm hud-corner-tr-sm"></div>
        <div className="hud-corner-sm hud-corner-bl-sm"></div>
        <div className="hud-corner-sm hud-corner-br-sm"></div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-2.5 cursor-help relative">
              <Zap className="w-4 h-4 text-brand-amber" />
              <span className="font-display text-sm font-semibold text-text-primary">
                Intensidad de Sincronización
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Número de frases por sesión. Más intensidad = más XP pero mayor fatiga mental.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col sm:flex-row gap-2">
          <button className="flex-1 p-3 bg-white/3 border border-white/6 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/5 text-center">
            <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-1">
              Cápsula
            </p>
            <p className="font-display text-sm font-bold text-text-secondary">5 frases</p>
          </button>
          <button className="flex-1 p-3 bg-brand-green/8 border-2 border-brand-green/30 rounded-lg cursor-pointer transition-all duration-200 text-center">
            <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-brand-green mb-1">
              Ritual
            </p>
            <p className="font-display text-sm font-bold text-brand-green">15 frases</p>
          </button>
          <button className="flex-1 p-3 bg-white/3 border border-white/6 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/5 text-center">
            <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-1">
              Odisea
            </p>
            <p className="font-display text-sm font-bold text-text-secondary">30 frases</p>
          </button>
        </div>

        <div className="mt-auto h-1 bg-surface-4 rounded overflow-hidden">
          <div className="h-full w-1/2 rounded bg-brand-green shadow-[0_2px_8px_rgba(61,214,140,0.3)]"></div>
        </div>
      </div>

      <div className="relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl p-4 sm:p-6 flex flex-col gap-4 transition-all duration-300 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.35)]">
        <div className="hud-corner-sm hud-corner-tl-sm"></div>
        <div className="hud-corner-sm hud-corner-tr-sm"></div>
        <div className="hud-corner-sm hud-corner-bl-sm"></div>
        <div className="hud-corner-sm hud-corner-br-sm"></div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-2.5 cursor-help relative">
              <Grid3X3 className="w-4 h-4 text-brand-purple" />
              <span className="font-display text-sm font-semibold text-text-primary">
                Matriz de Dificultad
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Nivel de complejidad léxica y gramatical. Avança bertahap untuk unlock difícil.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col gap-2">
          <button className="flex items-center justify-between p-3 bg-white/2 border border-white/6 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/4 hover:border-white/10">
            <span className="font-ui text-sm font-semibold text-text-secondary">Novice</span>
            <div className="flex gap-1">
              <div className="w-4 h-1 rounded-sm bg-brand-green shadow-[0_2px_8px_rgba(61,214,140,0.3)]"></div>
              <div className="w-4 h-1 rounded-sm bg-surface-4"></div>
              <div className="w-4 h-1 rounded-sm bg-surface-4"></div>
            </div>
          </button>
          <button className="flex items-center justify-between p-3 bg-brand-green/8 border-2 border-brand-green/30 rounded-lg cursor-pointer transition-all duration-200">
            <span className="font-ui text-sm font-semibold text-brand-green">Chronicler</span>
            <div className="flex gap-1">
              <div className="w-4 h-1 rounded-sm bg-brand-green shadow-[0_2px_8px_rgba(61,214,140,0.3)]"></div>
              <div className="w-4 h-1 rounded-sm bg-brand-green shadow-[0_2px_8px_rgba(61,214,140,0.3)]"></div>
              <div className="w-4 h-1 rounded-sm bg-surface-4"></div>
            </div>
          </button>
          <button className="flex items-center justify-between p-3 bg-white/2 border border-white/6 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/4 hover:border-white/10">
            <span className="font-ui text-sm font-semibold text-text-secondary">Grandmaster</span>
            <div className="flex gap-1">
              <div className="w-4 h-1 rounded-sm bg-surface-4"></div>
              <div className="w-4 h-1 rounded-sm bg-surface-4"></div>
              <div className="w-4 h-1 rounded-sm bg-surface-4"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
