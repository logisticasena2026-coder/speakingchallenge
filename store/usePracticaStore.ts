import { create } from 'zustand';

interface FraseGuardada {
  id: number;
  precision: number;
}
interface PracticaStore {
  estadisticas: FraseGuardada[];
  texto: string;
  tiempo: number;
  tiempoTotal: number;
  grabando: boolean;
  precision: number;
  setPrecision: (precision: number) => void;
  setEstadisticas: (estadisticas: FraseGuardada[]) => void;
  setTexto: (texto: string) => void;
  setTiempo: (tiempo: number) => void;
  resetTiempo: () => void;
  resetAll: () => void;
  setGrabando: (grabando: boolean) => void;
}

export const usePracticaStore = create<PracticaStore>((set, get) => ({
  estadisticas: [],
  texto: '',
  tiempo: 0,
  tiempoTotal: 0,
  grabando: false,
  precision: 0,

  setPrecision: (precision) => set({ precision }),
  setEstadisticas: (estadistica: FraseGuardada[]) => {
    const { estadisticas } = get();
    const nuevaEstadistica = [...estadisticas, ...estadistica];

    const existe = estadisticas.some((e) => e.id === estadistica[0].id);
    if (existe) return;
    set({ estadisticas: nuevaEstadistica });
  },

  setTexto: (texto: string) => set({ texto }),

  setTiempo: (tiempo: number) =>
    set((state) => {
      if (state.tiempo === tiempo) return state;
      return { tiempo };
    }),

  resetTiempo: () => {
    const { tiempo } = get();

    set({ tiempoTotal: tiempo, tiempo: 0 });
  },
  setGrabando: (grabando: boolean) => set({ grabando }),
  resetAll: () =>
    set({
      estadisticas: [],
      texto: '',
      tiempo: 0,
      tiempoTotal: 0,
      grabando: false,
      precision: 0,
    }),
}));
