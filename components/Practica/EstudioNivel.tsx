'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFrasesStore } from '@/store/useFrasesStore';
import { usePracticaStore } from '@/store/usePracticaStore';
import { useConfiguracionUsuario } from '@/store/useConfiguracionUsuario';
import { comparacion_de_frases } from '@/utils/comparacion-de-frases';
import { sileo } from 'sileo';
import { guardarResultadosFrase } from '@/actions/progreso/guardarResultadosFrase';
import { completarNivel } from '@/actions/progreso/completarNivel';

import { EstadisticaEstudiantePractica } from './EstadisticasEStudiantePracticando';
import { Frase } from './Frase';
import { TuPronunciacion } from './TuPronunciacion';
import { OpcionesMicrofono } from './OpcionesMicrofono';
import { PromedioSolitario } from './PromedioSolitario';

const RADIO = 45;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;

function colorSegunPrecision(pct: number): string {
  if (pct >= 80) return '#3dd68c';
  if (pct >= 60) return '#f5a623';
  return '#ef4444';
}

function textShadowSegunPrecision(pct: number): string {
  if (pct >= 80) return '0 0 20px rgba(61,214,140,0.6)';
  if (pct >= 60) return '0 0 20px rgba(245,166,35,0.6)';
  return '0 0 20px rgba(239,68,68,0.6)';
}

function mensajeSegunPrecision(pct: number): string {
  if (pct >= 90) return 'Tu pronunciación alcanzó resonancia perfecta.';
  if (pct >= 80) return 'Excelente trabajo. Tu acento es muy preciso.';
  if (pct >= 70) return 'Muy bien, suena clara. Casi perfecto.';
  if (pct >= 60) return 'Buen intento. Intenta pronunciarlo un poco más claramente.';
  if (pct >= 40) return 'Necesita más trabajo. Escúchalo de nuevo e intenta mejorar.';
  if (pct >= 20) return 'Necesita considerable mejora. Practica más.';
  return 'Requiere más práctica. Intenta de nuevo con más cuidado.';
}

export function EstudioNivel() {
  const router = useRouter();
  const frases = useFrasesStore((state) => state.frases);
  const indiceActual = useFrasesStore((state) => state.indiceActual);
  const siguiente = useFrasesStore((state) => state.siguiente);
  const anterior = useFrasesStore((state) => state.anterior);
  const cargarFrasesInicial = useFrasesStore((state) => state.cargarFrasesInicial);
  const TotalFrases = useFrasesStore((store) => store.totalFrases);
  const nivel_id = useFrasesStore((store) => store.nivel_id);
  const estaCargando = useFrasesStore((state) => state.estaCargando);
  const reiniciarFrases = useFrasesStore((state) => state.reiniciar);
  const setEstadistica = usePracticaStore((state) => state.setEstadisticas);
  const estadisticasLen = usePracticaStore((s) => s.estadisticas.length);
  const precision = usePracticaStore((state) => state.precision);
  const setTexto = usePracticaStore((state) => state.setTexto);
  const setPrecision = usePracticaStore((state) => state.setPrecision);
  const resetearTodo = usePracticaStore((state) => state.resetAll);
  const resetearTiempo = usePracticaStore((state) => state.resetTiempo);
  const fuente = useConfiguracionUsuario((state) => state.tamanoFuente);
  const texto = usePracticaStore((store) => store.texto);

  const todasCompletadas = estadisticasLen >= TotalFrases && TotalFrases > 0;
  const iniciado = useRef(false);

  const precisionActual = comparacion_de_frases(frases[indiceActual]?.fraseIngles ?? '', texto ?? '');
  const [displayValue, setDisplayValue] = useState(0);

  const color = colorSegunPrecision(precisionActual);
  const textShadow = textShadowSegunPrecision(precisionActual);
  const offset = CIRCUNFERENCIA - (precisionActual / 100) * CIRCUNFERENCIA;
  const mensaje = mensajeSegunPrecision(precisionActual);

  useEffect(() => {
    if (!iniciado.current) {
      iniciado.current = true;
      const params = new URLSearchParams(globalThis.location?.search ?? '');
      cargarFrasesInicial(params.get('nivel_id') ?? undefined);
    }
  }, [cargarFrasesInicial]);

  useEffect(() => {
    resetearTodo();
  }, [resetearTodo]);

  useEffect(() => {
    setPrecision(precisionActual);
  }, [precisionActual, setPrecision]);

  useEffect(() => {
    const from = 0;
    const to = precisionActual;
    const duration = 800;
    const start = performance.now();
    let frame: number;
    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayValue(from + (to - from) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [precisionActual]);

  useEffect(() => {
    return () => {
      reiniciarFrases();
      iniciado.current = false;
    };
  }, [reiniciarFrases]);

  const irSiguiente = useCallback(async () => {
    setTexto('');

    const frase = frases[indiceActual];
    if (frase && precision > 0) {
      setEstadistica([{ id: frase.id, precision }]);
    }
    await siguiente();
  }, [precision, setTexto, setEstadistica, indiceActual, siguiente, frases]);

  const irAnterior = useCallback(() => {
    setTexto('');
    anterior();
  }, [setTexto, anterior]);

  const handleCompletar = useCallback(async () => {
    const state = usePracticaStore.getState();
    for (const r of state.estadisticas) {
      await guardarResultadosFrase({
        frase_id: r.id,
        precision: Math.round(r.precision),
        tiempo: Math.round(state.tiempoTotal || 1),
      });
    }
    const res = await completarNivel({ nivel_id });
    if (res.ok) {
      sileo.success({
        title: '¡Nivel completado!',
        description: `Precisión promedio: ${(res.nivel_completado?.precision_promedio ?? 0).toFixed(1)}%`,
      });
    }
    resetearTiempo();
    router.push('/dashboard/estudiar/estadisticas');
  }, [nivel_id, resetearTiempo, router]);

  return (
    <>
      <EstadisticaEstudiantePractica
        frase={indiceActual}
        TotalFrases={TotalFrases}
        fuente={fuente}
      />

      <div className="practice-grid ani d2 flex-1 min-h-0">
        <div className="flex flex-col gap-4 h-full justify-center">
          <Frase frases={frases} indice={indiceActual} fuente={fuente} />

          <TuPronunciacion />

          <OpcionesMicrofono frase={frases} indiceActual={indiceActual} />
        </div>

        <div className="side-panel flex flex-col gap-3.5 h-full justify-center">
          <div
            className="ani d3 text-center rounded-2xl border border-white/10 p-5"
            style={{
              background: 'linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p className={`font-ui ${fuente} font-semibold tracking-[0.2em] uppercase text-brand-green mb-3.5`}>
              Precisión
            </p>

            <div className="relative w-27.5 h-27.5 mx-auto mb-3" style={{ transform: 'rotate(-90deg)' }}>
              <svg width="110" height="110" viewBox="0 0 110 110">
                <circle cx="55" cy="55" fill="none" stroke="#1f2535" strokeWidth="6" r={RADIO} />
                <circle
                  cx="55"
                  cy="55"
                  fill="none"
                  r={RADIO}
                  stroke={color}
                  strokeDasharray={CIRCUNFERENCIA}
                  strokeDashoffset={offset}
                  style={{
                    filter: `drop-shadow(0 0 8px ${color}99)`,
                    transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </svg>
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ transform: 'rotate(90deg)' }}
              >
                <span
                  className="font-display text-[28px] font-bold leading-none"
                  style={{ color, textShadow }}
                >
                  {displayValue.toFixed(0)}
                </span>
              </div>
            </div>

            <h3 className="font-display text-sm font-bold text-text-primary mb-1">Precisión Arcana</h3>
            <p className={`${fuente} text-text-secondary leading-relaxed mb-4`}>{mensaje}</p>

            {todasCompletadas ? (
              <button
                className="inline-flex items-center justify-center gap-2 w-full h-11 px-5 bg-brand-green text-surface-0 font-ui text-sm font-bold tracking-wider uppercase rounded-lg transition-all duration-200 ease-out hover:shadow-[0_0_24px_rgba(61,214,140,0.45)] hover:-translate-y-0.5 active:translate-y-0"
                onClick={handleCompletar}
              >
                Completar nivel
              </button>
            ) : (
              <p className="text-[11px] text-text-muted/60 text-center">
                Practica todas las frases para completar el nivel
              </p>
            )}
          </div>

          <PromedioSolitario />

          <div className="nav-controls ani d4 w-full">
            <div className="flex items-center justify-between gap-3 p-1">
              <button
                onClick={irAnterior}
                disabled={indiceActual === 0}
                aria-label="Frase anterior"
                className="nav-btn group relative flex items-center justify-center w-12 h-12 rounded-2xl border border-white/8 bg-white/4 transition-all duration-300 hover:bg-white/8 hover:border-brand-green/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-text-secondary group-hover:text-brand-green transition-colors" />
              </button>

              <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`font-display ${fuente} text-brand-green`}>
                    {indiceActual + 1}
                  </span>
                  <span className={`font-ui text-text-muted ${fuente}`}>/</span>
                  <span className={`font-ui text-text-muted ${fuente}`}>{TotalFrases}</span>
                </div>
                <div className="progress-bar w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="progress-fill h-full bg-linear-to-r from-brand-green/60 to-brand-green rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${TotalFrases > 0 ? (estadisticasLen / TotalFrases) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <button
                onClick={irSiguiente}
                aria-label="Siguiente frase"
                className="nav-btn group relative flex items-center justify-center w-12 h-12 rounded-2xl border border-white/8 bg-white/4 transition-all duration-300 hover:bg-white/8 hover:border-brand-green/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-brand-green transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
