'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sileo } from 'sileo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const ExamenSchema = z.object({
  titulo: z.string().min(1, 'El título es requerido').max(200),
  descripcion: z.string().max(1000).optional(),
});

type ExamenFormData = z.infer<typeof ExamenSchema>;

interface Props {
  onSubmitAction: (data: ExamenFormData) => Promise<{ ok: boolean; message: string; id?: string }>;
  modo: 'crear' | 'editar';
  defaultValues?: ExamenFormData;
}

export function FormularioExamen({ onSubmitAction, modo, defaultValues }: Props) {
  const { push } = useRouter();
  const [boton, setBoton] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ExamenFormData>({
    resolver: zodResolver(ExamenSchema),
    mode: 'onChange',
    defaultValues: defaultValues || { titulo: '', descripcion: '' },
  });

  const onSubmit: SubmitHandler<ExamenFormData> = async (data) => {
    setBoton(true);
    try {
      const res = await sileo.promise(
        () => onSubmitAction(data),
        {
          loading: { title: modo === 'crear' ? 'Creando...' : 'Actualizando...' },
          success: (res) => {
            if (!res.ok) throw new Error(res.message);
            return { title: modo === 'crear' ? 'Examen creado' : 'Examen actualizado', description: res.message };
          },
          error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
        }
      );
      if (res?.ok) push(res.id ? `/profesor/examenes/${res.id}` : '/profesor/examenes');
    } finally {
      setBoton(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      <div>
        <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Título del examen</label>
        <input {...register('titulo')}
          className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-amber transition-all" />
        {errors.titulo && <p className="text-xs text-red-400 mt-1">{errors.titulo.message}</p>}
      </div>
      <div>
        <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Descripción (opcional)</label>
        <textarea {...register('descripcion')} rows={3}
          className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-amber transition-all resize-none" />
        {errors.descripcion && <p className="text-xs text-red-400 mt-1">{errors.descripcion.message}</p>}
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={boton}
          className="px-6 py-3 rounded-lg bg-brand-amber text-surface-0 font-bold text-sm hover:bg-brand-amber/90 transition-all disabled:opacity-50">
          {modo === 'crear' ? 'Crear examen' : 'Guardar cambios'}
        </button>
        <button type="button" onClick={() => push('/profesor/examenes')}
          className="px-6 py-3 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">
          Cancelar
        </button>
      </div>
    </form>
  );
}
