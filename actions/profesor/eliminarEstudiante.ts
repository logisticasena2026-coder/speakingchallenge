'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function eliminarEstudiante(estudianteId: string) {
  const profesor = await requiereRol('PROFESOR');

  try {
    const relation = await prisma.estudianteProfesor.findFirst({
      where: { estudiante_id: estudianteId, profesor_id: profesor.id },
    });

    if (!relation) {
      throw new NotFoundError('Estudiante');
    }

    await prisma.estudianteProfesor.delete({
      where: { id: relation.id },
    });

    revalidateTag('profesor-estudiantes', 'seconds');
    return { ok: true, message: 'Estudiante eliminado de tu clase' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al eliminar estudiante', error as Error);
    throw new DatabaseError('Error al eliminar estudiante');
  }
}
