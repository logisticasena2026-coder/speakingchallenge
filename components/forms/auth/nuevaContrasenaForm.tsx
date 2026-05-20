'use client';

import { Lock, Eye, EyeOff } from 'lucide-react';
import { useVerContrasena } from '@/hooks/VerContrasena';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormNuevaContrasenaSchema, FormNuevaContrasenaData } from '@/schemas/auth/nuevaContrasena';
import { sileo } from 'sileo';
import { cambiarContrasena } from '@/actions/auth/nuevaContrasena';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function NuevaContrasenaForm({ token }: Readonly<{ token: string }>) {
  const { prefetch, push } = useRouter();
  const { verContrasena, toggleVerContrasena } = useVerContrasena();
  const [boton, setBoton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNuevaContrasenaData>({
    resolver: zodResolver(FormNuevaContrasenaSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormNuevaContrasenaData> = (data) => {
    setBoton(true);
    sileo
      .promise(() => cambiarContrasena(token, data.password), {
        loading: {
          title: 'Cambiando contraseña...',
          description: 'Por favor espera mientras se cambia tu contraseña.',
        },
        success: (res: { ok: boolean; message: string }) => {
          if (!res.ok) throw new Error(res.message);

          return {
            title: 'Contraseña cambiada',
            description: res.message,
          };
        },
        error: (err: unknown) => {
          setBoton(false);

          const message = err instanceof Error ? err.message : 'Ocurrió un error inesperado';

          return {
            title: 'Error al cambiar contraseña',
            description: message,
          };
        },
      })
      .then((res: { ok: boolean; message: string }) => {
        if (res.ok) {
          prefetch(
            '/auth/iniciar_sesion/recuperar_contrasena/nueva_contrasena/contrasena_cambiada',
          );
          push(
            '/auth/iniciar_sesion/recuperar_contrasena/nueva_contrasena/contrasena_cambiada',
          );
        }
      });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="font-ui-label text-ui-label text-on-surface-variant block ml-1"
        >
          Nueva contraseña
        </label>
        <div className="relative flex items-center">
          <Lock className="absolute left-3 text-text-muted size-5" aria-hidden="true" />
          <input
            className={`w-full bg-surface-container-lowest border border-border-subtle rounded-lg py-3 pl-10 pr-12 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-text-muted/50 ${
              errors.password ? 'ring-2 ring-error animate-shake' : ''
            }`}
            id="password"
            placeholder="••••••••"
            type={verContrasena ? 'text' : 'password'}
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password')}
          />
          <button
            className="absolute right-3 text-text-muted hover:text-primary transition-colors"
            type="button"
            onClick={toggleVerContrasena}
            aria-label={verContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={verContrasena}
            disabled={boton}
          >
            {verContrasena ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
        {errors.password && (
          <p
            id="password-error"
            className="text-xs text-error font-medium animate-slide-in-bottom"
            role="alert"
            aria-live="polite"
          >
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="font-ui-label text-ui-label text-on-surface-variant block ml-1"
        >
          Confirmar contraseña
        </label>
        <div className="relative flex items-center">
          <Lock className="absolute left-3 text-text-muted size-5" aria-hidden="true" />
          <input
            className={`w-full bg-surface-container-lowest border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-text-muted/50 ${
              errors.confirmPassword ? 'ring-2 ring-error animate-shake' : ''
            }`}
            id="confirmPassword"
            placeholder="••••••••"
            type={verContrasena ? 'text' : 'password'}
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            {...register('confirmPassword')}
          />
        </div>
        {errors.confirmPassword && (
          <p
            id="confirmPassword-error"
            className="text-xs text-error font-medium animate-slide-in-bottom"
            role="alert"
            aria-live="polite"
          >
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <button
        className="w-full relative group/btn overflow-hidden rounded-lg bg-primary text-on-primary font-ui-label py-4 primary-glow transition-all duration-300 active:scale-95"
        disabled={boton}
      >
        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
        <span className="relative flex items-center justify-center gap-2 font-bold tracking-wider uppercase">
          Actualizar contraseña
          <svg
            fill="none"
            stroke="currentColor"
            className="size-5"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </span>
      </button>
    </form>
  );
}
