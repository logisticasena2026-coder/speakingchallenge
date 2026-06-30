'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado } from '@/lib/auth';
import { DatabaseError, UnauthorizedError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { z } from 'zod';

const ActualizarPerfilSchema = z.object({
  fecha_nacimiento: z.string().optional(),
  sexo: z.string().optional(),
});

export async function actualizarPerfil(data: {
  fecha_nacimiento?: string;
  sexo?: string;
}) {
  const usuario = await DatosDelAutenticado();
  if (!usuario) throw new UnauthorizedError();

  const parsed = ActualizarPerfilSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    await prisma.user.update({
      where: { id: usuario.id },
      data: {
        fecha_nacimiento: parsed.data.fecha_nacimiento
          ? new Date(parsed.data.fecha_nacimiento)
          : undefined,
        sexo: parsed.data.sexo || null,
      },
    });

    return { ok: true, message: 'Perfil actualizado' };
  } catch (error) {
    logger.error('Error al actualizar perfil', error as Error);
    throw new DatabaseError('Error al actualizar perfil');
  }
}
