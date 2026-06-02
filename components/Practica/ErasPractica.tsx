'use client';

import Image from 'next/image';
import { CheckCircle, Hourglass, Lock } from 'lucide-react';
import { EnDesarrollo } from '@/components/EnDesarrollo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function ErasPractica() {
  return (
    <EnDesarrollo className='mt-3'>
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
              <p>
                Selecciona la era histórica para tu inmersión lingüística. Cada era tiene
                vocabulario único.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex gap-4 overflow-x-auto pb-2 pt-2 snap-x snap-mandatory era-scroll">
          <div className="relative shrink-0 min-w-[200px] sm:min-w-[240px] lg:min-w-[260px] h-32 sm:h-36 lg:h-40 rounded-xl overflow-hidden border border-brand-green/40 cursor-pointer transition-all duration-300 hover:border-brand-green/30 hover:-translate-y-1 shadow-[0_0_20px_rgba(61,214,140,0.15)]">
            <Image
              alt="Antigua"
              src="/eras/Era_Antigua.webp"
              width={1536}
              height={1024}
              className="w-full h-full object-cover"
              sizes="(max-width: 640px) 200px, 260px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#07090f]/95 via-[#07090f]/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <span className="font-ui text-[9px] font-bold tracking-widest uppercase px-1.5 py-1 rounded bg-brand-green/15 text-brand-green border border-brand-green/25 mb-1.5 inline-block">
                  Activo
                </span>
                <p className="font-display text-base font-bold text-white">Antigua Era</p>
              </div>
              <CheckCircle className="w-6 h-6 text-brand-green" />
            </div>
          </div>

          <div className="relative shrink-0 min-w-[200px] sm:min-w-[240px] lg:min-w-[260px] h-32 sm:h-36 lg:h-40 rounded-xl overflow-hidden border border-white/6 cursor-pointer transition-all duration-300 hover:border-brand-green/30 hover:-translate-y-1">
            <Image
              alt="Medieval"
              src="/eras/Era_medieval.webp"
              width={1641}
              height={958}
              className="w-full h-full object-cover transition-all duration-500 hover:brightness-75 hover:saturate-110"
              sizes="(max-width: 640px) 200px, 260px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#07090f]/95 via-[#07090f]/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <span className="font-ui text-[9px] font-bold tracking-widest uppercase px-1.5 py-1 rounded bg-brand-amber/15 text-brand-amber border border-brand-amber/25 mb-1.5 inline-block">
                  Disponible
                </span>
                <p className="font-display text-base font-bold text-white">Medieval Era</p>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 min-w-[200px] sm:min-w-[240px] lg:min-w-[260px] h-32 sm:h-36 lg:h-40 rounded-xl overflow-hidden border border-white/6 opacity-50 cursor-not-allowed">
            <Image
              alt="Moderna"
              src="/eras/Era_Moderna.webp"
              width={1640}
              height={959}
              className="w-full h-full object-cover"
              sizes="(max-width: 640px) 200px, 260px"
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
                  Moderna Era
                </p>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 min-w-[200px] sm:min-w-[240px] lg:min-w-[260px] h-32 sm:h-36 lg:h-40 rounded-xl overflow-hidden border border-white/6 opacity-50 cursor-not-allowed">
            <Image
              alt="Crypto"
              src="/eras/Era_crypto.webp"
              width={1641}
              height={958}
              className="w-full h-full object-cover"
              sizes="(max-width: 640px) 200px, 260px"
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
                  Crypto Era
                </p>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 min-w-[200px] sm:min-w-[240px] lg:min-w-[260px] h-32 sm:h-36 lg:h-40 rounded-xl overflow-hidden border border-white/6 opacity-50 cursor-not-allowed">
            <Image
              alt="Post-Humana"
              src="/eras/Era_postHUmana.webp"
              width={1642}
              height={958}
              className="w-full h-full object-cover"
              sizes="(max-width: 640px) 200px, 260px"
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
                  Post-Humana Era
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EnDesarrollo>
  );
}
