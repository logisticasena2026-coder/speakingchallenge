import { create } from 'zustand';
export interface Frase {
  id: number;
  fraseIngles: string;
  fraseEspanol: string;
  dificultad: number;
  tematica: string;
}

export interface GrupoConfig {
  miembros: number;
  nombre: string;
  integrantes: string[];
}

interface FrasesStore {
  frases: Frase[];
  indiceActual: number;
  offset: number;
  modoDeEstudio: 'Estudio' | 'Practica';
  totalFrases: number;
  estaCargando: boolean;
  tieneMasFrases: boolean;
  tematica: string;
  dificultad: number | '';
  edad: number | '';
  creador: string;
  nivel_id: string;
  protocoloGrupo: 'solitario' | 'escuadron';
  setProtocoloGrupo: (protocolo: 'solitario' | 'escuadron') => void;
  cantidadGrupos: number;
  gruposConfig: GrupoConfig[];
  setGrupoConfig: (index: number, data: Partial<GrupoConfig>) => void;
  agregarGrupo: () => void;
  quitarGrupo: () => void;
  cargarFrasesInicial: (nivel_id?: string) => Promise<void>;
  siguiente: () => Promise<void>;
  anterior: () => void;
  reiniciar: () => void;
  setTematica: (tematica: string) => void;
  setDificultad: (dificultad: number | '') => void;
  setEdad: (edad: number | '') => void;
  setCreador: (creador: string) => void;
  setModoDeEstudio: (modo: 'Estudio' | 'Practica') => void;
  setAllGruposConfig: (grupos: GrupoConfig[]) => void;
}

const crearGruposConfig = (n: number): GrupoConfig[] =>
  Array.from({ length: n }, () => ({ miembros: 2, nombre: '', integrantes: ['', ''] }));

export const useFrasesStore = create<FrasesStore>((set, get) => ({
  frases: [],
  indiceActual: 0,
  protocoloGrupo: "solitario",
  offset: 0,
  totalFrases: 0,
  estaCargando: false,
  tieneMasFrases: true,
  tematica: '',
  dificultad: '',
  edad: '',
  creador: '',
  nivel_id: '',
  modoDeEstudio: 'Estudio',
  cantidadGrupos: 2,
  gruposConfig: crearGruposConfig(2),

  setProtocoloGrupo: (protocolo) => set({ protocoloGrupo: protocolo }),

  setGrupoConfig: (index, data) =>
    set((state) => {
      const gruposConfig = [...state.gruposConfig];
      gruposConfig[index] = { ...gruposConfig[index], ...data };
      return { gruposConfig };
    }),

  agregarGrupo: () =>
    set((state) => {
      if (state.cantidadGrupos >= 6) return state;
      const newGroup: GrupoConfig = { miembros: 2, nombre: '', integrantes: ['', ''] };
      return {
        cantidadGrupos: state.cantidadGrupos + 1,
        gruposConfig: [...state.gruposConfig, newGroup],
      };
    }),
  quitarGrupo: () =>
    set((state) => {
      if (state.cantidadGrupos <= 2) return state;
      return {
        cantidadGrupos: state.cantidadGrupos - 1,
        gruposConfig: state.gruposConfig.slice(0, -1),
      };
    }),

  setModoDeEstudio: (modo) => set({ modoDeEstudio: modo }),
  setAllGruposConfig: (grupos) => set({ gruposConfig: grupos }),

  cargarFrasesInicial: async (nivel_id?: string) => {
    set({ estaCargando: true });
    const { tematica, dificultad, edad, creador } = get();
    const nid = nivel_id || get().nivel_id || undefined;

    const { obtenerFrases, contarFrases } = await import('../actions/frases');
    const [frases, total] = await Promise.all([
      obtenerFrases(0, 50, dificultad, tematica, edad, creador, nid),
      contarFrases(dificultad, tematica, edad, creador, nid),
    ]);
    set({
      frases,
      indiceActual: 0,
      offset: 50,
      totalFrases: total,
      nivel_id: nid ?? '',
      tieneMasFrases: frases.length === 50,
      estaCargando: false,
    });
  },

  siguiente: async () => {
    const {
      indiceActual,
      frases,
      offset,
      tieneMasFrases,
      totalFrases,
      estaCargando,
      tematica,
      dificultad,
      edad,
      creador,
    } = get();

    if (estaCargando) return;

    if (indiceActual < frases.length - 1) {
      set({ indiceActual: indiceActual + 1 });
      return;
    }

    if (indiceActual >= frases.length - 1 && tieneMasFrases && offset < totalFrases) {
      set({ estaCargando: true });

      const { obtenerFrases } = await import('../actions/frases');
      const nuevasFrases = await obtenerFrases(offset, 50, dificultad, tematica, edad, creador);
      set({
        frases: [...frases, ...nuevasFrases],
        indiceActual: indiceActual + 1,
        offset: offset + 50,
        tieneMasFrases: nuevasFrases.length === 50,
        estaCargando: false,
      });
    }
  },

  anterior: () => {
    const { indiceActual } = get();
    if (indiceActual > 0) {
      set({ indiceActual: indiceActual - 1 });
    }
  },

  setTematica: (tematica) => set({ tematica }),
  setDificultad: (dificultad) => set({ dificultad }),
  setEdad: (edad) => set({ edad }),
  setCreador: (creador) => set({ creador }),

  reiniciar: () =>
    set({
      frases: [],
      indiceActual: 0,
      offset: 0,
      totalFrases: 0,
      tieneMasFrases: true,
    }),
}));
