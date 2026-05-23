'use client';

import { type Frase } from '@/store/useFrasesStore';
import { useFrasesStore } from '@/store/useFrasesStore';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useValidarNavegador } from '@/hooks/useValidarNavegador';
import { sileo } from 'sileo';
import { useCallback } from 'react';
import { Mic, MicOff, RotateCcw, Volume2, Loader2 } from 'lucide-react';

export function OpcionesMicrofono({
  frase,
  indiceActual,
}: Readonly<{ frase: Frase[]; indiceActual: number }>) {
  const { estadoConexion, toggleMic, pauseMic } = useSpeechToText();
  const texto = frase[indiceActual]?.fraseIngles;
  const { cargando, reproducir } = useTextToSpeech(texto);
  const NuevoTexto = useFrasesStore((state) => state.setTexto);

  useValidarNavegador();

  const resetTexto = useCallback(() => {
    pauseMic();
    NuevoTexto('');
  }, [NuevoTexto, pauseMic]);

  const micTooltip =
    estadoConexion === 'connecting'
      ? 'Conectando...'
      : estadoConexion === 'connected'
        ? 'Pausar grabación'
        : estadoConexion === 'paused'
          ? 'Reanudar grabación'
          : 'Grabar pronunciación';

  const micAria =
    estadoConexion === 'connecting'
      ? 'Conectando'
      : estadoConexion === 'connected'
        ? 'Pausar grabación'
        : estadoConexion === 'paused'
          ? 'Reanudar grabación'
          : 'Grabar pronunciación';

  return (
    <>
      <div className="flex items-center justify-center gap-5 mt-5">
        <button
          onClick={() => {
            pauseMic();
            sileo.promise(() => reproducir(), {
              loading: { title: 'Cargando audio' },
              success: (res: { ok: boolean; message: string }) => {
                if (!res.ok) throw new Error(res.message);
                return { title: 'Reproduciendo audio' };
              },
              error: (err: unknown) => {
                const message = err instanceof Error ? err.message : 'Ocurrió un error inesperado';
                return { title: 'Error al reproducir audio', description: message };
              },
            });
          }}
          disabled={cargando}
          title="Escuchar frase"
          aria-label="Escuchar frase"
          className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-text-secondary cursor-pointer transition-all duration-200 shrink-0 hover:border-brand-green/30 hover:text-brand-green hover:bg-brand-green/8"
        >
          <Volume2 className="w-5 h-5" />
        </button>

        <div className="relative">
          <button
            id="micBtn"
            onClick={toggleMic}
            disabled={estadoConexion === 'connecting'}
            title={micTooltip}
            aria-label={micAria}
            className={`mic-btn relative w-18 h-18 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-200 shrink-0 hover:scale-[1.06] active:scale-[0.96] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              estadoConexion === 'connected'
                ? 'bg-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]'
                : estadoConexion === 'paused'
                  ? 'bg-amber-500 hover:shadow-[0_0_40px_rgba(251,191,36,0.5)]'
                  : 'bg-brand-green hover:shadow-[0_0_40px_rgba(61,214,140,0.5)]'
            }`}
          >
            {estadoConexion === 'connecting' ? (
              <Loader2 className="w-7.5 h-7.5 text-surface-0 animate-spin" />
            ) : estadoConexion === 'paused' ? (
              <MicOff className="w-7.5 h-7.5 text-surface-0" />
            ) : (
              <Mic id="micIcon" className="w-7.5 h-7.5 text-surface-0" />
            )}
          </button>

          {estadoConexion === 'connecting' && (
            <div
              aria-live="polite"
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <span className="font-ui text-ui-badge text-brand-green/70 animate-pulse">
Conectando…
              </span>
            </div>
          )}

          {estadoConexion === 'paused' && (
            <div
              aria-live="polite"
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <span className="font-ui text-ui-badge text-amber-400/70">
                Micrófono en pausa
              </span>
            </div>
          )}
        </div>

        <button
          onClick={resetTexto}
          title="Volver a intentar"
          aria-label="Volver a intentar"
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
