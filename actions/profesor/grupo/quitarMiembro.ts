'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function quitarMiembro(grupoId: string, estudianteId: string) {
  const profesor = await requiereRol('PROFESOR');

  try {
    const grupo = await prisma.grupo.findFirst({
      where: { id: grupoId, profesor_id: profesor.id },
    });
    if (!grupo) throw new NotFoundError('Grupo');

    await prisma.grupoEstudiante.delete({
      where: {
        grupo_id_estudiante_id: { grupo_id: grupoId, estudiante_id: estudianteId },
      },
    });

    revalidateTag('grupos', 'seconds');
    return { ok: true, message: 'Estudiante removido del grupo' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al quitar miembro', error as Error);
    throw new DatabaseError('Error al quitar miembro');
  }
}
