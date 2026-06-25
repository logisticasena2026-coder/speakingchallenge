'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';

interface FiltrosOpts {
  tematica?: string;
  dificultad?: number;
  edad?: number;
  creador?: string;
  buscar?: string;
}

export async function obtenerOpcionesFiltros(opts: FiltrosOpts) {
  await requiereRol('ADMIN');

  const buildWhere = (exclude: string) => {
    const where: Record<string, unknown> = {};

    if (opts.buscar) {
      where.OR = [
        { fraseIngles: { contains: opts.buscar, mode: 'insensitive' as const } },
        { fraseEspanol: { contains: opts.buscar, mode: 'insensitive' as const } },
        { tematica: { contains: opts.buscar, mode: 'insensitive' as const } },
      ];
    }

    if (opts.tematica && exclude !== 'tematica') where.tematica = opts.tematica;
    if (opts.dificultad && exclude !== 'dificultad') where.dificultad = opts.dificultad;
    if (opts.edad && exclude !== 'edad') where.edad = opts.edad;
    if (opts.creador && exclude !== 'creador') where.creador = opts.creador;

    return where;
  };

  try {
    const [tematicas, dificultades, edades, creadores] = await Promise.all([
      prisma.frasesDePractica.findMany({
        where: buildWhere('tematica'),
        distinct: ['tematica'],
        select: { tematica: true },
        orderBy: { tematica: 'asc' },
      }),
      prisma.frasesDePractica.findMany({
        where: buildWhere('dificultad'),
        distinct: ['dificultad'],
        select: { dificultad: true },
        orderBy: { dificultad: 'asc' },
      }),
      prisma.frasesDePractica.findMany({
        where: buildWhere('edad'),
        distinct: ['edad'],
        select: { edad: true },
        orderBy: { edad: 'asc' },
      }),
      prisma.frasesDePractica.findMany({
        where: buildWhere('creador'),
        distinct: ['creador'],
        select: { creador: true },
        orderBy: { creador: 'asc' },
      }),
    ]);

    return {
      tematicas: tematicas.map((t) => t.tematica).filter(Boolean),
      dificultades: dificultades.map((d) => d.dificultad),
      edades: edades.filter((e) => e.edad !== null).map((e) => e.edad!),
      creadores: creadores.map((c) => c.creador).filter(Boolean),
    };
  } catch (error) {
    logger.error('Error al obtener opciones de filtros', error as Error);
    throw new DatabaseError('Error al obtener opciones de filtros');
  }
}
