'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const CrearExamenSchema = z.object({
  titulo: z.string().min(1, 'El título es requerido').max(200),
  descripcion: z.string().max(1000).optional(),
});

export async function crearExamen(data: { titulo: string; descripcion?: string }) {
  const profesor = await requiereRol('PROFESOR');

  const parsed = CrearExamenSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const duplicado = await prisma.examen.findFirst({
      where: { titulo: { equals: parsed.data.titulo, mode: 'insensitive' }, profesor_id: profesor.id },
    });
    if (duplicado) {
      return { ok: false, message: 'Ya existe un examen con ese título' };
    }

    const examen = await prisma.examen.create({
      data: {
        titulo: parsed.data.titulo,
        descripcion: parsed.data.descripcion || null,
        profesor_id: profesor.id,
      },
    });

    revalidateTag('examenes', 'seconds');
    return { ok: true, message: 'Examen creado', id: examen.id };
  } catch (error) {
    logger.error('Error al crear examen', error as Error);
    throw new DatabaseError('Error al crear examen');
  }
}
