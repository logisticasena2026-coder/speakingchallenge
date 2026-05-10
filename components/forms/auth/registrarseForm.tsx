'use client';

import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useVerContrasena } from '@/hook/VerContrasena';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRegisterSchema, FormRegisterData } from '@/schemas/auth/register';
import { sileo } from 'sileo';
import { registro } from '@/actions/auth/registro';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export function RegistrarseForm() {
  const { prefetch, push } = useRouter();
  const { verContrasena, toggleVerContrasena } = useVerContrasena();
  const [boton, setBoton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterData>({
    resolver: zodResolver(FormRegisterSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormRegisterData> = (data) => {
    setBoton(true);
    sileo
      .promise(
        () =>
          registro({
            contrasena: data.password,
            correo: data.email,
            nombre_usuario: data.username,
          }),
        {
          loading: { title: 'Iniciando tu viaje' },
          success: (res: { ok: boolean; message: string }) => {
            if (!res.ok) throw new Error(res.message);
            return {
              title: 'Usuario creado',
              description: res.message,
            };
          },
          error: (err: unknown) => {
            setBoton(false);

            const message = err instanceof Error ? err.message : 'Ocurrió un error inesperado';
            return {
              title: 'Error al crear usuario',
              description: message,
            };
          },
        },
      )
      .then(async (res: { ok: boolean; message: string }) => {
        if (res?.ok) {
          prefetch(`/auth/iniciar_sesion`);
          push(`/auth/iniciar_sesion`);
        }
      });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="font-ui-label text-ui-label text-on-surface-variant block ml-1"
        >
          Nombre de usuario
        </label>
        <div className="relative flex items-center">
          <User className="absolute left-3 text-text-muted size-5" aria-hidden="true" />
          <input
            className={`w-full bg-surface-container-lowest border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-text-muted/50 ${
              errors.username ? 'ring-2 ring-error animate-shake' : ''
            }`}
            id="username"
            placeholder="viajero_del_tiempo"
            type="text"
            autoComplete="username"
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? 'username-error' : undefined}
            {...register('username')}
          />
        </div>
        {errors.username && (
          <p
            id="username-error"
            className="text-xs text-error font-medium animate-slide-in-bottom"
            role="alert"
            aria-live="polite"
          >
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="font-ui-label text-ui-label text-on-surface-variant block ml-1"
        >
          Email
        </label>
        <div className="relative flex items-center">
          <Mail className="absolute left-3 text-text-muted size-5" aria-hidden="true" />
          <input
            className={`w-full bg-surface-container-lowest border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-text-muted/50 ${
              errors.email ? 'ring-2 ring-error animate-shake' : ''
            }`}
            id="email"
            placeholder="viajero@tiempos.com"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p
            id="email-error"
            className="text-xs text-error font-medium animate-slide-in-bottom"
            role="alert"
            aria-live="polite"
          >
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="font-ui-label text-ui-label text-on-surface-variant block ml-1"
        >
          Contraseña
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
          Crear cuenta
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0M3 20a6 6 0 0 1 12 0v1H3z"
            />
          </svg>
        </span>
      </button>
    </form>
  );
}
