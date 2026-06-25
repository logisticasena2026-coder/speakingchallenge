'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sileo } from 'sileo';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { X, Plus, Trash2 } from 'lucide-react';

const PreguntaSchema = z.object({
  tipo: z.enum(['MULTIPLE_CHOICE', 'TRUE_FALSE']),
  pregunta: z.string().min(1, 'La pregunta es requerida').max(1000),
  opcionA: z.string().optional(),
  opcionB: z.string().optional(),
  opcionC: z.string().optional(),
  opcionD: z.string().optional(),
  respuesta_correcta: z.string().min(1, 'Selecciona la respuesta correcta'),
}).refine((d) => {
  if (d.tipo === 'MULTIPLE_CHOICE') {
    return d.opcionA && d.opcionA.trim().length > 0;
  }
  return true;
}, { message: 'La opción A es requerida', path: ['opcionA'] });

type PreguntaFormData = z.infer<typeof PreguntaSchema>;

interface Props {
  examenId: string;
  onSubmitAction: (data: any) => Promise<{ ok: boolean; message: string }>;
  onClose: () => void;
  onSuccess?: (result: any) => void;
  modo: 'crear' | 'editar';
  defaultValues?: any;
}

export function FormularioPregunta({ examenId, onSubmitAction, onClose, onSuccess, modo, defaultValues }: Props) {
  const [boton, setBoton] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<PreguntaFormData>({
    resolver: zodResolver(PreguntaSchema),
    mode: 'onChange',
    defaultValues: defaultValues || {
      tipo: 'MULTIPLE_CHOICE',
      pregunta: '',
      opcionA: '', opcionB: '', opcionC: '', opcionD: '',
      respuesta_correcta: '',
    },
  });

  const tipo = watch('tipo');

  useEffect(() => {
    if (tipo === 'TRUE_FALSE') {
      setValue('opcionA', '');
      setValue('opcionB', '');
      setValue('opcionC', '');
      setValue('opcionD', '');
    }
  }, [tipo, setValue]);

  const onSubmit: SubmitHandler<PreguntaFormData> = async (data) => {
    setBoton(true);
    try {
      const payload: any = {
        examen_id: examenId,
        tipo: data.tipo,
        pregunta: data.pregunta,
        respuesta_correcta: data.respuesta_correcta,
      };

      if (data.tipo === 'MULTIPLE_CHOICE') {
        const opciones = [
          { label: 'A', text: data.opcionA || '' },
          { label: 'B', text: data.opcionB || '' },
          { label: 'C', text: data.opcionC || '' },
          { label: 'D', text: data.opcionD || '' },
        ].filter(o => o.text.trim());
        payload.opciones = opciones;
      }

      const res = await sileo.promise(
        () => onSubmitAction(payload),
        {
          loading: { title: modo === 'crear' ? 'Guardando...' : 'Actualizando...' },
          success: (res) => {
            if (!res.ok) throw new Error(res.message);
            return { title: 'Pregunta guardada', description: res.message };
          },
          error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
        }
      );
      if (res?.ok) {
        onSuccess?.(res);
        onClose();
      }
    } finally {
      setBoton(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-surface-1 rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-text-primary">
            {modo === 'crear' ? 'Nueva pregunta' : 'Editar pregunta'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-text-muted hover:text-text-primary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Tipo</label>
            <select {...register('tipo')}
              className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-amber transition-all">
              <option value="MULTIPLE_CHOICE">Opción múltiple (A, B, C, D)</option>
              <option value="TRUE_FALSE">Verdadero / Falso</option>
            </select>
          </div>

          <div>
            <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Pregunta</label>
            <textarea {...register('pregunta')} rows={2}
              className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-amber transition-all resize-none" />
            {errors.pregunta && <p className="text-xs text-red-400 mt-1">{errors.pregunta.message}</p>}
          </div>

          {tipo === 'MULTIPLE_CHOICE' && (
            <div className="space-y-3">
              <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted">Opciones</label>
              {['A', 'B', 'C', 'D'].map((letter) => (
                <div key={letter} className="flex items-center gap-2">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-3 text-text-secondary text-xs font-bold">{letter}</span>
                  <input {...register(`opcion${letter}` as any)}
                    placeholder={`Opción ${letter}`}
                    className="flex-1 bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-3 text-text-primary text-sm focus:ring-1 focus:ring-brand-amber transition-all" />
                </div>
              ))}
              {errors.opcionA && <p className="text-xs text-red-400">{errors.opcionA.message}</p>}
            </div>
          )}

          <div>
            <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Respuesta correcta
            </label>
            {tipo === 'MULTIPLE_CHOICE' ? (
              <select {...register('respuesta_correcta')}
                className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-amber transition-all">
                <option value="">Seleccionar...</option>
                {['A', 'B', 'C', 'D'].map((letter) => (
                  <option key={letter} value={letter}>Opción {letter}</option>
                ))}
              </select>
            ) : (
              <select {...register('respuesta_correcta')}
                className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-amber transition-all">
                <option value="">Seleccionar...</option>
                <option value="VERDADERO">Verdadero</option>
                <option value="FALSO">Falso</option>
              </select>
            )}
            {errors.respuesta_correcta && <p className="text-xs text-red-400 mt-1">{errors.respuesta_correcta.message}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={boton}
              className="px-6 py-3 rounded-lg bg-brand-amber text-surface-0 font-bold text-sm hover:bg-brand-amber/90 transition-all disabled:opacity-50">
              {boton ? 'Guardando...' : modo === 'crear' ? 'Agregar pregunta' : 'Guardar cambios'}
            </button>
            <button type="button" onClick={onClose}
              className="px-6 py-3 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
