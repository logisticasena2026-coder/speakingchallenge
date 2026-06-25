'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { put, del } from '@vercel/blob';
import prisma from '@/lib/prisma';


export async function actualizarAvatar(formData: FormData) {
  const sessionId = (await cookies()).get('sessions_id')?.value;

  if (!sessionId) {
    return { ok: false, message: 'No autenticado, por favor autenticarse.' };
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { propietario: true },
  });

  if (!session || session.expiresAt < new Date() || !session.propietario) {
    return { ok: false, message: 'Sesión inválida' };
  }

  const file = formData.get('avatar') as File;

  if (!file || file.size === 0) {
    return { ok: false, message: 'No se seleccionó ninguna imagen' };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { ok: false, message: 'La imagen no puede superar 5MB' };
  }

  if (session.propietario.avatar) {
    try {
      await del(session.propietario.avatar);
    } catch {}
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const timestamp = Date.now();
  const blob = await put(`avatars/${session.propietario.id}-${timestamp}.jpg`, buffer, {
    access: 'public',
    contentType: 'image/jpeg',
  });

  await prisma.user.update({
    where: { id: session.propietario.id },
    data: { avatar: blob.url },
  });

  revalidatePath('/dashboard', 'layout');

  return { ok: true, message: 'Avatar actualizado', url: blob.url };
}
