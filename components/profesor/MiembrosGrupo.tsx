'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sileo } from 'sileo';
import { Users, Plus, Trash2, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { agregarMiembro } from '@/actions/profesor/grupo/agregarMiembro';
import { quitarMiembro } from '@/actions/profesor/grupo/quitarMiembro';
import { AsignarExamenModal } from './AsignarExamenModal';

interface Miembro {
  estudiante: {
    id: string;
    name: string;
    email: string;
    nivel: string;
    precicion_global: number;
  };
}

interface Asignacion {
  id: string;
  examen: {
    id: string;
    titulo: string;
    _count: { preguntas: number };
  };
}

interface Props {
  grupoId: string;
  miembros: Miembro[];
  asignaciones: Asignacion[];
  estudiantesDisponibles: { id: string; name: string; email: string }[];
}

export function MiembrosGrupo({ grupoId, miembros, asignaciones, estudiantesDisponibles }: Props) {
  const router = useRouter();
  const [selectedEstudiante, setSelectedEstudiante] = useState('');
  const [showAsignar, setShowAsignar] = useState(false);

  const yaEnGrupo = new Set(miembros.map(m => m.estudiante.id));
  const disponibles = estudiantesDisponibles.filter(e => !yaEnGrupo.has(e.id));

  const handleAgregar = async () => {
    if (!selectedEstudiante) return;
    await sileo.promise(
      () => agregarMiembro(grupoId, selectedEstudiante),
      {
        loading: { title: 'Agregando...' },
        success: (res) => {
          if (res.ok) setSelectedEstudiante('');
          router.refresh();
          return { title: 'Estudiante agregado', description: res.message };
        },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      }
    );
  };

  const handleQuitar = async (estudianteId: string, name: string) => {
    if (!window.confirm(`¿Remover a ${name} del grupo?`)) return;
    await sileo.promise(
      () => quitarMiembro(grupoId, estudianteId),
      {
        loading: { title: 'Removiendo...' },
        success: (res) => {
          router.refresh();
          return { title: 'Estudiante removido', description: res.message };
        },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-brand-amber" />
          Miembros ({miembros.length})
        </h3>

        {disponibles.length > 0 ? (
          <div className="flex items-center gap-2 mb-4">
            <select
              value={selectedEstudiante}
              onChange={(e) => setSelectedEstudiante(e.target.value)}
              className="flex-1 bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-3 text-text-primary text-sm focus:ring-1 focus:ring-brand-amber transition-all">
              <option value="">Seleccionar estudiante...</option>
              {disponibles.map((e) => (
                <option key={e.id} value={e.id}>{e.name} ({e.email})</option>
              ))}
            </select>
            <button onClick={handleAgregar} disabled={!selectedEstudiante}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-amber text-surface-0 font-bold text-sm hover:bg-brand-amber/90 transition-all disabled:opacity-50">
              <Plus className="w-4 h-4" />
              Agregar
            </button>
          </div>
        ) : (
          <p className="text-text-muted text-sm mb-4">No hay más estudiantes disponibles para agregar.</p>
        )}

        {miembros.length > 0 ? (
          <div className="grid gap-2">
            {miembros.map((m) => (
              <div key={m.estudiante.id} className="flex items-center justify-between bg-surface-2 border border-border-subtle rounded-lg px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-brand-amber/20 flex items-center justify-center text-brand-amber text-sm font-bold shrink-0">
                    {m.estudiante.name[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-text-primary text-sm font-medium truncate">{m.estudiante.name}</p>
                    <p className="text-text-muted text-xs truncate">{m.estudiante.email}</p>
                  </div>
                </div>
                <button onClick={() => handleQuitar(m.estudiante.id, m.estudiante.name)}
                  className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-text-muted py-6 bg-surface-2 rounded-lg">No hay miembros en este grupo</p>
        )}
      </div>

      <div className="border-t border-border-subtle pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-text-primary flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-amber" />
            Exámenes asignados ({asignaciones.length})
          </h3>
          <button onClick={() => setShowAsignar(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-amber text-surface-0 font-bold text-sm hover:bg-brand-amber/90 transition-all">
            <Plus className="w-4 h-4" />
            Asignar examen
          </button>
        </div>

        {asignaciones.length > 0 ? (
          <div className="grid gap-2">
            {asignaciones.map((a) => (
              <div key={a.id} className="flex items-center justify-between bg-surface-2 border border-border-subtle rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-brand-amber shrink-0" />
                  <span className="text-text-primary text-sm">{a.examen.titulo}</span>
                  <span className="text-text-muted text-xs">{a.examen._count.preguntas} preguntas</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-text-muted py-6 bg-surface-2 rounded-lg">No hay exámenes asignados a este grupo</p>
        )}
      </div>

      {showAsignar && (
        <AsignarExamenModal
          grupoId={grupoId}
          onClose={() => setShowAsignar(false)}
          onAssigned={() => { setShowAsignar(false); router.refresh(); }}
        />
      )}
    </div>
  );
}
