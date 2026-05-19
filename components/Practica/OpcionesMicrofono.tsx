'use client';

import { useFrasesStore, type Frase } from '@/store/useFrasesStore';
import { Mic, MicOff, RotateCcw, Volume2, Loader2 } from 'lucide-react';
import { logger } from '@/lib/logger';
import { sileo } from 'sileo';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ChromeSpeechRecognizer } from '@/lib/chromeSpeech';
import { usePathname } from 'next/navigation';

type EstadoConexion = 'disconnected' | 'connecting' | 'connected' | 'paused';

export function OpcionesMicrofono({
  frase,
  indiceActual,
}: Readonly<{ frase: Frase[]; indiceActual: number }>) {
  const [boton, setBoton] = useState(false);
  const [estadoConexion, setEstadoConexion] = useState<EstadoConexion>('disconnected');
  const grabando = useFrasesStore((state) => state.grabando);
  const setGrabando = useFrasesStore((state) => state.setGrabando);
  const NuevoTexto = useFrasesStore((state) => state.setTexto);
  const streamerRef = useRef<ChromeSpeechRecognizer | null>(null);
  const pathname = usePathname();

  const texto = frase[indiceActual]?.fraseIngles;

  const toggleMic = useCallback(async () => {
    if (estadoConexion === 'connected' || grabando) {
      streamerRef.current?.stopMic();
      setEstadoConexion('paused');
      setGrabando(false);
      return;
    }

    if (estadoConexion === 'paused') {
      setEstadoConexion('connected');
      setGrabando(true);
      try {
        await streamerRef.current?.startMic();
      } catch (err: unknown) {
        setEstadoConexion('paused');
        setGrabando(false);
        const error = err as { name?: string; message?: string };
        if (error.name === 'NotAllowedError') {
          sileo.error({
            title: 'Permiso denegado',
            description: 'Debes permitir el acceso al micrófono',
          });
        } else {
          sileo.error({
            title: 'Error al reanudar',
            description: error.message ?? 'No se pudo acceder al micrófono',
          });
        }
      }
      return;
    }

    // disconnected
    setEstadoConexion('connecting');
    setGrabando(true);
    const streamer = new ChromeSpeechRecognizer({
      onTranscript(text) {
        if (text.trim()) {
          NuevoTexto(text);
        }
      },
      onOpen() {
        setEstadoConexion('connected');
        streamerRef.current?.startMic();
      },
      onConnecting() {
        setEstadoConexion('connecting');
      },
      onError(err) {
        logger.error('Chrome Speech error', new Error(err));
        setEstadoConexion('disconnected');
        setGrabando(false);
        streamerRef.current?.close();
        streamerRef.current = null;
        sileo.error({
          title: 'Error de transcripción',
          description: err,
        });
      },
      onClose() {
        setEstadoConexion('disconnected');
        setGrabando(false);
      },
    });
    streamerRef.current = streamer;
    streamer.startConnection('en');
  }, [estadoConexion, grabando, NuevoTexto, setGrabando]);

  useEffect(() => {
    if (pathname !== '/dashboard/estudiar/practicando') {
      streamerRef.current?.close();
      streamerRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      streamerRef.current?.close();
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
                Conectando...
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
