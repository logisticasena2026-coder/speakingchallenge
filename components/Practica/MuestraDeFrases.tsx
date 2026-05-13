'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useFrasesStore } from '@/store/useFrasesStore';
import { ControlesCelular } from './ControlcesCelular';
import { EstadisticaEstudiantePractica } from './EstadisticasEStudiantePracticando';
import { Frase } from './Frase';
import { TuPronunciacion } from './TuPronunciacion';
import { OpcionesMicrofono } from './OpcionesMicrofono';
import { EstadisticasDeFrases } from './EstadisticasDeFrases';
export function MuestraDeFrases() {
  const frases = useFrasesStore((state) => state.frases);
  const indiceActual = useFrasesStore((state) => state.indiceActual);
  const siguiente = useFrasesStore((state) => state.siguiente);
  const anterior = useFrasesStore((state) => state.anterior);
  const cargarFrasesInicial = useFrasesStore((state) => state.cargarFrasesInicial);
  const estaCargando = useFrasesStore((state) => state.estaCargando);
  const TotalFrases = useFrasesStore((store) => store.totalFrases);
  useEffect(() => {
    if (frases.length === 0) {
      cargarFrasesInicial();
    }
  }, [cargarFrasesInicial, frases.length]);

  return (
    <>
      <EstadisticaEstudiantePractica frase={indiceActual} TotalFrases={TotalFrases} />
      <div className="practice-grid ani d2 flex-1 min-h-0">
        <div className="flex flex-col gap-4 h-full justify-center">
          <Frase frases={frases} indice={indiceActual} />

          <TuPronunciacion />

          <OpcionesMicrofono frase={frases} indiceActual={indiceActual} />
        </div>

        <div className="side-panel flex flex-col gap-3.5 h-full justify-center">
          <EstadisticasDeFrases />

          <div className="nav-controls ani d4 w-full">
            <div className="flex items-center justify-between gap-3 p-1">
              <button
                onClick={anterior}
                disabled={indiceActual === 0}
                className="nav-btn group relative flex items-center justify-center w-12 h-12 rounded-2xl border border-white/8 bg-white/4 transition-all duration-300 hover:bg-white/8 hover:border-brand-green/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-text-secondary group-hover:text-brand-green transition-colors" />
              </button>

              <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-display text-xs text-brand-green">{indiceActual}</span>
                  <span className="text-text-muted text-[10px]">/</span>
                  <span className="font-ui text-[10px] text-text-muted">{TotalFrases}</span>
                </div>
                <div className="progress-bar w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="progress-fill h-full bg-linear-to-r from-brand-green/60 to-brand-green rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${TotalFrases > 0 ? ((indiceActual + 1) / TotalFrases) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <button
                onClick={siguiente}
                className="nav-btn group relative flex items-center justify-center w-12 h-12 rounded-2xl border border-white/8 bg-white/4 transition-all duration-300 hover:bg-white/8 hover:border-brand-green/20"
              >
                <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-brand-green transition-colors" />
              </button>
            </div>
          </div>

          <div className="ani d4 rounded-3xl p-3 bg-brand-green/5 border border-brand-green/12">
            <div className="flex gap-2.5 items-start">
              <div
                className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-display text-ui-badge text-brand-green border-[1.5px] border-brand-green/30"
                style={{
                  background: 'linear-gradient(135deg,rgba(61,214,140,0.2),rgba(61,214,140,0.05))',
                }}
              >
                S
              </div>
              <div>
                <p className="font-ui text-[9px] font-bold text-brand-green tracking-widest mb-1">
                  SOPHIA DICE
                </p>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  El fonema <strong className="text-text-primary">/ð/</strong> en &ldquo;the&rdquo;
                  se forma con la lengua entre los dientes. ¡Casi lo tienes!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ControlesCelular siguiente={siguiente} anterior={anterior} />
    </>
  );
}
