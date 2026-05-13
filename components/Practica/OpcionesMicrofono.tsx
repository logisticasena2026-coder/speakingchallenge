'use client';

import type { Frase } from '@/store/useFrasesStore';
import { Mic, RotateCcw, Volume2 } from 'lucide-react';
import { logger } from '@/lib/logger';
import { useState } from 'react';
export function OpcionesMicrofono({
  frase,
  indiceActual,
}: Readonly<{ frase: Frase[]; indiceActual: number }>) {
  const [boton, setBoton] = useState(false);

  const texto = frase[indiceActual]?.fraseIngles;

  const reproducir = async () => {
    setBoton(true);
    try {
      const res = await fetch(`/api/vos?text=${encodeURIComponent(texto)}`);

      const blob = await res.blob();

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    } catch (err) {
      logger.error('Error al generar audio', err as Error);
    } finally {
      setBoton(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-5 mt-5">
        <button
          onClick={reproducir}
          disabled={boton}
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
            <Mic id="micIcon" className="w-7.5 h-7.5 text-surface-0" />
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
    </>
  );
}
