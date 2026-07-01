import { notFound } from 'next/navigation';
import { obtenerGrupo } from '@/actions/profesor/grupo/obtener';
import prisma from '@/lib/prisma';
import { MiembrosGrupo } from '@/components/profesor/MiembrosGrupo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ProfesorGrupoDetalle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const grupo = await obtenerGrupo(id);
  if (!grupo) notFound();

  const idsEnGrupos = await prisma.grupoEstudiante.findMany({
    where: { grupo: { profesor_id: grupo.profesor_id } },
    select: { estudiante_id: true },
  });
  const idsYaEnGrupos = new Set(idsEnGrupos.map(g => g.estudiante_id));

  const estudiantes = await prisma.user.findMany({
    where: {
      profesores_asignados: {
        some: { profesor_id: grupo.profesor_id },
      },
      rol: 'ESTUDIANTE',
      id: { notIn: Array.from(idsYaEnGrupos) },
    },
    select: { id: true, name: true, email: true, avatar: true },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <Link href="/profesor/grupos"
        className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm mb-6">
        <ArrowLeft className="w-4 h-4" />
        Volver a grupos
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          {grupo.nombre}
        </h1>
        <p className="text-text-secondary">{grupo._count.miembros} miembro{grupo._count.miembros !== 1 ? 's' : ''}</p>
      </div>

      <MiembrosGrupo
        grupoId={id}
        miembros={grupo.miembros}
        asignaciones={grupo.asignaciones}
        estudiantesDisponibles={estudiantes}
      />
    </div>
  );
}
