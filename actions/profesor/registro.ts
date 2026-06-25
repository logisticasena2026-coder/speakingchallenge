'use server';

import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { ProfesorRegisterSchema } from '@/schemas/profesor/register';
import { DatabaseError, ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';

function generarCodigoProfesor(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let codigo = 'PROF-';
  for (let i = 0; i < 5; i++) {
    codigo += chars[Math.floor(Math.random() * chars.length)];
  }
  return codigo;
}

export async function registrarProfesor({
  nombre,
  correo,
  contrasena,
  confirmarContrasena,
  codigoInvitacion,
}: {
  nombre: string;
  correo: string;
  contrasena: string;
  confirmarContrasena: string;
  codigoInvitacion: string;
}) {
  const inviteCode = process.env.PROFESOR_INVITE_CODE;
  if (!inviteCode || codigoInvitacion !== inviteCode) {
    return { ok: false, message: 'Código de invitación inválido' };
  }

  const parsed = ProfesorRegisterSchema.safeParse({
    nombre,
    correo,
    contrasena,
    confirmarContrasena,
    codigoInvitacion,
  });
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.errors[0]?.message || 'Datos inválidos',
    };
  }

  try {
    const existente = await prisma.user.findFirst({
      where: {
        OR: [{ email: correo }, { name: nombre }],
      },
    });
    if (existente) {
      return { ok: false, message: 'El correo o nombre ya están registrados' };
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const codigoProfesor = generarCodigoProfesor();

    const profesor = await prisma.user.create({
      data: {
        name: nombre,
        email: correo,
        password: hashedPassword,
        rol: 'PROFESOR',
        codigo_profesor: codigoProfesor,
      },
    });

    const session = await prisma.session.create({
      data: {
        propietario_id: profesor.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    const isProduction = process.env.NODE_ENV === 'production';
    (await cookies()).set('sessions_id', session.id, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
    });

    return {
      ok: true,
      message: `Profesor registrado. Tu código es: ${codigoProfesor}`,
      codigo: codigoProfesor,
    };
  } catch (error) {
    logger.error('Error al registrar profesor', error as Error);
    if (error instanceof ValidationError) throw error;
    throw new DatabaseError('Error al registrar profesor');
  }
}
