'use client';

import { Mail } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRecuperarSchema, FormRecuperarData } from '@/schemas/auth/recuperarContrasena';
import { sileo } from 'sileo';
import { recuperarCuenta } from '@/actions/auth/email/recuperacion/recuperarCuenta';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export function RecuperarContrasenaForm() {
  const { prefetch, push } = useRouter();
  const [boton, setBoton] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRecuperarData>({
    resolver: zodResolver(FormRecuperarSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormRecuperarData> = async (data) => {
    setBoton(true);
    try {
      const res = await sileo.promise(() => recuperarCuenta(data.email), {
        loading: {
          title: 'Enviando correo...',
          description: 'Estamos preparando tu correo de recuperación.',
        },
        success: (res: { ok: boolean; message: string }) => {
          if (!res.ok) throw new Error(res.message);
          return {
            title: 'Correo enviado',
            description: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
            button: {
              title: 'Abrir Gmail',
              onClick: () => {
                window.open('https://mail.google.com', '_blank', 'noopener, noreferrer');
              },
            },
          };
        },
        error: (err: unknown) => {
          const message = err instanceof Error ? err.message : 'Ocurrió un error inesperado';
          return { title: 'Error', description: message };
        },
      });
      if (res?.ok) {
        prefetch(
          '/auth/iniciar_sesion/recuperar_contrasena/confirmar_correo_contrasena?correo=' +
            data.email,
        );
        push(
          '/auth/iniciar_sesion/recuperar_contrasena/confirmar_correo_contrasena?correo=' +
            data.email,
        );
      }
    } finally {
      setBoton(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
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
                  Ingresa el correo de tu cuenta. Te enviaremos un enlace mágico para restaurar tu acceso.
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
      <button
        type="submit"
        className="w-full relative group/btn overflow-hidden rounded-lg bg-primary text-on-primary font-ui-label py-4 primary-glow transition-all duration-300 active:scale-95"
        disabled={boton}
      >
        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
        <span className="relative flex items-center justify-center gap-2 font-bold tracking-wider uppercase">
          Enviar enlace de recuperación
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </span>
      </button>
    </form>
  );
}
