'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function eliminarNivel(nivelId: string) {
  await requiereRol('ADMIN');

  try {
    const nivel = await prisma.nivelProgresion.findUnique({ where: { id: nivelId } });
    if (!nivel) throw new NotFoundError('Nivel', nivelId);

    await prisma.nivelProgresion.delete({ where: { id: nivelId } });

    revalidateTag('eras', 'seconds');
    return { ok: true, message: 'Nivel eliminado' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al eliminar nivel', error as Error);
    throw new DatabaseError('Error al eliminar nivel');
  }
}
