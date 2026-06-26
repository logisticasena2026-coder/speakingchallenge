'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function eliminarFraseNivel(fraseId: number) {
  await requiereRol('ADMIN');

  try {
    const frase = await prisma.fraseNivel.findUnique({ where: { id: fraseId } });
    if (!frase) throw new NotFoundError('Frase de nivel');

    await prisma.fraseNivel.delete({ where: { id: fraseId } });

    revalidateTag('frases', 'seconds');
    return { ok: true, message: 'Frase eliminada' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al eliminar frase de nivel', error as Error);
    throw new DatabaseError('Error al eliminar frase de nivel');
  }
}
