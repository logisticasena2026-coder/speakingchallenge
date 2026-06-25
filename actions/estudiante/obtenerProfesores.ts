'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerProfesores() {
  const estudiante = await requiereRol('ESTUDIANTE');

  try {
    const relaciones = await prisma.estudianteProfesor.findMany({
      where: { estudiante_id: estudiante.id },
      include: {
        profesor: {
          select: { id: true, name: true, email: true, codigo_profesor: true },
        },
      },
    });

    return relaciones.map((r) => ({
      id: r.profesor.id,
      name: r.profesor.name,
      email: r.profesor.email,
      codigo_profesor: r.profesor.codigo_profesor,
      assignedAt: r.assignedAt,
    }));
  } catch (error) {
    logger.error('Error al obtener profesores', error as Error);
    throw new DatabaseError('Error al obtener profesores');
  }
}
