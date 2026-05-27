import prisma from '@/lib/prisma';

export async function actualizarRacha(usuario: string) {
  const user = await prisma.user.findFirst({
    where: { id: usuario },
    select: {
      dias_racha: true,
      ultima_racha_fecha: true,
      racha_mas_larga: true,
    },
  });

  if (!user) return;

  const ahora = new Date();
  const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
  let nuevaRacha = 1;

  if (user.ultima_racha_fecha) {
    const ultimaFecha = new Date(
      user.ultima_racha_fecha.getFullYear(),
      user.ultima_racha_fecha.getMonth(),
      user.ultima_racha_fecha.getDate(),
    );

    const diffDias = Math.round((hoy.getTime() - ultimaFecha.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDias === 0) {
      // Ya se registró actividad hoy, no hacer nada
      return;
    } else if (diffDias === 1) {
      // Día consecutivo, continúa la racha
      nuevaRacha = user.dias_racha + 1;
    } else {
      // Se rompió la racha
      nuevaRacha = 1;
    }
  }

  const nuevaRachaMasLarga = Math.max(nuevaRacha, user.racha_mas_larga);

  await prisma.user.update({
    where: { id: usuario },
    data: {
      dias_racha: nuevaRacha,
      ultima_racha_fecha: ahora,
      racha_mas_larga: nuevaRachaMasLarga,
    },
  });
}
