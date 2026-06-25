'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function eliminarGrupo(grupoId: string) {
  const profesor = await requiereRol('PROFESOR');

  try {
    const grupo = await prisma.grupo.findFirst({
      where: { id: grupoId, profesor_id: profesor.id },
    });

    if (!grupo) throw new NotFoundError('Grupo');

    await prisma.grupo.delete({ where: { id: grupoId } });

    revalidateTag('grupos', 'seconds');
    return { ok: true, message: 'Grupo eliminado' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al eliminar grupo', error as Error);
    throw new DatabaseError('Error al eliminar grupo');
  }
}
