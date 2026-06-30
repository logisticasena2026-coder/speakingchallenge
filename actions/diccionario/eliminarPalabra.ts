'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado } from '@/lib/auth';
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function eliminarPalabra(palabraId: string) {
  const usuario = await DatosDelAutenticado();
  if (!usuario) throw new UnauthorizedError();

  try {
    const palabra = await prisma.palabraGuardada.findUnique({
      where: { id: palabraId },
    });

    if (!palabra) throw new NotFoundError('Palabra', palabraId);
    if (palabra.usuario_id !== usuario.id) throw new UnauthorizedError();

    await prisma.palabraGuardada.delete({ where: { id: palabraId } });

    return { ok: true, message: 'Palabra eliminada' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    logger.error('Error al eliminar palabra', error as Error);
    throw new DatabaseError('Error al eliminar palabra');
  }
}
