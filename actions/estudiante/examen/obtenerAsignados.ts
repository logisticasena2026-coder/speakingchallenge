'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerExamenesAsignados() {
  const estudiante = await requiereRol('ESTUDIANTE');

  try {
    const grupos = await prisma.grupoEstudiante.findMany({
      where: { estudiante_id: estudiante.id },
      select: { grupo_id: true },
    });
    const grupoIds = grupos.map(g => g.grupo_id);

    const profesoresVinculados = await prisma.estudianteProfesor.findMany({
      where: { estudiante_id: estudiante.id },
      select: { profesor_id: true },
    });
    const profesorIds = new Set(profesoresVinculados.map(p => p.profesor_id));

    const asignaciones = await prisma.asignacionExamen.findMany({
      where: {
        OR: [
          { estudiante_id: estudiante.id },
          ...(grupoIds.length > 0 ? [{ grupo_id: { in: grupoIds } }] : []),
        ],
      },
      include: {
        examen: {
          select: {
            id: true,
            titulo: true,
            descripcion: true,
            createdAt: true,
            profesor_id: true,
            profesor: { select: { name: true } },
            _count: { select: { preguntas: true } },
          },
        },
      },
      orderBy: { fecha_asignacion: 'desc' },
    });

    const resueltos = await prisma.respuestaEstudiante.findMany({
      where: { estudiante_id: estudiante.id },
      select: {
        pregunta_id: true,
        pregunta: { select: { examen_id: true } },
      },
    });

    const respondidasPorExamen: Record<string, number> = {};
    for (const r of resueltos) {
      const examenId = r.pregunta.examen_id;
      respondidasPorExamen[examenId] = (respondidasPorExamen[examenId] ?? 0) + 1;
    }

    return asignaciones
      .filter(a => profesorIds.has(a.examen.profesor_id))
      .map(a => {
        const respondidas = respondidasPorExamen[a.examen.id] ?? 0;
        return {
          ...a,
          respondidas,
          completado: respondidas >= a.examen._count.preguntas,
          _count: {
            preguntas: a.examen._count.preguntas,
          },
        };
      });
  } catch (error) {
    logger.error('Error al obtener examenes asignados', error as Error);
    throw new DatabaseError('Error al obtener examenes asignados');
  }
}
