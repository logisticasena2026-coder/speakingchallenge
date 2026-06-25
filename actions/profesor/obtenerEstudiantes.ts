'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerEstudiantes() {
  const profesor = await requiereRol('PROFESOR');

  try {
    const ids = await prisma.estudianteProfesor.findMany({
      where: { profesor_id: profesor.id },
      select: { estudiante_id: true },
    });
    return await prisma.user.findMany({
      where: { id: { in: ids.map((r) => r.estudiante_id) }, rol: 'ESTUDIANTE' },
      select: {
        id: true,
        name: true,
        email: true,
        nivel: true,
        frases: true,
        precicion_global: true,
        dias_racha: true,
        ultima_sesion: true,
        createdAt: true,
        _count: {
          select: { progreso_frases: true, respuestas_examen: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    logger.error('Error al obtener estudiantes', error as Error);
    throw new DatabaseError('Error al obtener estudiantes');
  }
}
