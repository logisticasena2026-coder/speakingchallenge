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
  Calendar,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/configuracion-usuario/SectionCard';
import { FontSizeSelector } from '@/components/configuracion-usuario/FontSizeSelector';
import { ThemeSelector } from '@/components/configuracion-usuario/ThemeSelector';
import { sileo } from 'sileo';
import { CerrarSesion } from '@/actions/auth/CerrarSesion';
import { actualizarPerfil } from '@/actions/configuracion/actualizarPerfil';
import { EnDesarrollo } from '@/components/EnDesarrollo';

export function ConfiguracionUsuarioClient({
  currentAvatar,
  userName,
  userEmail,
  userFechaNacimiento,
  userSexo,
}: {
  currentAvatar?: string | null;
  userName?: string | null;
  userEmail?: string | null;
  userFechaNacimiento?: string;
  userSexo?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
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
              Administra tu perfil y preferencias
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          <div className="space-y-5">
            <EnDesarrollo>
              <SectionCard icon={User} title="Perfil" subtitle="Tu información personal">
                <div className="space-y-4">
                  <label className="space-y-1.5">
                    <span className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      Nombre
                    </span>
                    <Input
                      defaultValue={userName ?? 'Usuario'}
                      className="bg-surface-3/50 border-border-subtle text-text-primary placeholder:text-text-muted-alt focus:border-brand-green/40 transition-colors h-10"
                    />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                      <Mail className="w-3 h-3" />
                      Correo electrónico
                    </span>
                    <Input
                      type="email"
                      defaultValue={userEmail ?? 'usuario@ejemplo.com'}
                      className="bg-surface-3/50 border-border-subtle text-text-primary placeholder:text-text-muted-alt focus:border-brand-green/40 transition-colors h-10"
                    />
                  </label>
                  <div className="flex justify-end pt-1">
                    <Button className="h-9 bg-brand-green text-surface-0 hover:bg-brand-green/90 hover:shadow-[0_0_20px_rgba(61,214,140,0.3)] transition-all duration-200 cursor-pointer text-xs font-semibold gap-1.5">
                      <Save className="w-3.5 h-3.5" />
                      Guardar cambios
                    </Button>
                  </div>
                </div>
              </SectionCard>
            </EnDesarrollo>
            <EnDesarrollo>
              <SectionCard
                icon={Lock}
                title="Seguridad"
                subtitle="Cambia tu contraseña"
                accent="amber"
              >
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contrasena-actual" className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      Contraseña actual
                    </label>
                    <div className="relative">
                      <Input
                        id="contrasena-actual"
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
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="nueva-contrasena" className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      Nueva contraseña
                    </label>
                    <div className="relative">
                      <Input
                        id="nueva-contrasena"
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
            </EnDesarrollo>

            <SectionCard
              icon={User}
              title="Información personal"
              subtitle="Fecha de nacimiento y sexo"
              accent="green"
            >
              <div className="space-y-4">
                <label className="space-y-1.5">
                  <span className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    Fecha de nacimiento
                  </span>
                  <input
                    type="date"
                    defaultValue={userFechaNacimiento}
                    id="fecha-nacimiento-input"
                    className="w-full h-10 px-3 rounded-lg bg-surface-3/50 border border-border-subtle text-text-primary text-sm outline-none transition-all duration-200 focus:border-brand-cyan/40"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    Sexo
                  </span>
                  <select
                    defaultValue={userSexo}
                    id="sexo-input"
                    className="w-full h-10 px-3 rounded-lg bg-surface-3/50 border border-border-subtle text-text-primary text-sm outline-none transition-all duration-200 focus:border-brand-cyan/40 appearance-none"
                  >
                    <option value="">No especificado</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </label>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={async () => {
                      const fecha = (document.getElementById('fecha-nacimiento-input') as HTMLInputElement)?.value;
                      const sexo = (document.getElementById('sexo-input') as HTMLSelectElement)?.value;
                      await sileo.promise(() => actualizarPerfil({ fecha_nacimiento: fecha, sexo }), {
                        loading: { title: 'Guardando' },
                        success: () => ({ title: 'Información actualizada' }),
                        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error al guardar' }),
                      });
                    }}
                    className="h-9 bg-brand-cyan text-surface-0 hover:bg-brand-cyan/90 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-200 cursor-pointer text-xs font-semibold gap-1.5 inline-flex items-center px-4 rounded-lg"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Guardar
                  </button>
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
                <label className="space-y-3">
                  <span className="text-ui-badge font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label flex items-center gap-1.5">
                    <Sun className="w-3 h-3" />
                    Tema de la interfaz
                  </span>
                  <ThemeSelector />
                </label>
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
            <AvatarStudio currentAvatar={currentAvatar} />
          </div>
        </div>
      </div>
    </div>
  );
}
