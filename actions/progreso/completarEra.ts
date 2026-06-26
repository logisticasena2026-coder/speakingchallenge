'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado } from '@/lib/auth';
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { evaluarLogros } from './evaluarLogros';

export async function completarEra(data: { era_id: string }) {
  const usuario = await DatosDelAutenticado();
  if (!usuario) throw new UnauthorizedError();

  try {
    const era = await prisma.era.findUnique({ where: { id: data.era_id } });
    if (!era) throw new NotFoundError('Era', data.era_id);

    const yaCompletada = await prisma.eraCompletada.findUnique({
      where: {
        usuario_id_era_id: {
          usuario_id: usuario.id,
          era_id: era.id,
        },
      },
    });
    if (yaCompletada) {
      return { ok: true, message: 'Era ya completada anteriormente' };
    }

    await prisma.eraCompletada.create({
      data: {
        usuario_id: usuario.id,
        era_id: era.id,
      },
    });

    // Buscar siguiente era
    const siguiente = await prisma.era.findFirst({
      where: { orden: era.orden + 1 },
      include: {
        imperios: {
          orderBy: { orden: 'asc' },
          include: {
            niveles: { orderBy: { orden: 'asc' }, take: 1 },
          },
          take: 1,
        },
      },
    });

    if (siguiente) {
      const primerImperio = siguiente.imperios[0];
      const primerNivel = primerImperio?.niveles[0];

      if (primerImperio && primerNivel) {
        await prisma.progresoUsuario.update({
          where: { usuario_id: usuario.id },
          data: {
            era_actual_id: siguiente.id,
            imperio_actual_id: primerImperio.id,
            nivel_actual_id: primerNivel.id,
            estrato_social: 0,
          },
        });
      }
    }

    const logros = await evaluarLogros();

    return {
      ok: true,
      message: 'Era completada',
      era_siguiente: siguiente ?? undefined,
      nuevos_logros: logros.ok ? logros.nuevos_logros : [],
    };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al completar era', error as Error);
    throw new DatabaseError('Error al completar era');
  }
}
