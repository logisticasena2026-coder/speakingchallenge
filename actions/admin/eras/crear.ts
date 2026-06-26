'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, ConflictError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { EraSchema } from '@/schemas/admin/era';

export async function crearEra(data: { nombre: string; orden: number; color: string }) {
  await requiereRol('ADMIN');

  const parsed = EraSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const existente = await prisma.era.findFirst({
      where: {
        OR: [
          { nombre: { equals: parsed.data.nombre, mode: 'insensitive' } },
          { orden: parsed.data.orden },
        ],
      },
    });
    if (existente) {
      throw new ConflictError(
        existente.nombre.toLowerCase() === parsed.data.nombre.toLowerCase()
          ? 'Ya existe una era con ese nombre'
          : 'Ya existe una era con ese orden',
      );
    }

    await prisma.era.create({
      data: {
        nombre: parsed.data.nombre,
        orden: parsed.data.orden,
        color: parsed.data.color,
      },
    });

    revalidateTag('eras', 'seconds');
    return { ok: true, message: 'Era creada' };
  } catch (error) {
    if (error instanceof ConflictError) throw error;
    logger.error('Error al crear era', error as Error);
    throw new DatabaseError('Error al crear era');
  }
}
