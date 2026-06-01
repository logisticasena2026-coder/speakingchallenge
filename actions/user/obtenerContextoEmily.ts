'use server';

import { DatosDelAutenticado } from '@/lib/auth';

export async function obtenerContextoEmily() {
  const user = await DatosDelAutenticado();

  return {
    name: user.name,
    nivel: user.nivel,
    frases: user.frases,
    precicion_global: user.precicion_global,
    dias_racha: user.dias_racha,
    skin: user.skin,
  };
}
