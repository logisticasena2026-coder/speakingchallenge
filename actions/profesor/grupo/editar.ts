'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const EditarGrupoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(100),
});

export async function editarGrupo(grupoId: string, data: { nombre: string }) {
  const profesor = await requiereRol('PROFESOR');

  const parsed = EditarGrupoSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const grupo = await prisma.grupo.findFirst({
      where: { id: grupoId, profesor_id: profesor.id },
    });

    if (!grupo) throw new NotFoundError('Grupo');

    const duplicado = await prisma.grupo.findFirst({
      where: {
        nombre: { equals: parsed.data.nombre, mode: 'insensitive' },
        profesor_id: profesor.id,
        id: { not: grupoId },
      },
    });
    if (duplicado) {
      return { ok: false, message: 'Ya existe otro grupo con ese nombre' };
    }

    await prisma.grupo.update({
      where: { id: grupoId },
      data: { nombre: parsed.data.nombre },
    });

    revalidateTag('grupos', 'seconds');
    return { ok: true, message: 'Grupo actualizado' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al editar grupo', error as Error);
    throw new DatabaseError('Error al editar grupo');
  }
}
