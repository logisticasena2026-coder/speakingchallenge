'use client';

import { useFrasesStore } from '@/store/useFrasesStore';

export function TuPronunciacion() {
  const texto = useFrasesStore((state) => state.texto);
  const grabando = useFrasesStore((state) => state.grabando);
  return (
    <div className="bg-surface-2 border border-white/6 rounded-xl px-5 py-3.5">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-ui text-[9px] font-semibold tracking-[0.14em] uppercase text-text-muted">
          Tu pronunciación
        </span>
        {grabando && (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block rec-blink"></span>
            <span className="font-ui text-[9px] font-semibold text-red-500 tracking-widest">REC</span>
          </div>
        )}
      </div>
      {texto ? (
        <p className="font-body text-sm text-text-primary">{texto}</p>
      ) : (
        <div id="waveform" className="flex items-center gap-0.75 h-10"></div>
      )}
    </div>
  );
}
