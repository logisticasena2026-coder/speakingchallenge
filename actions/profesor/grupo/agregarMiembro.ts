'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function agregarMiembro(grupoId: string, estudianteId: string) {
  const profesor = await requiereRol('PROFESOR');

  try {
    const grupo = await prisma.grupo.findFirst({
      where: { id: grupoId, profesor_id: profesor.id },
    });
    if (!grupo) throw new NotFoundError('Grupo');

    const exists = await prisma.grupoEstudiante.findUnique({
      where: { grupo_id_estudiante_id: { grupo_id: grupoId, estudiante_id: estudianteId } },
    });
    if (exists) {
      return { ok: false, message: 'El estudiante ya está en el grupo' };
    }

    const yaEnOtroGrupo = await prisma.grupoEstudiante.findFirst({
      where: {
        estudiante_id: estudianteId,
        grupo: { profesor_id: profesor.id },
      },
    });
    if (yaEnOtroGrupo) {
      return { ok: false, message: 'El estudiante ya pertenece a otro grupo' };
    }

    await prisma.grupoEstudiante.create({
      data: {
        grupo_id: grupoId,
        estudiante_id: estudianteId,
      },
    });

    const estudiante = await prisma.user.findUnique({
      where: { id: estudianteId },
      select: { id: true, name: true, email: true, nivel: true, precicion_global: true },
    });
    if (!estudiante) throw new NotFoundError('Estudiante');

    revalidateTag('grupos', 'seconds');
    return { ok: true, message: 'Estudiante agregado al grupo', miembro: estudiante };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al agregar miembro', error as Error);
    throw new DatabaseError('Error al agregar miembro');
  }
}
