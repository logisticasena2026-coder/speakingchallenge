'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function eliminarFraseAdmin(fraseId: number) {
  await requiereRol('ADMIN');

  try {
    const frase = await prisma.frasesDePractica.findUnique({ where: { id: fraseId } });
    if (!frase) throw new NotFoundError('Frase');

    await prisma.frasesDePractica.delete({ where: { id: fraseId } });
    revalidateTag('frases', 'seconds');
    return { ok: true, message: 'Frase eliminada' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error admin eliminar frase', error as Error);
    throw new DatabaseError('Error al eliminar frase');
  }
}
