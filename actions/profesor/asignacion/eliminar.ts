'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function eliminarAsignacion(asignacionId: string) {
  const profesor = await requiereRol('PROFESOR');

  try {
    const asignacion = await prisma.asignacionExamen.findUnique({
      where: { id: asignacionId },
      include: { examen: { select: { profesor_id: true } } },
    });

    if (!asignacion || asignacion.examen.profesor_id !== profesor.id) {
      throw new NotFoundError('Asignación');
    }

    await prisma.asignacionExamen.delete({ where: { id: asignacionId } });

    revalidateTag('asignaciones', 'seconds');
    return { ok: true, message: 'Asignación eliminada' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al eliminar asignación', error as Error);
    throw new DatabaseError('Error al eliminar asignación');
  }
}
