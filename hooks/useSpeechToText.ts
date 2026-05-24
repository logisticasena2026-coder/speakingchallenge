'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChromeSpeechRecognizer } from '@/lib/chromeSpeech';
import { usePracticaStore } from '@/store/usePracticaStore';
import { logger } from '@/lib/logger';
import { sileo } from 'sileo';

export type EstadoConexion = 'disconnected' | 'connecting' | 'connected' | 'paused';

export function useSpeechToText() {
  const [estadoConexion, setEstadoConexion] = useState<EstadoConexion>('disconnected');
  const grabando = usePracticaStore((state) => state.grabando);
  const setGrabando = usePracticaStore((state) => state.setGrabando);
  const NuevoTexto = usePracticaStore((state) => state.setTexto);
  const streamerRef = useRef<ChromeSpeechRecognizer | null>(null);
  const pathname = usePathname();

  const pauseMic = useCallback(() => {
    if (estadoConexion === 'connected' || grabando) {
      streamerRef.current?.stopMic();
      setEstadoConexion('paused');
      setGrabando(false);
    }
  }, [estadoConexion, grabando, setGrabando]);

  const toggleMic = useCallback(async () => {
    if (estadoConexion === 'connected' || grabando) {
      pauseMic();
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
  }, [estadoConexion, grabando, NuevoTexto, setGrabando, pauseMic]);

  useEffect(() => {
    if (pathname !== '/dashboard/estudiar/practicando') {
      streamerRef.current?.close();
      streamerRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    const streamer = streamerRef.current;
    return () => {
      streamer?.close();
      streamerRef.current = null;
    };
  }, []);

  return { estadoConexion, toggleMic, pauseMic };
}
