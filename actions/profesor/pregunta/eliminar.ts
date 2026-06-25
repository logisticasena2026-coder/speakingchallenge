'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function eliminarPregunta(preguntaId: string) {
  const profesor = await requiereRol('PROFESOR');

  try {
    const pregunta = await prisma.pregunta.findUnique({
      where: { id: preguntaId },
      include: { examen: { select: { profesor_id: true } } },
    });

    if (!pregunta || pregunta.examen.profesor_id !== profesor.id) {
      throw new NotFoundError('Pregunta');
    }

    await prisma.pregunta.delete({ where: { id: preguntaId } });

    revalidateTag('preguntas', 'seconds');
    return { ok: true, message: 'Pregunta eliminada' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al eliminar pregunta', error as Error);
    throw new DatabaseError('Error al eliminar pregunta');
  }
}
