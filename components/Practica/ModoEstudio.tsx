'use client';

import { useFrasesStore } from '@/store/useFrasesStore';
import { cn } from '@/lib/utils';
import { BookOpen, Zap, Play, Radar } from 'lucide-react';
import Link from 'next/link';
import { EnDesarrollo } from '@/components/EnDesarrollo';
import { Configuraciónes } from './Configuraciones';
import { ErasPractica } from './ErasPractica';

export function ModoEstudio() {
  const modo = useFrasesStore((state) => state.modoDeEstudio);
  const setModo = useFrasesStore((state) => state.setModoDeEstudio);

  return (
    <div className="space-y-5 mb-3 ani delay-anim-2 mt-3">
      <div className="flex items-center justify-center gap-4">
        <span className="font-ui-label text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          Modo de misión
        </span>
        <div className="inline-flex items-center rounded-full border border-border-default bg-surface-2 p-0.5 gap-0">
          <button
            onClick={() => setModo('Estudio')}
            className={cn(
              'relative rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer',
              modo === 'Estudio'
                ? 'bg-brand-green text-surface-0 shadow-[0_0_12px_rgba(61,214,140,0.3)]'
                : 'text-text-muted hover:text-text-secondary',
            )}
          >
            <BookOpen className="size-3.5" />
            Estudiar
          </button>
          <button
            onClick={() => setModo('Practica')}
            className={cn(
              'relative rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer',
              modo === 'Practica'
                ? 'bg-brand-green text-surface-0 shadow-[0_0_12px_rgba(61,214,140,0.3)]'
                : 'text-text-muted hover:text-text-secondary',
            )}
          >
            <Zap className="size-3.5" />
            Practicar
          </button>
        </div>
      </div>

      {modo === 'Estudio' ? (
        <>
          <section>
            <h2 className="sr-only">Era histórica</h2>
            <ErasPractica />
          </section>
          <EnDesarrollo>
            <div className="relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl animate-zoom-in">
              <div className="hud-corner-sm hud-corner-tl-sm" />
              <div className="hud-corner-sm hud-corner-tr-sm" />
              <div className="hud-corner-sm hud-corner-bl-sm" />
              <div className="hud-corner-sm hud-corner-br-sm" />
              <div className="flex flex-col justify-center items-center text-center p-6 sm:p-8">
                <div className="mb-4">
                  <Radar className="w-14 h-14 text-brand-green/20" />
                </div>
                <p className="text-sm text-text-muted mb-6 max-w-100 leading-relaxed">
                  Listo para sincronizar la conciencia con la era seleccionada. Todos los parámetros
                  están validados.
                </p>
                <button className="flex items-center justify-center gap-2 bg-brand-green text-surface-0 font-ui text-xs font-bold tracking-widest uppercase w-full sm:w-auto px-8 py-3.5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-[0_0_24px_rgba(61,214,140,0.4)] hover:-translate-y-0.5">
                  <Play className="w-5 h-5" />
                  Iniciar estudio
                </button>
              </div>
            </div>
          </EnDesarrollo>
        </>
      ) : (
        <>
          <section>
            <h2 className="sr-only">Configuración de grupo</h2>
            <Configuraciónes />
          </section>
          <div className="relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl animate-zoom-in">
            <div className="hud-corner-sm hud-corner-tl-sm" />
            <div className="hud-corner-sm hud-corner-tr-sm" />
            <div className="hud-corner-sm hud-corner-bl-sm" />
            <div className="hud-corner-sm hud-corner-br-sm" />
            <div className="flex flex-col justify-center items-center text-center p-6 sm:p-8">
              <div className="mb-4">
                <Radar className="w-14 h-14 text-brand-green/20" />
              </div>
              <p className="text-sm text-text-muted mb-6 max-w-100 leading-relaxed">
                Listo para comenzar a practicar cuando quieras. tienes 2.000 frases a tu disposicion
              </p>
              <Link
                href="/dashboard/estudiar/practicando"
                className="flex items-center justify-center gap-2 bg-brand-green text-surface-0 font-ui text-xs font-bold tracking-widest uppercase w-full sm:w-auto px-8 py-3.5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-[0_0_24px rgba(61,214,140,0.4)] hover:-translate-y-0.5"
              >
                <Play className="w-5 h-5" />
                Iniciar practica
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
