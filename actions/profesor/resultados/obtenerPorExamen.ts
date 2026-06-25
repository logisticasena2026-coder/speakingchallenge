'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerPorExamen(examenId: string) {
  const profesor = await requiereRol('PROFESOR');

  try {
    const examen = await prisma.examen.findFirst({
      where: { id: examenId, profesor_id: profesor.id },
      include: {
        _count: { select: { preguntas: true } },
        preguntas: {
          orderBy: { orden: 'asc' },
          include: {
            respuestas: {
              include: {
                estudiante: { select: { id: true, name: true, email: true } },
              },
            },
          },
        },
      },
    });

    if (!examen) throw new NotFoundError('Examen');

    const totalEstudiantes = new Set(examen.preguntas.flatMap((p) => p.respuestas.map((r) => r.estudiante_id))).size;

    const respuestasPorEstudiante = new Map<string, { name: string; email: string; correctas: number; total: number; fecha: Date }>();

    for (const p of examen.preguntas) {
      for (const r of p.respuestas) {
        const prev = respuestasPorEstudiante.get(r.estudiante_id);
        const estudiante = r.estudiante;
        if (prev) {
          prev.total++;
          if (r.correcta) prev.correctas++;
          if (r.createdAt > prev.fecha) prev.fecha = r.createdAt;
        } else {
          respuestasPorEstudiante.set(r.estudiante_id, {
            name: estudiante.name,
            email: estudiante.email,
            correctas: r.correcta ? 1 : 0,
            total: 1,
            fecha: r.createdAt,
          });
        }
      }
    }

    const estudiantes = Array.from(respuestasPorEstudiante.entries())
      .map(([id, data]) => ({
        id,
        name: data.name,
        email: data.email,
        correctas: data.correctas,
        total: data.total,
        porcentaje: Math.round((data.correctas / data.total) * 100),
        ultimaRespuesta: data.fecha,
      }))
      .sort((a, b) => b.porcentaje - a.porcentaje);

    const totalRespuestasGlobal = examen.preguntas.reduce((s, p) => s + p.respuestas.length, 0);
    const correctasGlobal = examen.preguntas.reduce((s, p) => s + p.respuestas.filter((r) => r.correcta).length, 0);
    const promedioGlobal = totalRespuestasGlobal > 0 ? Math.round((correctasGlobal / totalRespuestasGlobal) * 100) : null;

    const puntajes = estudiantes.map((e) => e.porcentaje);
    const maxScore = puntajes.length > 0 ? Math.max(...puntajes) : null;
    const minScore = puntajes.length > 0 ? Math.min(...puntajes) : null;

    const distribucion = [0, 0, 0, 0, 0];
    for (const s of puntajes) {
      if (s <= 20) distribucion[0]++;
      else if (s <= 40) distribucion[1]++;
      else if (s <= 60) distribucion[2]++;
      else if (s <= 80) distribucion[3]++;
      else distribucion[4]++;
    }

    const preguntas = examen.preguntas.map((p) => {
      const total = p.respuestas.length;
      const correctas = p.respuestas.filter((r) => r.correcta).length;
      return {
        id: p.id,
        pregunta: p.pregunta,
        tipo: p.tipo,
        total,
        correctas,
        porcentaje: total > 0 ? Math.round((correctas / total) * 100) : null,
      };
    });

    const preguntasMasFaciles = [...preguntas].filter((p) => p.total > 0).sort((a, b) => (b.porcentaje ?? 0) - (a.porcentaje ?? 0));
    const preguntasMasDificiles = [...preguntasMasFaciles].reverse();

    return {
      examen: {
        id: examen.id,
        titulo: examen.titulo,
        descripcion: examen.descripcion,
        totalPreguntas: examen._count.preguntas,
      },
      totalEstudiantes,
      promedioGlobal,
      maxScore,
      minScore,
      distribucion,
      estudiantes,
      preguntas: preguntas.map((p) => ({
        id: p.id,
        pregunta: p.pregunta,
        tipo: p.tipo,
        total: p.total,
        correctas: p.correctas,
        porcentaje: p.porcentaje,
      })),
      preguntasMasFaciles: preguntasMasFaciles.slice(0, 3),
      preguntasMasDificiles: preguntasMasDificiles.slice(0, 3),
    };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al obtener resultados por examen', error as Error);
    throw new DatabaseError('Error al obtener resultados por examen');
  }
}
