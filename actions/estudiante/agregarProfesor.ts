'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function agregarProfesor(codigo: string) {
  const estudiante = await requiereRol('ESTUDIANTE');

  try {
    const profesor = await prisma.user.findFirst({
      where: { codigo_profesor: codigo, rol: 'PROFESOR' },
    });

    if (!profesor) {
      return { ok: false, message: 'Código de profesor inválido' };
    }

    const yaExiste = await prisma.estudianteProfesor.findUnique({
      where: {
        estudiante_id_profesor_id: {
          estudiante_id: estudiante.id,
          profesor_id: profesor.id,
        },
      },
    });

    if (yaExiste) {
      return { ok: false, message: 'Ya estás vinculado a este profesor' };
    }

    await prisma.estudianteProfesor.create({
      data: {
        estudiante_id: estudiante.id,
        profesor_id: profesor.id,
      },
    });

    return {
      ok: true,
      message: `Te has vinculado con ${profesor.name}`,
      profesor: { id: profesor.id, name: profesor.name, email: profesor.email, codigo_profesor: profesor.codigo_profesor },
    };
  } catch (error) {
    logger.error('Error al agregar profesor', error as Error);
    throw new DatabaseError('Error al agregar profesor');
  }
}
