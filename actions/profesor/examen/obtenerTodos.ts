'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';

interface PaginacionOpts {
  pagina?: number;
  limite?: number;
  buscar?: string;
}

export async function obtenerTodosExamenes(opts?: PaginacionOpts) {
  const profesor = await requiereRol('PROFESOR');

  const pagina = Math.max(1, opts?.pagina ?? 1);
  const limite = Math.max(1, Math.min(100, opts?.limite ?? 20));
  const skip = (pagina - 1) * limite;
  const buscar = opts?.buscar?.trim();

  const whereBase = { profesor_id: profesor.id };
  const where = buscar
    ? {
        ...whereBase,
        OR: [
          { titulo: { contains: buscar, mode: 'insensitive' as const } },
          { descripcion: { contains: buscar, mode: 'insensitive' as const } },
        ],
      }
    : whereBase;

  try {
    const [examenes, total] = await Promise.all([
      prisma.examen.findMany({
        where,
        skip,
        take: limite,
        include: {
          _count: { select: { preguntas: true, asignaciones: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.examen.count({ where }),
    ]);

    return {
      examenes,
      total,
      paginaActual: pagina,
      totalPages: Math.ceil(total / limite),
    };
  } catch (error) {
    logger.error('Error al obtener examenes', error as Error);
    throw new DatabaseError('Error al obtener examenes');
  }
}
