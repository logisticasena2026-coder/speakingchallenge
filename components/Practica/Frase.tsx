'use client';

import { Bookmark } from 'lucide-react';
import { sileo } from 'sileo';
import { guardarPalabra } from '@/actions/diccionario/guardarPalabra';
import type { Frase } from "@/store/useFrasesStore";

export function Frase({ frases, indice, fuente }: Readonly<{ frases: Frase[]; indice: number; fuente: string }>) {
  const frase = frases[indice];
  const ingles = frase?.fraseIngles ?? '';
  const espanol = frase?.fraseEspanol ?? '';

  const handleGuardar = async () => {
    if (!ingles || !espanol) return;
    const res = await guardarPalabra({ palabra: ingles, traduccion: espanol });
    if (res.ok) {
      sileo.success({ title: 'Palabra guardada', description: 'Agregada a tu diccionario.' });
    } else {
      sileo.info({ title: 'Ya existe', description: 'Esta frase ya está en tu diccionario.' });
    }
  };

  return (
    <div className="glass-crystal relative rounded-3xl overflow-hidden p-8 md:px-7">
      <div className="hud-corner tl"></div>
      <div className="hud-corner tr"></div>
      <div className="hud-corner bl"></div>
      <div className="hud-corner br"></div>

      <div
        className="absolute -top-10 -left-10 w-30 h-30 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle,rgba(61,214,140,0.12),transparent)',
        }}
      ></div>
      <div
        className="absolute -bottom-8 -right-8 w-25 h-25 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(168,85,247,0.1),transparent)' }}
      ></div>

      <div className="relative z-1 text-center">
        <p
          className={`font-ui ${fuente} font-semibold tracking-[0.2em] uppercase text-brand-green mb-4`}
        >
          Encantamiento Objetivo
        </p>

        <p
          className="font-display font-bold italic text-text-primary leading-[1.35] mb-5"
          style={{ fontSize: 'clamp(18px,3.5vw,30px)' }}
        >
          &ldquo;{ingles || 'Cargando...'}&rdquo;
        </p>

        <div
          className="w-20 h-px mx-auto mb-5"
          style={{
            background: 'linear-gradient(90deg,transparent,rgba(61,214,140,0.4),transparent)',
          }}
        ></div>

        <div className="flex flex-wrap gap-1.5 justify-center mb-1">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-ui font-semibold tracking-[0.04em] bg-brand-green/12 text-brand-green border border-brand-green/25 ${fuente}`}
          >
            {espanol || 'Cargando...'}
          </span>
        </div>
        <div className="flex items-center justify-center gap-3 mt-3">
          <p className={`font-ui text-text-muted ${fuente}`}>Ve la traduccion</p>
          <button
            onClick={handleGuardar}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-ui text-[10px] font-semibold tracking-wider text-brand-cyan bg-brand-cyan/8 border border-brand-cyan/20 hover:bg-brand-cyan/15 hover:border-brand-cyan/30 transition-all cursor-pointer"
            aria-label="Guardar frase en diccionario"
          >
            <Bookmark className="w-3 h-3" />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
