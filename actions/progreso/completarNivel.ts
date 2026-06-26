'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado } from '@/lib/auth';
import { DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from '@/lib/errors';
import { revalidateTag } from 'next/cache';
import { logger } from '@/lib/logger';
import { CompletarNivelSchema } from '@/schemas/progreso';
import { calcularDominioNivel } from './calcularDominioNivel';
import { completarImperio } from './completarImperio';
import { evaluarLogros } from './evaluarLogros';

export async function completarNivel(data: { nivel_id: string }) {
  const usuario = await DatosDelAutenticado();
  if (!usuario) throw new UnauthorizedError();

  const parsed = CompletarNivelSchema.safeParse(data);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors[0]?.message || 'Datos inválidos');
  }

  try {
    const nivel = await prisma.nivelProgresion.findUnique({
      where: { id: parsed.data.nivel_id },
      include: { imperio: { select: { id: true, orden: true, era_id: true } } },
    });
    if (!nivel) throw new NotFoundError('Nivel', parsed.data.nivel_id);

    const yaCompletado = await prisma.nivelCompletado.findUnique({
      where: {
        usuario_id_nivel_id: {
          usuario_id: usuario.id,
          nivel_id: nivel.id,
        },
      },
    });

    const dominio = await calcularDominioNivel(nivel.id);

    let nuevoCompletado;
    let esRepeticion = false;

    if (yaCompletado) {
      nuevoCompletado = await prisma.nivelCompletado.update({
        where: { id: yaCompletado.id },
        data: { precision_promedio: dominio.precision_promedio },
      });
      esRepeticion = true;
    } else {
      nuevoCompletado = await prisma.nivelCompletado.create({
        data: {
          usuario_id: usuario.id,
          nivel_id: nivel.id,
          precision_promedio: dominio.precision_promedio,
        },
      });

      // Sumar frases dominadas al perfil del usuario (solo primera vez)
      await prisma.user.update({
        where: { id: usuario.id },
        data: { frases: { increment: dominio.total_frases } },
      });
    }

    const avgPrecision = await prisma.nivelCompletado.aggregate({
      where: { usuario_id: usuario.id },
      _avg: { precision_promedio: true },
    });

    const avgTiempo = await prisma.progresoFraseNivelEstudiante.aggregate({
      where: { estudiante_id: usuario.id },
      _avg: { tiempo: true },
    });

    await prisma.user.update({
      where: { id: usuario.id },
      data: {
        precicion_global: avgPrecision._avg.precision_promedio ?? 0,
        tiempo_promedio: avgTiempo._avg.tiempo ?? 0,
      },
    });

    revalidateTag('session');

    // Actualizar estrato social y avanzar al siguiente nivel/imperio (solo primera vez)
    let siguienteNivel = undefined;
    let imperioCompletado = undefined;

    if (!esRepeticion) {
      siguienteNivel = await prisma.nivelProgresion.findFirst({
        where: {
          imperio_id: nivel.imperio_id,
          orden: nivel.orden + 1,
        },
      });

      if (siguienteNivel) {
        await prisma.progresoUsuario.update({
          where: { usuario_id: usuario.id },
          data: {
            nivel_actual_id: siguienteNivel.id,
            estrato_social: { increment: 1 },
          },
        });
      } else {
        // Último nivel del imperio → completar imperio
        const estratoActual = await prisma.progresoUsuario.findUnique({
          where: { usuario_id: usuario.id },
          select: { estrato_social: true },
        });

        imperioCompletado = await completarImperio({
          imperio_id: nivel.imperio_id,
          precision_promedio: dominio.precision_promedio,
        });

        await prisma.progresoUsuario.update({
          where: { usuario_id: usuario.id },
          data: {
            estrato_social: (estratoActual?.estrato_social ?? 0) + 1,
          },
        });
      }
    }

    const logros = await evaluarLogros();

    return {
      ok: true,
      message: 'Nivel completado',
      nivel_completado: nuevoCompletado,
      nivel_siguiente: siguienteNivel ?? undefined,
      imperio_completado: imperioCompletado,
      nuevos_logros: logros.ok ? logros.nuevos_logros : [],
    };
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ValidationError) throw error;
    logger.error('Error al completar nivel', error as Error);
    throw new DatabaseError('Error al completar nivel');
  }
}
