'use client';

import { useCallback, useState } from 'react';
import { logger } from '@/lib/logger';

export function useTextToSpeech(texto: string | undefined) {
  const [cargando, setCargando] = useState(false);

  const reproducir = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch(`/api/vos?text=${encodeURIComponent(texto ?? '')}`);

      if (res.status === 401) {
        return { ok: false, message: 'Sesión inválida o expirada' };
      }

      if (res.status === 400) {
        return { ok: false, message: 'Solicitud inválida' };
      }

      if (res.status >= 500) {
        return { ok: false, message: 'Error del servidor' };
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
      setCargando(false);
    }
  }, [texto]);

  return { cargando, reproducir };
}
