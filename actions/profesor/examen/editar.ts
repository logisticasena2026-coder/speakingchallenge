'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const EditarExamenSchema = z.object({
  titulo: z.string().min(1, 'El título es requerido').max(200),
  descripcion: z.string().max(1000).optional(),
});

export async function editarExamen(examenId: string, data: { titulo: string; descripcion?: string }) {
  const profesor = await requiereRol('PROFESOR');

  const parsed = EditarExamenSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const examen = await prisma.examen.findFirst({
      where: { id: examenId, profesor_id: profesor.id },
    });

    if (!examen) throw new NotFoundError('Examen');

    const duplicado = await prisma.examen.findFirst({
      where: {
        titulo: { equals: parsed.data.titulo, mode: 'insensitive' },
        profesor_id: profesor.id,
        id: { not: examenId },
      },
    });
    if (duplicado) {
      return { ok: false, message: 'Ya existe otro examen con ese título' };
    }

    await prisma.examen.update({
      where: { id: examenId },
      data: {
        titulo: parsed.data.titulo,
        descripcion: parsed.data.descripcion || null,
      },
    });

    revalidateTag('examenes', 'seconds');
    return { ok: true, message: 'Examen actualizado' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al editar examen', error as Error);
    throw new DatabaseError('Error al editar examen');
  }
}
