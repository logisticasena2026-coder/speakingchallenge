'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado, requiereIngreso } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { inicializarProgreso } from './inicializarProgreso';

export async function obtenerEstadoProgreso() {
  const rol = await requiereIngreso();
  if (rol !== 'ESTUDIANTE') {
    return { ok: false, message: 'Solo estudiantes tienen progresión' };
  }

  const usuario = await DatosDelAutenticado();
  if (!usuario) throw new Error('No autenticado');

  try {
    let progreso = await prisma.progresoUsuario.findUnique({
      where: { usuario_id: usuario.id },
      include: {
        era_actual: true,
        imperio_actual: true,
        nivel_actual: {
          include: { _count: { select: { frases_nivel: true } } },
        },
      },
    });

    if (!progreso) {
      const res = await inicializarProgreso();
      if (!res.ok) throw new Error(res.message);
      progreso = await prisma.progresoUsuario.findUnique({
        where: { usuario_id: usuario.id },
        include: {
          era_actual: true,
          imperio_actual: true,
          nivel_actual: {
            include: { _count: { select: { frases_nivel: true } } },
          },
        },
      });
    }

    const [eras, erasCompletadas, imperiosCompletados, nivelesCompletados, logrosData] = await Promise.all([
      prisma.era.findMany({
        orderBy: { orden: 'asc' },
        include: {
          imperios: {
            orderBy: { orden: 'asc' },
            include: {
              _count: { select: { niveles: true } },
              niveles: {
                orderBy: { orden: 'asc' },
                select: { id: true, orden: true, _count: { select: { frases_nivel: true } } },
              },
            },
          },
        },
      }),
      prisma.eraCompletada.findMany({
        where: { usuario_id: usuario.id },
        select: { era_id: true },
      }),
      prisma.imperioCompletado.findMany({
        where: { usuario_id: usuario.id },
        select: { imperio_id: true, insignia: true },
      }),
      prisma.nivelCompletado.findMany({
        where: { usuario_id: usuario.id },
        select: { nivel_id: true, precision_promedio: true },
      }),
      prisma.logroDesbloqueado.findMany({
        where: { usuario_id: usuario.id },
        select: {
          logro_id: true,
          created_at: true,
          logro: {
            select: {
              id: true,
              nombre: true,
              descripcion: true,
              icono: true,
              tipo: true,
              valor: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
    ]);

    const erasCompletadasSet = new Set(erasCompletadas.map((e) => e.era_id));
    const imperiosCompletadosSet = new Set(imperiosCompletados.map((i) => i.imperio_id));
    const nivelesCompletadosMap = new Map(nivelesCompletados.map((n) => [n.nivel_id, n.precision_promedio]));

    const erasConEstado = eras.map((era) => {
      const esActiva = progreso?.era_actual_id === era.id;
      const esCompletada = erasCompletadasSet.has(era.id);

      let estado: 'completado' | 'activo' | 'disponible' | 'bloqueado';
      if (esCompletada) {
        estado = 'completado';
      } else if (esActiva) {
        estado = 'activo';
      } else if (era.orden === 1 || erasCompletadasSet.has(eras[era.orden - 2]?.id ?? '')) {
        estado = 'disponible';
      } else {
        estado = 'bloqueado';
      }

      const imperiosConEstado = era.imperios.map((imp) => ({
        id: imp.id,
        nombre: imp.nombre,
        orden: imp.orden,
        frases_propias: imp.frases_propias,
        porcentaje_aprobacion: imp.porcentaje_aprobacion,
        total_niveles: imp._count.niveles,
        niveles: imp.niveles.map((nvl) => ({
          id: nvl.id,
          orden: nvl.orden,
          frases: nvl._count.frases_nivel,
          completado: nivelesCompletadosMap.has(nvl.id),
          precision_promedio: nivelesCompletadosMap.get(nvl.id) ?? null,
        })),
        completado: imperiosCompletadosSet.has(imp.id),
        activo: progreso?.imperio_actual_id === imp.id,
      }));

      return {
        id: era.id,
        nombre: era.nombre,
        orden: era.orden,
        color: era.color,
        estado,
        imperios: imperiosConEstado,
      };
    });

    return {
      ok: true,
      progreso: progreso ? {
        era_actual_id: progreso.era_actual_id,
        imperio_actual_id: progreso.imperio_actual_id,
        nivel_actual_id: progreso.nivel_actual_id,
        estrato_social: progreso.estrato_social,
        era_actual: progreso.era_actual,
        imperio_actual: progreso.imperio_actual,
        nivel_actual: progreso.nivel_actual,
      } : null,
      eras: erasConEstado,
      niveles_completados: Object.fromEntries(nivelesCompletadosMap),
      imperios_completados: imperiosCompletadosSet,
      logros_desbloqueados: logrosData.map((d) => ({
        logro: d.logro,
        desbloqueado_en: d.created_at,
      })),
      usuario: {
        frases: usuario.frases,
        dias_racha: usuario.dias_racha,
        tiempo_promedio: usuario.tiempo_promedio,
        precicion_global: usuario.precicion_global,
        cantidad_logros: usuario.cantidad_logros,
        created_at: usuario.createdAt,
        ultima_racha_fecha: usuario.ultima_racha_fecha,
      },
    };
  } catch (error) {
    logger.error('Error al obtener estado de progreso', error as Error);
    throw new DatabaseError('Error al obtener estado de progreso');
  }
}
