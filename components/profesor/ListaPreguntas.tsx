'use client';

import { useState } from 'react';
import { sileo } from 'sileo';
import { Plus, Edit, Trash2, HelpCircle, CheckCircle2, XCircle, ListChecks } from 'lucide-react';
import { FormularioPregunta } from './FormularioPregunta';
import { crearPregunta } from '@/actions/profesor/pregunta/crear';
import { editarPregunta } from '@/actions/profesor/pregunta/editar';
import { eliminarPregunta } from '@/actions/profesor/pregunta/eliminar';

interface Pregunta {
  id: string;
  tipo: string;
  pregunta: string;
  opciones: { label: string; text: string }[] | null;
  respuesta_correcta: string;
  orden: number;
}

interface Props {
  preguntas: Pregunta[];
  examenId: string;
}

export function ListaPreguntas({ preguntas: initial, examenId }: Props) {
  const [preguntas, setPreguntas] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState<Pregunta | null>(null);

  const handleEliminar = (id: string) => {
    if (!window.confirm('¿Eliminar esta pregunta permanentemente?')) return;
    sileo.promise(
      () => eliminarPregunta(id),
      {
        loading: { title: 'Eliminando...' },
        success: (res) => {
          setPreguntas((prev) => prev.filter((p) => p.id !== id));
          return { title: 'Pregunta eliminada', description: res.message };
        },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      }
    );
  };

  const opcionesLabels: Record<string, string> = {
    MULTIPLE_CHOICE: 'Opción múltiple',
    TRUE_FALSE: 'V/F',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold text-text-primary flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-brand-amber" />
          Preguntas ({preguntas.length})
        </h3>
        <button onClick={() => { setEditando(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-amber text-surface-0 font-bold text-sm hover:bg-brand-amber/90 transition-all">
          <Plus className="w-4 h-4" />
          Agregar pregunta
        </button>
      </div>

      {preguntas.length === 0 && (
        <p className="text-center text-text-muted py-8 bg-surface-2 rounded-lg">
          No hay preguntas. Agrega la primera pregunta.
        </p>
      )}

      <div className="space-y-3">
        {preguntas.map((p, i) => (
          <div key={p.id} className="bg-surface-2 border border-border-subtle rounded-lg p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-brand-amber/20 text-brand-amber text-xs font-bold">{i + 1}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-3 text-text-muted">
                    {opcionesLabels[p.tipo] || p.tipo}
                  </span>
                </div>
                <p className="text-text-primary text-sm font-medium mt-1">{p.pregunta}</p>

                {p.tipo === 'MULTIPLE_CHOICE' && p.opciones && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {p.opciones.map((o) => (
                      <div key={o.label} className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg ${
                        o.label === p.respuesta_correcta ? 'bg-brand-green/15 text-brand-green' : 'bg-surface-3 text-text-secondary'
                      }`}>
                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-surface-1 text-[10px] font-bold">{o.label}</span>
                        {o.text}
                        {o.label === p.respuesta_correcta && <CheckCircle2 className="w-3 h-3 shrink-0 ml-auto" />}
                      </div>
                    ))}
                  </div>
                )}

                {p.tipo === 'TRUE_FALSE' && (
                  <div className="flex gap-3 mt-3">
                    <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg ${
                      p.respuesta_correcta === 'VERDADERO' ? 'bg-brand-green/15 text-brand-green' : 'bg-surface-3 text-text-secondary'
                    }`}>
                      {p.respuesta_correcta === 'VERDADERO' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      Verdadero
                    </span>
                    <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg ${
                      p.respuesta_correcta === 'FALSO' ? 'bg-brand-green/15 text-brand-green' : 'bg-surface-3 text-text-secondary'
                    }`}>
                      {p.respuesta_correcta === 'FALSO' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      Falso
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => { setEditando(p); setShowForm(true); }}
                  className="p-2 rounded-lg text-text-muted hover:text-brand-green hover:bg-brand-green/10 transition-all" title="Editar">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleEliminar(p.id)}
                  className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all" title="Eliminar">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <FormularioPregunta
          examenId={examenId}
          onSubmitAction={editando
            ? (data: any) => editarPregunta(editando.id, data)
            : (data: any) => crearPregunta(data)
          }
          onClose={() => { setShowForm(false); setEditando(null); }}
          onSuccess={editando
            ? (res) => {
                if (res.pregunta) setPreguntas((prev) => prev.map((p) => p.id === res.pregunta.id ? res.pregunta : p));
              }
            : (res) => {
                if (res.pregunta) setPreguntas((prev) => [...prev, res.pregunta]);
              }
          }
          modo={editando ? 'editar' : 'crear'}
          defaultValues={editando ? {
            tipo: editando.tipo,
            pregunta: editando.pregunta,
            opcionA: editando.opciones?.[0]?.text || '',
            opcionB: editando.opciones?.[1]?.text || '',
            opcionC: editando.opciones?.[2]?.text || '',
            opcionD: editando.opciones?.[3]?.text || '',
            respuesta_correcta: editando.respuesta_correcta,
          } : undefined}
        />
      )}
    </div>
  );
}
