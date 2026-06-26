'use server';

import { DatosDelAutenticado } from '@/lib/auth';
import { obtenerEstadoProgreso } from '@/actions/progreso/obtenerEstadoProgreso';

interface ProgresoData {
  progreso: {
    era_actual_id: string | null;
    imperio_actual_id: string | null;
    nivel_actual_id: string | null;
    estrato_social: number;
    era_actual: { nombre: string } | null;
    imperio_actual: { nombre: string } | null;
    nivel_actual: { _count: { frases_nivel: number } } | null;
  } | null;
  eras: Array<{ estado: string }>;
  logros_desbloqueados: Array<{ logro: { nombre: string } }>;
  imperios_completados: Set<string>;
  niveles_completados: Record<string, unknown>;
}

export async function obtenerContextoEmily() {
  const user = await DatosDelAutenticado();

  if (!user) {
    throw new Error('No se pudo obtener la sesión del usuario');
  }

  const progresoRaw = await obtenerEstadoProgreso();
  const data = progresoRaw.ok ? (progresoRaw as unknown as ProgresoData) : null;

  const p = data?.progreso ?? null;
  const eras = data?.eras ?? [];
  const logros = data?.logros_desbloqueados ?? [];
  const imperiosCompletadosSize = data?.imperios_completados?.size ?? 0;
  const nivelesCompletadosCount = data?.niveles_completados ? Object.keys(data.niveles_completados).length : 0;

  const eraActual = p?.era_actual?.nombre ?? null;
  const imperioActual = p?.imperio_actual?.nombre ?? null;
  const nivelActual = p?.nivel_actual
    ? { fraseCount: p.nivel_actual._count.frases_nivel }
    : null;

  const erasCompletadas = eras.filter((e) => e.estado === 'completado').length;
  const ultimosLogros = logros.slice(0, 3).map((d) => d.logro.nombre);

  return {
    name: user.name,
    nivel: user.nivel,
    frases: user.frases,
    precicion_global: user.precicion_global,
    tiempo_promedio: user.tiempo_promedio,
    dias_racha: user.dias_racha,
    skin: user.skin,
    cantidad_logros: user.cantidad_logros,
    estrato_social: p?.estrato_social ?? 0,
    era_actual: eraActual,
    imperio_actual: imperioActual,
    frases_nivel_actual: nivelActual?.fraseCount ?? 0,
    eras_completadas: erasCompletadas,
    imperios_completados: imperiosCompletadosSize,
    niveles_completados: nivelesCompletadosCount,
    ultimos_logros: ultimosLogros,
  };
}
