'use client';

import { AvatarStudio } from '@/components/configuracion-usuario/AvatarStudio';
import { LogOut, Type, Shield, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SectionCard } from '@/components/configuracion-usuario/SectionCard';
import { ThemeSelector } from '@/components/configuracion-usuario/ThemeSelector';
import { sileo } from 'sileo';
import { CerrarSesion } from '@/actions/auth/CerrarSesion';

export function ConfiguracionAdminProfesorClient({
  currentAvatar,
}: {
  currentAvatar?: string | null;
}) {
  const { replace } = useRouter();

  return (
    <div className="min-h-full relative">
      <div aria-hidden="true" className="fixed inset-0 mesh-gradient pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand-green/15 flex items-center justify-center">
            <Shield className="w-5 h-5 text-brand-green" />
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl text-text-primary tracking-tight">
              Configuración
            </h1>
            <p className="text-sm text-text-muted font-ui-label mt-0.5">
              Administra tus preferencias
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          <div className="space-y-5">
            <SectionCard
              icon={Type}
              title="Apariencia"
              subtitle="Personaliza la visual de la plataforma"
              accent="purple"
            >
              <div className="space-y-6">
                <label className="space-y-3">
                  <span className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                    <Sun className="w-3 h-3" />
                    Tema de la interfaz
                  </span>
                  <ThemeSelector />
                </label>
              </div>
            </SectionCard>

            <button
              type="button"
              onClick={() => {
                sileo.promise(() => CerrarSesion(), {
                  loading: { title: 'Cerrando sesion' },
                  success: (res: { ok: boolean; message: string }) => {
                    if (!res.ok) throw new Error(res.message);
                    replace('/');
                    return {
                      title: res.message,
                      description: 'Hasta la proxima',
                    };
                  },
                  error: (err: unknown) => {
                    const message =
                      err instanceof Error ? err.message : 'Ocurrió un error inesperado';
                    return {
                      title: 'Error al cerrar sesión',
                      description: message,
                    };
                  },
                });
              }}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/30 text-red-400 hover:text-red-300 font-semibold text-sm transition-all duration-200 cursor-pointer group"
            >
              <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Cerrar sesión
            </button>
          </div>

          <div className="lg:sticky lg:top-28">
            <AvatarStudio currentAvatar={currentAvatar} />
          </div>
        </div>
      </div>
    </div>
  );
}
