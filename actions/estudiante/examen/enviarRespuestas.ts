'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

interface Respuesta {
  pregunta_id: string;
  respuesta: string;
}

export async function enviarRespuestas(examenId: string, respuestas: Respuesta[]) {
  const estudiante = await requiereRol('ESTUDIANTE');

  try {
    const examen = await prisma.examen.findUnique({
      where: { id: examenId },
      include: { preguntas: { select: { id: true, respuesta_correcta: true } } },
    });

    if (!examen) throw new NotFoundError('Examen');

    const respuestasMap = new Map(respuestas.map(r => [r.pregunta_id, r.respuesta]));
    const correctas: string[] = [];

    for (const pregunta of examen.preguntas) {
      const userRespuesta = respuestasMap.get(pregunta.id);
      if (!userRespuesta) continue;

      const correcta = userRespuesta === pregunta.respuesta_correcta;
      if (correcta) correctas.push(pregunta.id);

      await prisma.respuestaEstudiante.upsert({
        where: {
          estudiante_id_pregunta_id: {
            estudiante_id: estudiante.id,
            pregunta_id: pregunta.id,
          },
        },
        update: {
          respuesta: userRespuesta,
          correcta,
        },
        create: {
          estudiante_id: estudiante.id,
          pregunta_id: pregunta.id,
          respuesta: userRespuesta,
          correcta,
        },
      });
    }

    revalidateTag('respuestas', 'seconds');
    return {
      ok: true,
      message: 'Respuestas guardadas',
      total: examen.preguntas.length,
      correctas: correctas.length,
    };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al enviar respuestas', error as Error);
    throw new DatabaseError('Error al enviar respuestas');
  }
}
