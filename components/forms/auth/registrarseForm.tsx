'use client';

import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useVerContrasena } from '@/hooks/VerContrasena';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRegisterSchema, FormRegisterData } from '@/schemas/auth/register';
import { sileo } from 'sileo';
import { registro } from '@/actions/auth/registro';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
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
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <HoverCard openDelay={100} closeDelay={50}>
          <HoverCardTrigger asChild>
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
          </HoverCardTrigger>
          <HoverCardContent side='top'>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-brand-green to-transparent"></div>
              <div className="p-3 pt-3.5 space-y-1.5">
                <span className="block font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-brand-green">Usuario</span>
                <p className="font-body text-xs leading-relaxed text-text-secondary/90">
                  Tu identidad a través de las eras. Elige un nombre único que te represente.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
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
      <div>
        <HoverCard openDelay={100} closeDelay={50}>
          <HoverCardTrigger asChild>
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
          </HoverCardTrigger>
          <HoverCardContent side='top'>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-brand-green to-transparent"></div>
              <div className="p-3 pt-3.5 space-y-1.5">
                <span className="block font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-brand-green">Correo</span>
                <p className="font-body text-xs leading-relaxed text-text-secondary/90">
                  Recibirás coordenadas y enlaces de recuperación. Nunca compartiremos tu correo.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
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
      <div>
        <HoverCard openDelay={100} closeDelay={50}>
          <HoverCardTrigger asChild>
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
          </HoverCardTrigger>
          <HoverCardContent side='top'>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-brand-green to-transparent"></div>
              <div className="p-3 pt-3.5 space-y-1.5">
                <span className="block font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-brand-green">Contraseña</span>
                <p className="font-body text-xs leading-relaxed text-text-secondary/90">
                  Mínimo 8 caracteres, una mayúscula y un número. La llave de tu viaje en el tiempo.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
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
      <div>
        <HoverCard openDelay={100} closeDelay={50}>
          <HoverCardTrigger asChild>
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
          </HoverCardTrigger>
          <HoverCardContent side='top'>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-brand-green to-transparent"></div>
              <div className="p-3 pt-3.5 space-y-1.5">
                <span className="block font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-brand-green">Confirmar</span>
                <p className="font-body text-xs leading-relaxed text-text-secondary/90">
                  Repite tu contraseña para confirmar que ambos campos coinciden.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
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
