'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function eliminarProfesor(profesorId: string) {
  const estudiante = await requiereRol('ESTUDIANTE');

  try {
    await prisma.estudianteProfesor.deleteMany({
      where: {
        estudiante_id: estudiante.id,
        profesor_id: profesorId,
      },
    });

    return { ok: true, message: 'Profesor eliminado de tu lista' };
  } catch (error) {
    logger.error('Error al eliminar profesor', error as Error);
    throw new DatabaseError('Error al eliminar profesor');
  }
}
