'use server';

import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { requiereRol } from '@/lib/auth';
import { DatabaseError, ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { CrearProfesorSchema } from '@/schemas/admin/profesor';

function generarCodigoProfesor(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let codigo = 'PROF-';
  for (let i = 0; i < 5; i++) codigo += chars[Math.floor(Math.random() * chars.length)];
  return codigo;
}

export async function crearProfesor(data: { name: string; email: string; password: string }) {
  await requiereRol('ADMIN');

  const parsed = CrearProfesorSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || 'Datos inválidos' };
  }

  try {
    const existente = await prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { name: data.name }] },
    });
    if (existente) {
      return { ok: false, message: 'El correo o nombre ya existen' };
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const codigo = generarCodigoProfesor();
    const nombre = data.name.split(' ').join('%20');

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        rol: 'PROFESOR',
        codigo_profesor: codigo,
        avatar: `https://api.dicebear.com/9.x/glass/svg?seed=${nombre}&radius=50`,
      },
    });

    return { ok: true, message: `Profesor creado. Código: ${codigo}`, codigo };
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    logger.error('Error al crear profesor', error as Error);
    throw new DatabaseError('Error al crear profesor');
  }
}
