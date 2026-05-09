'use server';

import { DatabaseError, UnauthorizedError, ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function cambiarContrasena(token: string, nuevaContrasena: string) {
  if (!token || !nuevaContrasena) {
    return { ok: false, message: 'Datos incompletos' };
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
