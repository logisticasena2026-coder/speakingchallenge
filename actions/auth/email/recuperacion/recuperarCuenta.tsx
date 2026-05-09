'use server';

import nodemailer from 'nodemailer';
import crypto from 'node:crypto';
import prisma from '@/lib/prisma';
import { render } from '@react-email/components';
import { RecuperarCuentaEmailDiseno } from '../disenos/recuperarCuentaDiseno';
import { logger } from '@/lib/logger';

export async function recuperarCuenta(Destinatario: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { email: Destinatario },
      select: {
        id: true,
        name: true,
      },
    });

    if (!user) {
      return {
        ok: false,
        message: 'Este correo no está registrado.',
      };
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
      from: `"Soporte PlayLenguage" <${process.env.EMAIL_USER}>`,
      to: Destinatario,
      subject: 'Recuperación de cuenta - Simulador PlayLenguage',
      html,
    });

    return {
      ok: true,
      message: 'Correo de recuperación enviado exitosamente.',
    };
  } catch (error) {
    logger.error('Error en enviar correo de recuperación', error as Error, { Destinatario });
    throw new Error('No se pudo enviar el correo de recuperación de cuenta');
  }
}
