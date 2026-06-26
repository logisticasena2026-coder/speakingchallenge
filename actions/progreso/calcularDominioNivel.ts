'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function calcularDominioNivel(nivel_id: string) {
  const usuario = await DatosDelAutenticado();
  if (!usuario) return { precision_promedio: 0, frases_completadas: 0, total_frases: 0, todas_completadas: false };

  try {
    const nivel = await prisma.nivelProgresion.findUnique({
      where: { id: nivel_id },
      include: { _count: { select: { frases_nivel: true } } },
    });

    if (!nivel) throw new NotFoundError('Nivel', nivel_id);

    const frasesDelNivel = await prisma.fraseNivel.findMany({
      where: { nivel_id },
      select: { id: true },
    });

    const fraseIds = frasesDelNivel.map((f) => f.id);
    const total_frases = fraseIds.length;

    if (total_frases === 0) {
      return { precision_promedio: 0, frases_completadas: 0, total_frases: 0, todas_completadas: false };
    }

    const progresos = await prisma.progresoFraseNivelEstudiante.findMany({
      where: {
        estudiante_id: usuario.id,
        frase_id: { in: fraseIds },
      },
      select: { precision: true },
    });

    const frases_completadas = progresos.length;
    const sumaPrecision = progresos.reduce((acc, p) => acc + p.precision, 0);
    const precision_promedio = frases_completadas > 0 ? sumaPrecision / frases_completadas : 0;

    return {
      precision_promedio,
      frases_completadas,
      total_frases,
      todas_completadas: frases_completadas >= total_frases,
    };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al calcular dominio de nivel', error as Error);
    throw new DatabaseError('Error al calcular dominio de nivel');
  }
}
