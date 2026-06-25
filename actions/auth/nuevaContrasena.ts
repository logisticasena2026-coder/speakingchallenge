'use server';

import { DatabaseError, UnauthorizedError, ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { cacheLife, cacheTag, revalidateTag } from 'next/cache';
import { FormNuevaContrasenaSchema } from '@/schemas/auth/nuevaContrasena';

async function buscarToken(token: string) {
  'use cache'
  cacheLife({ stale: 30, revalidate: 60 })
  cacheTag(`reset-token-${token}`)

  return prisma.resetearContrasenaToken.findFirst({
    where: { token },
    include: { propietario: true },
  });
}

export async function cambiarContrasena(
  token: string,
  data: { password: string; confirmPassword: string },
) {
  if (!token) {
    return { ok: false, message: 'Token requerido' };
  }

  const parsed = FormNuevaContrasenaSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Contrasena invalida' };
  }
  try {
    const tokenValido = await buscarToken(token);

    if (!tokenValido) {
      return { ok: false, message: 'Token inválido' };
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

    if (tokenValido.propietario) {
      await prisma.user.update({
        where: { id: tokenValido.propietario_id ?? '' },
        data: { password: hashedPassword },
      });
    }

    await prisma.resetearContrasenaToken.delete({
      where: { id: tokenValido.id },
    });

    revalidateTag(`reset-token-${token}`, 'seconds')

    return { ok: true, message: 'Contraseña cambiada exitosamente' };
  } catch (error) {
    logger.error('Error al cambiar la contraseña', error as Error);

    if (error instanceof ValidationError || error instanceof UnauthorizedError) {
      throw error;
    }
    throw new DatabaseError('Error al cambiar la contraseña. Por favor intenta más tarde.');
  }
}
