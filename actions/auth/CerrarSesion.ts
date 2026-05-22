'use server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function CerrarSesion() {
  const session = (await cookies()).get('sessions_id');

  if (session) {
    await prisma.session.delete({
      where: { id: session.value },
    });

    (await cookies()).delete('session_id');

    return {
      ok: true,
      message: `Hasta la proxima`,
    };
  }
  return {
    ok: false,
    message: `Error al cerrar sesion`,
  };
}
