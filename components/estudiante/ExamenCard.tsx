'use client';

import Link from 'next/link';
import { BookOpen, Users, Clock, CheckCircle2 } from 'lucide-react';

interface ExamenAsignado {
  id: string;
  examen_id: string;
  fecha_asignacion: Date;
  fecha_limite: Date | null;
  examen: {
    id: string;
    titulo: string;
    descripcion: string | null;
    createdAt: Date;
    profesor: { name: string };
    _count: { preguntas: number };
  };
}

interface Props {
  asignacion: ExamenAsignado;
  respondidas: number;
  completado: boolean;
}

export function ExamenCard({ asignacion, respondidas, completado }: Props) {
  const total = asignacion.examen._count.preguntas;
  const progreso = total > 0 ? Math.round((respondidas / total) * 100) : 0;

  return (
    <Link
      href={completado ? '#' : `/dashboard/actividades-profesor/${asignacion.examen.id}`}
      className={`block bg-surface-2 border rounded-xl p-5 transition-all hover:border-brand-amber/50 ${
        completado ? 'border-brand-green/30 opacity-75' : 'border-border-subtle'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-bold text-text-primary truncate">
            {asignacion.examen.titulo}
          </h3>
          {asignacion.examen.descripcion && (
            <p className="text-text-secondary text-sm mt-1 line-clamp-2">{asignacion.examen.descripcion}</p>
          )}
        </div>
        {completado && <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 ml-2" />}
      </div>

      <div className="flex items-center gap-4 text-xs text-text-muted mt-3">
        <span className="flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" />
          {total} preguntas
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          {asignacion.examen.profesor.name}
        </span>
      </div>

      {!completado && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-text-muted mb-1">
            <span>Progreso</span>
            <span>{respondidas}/{total}</span>
          </div>
          <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-amber rounded-full transition-all duration-500"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
      )}

      {completado && (
        <p className="text-xs text-brand-green font-medium mt-2">Completado</p>
      )}
    </Link>
  );
}
