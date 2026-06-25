'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sileo } from 'sileo';
import { useRouter } from 'next/navigation';
import { crearProfesor } from '@/actions/admin/crearProfesor';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CrearProfesorSchema, CrearProfesorData } from '@/schemas/admin/profesor';

export default function CrearProfesor() {
  const { push } = useRouter();
  const [boton, setBoton] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CrearProfesorData>({
    resolver: zodResolver(CrearProfesorSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<CrearProfesorData> = async (data) => {
    setBoton(true);
    try {
      const res = await sileo.promise(
        () => crearProfesor(data),
        {
          loading: { title: 'Creando profesor...' },
          success: (res) => {
            if (!res.ok) throw new Error(res.message);
            return { title: 'Profesor creado', description: res.message };
          },
          error: (err) => {
            return { title: 'Error', description: err instanceof Error ? err.message : 'Error' };
          },
        }
      );
      if (res?.ok) push('/admin/profesores');
    } finally {
      setBoton(false);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto w-full min-w-0">
      <Link href="/admin/profesores" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-brand-amber transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Volver a profesores
      </Link>

      <h1 className="font-display text-[28px] font-bold text-text-primary mb-8">Crear Profesor</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted size-4" />
            <input {...register('name')} placeholder="Nombre" className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-text-primary focus:ring-1 focus:ring-brand-amber transition-all" />
          </div>
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted size-4" />
            <input {...register('email')} placeholder="Correo electrónico" className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-text-primary focus:ring-1 focus:ring-brand-amber transition-all" />
          </div>
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted size-4" />
            <input {...register('password')} type="password" placeholder="Contraseña" className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-text-primary focus:ring-1 focus:ring-brand-amber transition-all" />
          </div>
          {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={boton} className="w-full py-3 rounded-lg bg-brand-amber text-surface-0 font-bold hover:bg-brand-amber/90 transition-all disabled:opacity-50">
          Crear Profesor
        </button>
      </form>
    </div>
  );
}
