'use client';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useVerContrasena } from '@/hook/VerContrasena';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormLoginSchema, FormLoginData } from '@/schemas/auth/login';

import Link from 'next/link';

export function IniciarSesionForm() {
  const { verContrasena, toggleVerContrasena } = useVerContrasena();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginData>({
    resolver: zodResolver(FormLoginSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormLoginData> = (data) => {
    console.log(data);
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
          <Mail className="absolute left-3 text-text-muted w-5 h-5" />
          <input
            className={`w-full bg-surface-container-lowest border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-text-muted/50 ${
              errors.email
                ? 'ring-2 ring-error animate-shake'
                : ''
            }`}
            id="email"
            placeholder="viajero@tiempos.com"
            type="email"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-error font-medium animate-slide-in-bottom">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="font-ui-label text-ui-label text-on-surface-variant block ml-1"
        >
          Password
        </label>
        <div className="relative flex items-center">
          <Lock className="absolute left-3 text-text-muted w-5 h-5" />
          <input
            className={`w-full bg-surface-container-lowest border border-border-subtle rounded-lg py-3 pl-10 pr-12 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-text-muted/50 ${
              errors.password
                ? 'ring-2 ring-error animate-shake'
                : ''
            }`}
            id="password"
            placeholder="••••••••"
            type={verContrasena ? 'text' : 'password'}
            {...register('password')}
          />
          <button
            className="absolute right-3 text-text-muted hover:text-primary transition-colors"
            type="button"
            onClick={toggleVerContrasena}
          >
            {verContrasena ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-error font-medium animate-slide-in-bottom">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <Link
          className="font-ui-label text-ui-label text-secondary hover:text-secondary-fixed transition-colors"
          href="#"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      <button className="w-full relative group/btn overflow-hidden rounded-lg bg-primary text-on-primary font-ui-label py-4 primary-glow transition-all duration-300 active:scale-95">
        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
        <span className="relative flex items-center justify-center gap-2 font-bold tracking-wider uppercase">
          Iniciar sesión
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </span>
      </button>
    </form>
  );
}
