'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface Props {
  activo: boolean;
  duracion?: number;
}

export function ConfetiCelebracion({ activo, duracion = 3000 }: Props) {
  const prevActivo = useRef(false);

  useEffect(() => {
    if (activo && !prevActivo.current) {
      const end = Date.now() + duracion;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ['#22d3ee', '#3dd68c', '#f5a623', '#a855f7'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ['#22d3ee', '#3dd68c', '#f5a623', '#a855f7'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }

    prevActivo.current = activo;
  }, [activo, duracion]);

  return null;
}
