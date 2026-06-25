'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sileo } from 'sileo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const GrupoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(100),
});

type GrupoFormData = z.infer<typeof GrupoSchema>;

interface Props {
  onSubmitAction: (data: GrupoFormData) => Promise<{ ok: boolean; message: string; id?: string }>;
  modo: 'crear';
  defaultValues?: GrupoFormData;
}

export function FormularioGrupo({ onSubmitAction, modo, defaultValues }: Props) {
  const { push } = useRouter();
  const [boton, setBoton] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<GrupoFormData>({
    resolver: zodResolver(GrupoSchema),
    mode: 'onChange',
    defaultValues: defaultValues || { nombre: '' },
  });

  const onSubmit: SubmitHandler<GrupoFormData> = async (data) => {
    setBoton(true);
    try {
      const res = await sileo.promise(
        () => onSubmitAction(data),
        {
          loading: { title: 'Creando...' },
          success: (res) => {
            if (!res.ok) throw new Error(res.message);
            return { title: 'Grupo creado', description: res.message };
          },
          error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
        }
      );
      if (res?.ok) push(res.id ? `/profesor/grupos/${res.id}` : '/profesor/grupos');
    } finally {
      setBoton(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      <div>
        <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Nombre del grupo</label>
        <input {...register('nombre')}
          className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-amber transition-all" />
        {errors.nombre && <p className="text-xs text-red-400 mt-1">{errors.nombre.message}</p>}
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={boton}
          className="px-6 py-3 rounded-lg bg-brand-amber text-surface-0 font-bold text-sm hover:bg-brand-amber/90 transition-all disabled:opacity-50">
          Crear grupo
        </button>
        <button type="button" onClick={() => push('/profesor/grupos')}
          className="px-6 py-3 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">
          Cancelar
        </button>
      </div>
    </form>
  );
}
