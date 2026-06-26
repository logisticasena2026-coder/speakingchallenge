'use server';

import prisma from '@/lib/prisma';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { cacheLife, cacheTag } from 'next/cache';

export async function obtenerFrases(
  offset: number,
  take: number = 50,
  dificultad?: number | '',
  tematica?: string,
  edad?: number | '',
  creador?: string,
  nivel_id?: string,
) {
  'use cache'
  cacheLife('minutes')
  cacheTag('frases')

  const where: Record<string, unknown> = {};
  if (dificultad) where.dificultad = Number(dificultad);
  if (tematica) where.tematica = tematica;
  if (edad) where.edad = Number(edad);
  if (creador) where.creador = creador;

  try {
    if (nivel_id) {
      where.nivel_id = nivel_id;
      return await prisma.fraseNivel.findMany({
        skip: offset,
        take,
        where,
        select: {
          id: true,
          fraseIngles: true,
          fraseEspanol: true,
          dificultad: true,
          tematica: true,
        },
        orderBy: { id: 'asc' },
      });
    }

    return await prisma.frasesDePractica.findMany({
      skip: offset,
      take,
      where,
      select: {
        id: true,
        fraseIngles: true,
        fraseEspanol: true,
        dificultad: true,
        tematica: true,
      },
      orderBy: { id: 'asc' },
    });
  } catch (error) {
    logger.error('Error al obtener frases', error as Error);
    throw new DatabaseError('Error al obtener frases');
  }
}

export async function contarFrases(
  dificultad?: number | '',
  tematica?: string,
  edad?: number | '',
  creador?: string,
  nivel_id?: string,
) {
  'use cache'
  cacheLife('minutes')
  cacheTag('frases')

  const where: Record<string, unknown> = {};
  if (dificultad) where.dificultad = Number(dificultad);
  if (tematica) where.tematica = tematica;
  if (edad) where.edad = Number(edad);
  if (creador) where.creador = creador;

  try {
    if (nivel_id) {
      where.nivel_id = nivel_id;
      return await prisma.fraseNivel.count({ where });
    }

    return await prisma.frasesDePractica.count({ where });
  } catch (error) {
    logger.error('Error al contar frases', error as Error);
    throw new DatabaseError('Error al contar frases');
  }
}

export async function obtenerCreadores(): Promise<string[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('frases-metadata')
  try {
    const result = await prisma.frasesDePractica.findMany({
      select: { creador: true },
      distinct: ['creador'],
      orderBy: { creador: 'asc' },
    });
    return result.map((r) => r.creador);
  } catch (error) {
    logger.error('Error al obtener creadores', error as Error);
    throw new DatabaseError('Error al obtener creadores');
  }
}

export async function obtenerTematicas(): Promise<string[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('frases-metadata')
  try {
    const result = await prisma.frasesDePractica.findMany({
      select: { tematica: true },
      distinct: ['tematica'],
      orderBy: { tematica: 'asc' },
    });
    return result.map((r) => r.tematica);
  } catch (error) {
    logger.error('Error al obtener tematicas', error as Error);
    throw new DatabaseError('Error al obtener tematicas');
  }
}

export async function obtenerDificultades(): Promise<number[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('frases-metadata')
  try {
    const result = await prisma.frasesDePractica.findMany({
      select: { dificultad: true },
      distinct: ['dificultad'],
      orderBy: { dificultad: 'asc' },
    });
    return result.map((r) => r.dificultad);
  } catch (error) {
    logger.error('Error al obtener dificultades', error as Error);
    throw new DatabaseError('Error al obtener dificultades');
  }
}

export async function obtenerOpcionesFiltros(opts: {
  tematica?: string;
  dificultad?: number;
  edad?: number;
  creador?: string;
}) {
  'use cache'
  cacheLife('minutes')
  cacheTag('frases')

  const buildWhere = (exclude: string) => {
    const where: Record<string, unknown> = {};
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

export async function obtenerEdades(): Promise<number[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('frases-metadata')
  try {
    const result = await prisma.frasesDePractica.findMany({
      select: { edad: true },
      distinct: ['edad'],
      orderBy: { edad: 'asc' },
    });
    return result.filter((r) => r.edad !== null).map((r) => r.edad!);
  } catch (error) {
    logger.error('Error al obtener edades', error as Error);
    throw new DatabaseError('Error al obtener edades');
  }
}
