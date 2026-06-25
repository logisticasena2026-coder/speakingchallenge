'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const CrearPreguntaSchema = z.object({
  examen_id: z.string().min(1),
  tipo: z.enum(['MULTIPLE_CHOICE', 'TRUE_FALSE']),
  pregunta: z.string().min(1, 'La pregunta es requerida').max(1000),
  opciones: z.array(z.object({ label: z.string(), text: z.string() })).optional(),
  respuesta_correcta: z.string().min(1, 'La respuesta correcta es requerida'),
});

export async function crearPregunta(data: z.infer<typeof CrearPreguntaSchema>) {
  const profesor = await requiereRol('PROFESOR');

  const parsed = CrearPreguntaSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const examen = await prisma.examen.findFirst({
      where: { id: parsed.data.examen_id, profesor_id: profesor.id },
    });
    if (!examen) throw new NotFoundError('Examen');

    const ultimoOrden = await prisma.pregunta.findFirst({
      where: { examen_id: parsed.data.examen_id },
      orderBy: { orden: 'desc' },
      select: { orden: true },
    });

    const pregunta = await prisma.pregunta.create({
      data: {
        examen_id: parsed.data.examen_id,
        tipo: parsed.data.tipo,
        pregunta: parsed.data.pregunta,
        opciones: parsed.data.opciones ?? undefined,
        respuesta_correcta: parsed.data.respuesta_correcta,
        orden: (ultimoOrden?.orden ?? -1) + 1,
      },
    });

    revalidateTag('preguntas', 'seconds');
    return {
      ok: true,
      message: 'Pregunta creada',
      pregunta: {
        id: pregunta.id,
        tipo: pregunta.tipo,
        pregunta: pregunta.pregunta,
        opciones: pregunta.opciones as { label: string; text: string }[] | null,
        respuesta_correcta: pregunta.respuesta_correcta,
        orden: pregunta.orden,
      },
    };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al crear pregunta', error as Error);
    throw new DatabaseError('Error al crear pregunta');
  }
}
