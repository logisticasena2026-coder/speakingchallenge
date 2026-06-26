'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError, ConflictError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { EraSchema } from '@/schemas/admin/era';

export async function editarEra(
  eraId: string,
  data: { nombre: string; orden: number; color: string },
) {
  await requiereRol('ADMIN');

  const parsed = EraSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const era = await prisma.era.findUnique({ where: { id: eraId } });
    if (!era) throw new NotFoundError('Era', eraId);

    const conflictos = await prisma.era.findFirst({
      where: {
        id: { not: eraId },
        OR: [
          { nombre: { equals: parsed.data.nombre, mode: 'insensitive' } },
          { orden: parsed.data.orden },
        ],
      },
    });
    if (conflictos) {
      throw new ConflictError(
        conflictos.nombre.toLowerCase() === parsed.data.nombre.toLowerCase()
          ? 'Ya existe otra era con ese nombre'
          : 'Ya existe otra era con ese orden',
      );
    }

    await prisma.era.update({
      where: { id: eraId },
      data: {
        nombre: parsed.data.nombre,
        orden: parsed.data.orden,
        color: parsed.data.color,
      },
    });

    revalidateTag('eras', 'seconds');
    return { ok: true, message: 'Era actualizada' };
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ConflictError) throw error;
    logger.error('Error al editar era', error as Error);
    throw new DatabaseError('Error al editar era');
  }
}
