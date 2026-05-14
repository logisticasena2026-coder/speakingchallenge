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
  texto: string;
  tiempo: number;
  setTiempo: (tiempo: number) => void;
  setTexto: (texto: string) => void;
  grabando: boolean;
  setGrabando: (grabando: boolean) => void;
  cargarFrasesInicial: () => Promise<void>;
  siguiente: () => Promise<void>;
  anterior: () => void;
  reiniciar: () => void;
}

export const useFrasesStore = create<FrasesStore>((set, get) => ({
  frases: [],
  indiceActual: 0,
  offset: 0,
  totalFrases: 0,
  estaCargando: false,
  tieneMasFrases: true,
  texto: '',
  grabando: false,
  tiempo: 0,

  setTiempo: (tiempo: number) =>
    set((state) => {
      if (state.tiempo === tiempo) return state;
      return { tiempo };
    }),

  setTexto: (texto) => {
    set({ texto });
  },

  setGrabando: (grabando) => {
    set({ grabando });
  },
  cargarFrasesInicial: async () => {
    set({ estaCargando: true });

    const { obtenerFrases, contarFrases } = await import('../actions/frases');

    const [frases, total] = await Promise.all([obtenerFrases(0, 50), contarFrases()]);

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
    const { indiceActual, frases, offset, tieneMasFrases, totalFrases, estaCargando } = get();

    // Si ya está cargando, no hacer nada
    if (estaCargando) return;

    // Si hay más frases en el array actual, simplemente avanzar
    if (indiceActual < frases.length - 1) {
      set({ indiceActual: indiceActual + 1 });
      return;
    }

    // Si no hay más frases en el array actual, cargar el siguiente batch
    if (indiceActual >= frases.length - 1 && tieneMasFrases && offset < totalFrases) {
      set({ estaCargando: true });

      const { obtenerFrases } = await import('../actions/frases');
      const nuevasFrases = await obtenerFrases(offset, 50);

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

  reiniciar: () =>
    set({
      frases: [],
      indiceActual: 0,
      offset: 0,
      totalFrases: 0,
      tieneMasFrases: true,
    }),
}));
