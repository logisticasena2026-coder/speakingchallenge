'use server';

import prisma from '@/lib/prisma';

export async function obtenerFrases(offset: number, take: number = 50) {
  return await prisma.frasesDePractica.findMany({
    skip: offset,
    take,
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

export async function contarFrases() {
  return await prisma.frasesDePractica.count();
}
