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

export async function obtenerUsuarios(rol: 'ESTUDIANTE' | 'PROFESOR', opts?: PaginacionOpts) {
  await requiereRol('ADMIN');

  const pagina = Math.max(1, opts?.pagina ?? 1);
  const limite = Math.max(1, Math.min(100, opts?.limite ?? 20));
  const skip = (pagina - 1) * limite;
  const buscar = opts?.buscar?.trim();

  const whereBase = { rol };

  const where = buscar
    ? {
        ...whereBase,
        OR: [
          { name: { contains: buscar, mode: 'insensitive' as const } },
          { email: { contains: buscar, mode: 'insensitive' as const } },
        ],
      }
    : whereBase;

  try {
    const [usuarios, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limite,
        select: {
          id: true,
          name: true,
          email: true,
          rol: true,
          nivel: true,
          frases: true,
          precicion_global: true,
          dias_racha: true,
          tiempo_promedio: true,
          createdAt: true,
          ultima_sesion: true,
          codigo_profesor: true,
          _count: {
            select: {
              progreso_frases: true,
              estudiantes_asignados: true,
              profesores_asignados: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      usuarios,
      total,
      paginaActual: pagina,
      totalPages: Math.ceil(total / limite),
    };
  } catch (error) {
    logger.error('Error al obtener usuarios', error as Error);
    throw new DatabaseError('Error al obtener usuarios');
  }
}
