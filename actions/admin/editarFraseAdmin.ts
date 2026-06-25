'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { FraseEditSchema } from '@/schemas/admin/frase';

export async function editarFraseAdmin(
  fraseId: number,
  data: {
    fraseIngles: string;
    fraseEspanol: string;
    dificultad: number;
    tematica: string;
    edad?: number | '' | null;
  }
) {
  await requiereRol('ADMIN');

  const parsed = FraseEditSchema.safeParse({
    ...data,
    edad: data.edad === '' ? null : data.edad,
  });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const frase = await prisma.frasesDePractica.findUnique({ where: { id: fraseId } });
    if (!frase) throw new NotFoundError('Frase');

    await prisma.frasesDePractica.update({
      where: { id: fraseId },
      data: {
        fraseIngles: parsed.data.fraseIngles,
        fraseEspanol: parsed.data.fraseEspanol,
        dificultad: parsed.data.dificultad,
        tematica: parsed.data.tematica,
        edad: parsed.data.edad === '' ? null : (parsed.data.edad ?? null),
      },
    });

    revalidateTag('frases', 'seconds');
    return { ok: true, message: 'Frase actualizada' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error admin editar frase', error as Error);
    throw new DatabaseError('Error al editar frase');
  }
}
