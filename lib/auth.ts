'use server';

import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { cacheLife } from 'next/cache';

async function cachedSession(sessionId: string) {
  'use cache'
  cacheLife({ stale: 60, revalidate: 120 })

  return prisma.session.findUnique({
    where: { id: sessionId },
    include: { propietario: true },
  });
}

export async function requiereIngreso(): Promise<boolean> {
  const sessionId = (await cookies()).get('sessions_id')?.value;

  if (!sessionId) return false;

  const session = await cachedSession(sessionId);

  return !!session && session.expiresAt > new Date();
}

export async function DatosDelAutenticado() {
  const sessionId = (await cookies()).get('sessions_id')?.value;

  if (!sessionId) {
    redirect('/auth/iniciar_sesion');
  }

  const session = await cachedSession(sessionId);

  if (!session || session.expiresAt < new Date()) {
    redirect('/auth/iniciar_sesion');
  }

  return session.propietario;
}
