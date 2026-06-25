'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerPorGrupo(grupoId: string) {
  const profesor = await requiereRol('PROFESOR');

  try {
    const grupo = await prisma.grupo.findFirst({
      where: { id: grupoId, profesor_id: profesor.id },
      include: {
        _count: { select: { miembros: true } },
        miembros: {
          include: {
            estudiante: {
              select: { id: true, name: true, email: true, nivel: true },
            },
          },
        },
        asignaciones: {
          include: {
            examen: {
              select: {
                id: true,
                titulo: true,
                _count: { select: { preguntas: true } },
                preguntas: {
                  select: {
                    id: true,
                    respuestas: {
                      select: { correcta: true, estudiante_id: true, createdAt: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!grupo) throw new NotFoundError('Grupo');

    const miembros = grupo.miembros.map((m) => ({
      id: m.estudiante.id,
      name: m.estudiante.name,
      email: m.estudiante.email,
      nivel: m.estudiante.nivel,
    }));

    const examenes = grupo.asignaciones.map((asig) => {
      const miembrosEnExamen = miembros.map((miembro) => {
        let correctas = 0;
        let total = 0;
        let fecha: Date | null = null;

        for (const p of asig.examen.preguntas) {
          for (const r of p.respuestas) {
            if (r.estudiante_id === miembro.id) {
              total++;
              if (r.correcta) correctas++;
              if (!fecha || r.createdAt > fecha) fecha = r.createdAt;
            }
          }
        }

        return {
          estudianteId: miembro.id,
          name: miembro.name,
          correctas,
          total,
          porcentaje: total > 0 ? Math.round((correctas / total) * 100) : null,
          fecha,
        };
      });

      const completados = miembrosEnExamen.filter((m) => m.total > 0);
      const totalRespuestas = completados.reduce((s, m) => s + m.total, 0);
      const totalCorrectas = completados.reduce((s, m) => s + m.correctas, 0);
      const promedio = totalRespuestas > 0 ? Math.round((totalCorrectas / totalRespuestas) * 100) : null;

      return {
        examenId: asig.examen.id,
        titulo: asig.examen.titulo,
        totalPreguntas: asig.examen._count.preguntas,
        promedioGrupo: promedio,
        completados: completados.length,
        miembros: miembrosEnExamen,
      };
    });

    const totalRespuestasGlobal = examenes.reduce((s, e) => s + e.miembros.reduce((s2, m) => s2 + m.total, 0), 0);
    const totalCorrectasGlobal = examenes.reduce((s, e) => s + e.miembros.reduce((s2, m) => s2 + m.correctas, 0), 0);
    const promedioGlobal = totalRespuestasGlobal > 0 ? Math.round((totalCorrectasGlobal / totalRespuestasGlobal) * 100) : null;

    return {
      grupo: {
        id: grupo.id,
        nombre: grupo.nombre,
        totalMiembros: grupo._count.miembros,
      },
      miembros,
      examenes,
      promedioGlobal,
    };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al obtener resultados por grupo', error as Error);
    throw new DatabaseError('Error al obtener resultados por grupo');
  }
}
