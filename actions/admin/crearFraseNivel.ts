'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function crearFraseNivel(data: {
  nivel_id: string;
  fraseIngles: string;
  fraseEspanol: string;
  dificultad: number;
  tematica: string;
}) {
  await requiereRol('ADMIN');

  if (!data.fraseIngles?.trim() || !data.fraseEspanol?.trim()) {
    return { ok: false, message: 'Inglés y Español son requeridos' };
  }

  try {
    await prisma.fraseNivel.create({
      data: {
        fraseIngles: data.fraseIngles,
        fraseEspanol: data.fraseEspanol,
        dificultad: Math.max(1, Math.min(10, data.dificultad)),
        tematica: data.tematica,
        creador: 'Admin',
        nivel_id: data.nivel_id,
      },
    });

    revalidateTag('frases', 'seconds');
    return { ok: true, message: 'Frase creada en el nivel' };
  } catch (error) {
    logger.error('Error al crear frase en nivel', error as Error);
    throw new DatabaseError('Error al crear frase en nivel');
  }
}
