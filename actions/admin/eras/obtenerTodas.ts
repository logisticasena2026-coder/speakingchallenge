'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerTodasEras() {
  await requiereRol('ADMIN');

  try {
    const eras = await prisma.era.findMany({
      orderBy: { orden: 'asc' },
      include: {
        imperios: {
          orderBy: { orden: 'asc' },
          include: {
            niveles: {
              orderBy: { orden: 'asc' },
              include: {
                _count: { select: { frases_nivel: true } },
                frases_nivel: {
                  select: {
                    id: true,
                    fraseIngles: true,
                    fraseEspanol: true,
                    dificultad: true,
                    tematica: true,
                    creador: true,
                  },
                  orderBy: { Fec_Alta: 'desc' },
                  take: 100,
                },
              },
            },
          },
        },
      },
    });

    return { eras };
  } catch (error) {
    logger.error('Error al obtener eras', error as Error);
    throw new DatabaseError('Error al obtener eras');
  }
}
