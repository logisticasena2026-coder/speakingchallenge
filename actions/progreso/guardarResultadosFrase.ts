'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado } from '@/lib/auth';
import { DatabaseError, UnauthorizedError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { GuardarResultadoSchema } from '@/schemas/progreso';

export async function guardarResultadosFrase(data: {
  frase_id: number;
  precision: number;
  tiempo: number;
}) {
  const usuario = await DatosDelAutenticado();
  if (!usuario) throw new UnauthorizedError();

  const parsed = GuardarResultadoSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    await prisma.progresoFraseNivelEstudiante.upsert({
      where: {
        estudiante_id_frase_id: {
          estudiante_id: usuario.id,
          frase_id: parsed.data.frase_id,
        },
      },
      update: {
        precision: parsed.data.precision,
        tiempo: parsed.data.tiempo,
        intentos: { increment: 1 },
      },
      create: {
        estudiante_id: usuario.id,
        frase_id: parsed.data.frase_id,
        precision: parsed.data.precision,
        tiempo: parsed.data.tiempo,
        intentos: 1,
      },
    });

    return { ok: true, message: 'Resultado guardado' };
  } catch (error) {
    logger.error('Error al guardar resultado de frase', error as Error);
    throw new DatabaseError('Error al guardar resultado de frase');
  }
}
