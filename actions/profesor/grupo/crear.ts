'use server';

import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const CrearGrupoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(100),
});

export async function crearGrupo(data: { nombre: string }) {
  const profesor = await requiereRol('PROFESOR');

  const parsed = CrearGrupoSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const duplicado = await prisma.grupo.findFirst({
      where: { nombre: { equals: parsed.data.nombre, mode: 'insensitive' }, profesor_id: profesor.id },
    });
    if (duplicado) {
      return { ok: false, message: 'Ya existe un grupo con ese nombre' };
    }

    const grupo = await prisma.grupo.create({
      data: {
        nombre: parsed.data.nombre,
        profesor_id: profesor.id,
      },
    });

    revalidateTag('grupos', 'seconds');
    return { ok: true, message: 'Grupo creado', id: grupo.id };
  } catch (error) {
    logger.error('Error al crear grupo', error as Error);
    throw new DatabaseError('Error al crear grupo');
  }
}
