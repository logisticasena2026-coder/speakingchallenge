import { notFound } from 'next/navigation';
import { obtenerExamenConPreguntas } from '@/actions/estudiante/examen/obtener';
import { ResolverExamen } from '@/components/estudiante/ResolverExamen';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default async function ResolverExamenPage({
  params,
}: {
  params: Promise<{ examenId: string }>;
}) {
  const { examenId } = await params;

  const examen = await obtenerExamenConPreguntas(examenId);
  if (!examen) notFound();

  if (examen.completado) {
    return (
      <div className="p-8 max-w-lg mx-auto w-full min-w-0 text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-brand-green mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-text-primary mb-2">
          Examen ya completado
        </h1>
        <p className="text-text-secondary mb-6">
          Ya has respondido este examen anteriormente.
        </p>
        <Link
          href="/dashboard/actividades-profesor"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-green text-surface-0 font-bold text-sm hover:bg-brand-green/90 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a actividades
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <ResolverExamen
        examenId={examen.id}
        titulo={examen.titulo}
        profesor={examen.profesor.name}
        preguntas={examen.preguntas}
      />
    </div>
  );
}
