'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado } from '@/lib/auth';
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { completarEra } from './completarEra';
import { evaluarLogros } from './evaluarLogros';

export async function completarImperio(data: {
  imperio_id: string;
  precision_promedio?: number;
}) {
  const usuario = await DatosDelAutenticado();
  if (!usuario) throw new UnauthorizedError();

  try {
    const imperio = await prisma.imperio.findUnique({
      where: { id: data.imperio_id },
      include: {
        niveles: { include: { _count: { select: { frases_nivel: true } } } },
        era: true,
      },
    });
    if (!imperio) throw new NotFoundError('Imperio', data.imperio_id);

    const yaCompletado = await prisma.imperioCompletado.findUnique({
      where: {
        usuario_id_imperio_id: {
          usuario_id: usuario.id,
          imperio_id: imperio.id,
        },
      },
    });
    if (yaCompletado) {
      return { ok: true, message: 'Imperio ya completado anteriormente', insignia: yaCompletado.insignia };
    }

    // Calcular promedio ponderado de todos los niveles del imperio
    const nivelesCompletados = await prisma.nivelCompletado.findMany({
      where: {
        usuario_id: usuario.id,
        nivel: { imperio_id: imperio.id },
      },
      include: {
        nivel: { include: { _count: { select: { frases_nivel: true } } } },
      },
    });

    const totalFrases = nivelesCompletados.reduce(
      (acc, nc) => acc + nc.nivel._count.frases_nivel, 0,
    );
    const sumaPonderada = nivelesCompletados.reduce(
      (acc, nc) => acc + nc.precision_promedio * nc.nivel._count.frases_nivel, 0,
    );
    const promedioPonderado = totalFrases > 0 ? sumaPonderada / totalFrases : (data.precision_promedio ?? 0);

    // Determinar insignia
    let insignia: 'NINGUNA' | 'BRONCE' | 'PLATA' | 'ORO' = 'NINGUNA';
    if (promedioPonderado >= imperio.umbral_oro) {
      insignia = 'ORO';
    } else if (promedioPonderado >= imperio.umbral_plata) {
      insignia = 'PLATA';
    } else if (promedioPonderado >= imperio.umbral_bronce) {
      insignia = 'BRONCE';
    }

    await prisma.imperioCompletado.create({
      data: {
        usuario_id: usuario.id,
        imperio_id: imperio.id,
        insignia,
        precision_promedio: promedioPonderado,
      },
    });

    // Buscar siguiente imperio en la misma era
		const siguiente = await prisma.imperio.findFirst({
      where: {
        era_id: imperio.era_id,
        orden: imperio.orden + 1,
      },
      include: {
        niveles: { orderBy: { orden: 'asc' as const }, take: 1 },
      },
    });

    let eraCompletada = undefined;

    if (siguiente) {
      const primerNivel = siguiente.niveles[0];
      if (primerNivel) {
        await prisma.progresoUsuario.update({
          where: { usuario_id: usuario.id },
          data: {
            imperio_actual_id: siguiente.id,
            nivel_actual_id: primerNivel.id,
          },
        });
      }
    } else {
      // Último imperio de la era → completar era
      eraCompletada = await completarEra({ era_id: imperio.era_id });
    }

    const logros = await evaluarLogros();

    return {
      ok: true,
      message: 'Imperio completado',
      insignia,
      promedio_ponderado: promedioPonderado,
      imperio_siguiente: siguiente ?? undefined,
      era_completada: eraCompletada,
      nuevos_logros: logros.ok ? logros.nuevos_logros : [],
    };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al completar imperio', error as Error);
    throw new DatabaseError('Error al completar imperio');
  }
}
