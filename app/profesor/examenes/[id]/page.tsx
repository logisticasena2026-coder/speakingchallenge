import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { obtenerExamen } from '@/actions/profesor/examen/obtener';
import { ListaPreguntas } from '@/components/profesor/ListaPreguntas';
import { AsignarExamenModal } from '@/components/profesor/AsignarExamenModal';
import Link from 'next/link';
import { ArrowLeft, Edit, BookOpen, Users, Clock } from 'lucide-react';

export default async function ProfesorExamenDetalle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const examen = await obtenerExamen(id);

  if (!examen) notFound();

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <Link href="/profesor/examenes"
        className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm mb-6">
        <ArrowLeft className="w-4 h-4" />
        Volver a exámenes
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
            {examen.titulo}
          </h1>
          {examen.descripcion && (
            <p className="text-text-secondary max-w-xl">{examen.descripcion}</p>
          )}
          <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {examen._count.preguntas} preguntas
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {examen.asignaciones.length} asignaciones
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {new Date(examen.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <Link href={`/profesor/examenes/${id}/editar`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">
          <Edit className="w-4 h-4" />
          Editar
        </Link>
      </div>

      <div className="mt-8">
        <ListaPreguntas preguntas={examen.preguntas} examenId={id} />
      </div>
    </div>
  );
}
