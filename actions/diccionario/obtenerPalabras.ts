'use server';

import prisma from '@/lib/prisma';
import { DatosDelAutenticado } from '@/lib/auth';
import { DatabaseError, UnauthorizedError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function obtenerPalabras() {
  const usuario = await DatosDelAutenticado();
  if (!usuario) throw new UnauthorizedError();

  try {
    const palabras = await prisma.palabraGuardada.findMany({
      where: { usuario_id: usuario.id },
      orderBy: { created_at: 'desc' },
    });

    return { ok: true, palabras };
  } catch (error) {
    logger.error('Error al obtener palabras', error as Error);
    throw new DatabaseError('Error al obtener palabras');
  }
}
