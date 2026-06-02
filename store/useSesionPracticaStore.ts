'use client';

import { create } from 'zustand';
import type { GrupoConfig } from './useFrasesStore';

const STORAGE_KEY = 'speakingchallenge_squad_history';

export interface TurnoInfo {
  fraseIndex: number;
  grupoIndex: number;
  nombreGrupo: string;
  integranteIndex: number;
  nombreIntegrante: string;
}

export interface PuntajeIntegrante {
  nombre: string;
  puntajes: number[];
  total: number;
}

export interface GrupoStats {
  nombre: string;
  precisionMedia: number;
  totalFrases: number;
  integrantes: PuntajeIntegrante[];
  fecha: string;
}

interface SesionPracticaStore {
  frasesOrder: number[];
  colaTurnos: TurnoInfo[];
  turnoActual: number;
  sesionActiva: boolean;
  puntajesPorIntegrante: Record<string, number[]>;
  historialGrupos: GrupoStats[];

  iniciarSesion: (gruposConfig: GrupoConfig[], totalFrases: number) => void;
  registrarPuntaje: (precision: number) => void;
  avanzarTurno: () => boolean;
  finalizarSesion: (gruposConfig: GrupoConfig[]) => void;
  cargarHistorial: () => void;
  reiniciarSesion: () => void;
}

function generarColaTurnos(
  grupos: GrupoConfig[],
  sessionLength: number,
  frasesOrder: number[],
): TurnoInfo[] {
  const participantes: { gi: number; ii: number; nombre: string; nombreGrupo: string }[] = [];

  grupos.forEach((g, gi) => {
    g.integrantes.forEach((nombre, ii) => {
      if (nombre.trim()) {
        participantes.push({
          gi,
          ii,
          nombre,
          nombreGrupo: g.nombre || `Escuadrón ${gi + 1}`,
        });
      }
    });
  });

  if (participantes.length === 0) return [];

  return Array.from({ length: sessionLength }, (_, t) => {
    const p = participantes[t % participantes.length];
    return {
      fraseIndex: frasesOrder[t],
      grupoIndex: p.gi,
      nombreGrupo: p.nombreGrupo,
      integranteIndex: p.ii,
      nombreIntegrante: p.nombre,
    };
  });
}

export const useSesionPracticaStore = create<SesionPracticaStore>((set, get) => ({
  frasesOrder: [],
  colaTurnos: [],
  turnoActual: 0,
  sesionActiva: false,
  puntajesPorIntegrante: {},
  historialGrupos: [],

  iniciarSesion: (gruposConfig, totalFrases) => {
    const sessionLength = totalFrases;
    const frasesOrder = Array.from({ length: sessionLength }, (_, i) => i);
    const colaTurnos = generarColaTurnos(gruposConfig, sessionLength, frasesOrder);

    const puntajes: Record<string, number[]> = {};
    gruposConfig.forEach((g, gi) => {
      g.integrantes.forEach((_, ii) => {
        puntajes[`g${gi}-i${ii}`] = [];
      });
    });

    set({
      frasesOrder,
      colaTurnos,
      turnoActual: 0,
      sesionActiva: true,
      puntajesPorIntegrante: puntajes,
      historialGrupos: [],
    });
  },

  registrarPuntaje: (precision) => {
    const { colaTurnos, turnoActual, puntajesPorIntegrante } = get();
    const turno = colaTurnos[turnoActual];
    if (!turno) return;

    const key = `g${turno.grupoIndex}-i${turno.integranteIndex}`;
    const prev = puntajesPorIntegrante[key] || [];
    set({
      puntajesPorIntegrante: {
        ...puntajesPorIntegrante,
        [key]: [...prev, precision],
      },
    });
  },

  avanzarTurno: () => {
    const { turnoActual, colaTurnos } = get();
    const next = turnoActual + 1;
    if (next >= colaTurnos.length) {
      set({ sesionActiva: false });
      return false;
    }
    set({ turnoActual: next });
    return true;
  },

  finalizarSesion: (gruposConfig) => {
    const { puntajesPorIntegrante, historialGrupos } = get();

    const gruposStats: GrupoStats[] = gruposConfig.map((g, gi) => {
      const integrantes: PuntajeIntegrante[] = [];
      for (const nombre of g.integrantes) {
        if (!nombre.trim()) continue;
        const ii = integrantes.length;
        const key = `g${gi}-i${ii}`;
        const puntajes = puntajesPorIntegrante[key] || [];
        integrantes.push({
          nombre,
          puntajes,
          total: puntajes.reduce((a, b) => a + b, 0),
        });
      }

      const todosPuntajes = integrantes.flatMap((i) => i.puntajes);
      const precisionMedia =
        todosPuntajes.length > 0
          ? todosPuntajes.reduce((a, b) => a + b, 0) / todosPuntajes.length
          : 0;

      return {
        nombre: g.nombre || `Escuadrón ${gi + 1}`,
        precisionMedia,
        totalFrases: todosPuntajes.length,
        integrantes,
        fecha: new Date().toISOString(),
      };
    });

    set({ historialGrupos: gruposStats, sesionActiva: false });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gruposStats));
  },

  cargarHistorial: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        set({ historialGrupos: JSON.parse(raw) });
      }
    } catch {
      // ignore
    }
  },

  reiniciarSesion: () => {
    set({
      frasesOrder: [],
      colaTurnos: [],
      turnoActual: 0,
      sesionActiva: false,
      puntajesPorIntegrante: {},
    });
  },
}));
