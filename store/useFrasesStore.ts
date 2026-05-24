import { create } from 'zustand';
export interface Frase {
  id: number;
  fraseIngles: string;
  fraseEspanol: string;
  dificultad: number;
  tematica: string;
}

interface FrasesStore {
  frases: Frase[];
  indiceActual: number;
  offset: number;
  totalFrases: number;
  estaCargando: boolean;
  tieneMasFrases: boolean;
  tematica: string;
  dificultad: number | '';
  edad: number | '';
  creador: string;
  cargarFrasesInicial: () => Promise<void>;
  siguiente: () => Promise<void>;
  anterior: () => void;
  reiniciar: () => void;
  setTematica: (tematica: string) => void;
  setDificultad: (dificultad: number | '') => void;
  setEdad: (edad: number | '') => void;
  setCreador: (creador: string) => void;
}

export const useFrasesStore = create<FrasesStore>((set, get) => ({
  frases: [],
  indiceActual: 0,
  offset: 0,
  totalFrases: 0,
  estaCargando: false,
  tieneMasFrases: true,
  tematica: '',
  dificultad: '',
  edad: '',
  creador: '',
  cargarFrasesInicial: async () => {
    set({ estaCargando: true });
    const { tematica, dificultad, edad, creador } = get();

    const { obtenerFrases, contarFrases } = await import('../actions/frases');

    const [frases, total] = await Promise.all([
      obtenerFrases(0, 50, dificultad, tematica, edad, creador),
      contarFrases(dificultad, tematica, edad, creador),
    ]);

    set({
      frases,
      indiceActual: 0,
      offset: 50,
      totalFrases: total,
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

    // Si no hay más frases en el array actual, cargar el siguiente batch
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
