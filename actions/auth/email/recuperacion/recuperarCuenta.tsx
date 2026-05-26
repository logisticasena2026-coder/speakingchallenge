'use server';

import nodemailer from 'nodemailer';
import crypto from 'node:crypto';
import prisma from '@/lib/prisma';
import { render } from '@react-email/components';
import { RecuperarCuentaEmailDiseno } from '../disenos/recuperarCuentaDiseno';
import { FormRecuperarSchema } from '@/schemas/auth/recuperarContrasena';
import { ExternalServiceError, NotFoundError, ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { cacheLife, cacheTag } from 'next/cache';

async function buscarUsuarioPorEmail(email: string) {
  'use cache'
  cacheLife({ stale: 60, revalidate: 300 })
  cacheTag(`user-email-${email}`)

  return prisma.user.findFirst({
    where: { email },
    select: {
      id: true,
      name: true,
    },
  });
}

export async function recuperarCuenta(Destinatario: string) {
  const parsed = FormRecuperarSchema.safeParse({ email: Destinatario });
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors[0]?.message || 'Correo invalido');
  }

  try {
    const user = await buscarUsuarioPorEmail(Destinatario);

    if (!user) {
      throw new NotFoundError('Usuario');
    }

    const token = crypto.randomUUID();
    const expiracion = new Date(Date.now() + 3600000);

    await prisma.resetearContrasenaToken.create({
      data: { token, propietario_id: user.id, expiresAt: expiracion },
    });

    const transportador = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const baseURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetLink = `${baseURL}/auth/iniciar_sesion/recuperar_contrasena/nueva_contrasena?token=${token}`;

    const html = await render(
      <RecuperarCuentaEmailDiseno resetLink={resetLink} nombreUsuario={user.name} />,
    );

    await transportador.sendMail({
      from: `"Soporte speakingchallenge" <${process.env.EMAIL_USER}>`,
      to: Destinatario,
      subject: 'Recuperación de cuenta - Simulador speakingchallenge',
      html,
    });

    return {
      ok: true,
      message: 'Correo de recuperación enviado exitosamente.',
    };
  } catch (error) {
    logger.error('Error en enviar correo de recuperación', error as Error, { Destinatario });
    if (error instanceof NotFoundError) throw error;
    throw new ExternalServiceError('Email', 'No se pudo enviar el correo de recuperación de cuenta');
  }
}
