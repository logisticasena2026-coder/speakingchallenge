'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado } from '@/lib/auth';
import { DatabaseError, UnauthorizedError, ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { z } from 'zod';

const GuardarPalabraSchema = z.object({
  palabra: z.string().min(1).max(200),
  traduccion: z.string().min(1).max(200),
  contexto: z.string().max(500).optional(),
});

export async function guardarPalabra(data: {
  palabra: string;
  traduccion: string;
  contexto?: string;
}) {
  const usuario = await DatosDelAutenticado();
  if (!usuario) throw new UnauthorizedError();

  const parsed = GuardarPalabraSchema.safeParse(data);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors[0]?.message || 'Datos inválidos');
  }

  try {
    const existente = await prisma.palabraGuardada.findUnique({
      where: {
        usuario_id_palabra: {
          usuario_id: usuario.id,
          palabra: parsed.data.palabra,
        },
      },
    });

    if (existente) {
      return { ok: false, message: 'Ya tienes esta palabra guardada' };
    }

    await prisma.palabraGuardada.create({
      data: {
        usuario_id: usuario.id,
        palabra: parsed.data.palabra,
        traduccion: parsed.data.traduccion,
        contexto: parsed.data.contexto ?? null,
      },
    });

    return { ok: true, message: 'Palabra guardada' };
  } catch (error) {
    logger.error('Error al guardar palabra', error as Error);
    throw new DatabaseError('Error al guardar palabra');
  }
}
