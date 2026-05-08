'use server';

import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { DatabaseError, ValidationError, UnauthorizedError } from '@/lib/errors';
import { logger } from '@/lib/logger';

async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionEstudiante_id');

  if (!sessionId?.value) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId.value },
    include: { propietario: true },
  });

  if (!session || session.expiresAt < new Date()) return null;

  return session;
}

export async function iniciar_session({
  correo,
  contrasena,
}: {
  correo: string;
  contrasena: string;
}) {
  const existingSession = await getSession();
  if (existingSession) {
    return {
      ok: false,
      message: 'Ya tienes una sesión activa',
      avatar: '',
    };
  }

  if (!correo || !contrasena) {
    return {
      ok: false,
      message: 'Faltan datos requeridos',
      avatar: '',
    };
  }

  try {
    const usuarioEstudiante = await prisma.user.findFirst({
      where: { email: correo },
      select: { avatar: true, email: true, password: true, id: true, name: true },
    });

    if (!usuarioEstudiante) {
      return {
        ok: false,
        message: 'Credenciales incorrectas',
        avatar: '',
      };
    }

    const validando = await bcrypt.compare(contrasena, usuarioEstudiante.password);

    if (!validando) {
      return {
        ok: false,
        message: 'Credenciales incorrectas',
        avatar: '',
      };
    }

    const session = await prisma.session.create({
      data: {
        propietario_id: usuarioEstudiante.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    const isProduction = process.env.NODE_ENV === 'production';

    (await cookies()).set('sessionEstudiante_id', session.id, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
    });

    return {
      ok: true,
      message: `Bienvenido ${usuarioEstudiante.name}`,
      avatar: usuarioEstudiante.avatar,
    };
  } catch (error) {
    // Línea 95-101 podría ser:
    logger.error('Error en iniciar sesión', error as Error, { correo });

    // Loguear error original para debugging
    console.error('Error original:', error);
    if (error instanceof ValidationError || error instanceof UnauthorizedError) {
      throw error;
    }
    throw new DatabaseError('Error al iniciar sesión. Por favor intenta más tarde.');
  }
}
