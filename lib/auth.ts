'use server';

import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';



export async function requiereIngreso(): Promise<boolean> {
  const sessionId = (await cookies()).get('sessions_id')?.value;

  if (!sessionId) return false;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  return !!session && session.expiresAt > new Date();
}

export async function DatosDelAutenticado() {
  const sessionId = (await cookies()).get('sessions_id')?.value;

  if (!sessionId) {
    redirect('/auth/iniciar_sesion');
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { propietario: true },
  });

  if (!session || session.expiresAt < new Date()) {
    redirect('/auth/iniciar_sesion');
  }

  return session.propietario;
}
