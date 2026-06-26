'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado, requiereIngreso } from '@/lib/auth';
import { DatabaseError, UnauthorizedError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function inicializarProgreso() {
  const rol = await requiereIngreso();
  if (rol !== 'ESTUDIANTE') {
    return { ok: false, message: 'Solo estudiantes tienen progresión' };
  }

  const usuario = await DatosDelAutenticado();
  if (!usuario) throw new UnauthorizedError();

  try {
    const existente = await prisma.progresoUsuario.findUnique({
      where: { usuario_id: usuario.id },
    });
    if (existente) {
      return { ok: true, message: 'Progreso ya inicializado' };
    }

    const primeraEra = await prisma.era.findFirst({
      where: { orden: 1 },
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

    if (!primeraEra) throw new Error('No hay eras configuradas en el sistema');
    const primerImperio = primeraEra.imperios[0];
    if (!primerImperio) throw new Error('No hay imperios en la primera era');
    const primerNivel = primerImperio.niveles[0];
    if (!primerNivel) throw new Error('El primer imperio no tiene niveles');

    await prisma.progresoUsuario.create({
      data: {
        usuario_id: usuario.id,
        era_actual_id: primeraEra.id,
        imperio_actual_id: primerImperio.id,
        nivel_actual_id: primerNivel.id,
        estrato_social: 0,
      },
    });

    return { ok: true, message: 'Progreso inicializado' };
  } catch (error) {
    logger.error('Error al inicializar progreso', error as Error);
    throw new DatabaseError('Error al inicializar progreso');
  }
}
