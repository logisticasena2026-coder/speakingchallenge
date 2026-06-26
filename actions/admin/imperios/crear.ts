'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError, ConflictError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { ImperioSchema } from '@/schemas/admin/imperio';
import type { Skin } from '@/generated/prisma/enums';

export async function crearImperio(
  eraId: string,
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
    const era = await prisma.era.findUnique({ where: { id: eraId } });
    if (!era) throw new NotFoundError('Era', eraId);

    const existente = await prisma.imperio.findFirst({
      where: { era_id: eraId, nombre: { equals: parsed.data.nombre, mode: 'insensitive' } },
    });
    if (existente) {
      throw new ConflictError('Ya existe un imperio con ese nombre en esta era');
    }

    await prisma.imperio.create({
      data: {
        era_id: eraId,
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
    return { ok: true, message: 'Imperio creado' };
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ConflictError) throw error;
    logger.error('Error al crear imperio', error as Error);
    throw new DatabaseError('Error al crear imperio');
  }
}
