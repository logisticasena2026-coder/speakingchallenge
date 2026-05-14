'use client';

import { useFrasesStore } from '@/store/useFrasesStore';
import { Timer } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function Temporizador() {
  const setTiempo = useFrasesStore((state) => state.setTiempo);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatted = (() => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');

    return `${h}:${m}:${sec}`;
  })();

  useEffect(() => {
    setTiempo(seconds);
  }, [seconds, setTiempo]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="hidden md:flex items-center gap-1.5 bg-[rgba(18,22,32,0.6)] border border-white/6 rounded-full px-3.5 py-1.25 backdrop-blur-sm">
      <Timer className="w-3.5 h-3.5 text-brand-green" />

      <span className="font-ui text-xs font-semibold tracking-[0.12em] text-text-secondary">
        {formatted}
      </span>
    </div>
  );
}
