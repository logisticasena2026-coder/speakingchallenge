'use client';

import { useState, useEffect } from 'react';
import { sileo } from 'sileo';
import { X, BookOpen } from 'lucide-react';
import { crearAsignacion } from '@/actions/profesor/asignacion/crear';
import { obtenerTodosExamenes } from '@/actions/profesor/examen/obtenerTodos';

interface Props {
  grupoId: string;
  onClose: () => void;
  onAssigned: () => void;
}

export function AsignarExamenModal({ grupoId, onClose, onAssigned }: Props) {
  const [examenes, setExamenes] = useState<any[]>([]);
  const [selectedExamen, setSelectedExamen] = useState('');
  const [boton, setBoton] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerTodosExamenes({ pagina: 1, limite: 100 })
      .then((res) => setExamenes(res.examenes))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleAsignar = async () => {
    if (!selectedExamen) return;
    setBoton(true);
    try {
      await sileo.promise(
        () => crearAsignacion({ examen_id: selectedExamen, grupo_id: grupoId }),
        {
          loading: { title: 'Asignando...' },
          success: (res) => {
            if (!res.ok) throw new Error(res.message);
            onAssigned();
            return { title: 'Examen asignado', description: res.message };
          },
          error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
        }
      );
    } finally {
      setBoton(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-surface-1 rounded-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-text-primary flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-amber" />
            Asignar examen al grupo
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-text-muted hover:text-text-primary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <p className="text-text-muted py-4 text-center">Cargando exámenes...</p>
        ) : examenes.length === 0 ? (
          <p className="text-text-muted py-4 text-center">No hay exámenes disponibles. Crea un examen primero.</p>
        ) : (
          <div className="space-y-4">
            <select
              value={selectedExamen}
              onChange={(e) => setSelectedExamen(e.target.value)}
              className="w-full bg-surface-2 border border-border-subtle rounded-lg py-3 px-4 text-text-primary focus:ring-1 focus:ring-brand-amber transition-all">
              <option value="">Seleccionar examen...</option>
              {examenes.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.titulo} ({e._count.preguntas} preguntas)
                </option>
              ))}
            </select>

            <div className="flex gap-3 pt-2">
              <button onClick={handleAsignar} disabled={!selectedExamen || boton}
                className="px-6 py-3 rounded-lg bg-brand-amber text-surface-0 font-bold text-sm hover:bg-brand-amber/90 transition-all disabled:opacity-50">
                Asignar
              </button>
              <button onClick={onClose}
                className="px-6 py-3 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
