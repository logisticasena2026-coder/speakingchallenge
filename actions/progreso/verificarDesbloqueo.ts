'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado } from '@/lib/auth';
import { DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { VerificarDesbloqueoSchema } from '@/schemas/progreso';

export async function verificarDesbloqueo(data: {
  tipo: 'nivel' | 'imperio' | 'era';
  id: string;
}) {
  const usuario = await DatosDelAutenticado();
  if (!usuario) throw new UnauthorizedError();

  const parsed = VerificarDesbloqueoSchema.safeParse(data);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors[0]?.message || 'Datos inválidos');
  }

  try {
    const { tipo, id } = parsed.data;

    if (tipo === 'nivel') {
      return await verificarNivel(usuario.id, id);
    }
    if (tipo === 'imperio') {
      return await verificarImperio(usuario.id, id);
    }
    return await verificarEra(usuario.id, id);
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ValidationError) throw error;
    logger.error('Error al verificar desbloqueo', error as Error);
    throw new DatabaseError('Error al verificar desbloqueo');
  }
}

async function verificarNivel(usuarioId: string, nivelId: string) {
  const nivel = await prisma.nivelProgresion.findUnique({
    where: { id: nivelId },
  });
  if (!nivel) throw new NotFoundError('Nivel', nivelId);

  if (nivel.orden === 1) {
    return { desbloqueado: true, condiciones: {
      secuencialidad: true, frases_acumuladas: true, promedio_precision: true,
    }};
  }

  const anterior = await prisma.nivelCompletado.findFirst({
    where: {
      usuario_id: usuarioId,
      nivel: { imperio_id: nivel.imperio_id, orden: nivel.orden - 1 },
    },
  });

  const secuencialidad = !!anterior;

  return {
    desbloqueado: secuencialidad,
    condiciones: { secuencialidad, frases_acumuladas: true, promedio_precision: true },
    razon: secuencialidad ? undefined : 'Completa el nivel anterior primero',
  };
}

async function verificarImperio(usuarioId: string, imperioId: string) {
  const imperio = await prisma.imperio.findUnique({
    where: { id: imperioId },
    include: {
      era: true,
      niveles: { select: { id: true } },
    },
  });
  if (!imperio) throw new NotFoundError('Imperio', imperioId);

  // Secuencialidad: imperio anterior completado
  let secuencialidad = true;
  if (imperio.orden > 1) {
    const anterior = await prisma.imperioCompletado.findFirst({
      where: {
        usuario_id: usuarioId,
        imperio: { era_id: imperio.era_id, orden: imperio.orden - 1 },
      },
    });
    secuencialidad = !!anterior;
  } else {
    // Primer imperio de la era — solo se desbloquea si la era anterior está completada
    if (imperio.era.orden > 1) {
      const eraAnterior = await prisma.era.findUnique({
        where: { orden: imperio.era.orden - 1 },
      });
      if (eraAnterior) {
        const eraOk = await prisma.eraCompletada.findFirst({
          where: { usuario_id: usuarioId, era_id: eraAnterior.id },
        });
        secuencialidad = !!eraOk;
      }
    }
  }

  // Frases acumuladas
  const userData = await prisma.user.findUnique({
    where: { id: usuarioId },
    select: { frases: true },
  });
  const frases_acumuladas = (userData?.frases ?? 0) >= imperio.frases_para_desbloquear;

  // Promedio ponderado de todos los niveles completados del imperio
  const nivelesCompletados = await prisma.nivelCompletado.findMany({
    where: {
      usuario_id: usuarioId,
      nivel: { imperio_id: imperioId },
    },
    include: {
      nivel: { select: { _count: { select: { frases_nivel: true } } } },
    },
  });

  const totalFrases = nivelesCompletados.reduce(
    (acc, nc) => acc + nc.nivel._count.frases_nivel, 0,
  );
  const sumaPonderada = nivelesCompletados.reduce(
    (acc, nc) => acc + nc.precision_promedio * nc.nivel._count.frases_nivel, 0,
  );

  const promedioPonderado = totalFrases > 0 ? sumaPonderada / totalFrases : 0;
  const promedio_precision = promedioPonderado >= imperio.porcentaje_aprobacion;

  const todas = secuencialidad && frases_acumuladas && promedio_precision;

  return {
    desbloqueado: todas,
    condiciones: { secuencialidad, frases_acumuladas, promedio_precision },
    promedio_ponderado: promedioPonderado,
    razon: todas ? undefined : determinaRazon(secuencialidad, frases_acumuladas, promedio_precision),
  };
}

async function verificarEra(usuarioId: string, eraId: string) {
  const era = await prisma.era.findUnique({ where: { id: eraId } });
  if (!era) throw new NotFoundError('Era', eraId);

  if (era.orden === 1) {
    return { desbloqueado: true, condiciones: {
      secuencialidad: true, frases_acumuladas: true, promedio_precision: true,
    }};
  }

  const anterior = await prisma.eraCompletada.findFirst({
    where: {
      usuario_id: usuarioId,
      era: { orden: era.orden - 1 },
    },
  });

  const secuencialidad = !!anterior;

  return {
    desbloqueado: secuencialidad,
    condiciones: { secuencialidad, frases_acumuladas: true, promedio_precision: true },
    razon: secuencialidad ? undefined : 'Completa la era anterior primero',
  };
}

function determinaRazon(sec: boolean, frases: boolean, prom: boolean): string {
  if (!sec) return 'Completa el imperio anterior primero';
  if (!frases) return 'No has practicado suficientes frases acumuladas';
  if (!prom) return 'Tu promedio de precisión no alcanza el umbral requerido';
  return 'Condiciones no cumplidas';
}
