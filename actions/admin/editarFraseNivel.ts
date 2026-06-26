'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function editarFraseNivel(
  fraseId: number,
  data: {
    fraseIngles: string;
    fraseEspanol: string;
    dificultad: number;
    tematica: string;
  },
) {
  await requiereRol('ADMIN');

  if (!data.fraseIngles?.trim() || !data.fraseEspanol?.trim()) {
    return { ok: false, message: 'Inglés y Español son requeridos' };
  }

  try {
    const frase = await prisma.fraseNivel.findUnique({ where: { id: fraseId } });
    if (!frase) throw new NotFoundError('Frase de nivel');

    await prisma.fraseNivel.update({
      where: { id: fraseId },
      data: {
        fraseIngles: data.fraseIngles,
        fraseEspanol: data.fraseEspanol,
        dificultad: Math.max(1, Math.min(10, data.dificultad)),
        tematica: data.tematica,
      },
    });

    revalidateTag('frases', 'seconds');
    return { ok: true, message: 'Frase actualizada' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al editar frase de nivel', error as Error);
    throw new DatabaseError('Error al editar frase de nivel');
  }
}
