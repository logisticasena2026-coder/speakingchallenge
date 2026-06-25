'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerDashboardStats() {
  await requiereRol('ADMIN');

  try {
    const [totalEstudiantes, totalProfesores, totalFrases] = await Promise.all([
      prisma.user.count({ where: { rol: 'ESTUDIANTE' } }),
      prisma.user.count({ where: { rol: 'PROFESOR' } }),
      prisma.frasesDePractica.count(),
    ]);

    return { totalEstudiantes, totalProfesores, totalFrases, totalFrasesProfesor: 0 };
  } catch (error) {
    logger.error('Error al obtener stats admin', error as Error);
    throw new DatabaseError('Error al obtener estadísticas');
  }
}
