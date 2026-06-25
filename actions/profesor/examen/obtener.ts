'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerExamen(examenId: string) {
  const profesor = await requiereRol('PROFESOR');

  try {
    const examen = await prisma.examen.findFirst({
      where: { id: examenId, profesor_id: profesor.id },
      include: {
        preguntas: { orderBy: { orden: 'asc' } },
        asignaciones: {
          include: {
            grupo: { select: { id: true, nombre: true } },
            estudiante: { select: { id: true, name: true } },
          },
        },
        _count: { select: { preguntas: true } },
      },
    });

    if (!examen) throw new NotFoundError('Examen');

    return {
      ...examen,
      preguntas: examen.preguntas.map((p) => ({
        ...p,
        opciones: p.opciones as { label: string; text: string }[] | null,
      })),
    };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al obtener examen', error as Error);
    throw new DatabaseError('Error al obtener examen');
  }
}
