'use client';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useVerContrasena } from '@/hooks/VerContrasena';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormLoginSchema, FormLoginData } from '@/schemas/auth/login';
import { sileo } from 'sileo';

import Link from 'next/link';
import { iniciar_session } from '@/actions/auth/iniciarSesion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export function IniciarSesionForm() {
  const { prefetch, push } = useRouter();
  const { verContrasena, toggleVerContrasena } = useVerContrasena();
  const [boton, setBoton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginData>({
    resolver: zodResolver(FormLoginSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormLoginData> = (data) => {
    setBoton(true);
    sileo
      .promise(() => iniciar_session({ contrasena: data.password, correo: data.email }), {
        loading: { title: 'Ingresando al viaje' },
        success: (res: { ok: boolean; message: string; avatar?: string | null }) => {
          if (!res.ok) throw new Error(res.message);
          return {
            title: 'Datos Validos',
            description: (
              <div className="flex flex-col items-center justify-center gap-2">
                {res.avatar && (
                  <Avatar
                    size="lg"
                    className="ring-2 ring-brand-green/50 shadow-[0_0_20px_rgba(61,214,140,0.3)]"
                  >
                    <AvatarImage src={res.avatar} alt="Avatar" className="object-cover" />
                    <AvatarFallback className="bg-surface-3 text-brand-green font-bold text-lg">
                      AV
                    </AvatarFallback>
                  </Avatar>
                )}
                <span className="text-xs text-text-secondary">{res.message}</span>
              </div>
            ),
          };
        },
        error: (err: unknown) => {
          setBoton(false);
          const message = err instanceof Error ? err.message : 'Ocurrió un error inesperado';
          return {
            title: 'Error al comprovar datos',
            description: message,
          };
        },
      })
      .then((res: { ok: boolean; message: string; avatar: string | null }) => {
        if (res?.ok) {
          prefetch('/dashboard');
          push('/dashboard');
        }
      });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
            className={`w-full bg-surface-container-lowest border border-border-subtle rounded-lg py-3 pl-10 pr-12 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-text-muted/50 ${
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
            autoComplete="current-password"
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
      <div className="flex justify-end">
        <Link
          className="font-ui-label text-ui-label text-secondary hover:text-secondary-fixed transition-colors"
          href="/auth/iniciar_sesion/recuperar_contrasena"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      <button
        className="w-full relative group/btn overflow-hidden rounded-lg bg-primary text-on-primary font-ui-label py-4 primary-glow transition-all duration-300 active:scale-95"
        disabled={boton}
      >
        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
        <span className="relative flex items-center justify-center gap-2 font-bold tracking-wider uppercase">
          Iniciar sesión
          <svg
            fill="none"
            stroke="currentColor"
            className="size-5"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11z" />
          </svg>
        </span>
      </button>
    </form>
  );
}
