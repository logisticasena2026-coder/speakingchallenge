'use client';

import { LogOut } from 'lucide-react';
import { sileo } from 'sileo';
import { useRouter } from 'next/navigation';
import { CerrarSesion } from '@/actions/auth/CerrarSesion';

export function BotonCerrarSesion() {
  const { replace } = useRouter();

  const handleLogout = () => {
    sileo.promise(() => CerrarSesion(), {
      loading: { title: 'Cerrando sesión' },
      success: (res: { ok: boolean; message: string }) => {
        if (!res.ok) throw new Error(res.message);
        replace('/');
        return { title: res.message, description: 'Hasta la próxima' };
      },
      error: (err: unknown) => ({
        title: 'Error al cerrar sesión',
        description: err instanceof Error ? err.message : 'Error',
      }),
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-4 py-3 px-3 rounded-lg text-text-secondary hover:bg-surface-4 hover:text-red-400 transition-all duration-250 w-full text-left"
    >
      <LogOut className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="font-ui-label text-sm">Cerrar sesión</span>
    </button>
  );
}
