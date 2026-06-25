'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';

export async function eliminarUsuario(userId: string) {
  await requiereRol('ADMIN');

  try {
    await prisma.user.delete({ where: { id: userId } });
    revalidateTag('usuarios', 'seconds');
    return { ok: true, message: 'Usuario eliminado' };
  } catch (error) {
    logger.error('Error al eliminar usuario', error as Error);
    throw new DatabaseError('Error al eliminar usuario');
  }
}
