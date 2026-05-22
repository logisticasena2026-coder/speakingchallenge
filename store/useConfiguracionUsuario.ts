import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfiguracionUser {
  tamanoFuente: string;
  setTamanoFuente: (fuente: string) => void;
}

export const useConfiguracionUsuario = create<ConfiguracionUser>()(
  persist(
    (set) => ({
      tamanoFuente: 'text-[12px]',
      setTamanoFuente: (fuente) => set({ tamanoFuente: fuente }),
    }),
    {
      name: 'configuracion-usuario',
      partialize: (state) => {
        return {
          tamanoFuente: state.tamanoFuente,
        };
      },
    },
  ),
);
