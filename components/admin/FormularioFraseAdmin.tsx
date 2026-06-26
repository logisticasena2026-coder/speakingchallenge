'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sileo } from 'sileo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FraseSchema, FraseFormData } from '@/schemas/admin/frase';

interface Props {
  onSubmitAction: (data: FraseFormData) => Promise<{ ok: boolean; message: string }>;
  modo: 'crear' | 'editar';
  defaultValues?: FraseFormData;
}

export function FormularioFraseAdmin({ onSubmitAction, modo, defaultValues }: Props) {
  const { push } = useRouter();
  const [boton, setBoton] = useState(false);

  const form = useForm<FraseFormData>({
    resolver: zodResolver(FraseSchema),
    mode: 'onChange',
    defaultValues: defaultValues || {
      fraseIngles: '', fraseEspanol: '', dificultad: 5, tematica: '', edad: '',
    },
  });

  const onSubmit: SubmitHandler<FraseFormData> = async (data) => {
    setBoton(true);
    try {
      const res = await sileo.promise(
        () => onSubmitAction(data),
        {
          loading: { title: modo === 'crear' ? 'Creando...' : 'Actualizando...' },
          success: (res) => {
            if (!res.ok) throw new Error(res.message);
            return { title: modo === 'crear' ? 'Frase creada' : 'Frase actualizada', description: res.message };
          },
          error: (err) => {
            return { title: 'Error', description: err instanceof Error ? err.message : 'Error' };
          },
        }
      );
      if (res?.ok) push('/admin/frases');
    } finally {
      setBoton(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      <div>
        <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Inglés</label>
        <textarea {...form.register('fraseIngles')} rows={3} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple transition-all resize-none" />
        {form.formState.errors.fraseIngles && <p className="text-xs text-red-400 mt-1">{form.formState.errors.fraseIngles.message}</p>}
      </div>
      <div>
        <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Español</label>
        <textarea {...form.register('fraseEspanol')} rows={3} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple transition-all resize-none" />
        {form.formState.errors.fraseEspanol && <p className="text-xs text-red-400 mt-1">{form.formState.errors.fraseEspanol.message}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Dificultad (1-10)</label>
          <input {...form.register('dificultad')} type="number" min={1} max={10} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple transition-all" />
        </div>
        <div>
          <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Temática</label>
          <input {...form.register('tematica')} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple transition-all" placeholder="ej: Viajes" />
        </div>
        <div>
          <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Edad</label>
          <input {...form.register('edad')} type="number" min={5} max={99} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple transition-all" placeholder="Opcional" />
        </div>
      </div>



      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={boton} className="px-6 py-3 rounded-lg bg-brand-purple text-surface-0 font-bold text-sm hover:bg-brand-purple/90 transition-all disabled:opacity-50">
          {modo === 'crear' ? 'Crear frase' : 'Guardar cambios'}
        </button>
        <button type="button" onClick={() => push('/admin/frases')} className="px-6 py-3 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">
          Cancelar
        </button>
      </div>
    </form>
  );
}
