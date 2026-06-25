'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function eliminarExamen(examenId: string) {
  const profesor = await requiereRol('PROFESOR');

  try {
    const examen = await prisma.examen.findFirst({
      where: { id: examenId, profesor_id: profesor.id },
    });

    if (!examen) throw new NotFoundError('Examen');

    await prisma.examen.delete({ where: { id: examenId } });

    revalidateTag('examenes', 'seconds');
    return { ok: true, message: 'Examen eliminado' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al eliminar examen', error as Error);
    throw new DatabaseError('Error al eliminar examen');
  }
}
