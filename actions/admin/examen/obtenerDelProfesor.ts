'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerExamenesDelProfesor(profesorId: string) {
  await requiereRol('ADMIN');

  try {
    return await prisma.examen.findMany({
      where: { profesor_id: profesorId },
      select: {
        id: true,
        titulo: true,
        descripcion: true,
        createdAt: true,
        _count: { select: { preguntas: true, asignaciones: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    logger.error('Error al obtener examenes del profesor', error as Error);
    throw new DatabaseError('Error al obtener examenes del profesor');
  }
}
