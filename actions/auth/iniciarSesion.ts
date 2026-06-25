'use server';

import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { FormLoginSchema } from '@/schemas/auth/login';
import { DatabaseError, ValidationError, UnauthorizedError } from '@/lib/errors';
import { actualizarRacha } from '@/lib/rachas';

import { logger } from '@/lib/logger';

async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessions_id');

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

  const parsed = FormLoginSchema.safeParse({ email: correo, password: contrasena });
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.errors[0]?.message || 'Datos invalidos',
      avatar: '',
    };
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (adminEmail && correo === adminEmail) {
      if (contrasena !== adminPass) {
        return { ok: false, message: 'Credenciales incorrectas', avatar: '' };
      }

      let usuarioAdmin = await prisma.user.findFirst({ where: { email: adminEmail } });
      if (!usuarioAdmin) {
        const hashed = await bcrypt.hash(adminPass, 10);
        usuarioAdmin = await prisma.user.create({
          data: {
            name: 'Admin',
            email: adminEmail,
            password: hashed,
            rol: 'ADMIN',
          },
        });
      } else if (usuarioAdmin.rol !== 'ADMIN') {
        await prisma.user.update({
          where: { id: usuarioAdmin.id },
          data: { rol: 'ADMIN' },
        });
        usuarioAdmin.rol = 'ADMIN';
      }

      const session = await prisma.session.create({
        data: {
          propietario_id: usuarioAdmin.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });

      const isProduction = process.env.NODE_ENV === 'production';
      (await cookies()).set('sessions_id', session.id, {
        httpOnly: true, secure: isProduction, sameSite: 'lax', path: '/',
      });

      return {
        ok: true,
        message: `Bienvenido Admin`,
        avatar: null,
        rol: 'ADMIN',
      };
    }

    const usuarioEstudiante = await prisma.user.findFirst({
      where: { email: correo },
      select: { avatar: true, email: true, password: true, id: true, name: true, rol: true },
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
    await actualizarRacha(usuarioEstudiante.id);

    const isProduction = process.env.NODE_ENV === 'production';

    (await cookies()).set('sessions_id', session.id, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
    });

    return {
      ok: true,
      message: `Bienvenido ${usuarioEstudiante.name}`,
      avatar: usuarioEstudiante.avatar,
      rol: usuarioEstudiante.rol,
    };
  } catch (error) {
    logger.error('Error en iniciar sesión', error as Error, { correo });

    if (error instanceof ValidationError || error instanceof UnauthorizedError) {
      throw error;
    }
    throw new DatabaseError('Error al iniciar sesión. Por favor intenta más tarde.');
  }
}
