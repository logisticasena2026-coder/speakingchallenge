'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerGrupo(grupoId: string) {
  const profesor = await requiereRol('PROFESOR');

  try {
    const grupo = await prisma.grupo.findFirst({
      where: { id: grupoId, profesor_id: profesor.id },
      include: {
        miembros: {
          include: {
            estudiante: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                nivel: true,
                precicion_global: true,
              },
            },
          },
        },
        asignaciones: {
          include: {
            examen: {
              select: { id: true, titulo: true, _count: { select: { preguntas: true } } },
            },
          },
        },
        _count: { select: { miembros: true } },
      },
    });

    if (!grupo) throw new NotFoundError('Grupo');

    return grupo;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al obtener grupo', error as Error);
    throw new DatabaseError('Error al obtener grupo');
  }
}
