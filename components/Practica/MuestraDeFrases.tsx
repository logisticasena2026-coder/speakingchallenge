'use client';

import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useCallback, useEffect, useRef, useEffectEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useFrasesStore } from '@/store/useFrasesStore';
import { usePracticaStore } from '@/store/usePracticaStore';
import { useConfiguracionUsuario } from '@/store/useConfiguracionUsuario';
import { useSesionPracticaStore } from '@/store/useSesionPracticaStore';

import { ControlesCelular } from './ControlcesCelular';
import { EstadisticaEstudiantePractica } from './EstadisticasEStudiantePracticando';
import { Frase } from './Frase';
import { TuPronunciacion } from './TuPronunciacion';
import { OpcionesMicrofono } from './OpcionesMicrofono';
import { EstadisticasDeFrases } from './EstadisticasDeFrases';
import { PromedioSolitario } from './PromedioSolitario';
import { PromedioEquipos } from './PromedioEquipos';
import { sileo } from 'sileo';

export function MuestraDeFrases() {
  const router = useRouter();
  const frases = useFrasesStore((state) => state.frases);
  const setEstadistica = usePracticaStore((state) => state.setEstadisticas);
  const precision = usePracticaStore((state) => state.precision);

  const indiceActual = useFrasesStore((state) => state.indiceActual);
  const siguiente = useFrasesStore((state) => state.siguiente);
  const anterior = useFrasesStore((state) => state.anterior);
  const cargarFrasesInicial = useFrasesStore((state) => state.cargarFrasesInicial);
  const TotalFrases = useFrasesStore((store) => store.totalFrases);
  const protocoloGrupo = useFrasesStore((state) => state.protocoloGrupo);
  const gruposConfig = useFrasesStore((state) => state.gruposConfig);
  const estaCargando = useFrasesStore((state) => state.estaCargando);
  const reiniciarFrases = useFrasesStore((state) => state.reiniciar);
  const setTexto = usePracticaStore((state) => state.setTexto);
  const fuente = useConfiguracionUsuario((state) => state.tamanoFuente);

  const esEscuadron = protocoloGrupo === 'escuadron';

  const {
    sesionActiva,
    colaTurnos,
    turnoActual: turnoIdx,
    iniciarSesion,
    registrarPuntaje,
    avanzarTurno,
    finalizarSesion,
    reiniciarSesion,
  } = useSesionPracticaStore();

  const turno = colaTurnos[turnoIdx] ?? null;
  const displayIndex = esEscuadron && turno ? turno.fraseIndex : indiceActual;
  const sessionLength = esEscuadron ? colaTurnos.length : TotalFrases;

  const iniciado = useRef(false);

  useEffect(() => {
    return () => {
      reiniciarSesion();
      reiniciarFrases();
      iniciado.current = false;
    };
  }, [reiniciarSesion, reiniciarFrases]);

  const irSiguiente = useCallback(async () => {
    setTexto('');

    if (esEscuadron) {
      registrarPuntaje(precision);
      const hayMas = avanzarTurno();
      if (!hayMas) {
        finalizarSesion(gruposConfig);
        sileo.success({ title: 'Práctica completada', description: 'Revisa las estadísticas del escuadrón.' });
        router.push('/dashboard/estudiar/estadisticas');
      }
    } else {
      setEstadistica([{ id: indiceActual, precision }]);
      await siguiente();
    }
  }, [precision, setTexto, esEscuadron, registrarPuntaje, avanzarTurno, finalizarSesion, gruposConfig, router, setEstadistica, indiceActual, siguiente]);

  const irAnterior = useCallback(() => {
    if (esEscuadron) return;
    setTexto('');
    anterior();
  }, [setTexto, anterior, esEscuadron]);

  const onIrSiguiente = useEffectEvent(irSiguiente);
  const onIrAnterior = useEffectEvent(irAnterior);

  useEffect(() => {
    if (!iniciado.current) {
      iniciado.current = true;
      cargarFrasesInicial();
    }
  }, [cargarFrasesInicial]);

  useEffect(() => {
    if (esEscuadron && frases.length > 0 && colaTurnos.length === 0 && !estaCargando) {
      iniciarSesion(gruposConfig, TotalFrases);
    }
  }, [esEscuadron, frases.length, colaTurnos.length, iniciarSesion, gruposConfig, TotalFrases, estaCargando]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key.toLowerCase() === 'd') {
        e.preventDefault();
        onIrSiguiente();
      }

      if (e.key.toLowerCase() === 'a' && !esEscuadron) {
        e.preventDefault();
        onIrAnterior();
      }
    };

    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [esEscuadron]);

  return (
    <>
      <EstadisticaEstudiantePractica
        frase={displayIndex}
        TotalFrases={sessionLength}
        fuente={fuente}
      />

      {esEscuadron && turno && (
        <div className="ani d1 mb-3 mx-auto w-full max-w-250">
          <div className="flex items-center justify-center gap-3 rounded-xl border border-brand-amber/20 bg-brand-amber/6 px-4 py-2.5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-brand-amber">
              <Users className="size-4" />
              <span className="font-ui text-[11px] font-bold tracking-[0.14em] uppercase">
                Turno de
              </span>
            </div>
            <span className="font-display text-sm font-bold text-text-primary">
              {turno.nombreIntegrante}
            </span>
            <span className="font-ui text-[10px] text-text-muted tracking-wider">
              · {turno.nombreGrupo}
            </span>
          </div>
        </div>
      )}

      {esEscuadron && !sesionActiva && colaTurnos.length > 0 && (
        <div className="ani d1 mb-3 mx-auto w-full max-w-250">
          <div className="flex items-center justify-center gap-3 rounded-xl border-brand-green/20 bg-brand-green/6 px-4 py-3 backdrop-blur-sm">
            <span className="font-display text-sm font-bold text-brand-green">
              ¡Práctica de escuadrón completada!
            </span>
          </div>
        </div>
      )}

      <PromedioEquipos />

      <div className="practice-grid ani d2 flex-1 min-h-0">
        <div className="flex flex-col gap-4 h-full justify-center">
          <Frase frases={frases} indice={displayIndex} fuente={fuente} />

          <TuPronunciacion />

          <OpcionesMicrofono frase={frases} indiceActual={displayIndex} />
        </div>

        <div className="side-panel flex flex-col gap-3.5 h-full justify-center">
          <EstadisticasDeFrases indiceForzado={displayIndex} />

          <PromedioSolitario />

          <div className="nav-controls ani d4 w-full">
            <div className="flex items-center justify-between gap-3 p-1">
              <button
                onClick={irAnterior}
                disabled={esEscuadron || indiceActual === 0}
                aria-label="Frase anterior"
                className="nav-btn group relative flex items-center justify-center w-12 h-12 rounded-2xl border border-white/8 bg-white/4 transition-all duration-300 hover:bg-white/8 hover:border-brand-green/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-text-secondary group-hover:text-brand-green transition-colors" />
              </button>

              <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`font-display ${fuente} text-brand-green`}>
                    {displayIndex + 1}
                  </span>
                  <span className={`font-ui text-text-muted ${fuente}`}>/</span>
                  <span className={`font-ui text-text-muted ${fuente}`}>{sessionLength}</span>
                </div>
                <div className="progress-bar w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="progress-fill h-full bg-linear-to-r from-brand-green/60 to-brand-green rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${sessionLength > 0 ? ((turnoIdx + 1) / sessionLength) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <button
                onClick={irSiguiente}
                disabled={esEscuadron && !sesionActiva}
                aria-label="Siguiente frase"
                className="nav-btn group relative flex items-center justify-center w-12 h-12 rounded-2xl border border-white/8 bg-white/4 transition-all duration-300 hover:bg-white/8 hover:border-brand-green/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-brand-green transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ControlesCelular siguiente={irSiguiente} anterior={irAnterior} />
    </>
  );
}
