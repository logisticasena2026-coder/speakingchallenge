'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';


type ContextoUsuario = {
  niveles_completados: number;
  frases_totales: number;
  racha_dias: number;
  imperios_completados: number;
  imperios_insignia_bronce: number;
  imperios_insignia_oro: number;
  eras_completadas: number;
  precision_global: number;
  estrato_social: number;
};

async function obtenerContexto(usuarioId: string): Promise<ContextoUsuario> {
  const [
    userData,
    nivelesCount,
    imperiosCompletados,
    imperiosBronce,
    imperiosOro,
    erasCount,
    progreso,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: { id: usuarioId },
      select: { frases: true, dias_racha: true, precicion_global: true },
    }),
    prisma.nivelCompletado.count({ where: { usuario_id: usuarioId } }),
    prisma.imperioCompletado.count({ where: { usuario_id: usuarioId } }),
    prisma.imperioCompletado.count({
      where: { usuario_id: usuarioId, insignia: 'BRONCE' },
    }),
    prisma.imperioCompletado.count({
      where: { usuario_id: usuarioId, insignia: 'ORO' },
    }),
    prisma.eraCompletada.count({ where: { usuario_id: usuarioId } }),
    prisma.progresoUsuario.findUnique({
      where: { usuario_id: usuarioId },
      select: { estrato_social: true },
    }),
  ]);

  return {
    niveles_completados: nivelesCount,
    frases_totales: userData?.frases ?? 0,
    racha_dias: userData?.dias_racha ?? 0,
    imperios_completados: imperiosCompletados,
    imperios_insignia_bronce: imperiosBronce,
    imperios_insignia_oro: imperiosOro,
    eras_completadas: erasCount,
    precision_global: userData?.precicion_global ?? 0,
    estrato_social: progreso?.estrato_social ?? 0,
  };
}

function evaluarCondicion(
  tipo: string,
  valor: number,
  ctx: ContextoUsuario,
): boolean {
  const map: Record<string, number> = {
    NIVELES_COMPLETADOS: ctx.niveles_completados,
    FRASES_TOTALES: ctx.frases_totales,
    RACHA_DIAS: ctx.racha_dias,
    IMPERIOS_COMPLETADOS: ctx.imperios_completados,
    IMPERIOS_INSIGNIA_BRONCE: ctx.imperios_insignia_bronce,
    IMPERIOS_INSIGNIA_ORO: ctx.imperios_insignia_oro,
    ERAS_COMPLETADAS: ctx.eras_completadas,
    PRECISION_GLOBAL: Math.floor(ctx.precision_global),
    ESTRATO_SOCIAL: ctx.estrato_social,
  };
  return (map[tipo] ?? 0) >= valor;
}

export async function evaluarLogros() {
  const usuario = await DatosDelAutenticado();
  if (!usuario) return { ok: false, nuevos_logros: [] };

  try {
    const todosLogros = await prisma.logro.findMany({ orderBy: { valor: 'asc' } });
    if (todosLogros.length === 0) return { ok: true, nuevos_logros: [] };

    const yaDesbloqueados = await prisma.logroDesbloqueado.findMany({
      where: { usuario_id: usuario.id },
      select: { logro_id: true },
    });
    const desbloqueadosSet = new Set(yaDesbloqueados.map((d) => d.logro_id));

    const ctx = await obtenerContexto(usuario.id);
    const nuevos: Array<{ usuario_id: string; logro_id: string }> = [];

    for (const logro of todosLogros) {
      if (desbloqueadosSet.has(logro.id)) continue;
      if (evaluarCondicion(logro.tipo, logro.valor, ctx)) {
        nuevos.push({ usuario_id: usuario.id, logro_id: logro.id });
      }
    }

    if (nuevos.length === 0) return { ok: true, nuevos_logros: [] };

    await prisma.$transaction([
      prisma.logroDesbloqueado.createMany({ data: nuevos }),
      prisma.user.update({
        where: { id: usuario.id },
        data: { cantidad_logros: { increment: nuevos.length } },
      }),
    ]);

    return {
      ok: true,
      nuevos_logros: nuevos.map((n) => n.logro_id),
    };
  } catch (error) {
    logger.error('Error al evaluar logros', error as Error);
    throw new DatabaseError('Error al evaluar logros');
  }
}


