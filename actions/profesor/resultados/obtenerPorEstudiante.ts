'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerPorEstudiante(estudianteId: string) {
  const profesor = await requiereRol('PROFESOR');

  try {
    const vinculado = await prisma.estudianteProfesor.findUnique({
      where: { estudiante_id_profesor_id: { estudiante_id: estudianteId, profesor_id: profesor.id } },
    });
    if (!vinculado) throw new NotFoundError('Estudiante');

    const estudiante = await prisma.user.findUnique({
      where: { id: estudianteId },
      select: { id: true, name: true, email: true, nivel: true, precicion_global: true, dias_racha: true },
    });
    if (!estudiante) throw new NotFoundError('Estudiante');

    const respuestas = await prisma.respuestaEstudiante.findMany({
      where: { estudiante_id: estudianteId },
      include: {
        pregunta: {
          select: {
            id: true,
            examen_id: true,
            examen: { select: { id: true, titulo: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const examenesMap = new Map<string, { examenId: string; titulo: string; correctas: number; total: number; fecha: Date }>();

    for (const r of respuestas) {
      const examenId = r.pregunta.examen_id;
      const prev = examenesMap.get(examenId);
      if (prev) {
        prev.total++;
        if (r.correcta) prev.correctas++;
        if (r.createdAt > prev.fecha) prev.fecha = r.createdAt;
      } else {
        examenesMap.set(examenId, {
          examenId,
          titulo: r.pregunta.examen.titulo,
          correctas: r.correcta ? 1 : 0,
          total: 1,
          fecha: r.createdAt,
        });
      }
    }

    const examenes = Array.from(examenesMap.values())
      .map((e) => ({
        examenId: e.examenId,
        titulo: e.titulo,
        correctas: e.correctas,
        total: e.total,
        porcentaje: Math.round((e.correctas / e.total) * 100),
        fecha: e.fecha,
      }))
      .sort((a, b) => b.fecha.getTime() - a.fecha.getTime());

    const totalCorrectas = examenes.reduce((s, e) => s + e.correctas, 0);
    const totalRespuestas = examenes.reduce((s, e) => s + e.total, 0);
    const promedioGlobal = totalRespuestas > 0 ? Math.round((totalCorrectas / totalRespuestas) * 100) : null;

    return {
      estudiante: {
        id: estudiante.id,
        name: estudiante.name,
        email: estudiante.email,
        nivel: estudiante.nivel,
        precicion_global: estudiante.precicion_global,
        dias_racha: estudiante.dias_racha,
      },
      totalExamenes: examenes.length,
      promedioGlobal,
      examenes,
    };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al obtener resultados por estudiante', error as Error);
    throw new DatabaseError('Error al obtener resultados por estudiante');
  }
}
