'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const CrearLoteSchema = z.object({
  imperio_id: z.string().uuid(),
  cantidad: z.number().int().min(1, 'Mínimo 1').max(100, 'Máximo 100'),
});

export async function crearNivelesEnLote(data: {
  imperio_id: string;
  cantidad: number;
}) {
  await requiereRol('ADMIN');

  const parsed = CrearLoteSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const imperio = await prisma.imperio.findUnique({
      where: { id: parsed.data.imperio_id },
      include: {
        niveles: {
          orderBy: { orden: 'desc' },
          take: 1,
          select: { orden: true },
        },
      },
    });
    if (!imperio) throw new NotFoundError('Imperio', parsed.data.imperio_id);

    const ultimoOrden = imperio.niveles[0]?.orden ?? 0;

    await prisma.nivelProgresion.createMany({
      data: Array.from({ length: parsed.data.cantidad }, (_, i) => ({
        imperio_id: parsed.data.imperio_id,
        orden: ultimoOrden + i + 1,
      })),
    });

    revalidateTag('eras', 'seconds');
    return { ok: true, message: `${parsed.data.cantidad} nivel(es) creado(s)` };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al crear niveles en lote', error as Error);
    throw new DatabaseError('Error al crear niveles');
  }
}
