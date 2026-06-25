'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';

interface PaginacionOpts {
  pagina?: number;
  limite?: number;
  buscar?: string;
  tematica?: string;
  dificultad?: number;
  edad?: number;
  creador?: string;
}

export async function obtenerTodasFrases(opts?: PaginacionOpts) {
  await requiereRol('ADMIN');

  const pagina = Math.max(1, opts?.pagina ?? 1);
  const limite = Math.max(1, Math.min(100, opts?.limite ?? 20));
  const skip = (pagina - 1) * limite;
  const buscar = opts?.buscar?.trim();

  try {
    const filtros: Record<string, unknown>[] = [];

    if (opts?.tematica) filtros.push({ tematica: opts.tematica });
    if (opts?.dificultad) filtros.push({ dificultad: opts.dificultad });
    if (opts?.edad) filtros.push({ edad: opts.edad });
    if (opts?.creador) filtros.push({ creador: opts.creador });

    if (buscar) {
      filtros.push({
        OR: [
          { fraseIngles: { contains: buscar, mode: 'insensitive' as const } },
          { fraseEspanol: { contains: buscar, mode: 'insensitive' as const } },
          { tematica: { contains: buscar, mode: 'insensitive' as const } },
        ],
      });
    }

    const where = filtros.length > 0 ? { AND: filtros } : {};

    const [frases, total] = await Promise.all([
      prisma.frasesDePractica.findMany({
        where,
        skip,
        take: limite,
        select: {
          id: true,
          fraseIngles: true,
          fraseEspanol: true,
          dificultad: true,
          tematica: true,
          creador: true,
          Fec_Alta: true,
          _count: { select: { progreso: true } },
        },
        orderBy: { Fec_Alta: 'desc' },
      }),
      prisma.frasesDePractica.count({ where }),
    ]);

    return {
      frases,
      total,
      paginaActual: pagina,
      totalPages: Math.ceil(total / limite),
    };
  } catch (error) {
    logger.error('Error al obtener frases admin', error as Error);
    throw new DatabaseError('Error al obtener frases');
  }
}
