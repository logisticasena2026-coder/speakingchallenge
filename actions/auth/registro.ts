'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { FormRegisterSchema } from '@/schemas/auth/register';
import { DatabaseError, ConflictError, ValidationError } from '../../lib/errors';

async function getSesion() {
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

export async function registro({
  nombre_usuario,
  correo,
  contrasena,
}: {
  nombre_usuario: string;
  correo: string;
  contrasena: string;
}) {
  const session = await getSesion();

  if (session) {
    return {
      ok: false,
      message: 'Ya tienes una sesión activa',
    };
  }

  const parsed = FormRegisterSchema.safeParse({
    username: nombre_usuario,
    email: correo,
    password: contrasena,
    confirmPassword: contrasena,
  });
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.errors[0]?.message || 'Datos invalidos',
    };
  }
  try {
    const [usuarioExistente, correoExistente] = await Promise.all([
      prisma.user.findFirst({ where: { name: nombre_usuario } }),
      prisma.user.findUnique({ where: { email: correo } }),
    ]);

    if (usuarioExistente) {
      return {
        ok: false,
        message: 'Este nombre de usuario ya está en uso',
      };
    }

    if (correoExistente) {
      return {
        ok: false,
        message: 'Este correo electrónico ya está registrado',
      };
    }

    const contrasenaHasheada = await bcrypt.hash(contrasena, 10);
    const nombre = nombre_usuario.split(' ').join('%20');

    await prisma.user.create({
      data: {
        email: correo,
        name: nombre_usuario,
        avatar: `https://api.dicebear.com/9.x/glass/svg?seed=${nombre}&radius=50`,
        password: contrasenaHasheada,
      },
    });
    return {
      ok: true,
      message: 'Usuario creado correctamente',
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          ok: false,
          message: 'Ya existe un usuario con este correo o nombre',
        };
      }
      if (error.code === 'P2000') {
        return {
          ok: false,
          message: 'El correo electronico es invalido',
        };
      }
      return {
        ok: false,
        message: 'Error en la base de datos',
      };
    }

    if (error instanceof ValidationError || error instanceof ConflictError) {
      throw error;
    }

    throw new DatabaseError('Error al crear el usuario. Por favor intenta más tarde.');
  }
}
