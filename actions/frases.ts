'use server';

import prisma from '@/lib/prisma';

export async function obtenerFrases(
  offset: number,
  take: number = 50,
  dificultad?: number | '',
  tematica?: string,
  edad?: number | '',
  creador?: string,
) {
  const where: Record<string, unknown> = {};
  if (dificultad) where.dificultad = Number(dificultad);
  if (tematica) where.tematica = tematica;
  if (edad) where.edad = Number(edad);
  if (creador) where.creador = creador;

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
}

export async function contarFrases(
  dificultad?: number | '',
  tematica?: string,
  edad?: number | '',
  creador?: string,
) {
  const where: Record<string, unknown> = {};
  if (dificultad) where.dificultad = Number(dificultad);
  if (tematica) where.tematica = tematica;
  if (edad) where.edad = Number(edad);
  if (creador) where.creador = creador;

  return await prisma.frasesDePractica.count({ where });
}

export async function obtenerCreadores(): Promise<string[]> {
  const result = await prisma.frasesDePractica.findMany({
    select: { creador: true },
    distinct: ['creador'],
    orderBy: { creador: 'asc' },
  });
  return result.map((r) => r.creador);
}

export async function obtenerTematicas(): Promise<string[]> {
  const result = await prisma.frasesDePractica.findMany({
    select: { tematica: true },
    distinct: ['tematica'],
    orderBy: { tematica: 'asc' },
  });
  return result.map((r) => r.tematica);
}

export async function obtenerDificultades(): Promise<number[]> {
  const result = await prisma.frasesDePractica.findMany({
    select: { dificultad: true },
    distinct: ['dificultad'],
    orderBy: { dificultad: 'asc' },
  });
  return result.map((r) => r.dificultad);
}

export async function obtenerEdades(): Promise<number[]> {
  const result = await prisma.frasesDePractica.findMany({
    select: { edad: true },
    distinct: ['edad'],
    orderBy: { edad: 'asc' },
  });
  return result.filter((r) => r.edad !== null).map((r) => r.edad!);
}
