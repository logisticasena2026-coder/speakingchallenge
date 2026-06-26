'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado } from '@/lib/auth';
import { DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { ResetearImperioSchema } from '@/schemas/progreso';

export async function resetearImperio(data: { imperio_id: string }) {
  const usuario = await DatosDelAutenticado();
  if (!usuario) throw new UnauthorizedError();

  const parsed = ResetearImperioSchema.safeParse(data);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors[0]?.message || 'Datos inválidos');
  }

  try {
    const imperio = await prisma.imperio.findUnique({
      where: { id: parsed.data.imperio_id },
      include: {
        niveles: {
          orderBy: { orden: 'asc' },
          take: 1,
        },
      },
    });
    if (!imperio) throw new NotFoundError('Imperio', parsed.data.imperio_id);

    const nivelIds = await prisma.nivelProgresion.findMany({
      where: { imperio_id: imperio.id },
      select: { id: true },
    });

    // Eliminar registros de progresión (no ProgresoFraseEstudiante)
    await prisma.nivelCompletado.deleteMany({
      where: {
        usuario_id: usuario.id,
        nivel_id: { in: nivelIds.map((n) => n.id) },
      },
    });

    await prisma.imperioCompletado.deleteMany({
      where: {
        usuario_id: usuario.id,
        imperio_id: imperio.id,
      },
    });

    // Resetear al primer nivel del imperio
    const primerNivel = imperio.niveles[0];
    if (primerNivel) {
      await prisma.progresoUsuario.update({
        where: { usuario_id: usuario.id },
        data: {
          nivel_actual_id: primerNivel.id,
          imperio_actual_id: imperio.id,
        },
      });
    }

    return { ok: true, message: 'Imperio reseteado. Puedes volver a intentarlo.' };
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ValidationError) throw error;
    logger.error('Error al resetear imperio', error as Error);
    throw new DatabaseError('Error al resetear imperio');
  }
}
