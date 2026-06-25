'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { FraseSchema } from '@/schemas/admin/frase';

export async function crearFrase(data: {
  fraseIngles: string;
  fraseEspanol: string;
  dificultad: number;
  tematica: string;
  edad?: number | '';
}) {
  await requiereRol('ADMIN');

  const parsed = FraseSchema.safeParse({
    ...data,
    edad: data.edad === '' ? undefined : data.edad,
  });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    await prisma.frasesDePractica.create({
      data: {
        fraseIngles: parsed.data.fraseIngles,
        fraseEspanol: parsed.data.fraseEspanol,
        dificultad: parsed.data.dificultad,
        tematica: parsed.data.tematica,
        edad: parsed.data.edad === '' ? null : (parsed.data.edad ?? null),
        creador: 'Admin',
      },
    });

    revalidateTag('frases', 'seconds');
    return { ok: true, message: 'Frase creada' };
  } catch (error) {
    logger.error('Error admin crear frase', error as Error);
    throw new DatabaseError('Error al crear frase');
  }
}
