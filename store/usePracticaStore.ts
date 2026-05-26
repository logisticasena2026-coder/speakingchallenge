import { create } from 'zustand';

interface PracticaStore {
  texto: string;
  tiempo: number;
  grabando: boolean;
  setTexto: (texto: string) => void;
  setTiempo: (tiempo: number) => void;
  resetTiempo: () => void;
  setGrabando: (grabando: boolean) => void;
}

export const usePracticaStore = create<PracticaStore>((set) => ({
  texto: '',
  tiempo: 0,
  grabando: false,

  setTexto: (texto) => set({ texto }),

  setTiempo: (tiempo) =>
    set((state) => {
      if (state.tiempo === tiempo) return state;
      return { tiempo };
    }),

  resetTiempo: () => set({ tiempo: 0 }),

  setGrabando: (grabando) => set({ grabando }),
}));
