'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError, ConflictError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { ImperioSchema } from '@/schemas/admin/imperio';
import type { Skin } from '@/generated/prisma/enums';

export async function editarImperio(
  imperioId: string,
  data: {
    nombre: string;
    orden: number;
    frases_propias?: number;
    frases_para_desbloquear?: number;
    porcentaje_aprobacion?: number;
    umbral_bronce?: number;
    umbral_plata?: number;
    umbral_oro?: number;
    skin?: string | null;
  },
) {
  await requiereRol('ADMIN');

  const parsed = ImperioSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const imperio = await prisma.imperio.findUnique({ where: { id: imperioId } });
    if (!imperio) throw new NotFoundError('Imperio', imperioId);

    const conflictos = await prisma.imperio.findFirst({
      where: {
        id: { not: imperioId },
        era_id: imperio.era_id,
        nombre: { equals: parsed.data.nombre, mode: 'insensitive' },
      },
    });
    if (conflictos) {
      throw new ConflictError('Ya existe otro imperio con ese nombre en esta era');
    }

    await prisma.imperio.update({
      where: { id: imperioId },
      data: {
        nombre: parsed.data.nombre,
        orden: parsed.data.orden,
        frases_propias: parsed.data.frases_propias,
        frases_para_desbloquear: parsed.data.frases_para_desbloquear,
        porcentaje_aprobacion: parsed.data.porcentaje_aprobacion,
        umbral_bronce: parsed.data.umbral_bronce,
        umbral_plata: parsed.data.umbral_plata,
        umbral_oro: parsed.data.umbral_oro,
        skin: (parsed.data.skin ?? null) as Skin,
      },
    });

    revalidateTag('eras', 'seconds');
    return { ok: true, message: 'Imperio actualizado' };
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ConflictError) throw error;
    logger.error('Error al editar imperio', error as Error);
    throw new DatabaseError('Error al editar imperio');
  }
}
