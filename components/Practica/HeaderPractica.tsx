'use client';
import { useConfiguracionUsuario } from '@/store/useConfiguracionUsuario';

import { Bell, Flame, Timer } from 'lucide-react';
import { Temporizador } from './temporizador';

export function HeaderPractica() {
  const fuente = useConfiguracionUsuario((state) => state.tamanoFuente);
  return (
    <header className="sticky top-0 h-16 bg-[rgba(7,9,15,0.92)] border-b border-white/10 backdrop-blur-xl z-40 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2.5">
        <button
          aria-label="Cerrar práctica"
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer"
        >
          <div className="hidden sm:flex flex-col gap-px">
            <span
              className={`font-ui ${fuente} font-semibold tracking-[0.14em] uppercase text-text-muted`}
            >
              Speaking Challenge
            </span>
          </div>
        </button>

        <div className="hidden sm:block">
          <Temporizador />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <Temporizador />
        </div>

        <div className="flex items-center gap-1.5 text-brand-amber">
          <Flame className="w-4 h-4 text-brand-amber" />
          <span className="hidden sm:block font-display text-3.25 font-bold text-brand-amber">
            12
          </span>
        </div>

        <div className="relative cursor-pointer">
          <Bell className="w-4 h-4 text-text-muted hover:text-white/80 transition-colors" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-brand-amber border-[1.5px] border-surface-0"></span>
        </div>

        <div
          className={`w-8 h-8 rounded-full bg-linear-to-br from-[#1a3a5c] to-[#0d2240] border-2 border-brand-green/30 flex items-center justify-center font-display ${fuente} font-bold text-brand-green cursor-pointer`}
        >
          A
        </div>
      </div>
    </header>
  );
}
