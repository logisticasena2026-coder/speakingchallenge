'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const EditarPreguntaSchema = z.object({
  tipo: z.enum(['MULTIPLE_CHOICE', 'TRUE_FALSE']),
  pregunta: z.string().min(1, 'La pregunta es requerida').max(1000),
  opciones: z.array(z.object({ label: z.string(), text: z.string() })).optional(),
  respuesta_correcta: z.string().min(1, 'La respuesta correcta es requerida'),
});

export async function editarPregunta(preguntaId: string, data: z.infer<typeof EditarPreguntaSchema>) {
  const profesor = await requiereRol('PROFESOR');

  const parsed = EditarPreguntaSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const pregunta = await prisma.pregunta.findUnique({
      where: { id: preguntaId },
      include: { examen: { select: { profesor_id: true } } },
    });

    if (!pregunta || pregunta.examen.profesor_id !== profesor.id) {
      throw new NotFoundError('Pregunta');
    }

    const actualizada = await prisma.pregunta.update({
      where: { id: preguntaId },
      data: {
        tipo: parsed.data.tipo,
        pregunta: parsed.data.pregunta,
        opciones: parsed.data.opciones ?? undefined,
        respuesta_correcta: parsed.data.respuesta_correcta,
      },
    });

    revalidateTag('preguntas', 'seconds');
    return {
      ok: true,
      message: 'Pregunta actualizada',
      pregunta: {
        id: actualizada.id,
        tipo: actualizada.tipo,
        pregunta: actualizada.pregunta,
        opciones: actualizada.opciones as { label: string; text: string }[] | null,
        respuesta_correcta: actualizada.respuesta_correcta,
        orden: actualizada.orden,
      },
    };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al editar pregunta', error as Error);
    throw new DatabaseError('Error al editar pregunta');
  }
}
