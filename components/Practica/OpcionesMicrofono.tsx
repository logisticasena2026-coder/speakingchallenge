'use client';

import { useFrasesStore, type Frase } from '@/store/useFrasesStore';
import { Mic, RotateCcw, Volume2 } from 'lucide-react';
import { logger } from '@/lib/logger';
import { sileo } from 'sileo';
import { useState, useRef, useCallback, useEffect } from 'react';
import { DeepgramStreamer } from '@/lib/deepGrem2';

export function OpcionesMicrofono({
  frase,
  indiceActual,
}: Readonly<{ frase: Frase[]; indiceActual: number }>) {
  const [boton, setBoton] = useState(false);
  const grabando = useFrasesStore((state) => state.grabando);
  const setGrabando = useFrasesStore((state) => state.setGrabando);
  const NuevoTexto = useFrasesStore((state) => state.setTexto);
  const streamerRef = useRef<DeepgramStreamer | null>(null);
  const DEEPGRAM_API_KEY = 'f60e26415a81bebcde5ab4f148fd2b1134f9fb0b';

  const texto = frase[indiceActual]?.fraseIngles;

  const toggleMic = useCallback(async () => {
    if (grabando) {
      streamerRef.current?.stop();
      streamerRef.current = null;
      setGrabando(false);
      return;
    }

    setGrabando(true);
    try {
      const streamer = new DeepgramStreamer(DEEPGRAM_API_KEY, {
        onTranscript(text, isFinal) {
          if (text.trim()) {
            NuevoTexto(text);
          }
        },
        onSilence() {
          streamerRef.current?.stop();
          streamerRef.current = null;
          setGrabando(false);
        },
        onError(err) {
          logger.error('Deepgram error', new Error(err));
          setGrabando(false);
          sileo.error({
            title: 'Error de transcripción',
            description: err,
          });
        },
      });
      streamerRef.current = streamer;
      await streamer.start('en');
    } catch (err: unknown) {
      setGrabando(false);
      const error = err as { name?: string; message?: string };
      if (error.name === 'NotAllowedError') {
        sileo.error({
          title: 'Permiso denegado',
          description: 'Debes permitir el acceso al micrófono',
        });
      } else {
        sileo.error({
          title: 'Error al iniciar',
          description: error.message ?? 'No se pudo conectar con Deepgram',
        });
      }
    }
  }, [grabando, DEEPGRAM_API_KEY, NuevoTexto, setGrabando]);

  useEffect(() => {
    return () => {
      streamerRef.current?.stop();
      streamerRef.current = null;
    };
  }, []);

  const resetTexto = useCallback(() => {
    NuevoTexto('');
  }, [NuevoTexto]);

  const reproducir = async () => {
    setBoton(true);
    try {
      const res = await fetch(`/api/vos?text=${encodeURIComponent(texto)}`);

      if (res.status === 401) {
        return {
          ok: false,
          message: 'Sesión inválida o expirada',
        };
      }

      if (res.status === 400) {
        return {
          ok: false,
          message: 'Solicitud inválida',
        };
      }

      if (res.status >= 500) {
        return {
          ok: false,
          message: 'Error del servidor',
        };
      }

      const blob = await res.blob();

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();

      return { ok: true, message: 'Reproduciendo audio' };
    } catch (err) {
      logger.error('Error al generar audio', err as Error);
      throw err;
    } finally {
      setBoton(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-5 mt-5">
        <button
          onClick={() => {
            sileo.promise(() => reproducir(), {
              loading: { title: 'Cargando audio' },
              success: (res: { ok: boolean; message: string }) => {
                if (!res.ok) throw new Error(res.message);
                return {
                  title: 'Reproduciendo audio',
                };
              },
              error: (err: unknown) => {
                const message = err instanceof Error ? err.message : 'Ocurrió un error inesperado';
                return {
                  title: 'Error al reproducir audio',
                  description: message,
                };
              },
            });
          }}
          disabled={boton}
          title="Escuchar frase"
          className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-text-secondary cursor-pointer transition-all duration-200 shrink-0 hover:border-brand-green/30 hover:text-brand-green hover:bg-brand-green/8"
        >
          <Volume2 className="w-5 h-5" />
        </button>

        <div className="relative">
          <button
            id="micBtn"
            onClick={toggleMic}
            title={grabando ? 'Detener grabación' : 'Grabar pronunciación'}
            className={`mic-btn relative w-18 h-18 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-200 shrink-0 hover:scale-[1.06] active:scale-[0.96] ${
              grabando
                ? 'bg-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]'
                : 'bg-brand-green hover:shadow-[0_0_40px_rgba(61,214,140,0.5)]'
            }`}
          >
            <Mic id="micIcon" className="w-7.5 h-7.5 text-surface-0" />
          </button>
        </div>

        <button
          onClick={resetTexto}
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
