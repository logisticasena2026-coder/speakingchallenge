import type { Metadata } from 'next';
import { DatosDelAutenticado } from '@/lib/auth';
import { obtenerEstadoProgreso } from '@/actions/progreso/obtenerEstadoProgreso';
import { Stasts } from '@/components/Practica/Stasts';
import { ModoEstudio } from '@/components/Practica/ModoEstudio';

export const metadata: Metadata = {
  title: 'Configurar estudio',
  description:
    'Ajusta los parámetros de tu misión de aprendizaje: era histórica, tipo de ejercicio y dificultad antes de comenzar a practicar.',
  robots: { index: false, follow: false },
};

export default async function Practicando() {
  const user = await DatosDelAutenticado();
  const progreso = await obtenerEstadoProgreso();

  const frases = user?.frases ?? 0;
  const diasRacha = user?.dias_racha ?? 0;
  const tiempoPromedio = user?.tiempo_promedio ?? 0;

  const eras = progreso.ok && progreso.eras ? progreso.eras : [];
  const estratoSocial = progreso.ok && progreso.progreso ? progreso.progreso.estrato_social : 0;
  const nivelActualId = progreso.ok && progreso.progreso ? progreso.progreso.nivel_actual_id : null;

  return (
    <main className="relative z-10 px-6 py-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8 ani delay-anim-1">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Configuración de Misión
        </h1>
        <p className="text-sm text-text-secondary max-w-100">
          Ajusta los parámetros antes del salto temporal
        </p>
      </div>

      <Stasts frases={frases} dias_racha={diasRacha} tiempo_promedio={tiempoPromedio} />

      <ModoEstudio eras={eras} estratoSocial={estratoSocial} nivelActualId={nivelActualId} />
    </main>
  );
}
