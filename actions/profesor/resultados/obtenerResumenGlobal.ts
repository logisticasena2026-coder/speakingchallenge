'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerResumenGlobal() {
  const profesor = await requiereRol('PROFESOR');

  try {
    const [totalExamenes, totalEstudiantes, totalGrupos] = await Promise.all([
      prisma.examen.count({ where: { profesor_id: profesor.id } }),
      prisma.estudianteProfesor.count({ where: { profesor_id: profesor.id } }),
      prisma.grupo.count({ where: { profesor_id: profesor.id } }),
    ]);

    const examenes = await prisma.examen.findMany({
      where: { profesor_id: profesor.id },
      select: {
        id: true,
        titulo: true,
        _count: { select: { preguntas: true } },
        preguntas: {
          select: {
            id: true,
            respuestas: {
              select: { correcta: true, estudiante_id: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const examenesConStats = examenes.map((e) => {
      const totalRespuestas = e.preguntas.reduce((s, p) => s + p.respuestas.length, 0);
      const correctas = e.preguntas.reduce((s, p) => s + p.respuestas.filter((r) => r.correcta).length, 0);
      const estudiantesUnicos = new Set(e.preguntas.flatMap((p) => p.respuestas.map((r) => r.estudiante_id)));

      const preguntas = e.preguntas.map((p) => ({
        id: p.id,
        total: p.respuestas.length,
        correctas: p.respuestas.filter((r) => r.correcta).length,
        porcentaje: p.respuestas.length > 0 ? Math.round((p.respuestas.filter((r) => r.correcta).length / p.respuestas.length) * 100) : null,
      }));

      const preguntaMasDificil = preguntas.filter((p) => p.total > 0).sort((a, b) => (a.porcentaje ?? 0) - (b.porcentaje ?? 0))[0] ?? null;

      return {
        id: e.id,
        titulo: e.titulo,
        totalPreguntas: e._count.preguntas,
        completados: estudiantesUnicos.size,
        promedio: totalRespuestas > 0 ? Math.round((correctas / totalRespuestas) * 100) : null,
        preguntaMasDificil,
      };
    });

    const estudiantesQueRespondieron = new Set<string>();
    for (const e of examenes) {
      for (const p of e.preguntas) {
        for (const r of p.respuestas) {
          estudiantesQueRespondieron.add(r.estudiante_id);
        }
      }
    }

    const grupos = await prisma.grupo.findMany({
      where: { profesor_id: profesor.id },
      select: {
        id: true,
        nombre: true,
        _count: { select: { miembros: true } },
        miembros: { select: { estudiante_id: true } },
        asignaciones: {
          select: {
            id: true,
            examen: {
              select: {
                preguntas: {
                  select: {
                    respuestas: {
                      select: { correcta: true, estudiante_id: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const gruposConStats = grupos.map((g) => {
      const idsMiembros = new Set(g.miembros.map((m) => m.estudiante_id));
      let totalRespuestas = 0;
      let correctas = 0;
      const estudiantesQueCompletaron = new Set<string>();

      for (const asig of g.asignaciones) {
        for (const p of asig.examen.preguntas) {
          for (const r of p.respuestas) {
            if (idsMiembros.has(r.estudiante_id)) {
              totalRespuestas++;
              if (r.correcta) correctas++;
              estudiantesQueCompletaron.add(r.estudiante_id);
            }
          }
        }
      }

      return {
        id: g.id,
        nombre: g.nombre,
        totalMiembros: g._count.miembros,
        completados: estudiantesQueCompletaron.size,
        promedio: totalRespuestas > 0 ? Math.round((correctas / totalRespuestas) * 100) : null,
      };
    });

    return {
      totalExamenes,
      totalEstudiantes,
      totalGrupos,
      estudiantesConRespuestas: estudiantesQueRespondieron.size,
      examenes: examenesConStats,
      grupos: gruposConStats,
    };
  } catch (error) {
    logger.error('Error al obtener resumen global', error as Error);
    throw new DatabaseError('Error al obtener resumen global');
  }
}
