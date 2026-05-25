'use server';

import { z } from 'zod';
import { DatabaseError, UnauthorizedError, ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

const PasswordSchema = z.string().min(6, 'Minimo 6 caracteres').max(100, 'Maximo 100 caracteres');

export async function cambiarContrasena(token: string, nuevaContrasena: string) {
  if (!token) {
    return { ok: false, message: 'Token requerido' };
  }

  const parsed = PasswordSchema.safeParse(nuevaContrasena);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Contrasena invalida' };
  }
  try {
    const tokenValido = await prisma.resetearContrasenaToken.findFirst({
      where: {
        token,
      },
      include: {
        propietario: true,
      },
    });

    if (!tokenValido) {
      return { ok: false, message: 'Token inválido' };
    }

    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

    if (tokenValido.propietario) {
      await prisma.user.update({
        where: { id: tokenValido.propietario_id ?? '' },
        data: { password: hashedPassword },
      });
    }

    await prisma.resetearContrasenaToken.delete({
      where: { id: tokenValido.id },
    });

    return { ok: true, message: 'Contraseña cambiada exitosamente' };
  } catch (error) {
    logger.error('Error al cambiar la contraseña', error as Error);

    if (error instanceof ValidationError || error instanceof UnauthorizedError) {
      throw error;
    }
    throw new DatabaseError('Error al cambiar la contraseña. Por favor intenta más tarde.');
  }
}
