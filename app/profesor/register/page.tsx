'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sileo } from 'sileo';
import { useRouter } from 'next/navigation';
import { registrarProfesor } from '@/actions/profesor/registro';
import { Mail, Lock, User, Key } from 'lucide-react';
import { ProfesorRegisterSchema, ProfesorRegisterData } from '@/schemas/profesor/register';

export default function RegisterProfesor() {
  const { push } = useRouter();
  const [boton, setBoton] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfesorRegisterData>({
    resolver: zodResolver(ProfesorRegisterSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ProfesorRegisterData> = async (data) => {
    setBoton(true);
    try {
      const res = await sileo.promise(
        () => registrarProfesor(data),
        {
          loading: { title: 'Registrando profesor...' },
          success: (res) => {
            if (!res.ok) throw new Error(res.message);
            return { title: 'Registro exitoso', description: res.message };
          },
          error: (err) => {
            return { title: 'Error', description: err instanceof Error ? err.message : 'Error inesperado' };
          },
        }
      );
      if (res?.ok) push('/profesor/dashboard');
    } finally {
      setBoton(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-surface-0">
      <div className="w-full max-w-md">
        <div className="relative bg-surface-1/40 backdrop-blur-2xl border border-white/5 p-8 rounded-xl shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-brand-amber to-transparent"></div>
          <h1 className="font-display text-2xl font-bold text-text-primary mb-2 text-center">
            Registro de Profesor
          </h1>
          <p className="text-sm text-text-secondary text-center mb-8">
            Ingresa con tu código de invitación
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="relative flex items-center">
                <User className="absolute left-3 text-text-muted size-5" aria-hidden="true" />
                <input
                  {...register('nombre')}
                  className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-text-primary focus:ring-1 focus:ring-brand-green transition-all placeholder:text-text-muted/50"
                  placeholder="Nombre de usuario"
                />
              </div>
              {errors.nombre && <p className="text-xs text-red-400 mt-1">{errors.nombre.message}</p>}
            </div>

            <div>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 text-text-muted size-5" aria-hidden="true" />
                <input
                  {...register('correo')}
                  className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-text-primary focus:ring-1 focus:ring-brand-green transition-all placeholder:text-text-muted/50"
                  placeholder="Correo electrónico"
                />
              </div>
              {errors.correo && <p className="text-xs text-red-400 mt-1">{errors.correo.message}</p>}
            </div>

            <div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 text-text-muted size-5" aria-hidden="true" />
                <input
                  {...register('contrasena')}
                  type="password"
                  className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-text-primary focus:ring-1 focus:ring-brand-green transition-all placeholder:text-text-muted/50"
                  placeholder="Contraseña"
                />
              </div>
              {errors.contrasena && <p className="text-xs text-red-400 mt-1">{errors.contrasena.message}</p>}
            </div>

            <div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 text-text-muted size-5" aria-hidden="true" />
                <input
                  {...register('confirmarContrasena')}
                  type="password"
                  className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-text-primary focus:ring-1 focus:ring-brand-green transition-all placeholder:text-text-muted/50"
                  placeholder="Confirmar contraseña"
                />
              </div>
              {errors.confirmarContrasena && <p className="text-xs text-red-400 mt-1">{errors.confirmarContrasena.message}</p>}
            </div>

            <div>
              <div className="relative flex items-center">
                <Key className="absolute left-3 text-text-muted size-5" aria-hidden="true" />
                <input
                  {...register('codigoInvitacion')}
                  className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-text-primary focus:ring-1 focus:ring-brand-green transition-all placeholder:text-text-muted/50"
                  placeholder="Código de invitación"
                />
              </div>
              {errors.codigoInvitacion && <p className="text-xs text-red-400 mt-1">{errors.codigoInvitacion.message}</p>}
            </div>

            <button
              type="submit"
              disabled={boton}
              className="w-full relative overflow-hidden rounded-lg bg-brand-green text-surface-0 font-bold py-4 transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              Registrarse como Profesor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
