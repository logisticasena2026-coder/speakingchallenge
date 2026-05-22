import { create } from 'zustand';

interface ConfiguracionUser {
  tamanoFuente: string;
  setTamanoFuent: (fuente: string) => void;
}

export const useConfiguracionUsuario = create<ConfiguracionUser>((set) => ({
  tamanoFuente: 'sm',
  setTamanoFuent: (fuente) => set({ tamanoFuente: fuente }),
}));
