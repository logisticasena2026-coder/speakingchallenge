'use client';

import { useState } from 'react';
import { AvatarStudio } from '@/components/configuracion-usuario/AvatarStudio';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Type,
  Save,
  Check,
  Shield,
  Sun,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/configuracion-usuario/SectionCard';
import { FontSizeSelector } from '@/components/configuracion-usuario/FontSizeSelector';
import { ThemeSelector } from '@/components/configuracion-usuario/ThemeSelector';
import { sileo } from 'sileo';
import { CerrarSesion } from '@/actions/auth/CerrarSesion';

export default function ConfiguracionUsuario() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const {replace} = useRouter();

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
              Administra tu perfil y preferencias
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          <div className="space-y-5">
            <SectionCard icon={User} title="Perfil" subtitle="Tu información personal">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    Nombre
                  </label>
                  <Input
                    defaultValue="Usuario"
                    className="bg-surface-3/50 border-border-subtle text-text-primary placeholder:text-text-muted-alt focus:border-brand-green/40 transition-colors h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                    <Mail className="w-3 h-3" />
                    Correo electrónico
                  </label>
                  <Input
                    type="email"
                    defaultValue="usuario@ejemplo.com"
                    className="bg-surface-3/50 border-border-subtle text-text-primary placeholder:text-text-muted-alt focus:border-brand-green/40 transition-colors h-10"
                  />
                </div>
                <div className="flex justify-end pt-1">
                  <Button className="h-9 bg-brand-green text-surface-0 hover:bg-brand-green/90 hover:shadow-[0_0_20px_rgba(61,214,140,0.3)] transition-all duration-200 cursor-pointer text-xs font-semibold gap-1.5">
                    <Save className="w-3.5 h-3.5" />
                    Guardar cambios
                  </Button>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              icon={Lock}
              title="Seguridad"
              subtitle="Cambia tu contraseña"
              accent="amber"
            >
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    Contraseña actual
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="bg-surface-3/50 border-border-subtle text-text-primary placeholder:text-text-muted-alt focus:border-brand-amber/40 transition-colors h-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-alt hover:text-text-secondary transition-colors cursor-pointer"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Nueva contraseña"
                      className="bg-surface-3/50 border-border-subtle text-text-primary placeholder:text-text-muted-alt focus:border-brand-amber/40 transition-colors h-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-alt hover:text-text-secondary transition-colors cursor-pointer"
                      aria-label={showNewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <Button className="h-9 bg-brand-amber text-surface-0 hover:bg-brand-amber/90 hover:shadow-[0_0_20px_rgba(245,166,35,0.3)] transition-all duration-200 cursor-pointer text-xs font-semibold gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    Actualizar contraseña
                  </Button>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              icon={Type}
              title="Apariencia"
              subtitle="Personaliza la visual de la plataforma"
              accent="purple"
            >
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                    <Sun className="w-3 h-3" />
                    Tema de la interfaz
                  </label>
                  <ThemeSelector />
                </div>
                <div className="border-t border-border-subtle pt-5">
                  <FontSizeSelector />
                </div>
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
            <AvatarStudio />
          </div>
        </div>
      </div>
    </div>
  );
}
