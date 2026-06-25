'use client';

import { useState, useEffect } from 'react';
import { X, BookOpen, Loader2 } from 'lucide-react';
import { obtenerExamenesDelProfesor } from '@/actions/admin/examen/obtenerDelProfesor';

interface Examen {
  id: string;
  titulo: string;
  descripcion: string | null;
  createdAt: Date;
  _count: { preguntas: number; asignaciones: number };
}

export function ModalExamenesProfesor({
  profesorId,
  profesorName,
  onClose,
}: {
  profesorId: string;
  profesorName: string;
  onClose: () => void;
}) {
  const [examenes, setExamenes] = useState<Examen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    obtenerExamenesDelProfesor(profesorId)
      .then(setExamenes)
      .finally(() => setLoading(false));
  }, [profesorId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-1 border border-border-subtle rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-brand-amber" />
            <h2 className="font-display text-lg font-bold text-text-primary">
              Exámenes de {profesorName}
            </h2>
            <span className="text-sm text-text-muted ml-1">
              ({examenes.length} examen{examenes.length !== 1 ? 'es' : ''})
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-3 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5" style={{ maxHeight: 'calc(80vh - 73px)' }}>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-text-muted animate-spin" />
            </div>
          ) : examenes.length === 0 ? (
            <p className="text-center text-text-muted py-12">Este profesor no ha creado exámenes todavía.</p>
          ) : (
            <div className="space-y-3">
              {examenes.map((ex) => (
                <div key={ex.id} className="bg-surface-2 border border-border-subtle rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-medium text-sm mb-1">{ex.titulo}</p>
                      {ex.descripcion && (
                        <p className="text-text-secondary text-xs italic mb-2">{ex.descripcion}</p>
                      )}
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-text-muted">
                          {ex._count.preguntas} pregunta{ex._count.preguntas !== 1 ? 's' : ''}
                        </span>
                        <span className="text-[10px] text-text-muted">
                          {ex._count.asignaciones} asignación{ex._count.asignaciones !== 1 ? 'es' : ''}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-text-muted shrink-0">
                      {new Date(ex.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
