'use client';

import { usePracticaStore } from '@/store/usePracticaStore';
import { Timer } from 'lucide-react';
import { useEffect } from 'react';

let intervalId: ReturnType<typeof setInterval> | null = null;
let activeCount = 0;

function startGlobalInterval() {
  if (intervalId !== null) return;
  intervalId = setInterval(() => {
    const current = usePracticaStore.getState().tiempo;
    usePracticaStore.getState().setTiempo(current + 1);
  }, 1000);
}

function stopGlobalInterval() {
  if (intervalId === null) return;
  clearInterval(intervalId);
  intervalId = null;
}

export function Temporizador() {
  const tiempo = usePracticaStore((state) => state.tiempo);

  const formatted = (() => {
    const h = String(Math.floor(tiempo / 3600)).padStart(2, '0');
    const m = String(Math.floor((tiempo % 3600) / 60)).padStart(2, '0');
    const sec = String(tiempo % 60).padStart(2, '0');

    return `${h}:${m}:${sec}`;
  })();

  useEffect(() => {
    activeCount++;
    if (activeCount === 1) startGlobalInterval();
    return () => {
      activeCount--;
      if (activeCount === 0) stopGlobalInterval();
    };
  }, []);

  return (
    <div className="flex items-center gap-1.5 bg-[rgba(18,22,32,0.6)] border border-white/6 rounded-full px-3.5 py-1.25 backdrop-blur-sm">
      <Timer className="w-3.5 h-3.5 text-brand-green" />

      <span className="font-ui text-xs font-semibold tracking-[0.12em] text-text-secondary">
        {formatted}
      </span>
    </div>
  );
}
