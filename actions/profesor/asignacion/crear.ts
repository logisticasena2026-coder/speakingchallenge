'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const CrearAsignacionSchema = z.object({
  examen_id: z.string().min(1),
  grupo_id: z.string().optional(),
  estudiante_id: z.string().optional(),
}).refine(d => d.grupo_id || d.estudiante_id, {
  message: 'Debe asignar a un grupo o a un estudiante',
});

export async function crearAsignacion(data: z.infer<typeof CrearAsignacionSchema>) {
  const profesor = await requiereRol('PROFESOR');

  const parsed = CrearAsignacionSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const examen = await prisma.examen.findFirst({
      where: { id: parsed.data.examen_id, profesor_id: profesor.id },
    });
    if (!examen) throw new NotFoundError('Examen');

    if (parsed.data.grupo_id) {
      const grupo = await prisma.grupo.findFirst({
        where: { id: parsed.data.grupo_id, profesor_id: profesor.id },
      });
      if (!grupo) throw new NotFoundError('Grupo');

      const yaAsignado = await prisma.asignacionExamen.findFirst({
        where: {
          examen_id: parsed.data.examen_id,
          grupo_id: parsed.data.grupo_id,
        },
      });
      if (yaAsignado) {
        return { ok: false, message: 'Este examen ya está asignado a este grupo' };
      }
    }

    await prisma.asignacionExamen.create({
      data: {
        examen_id: parsed.data.examen_id,
        grupo_id: parsed.data.grupo_id || null,
        estudiante_id: parsed.data.estudiante_id || null,
      },
    });

    revalidateTag('asignaciones', 'seconds');
    return { ok: true, message: 'Examen asignado exitosamente' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al crear asignación', error as Error);
    throw new DatabaseError('Error al crear asignación');
  }
}
