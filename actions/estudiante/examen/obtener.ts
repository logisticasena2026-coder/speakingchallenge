'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerExamenConPreguntas(examenId: string) {
  const estudiante = await requiereRol('ESTUDIANTE');

  try {
    const examen = await prisma.examen.findUnique({
      where: { id: examenId },
      include: {
        preguntas: {
          orderBy: { orden: 'asc' },
          select: {
            id: true,
            tipo: true,
            pregunta: true,
            opciones: true,
            orden: true,
          },
        },
        profesor: { select: { name: true } },
      },
    });

    if (!examen) throw new NotFoundError('Examen');

    const preguntas = examen.preguntas.map((p) => ({
      ...p,
      opciones: p.opciones as { label: string; text: string }[] | null,
    }));

    const respuestas = await prisma.respuestaEstudiante.findMany({
      where: {
        estudiante_id: estudiante.id,
        pregunta_id: { in: examen.preguntas.map(p => p.id) },
      },
      select: { pregunta_id: true, respuesta: true, correcta: true },
    });

    return {
      ...examen,
      preguntas,
      completado: respuestas.length >= preguntas.length,
      respuestas: respuestas.reduce((acc, r) => {
        acc[r.pregunta_id] = { respuesta: r.respuesta, correcta: r.correcta };
        return acc;
      }, {} as Record<string, { respuesta: string; correcta: boolean }>),
    };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al obtener examen', error as Error);
    throw new DatabaseError('Error al obtener examen');
  }
}
