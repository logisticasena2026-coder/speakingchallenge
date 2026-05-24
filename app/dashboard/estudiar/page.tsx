import type { Metadata } from 'next';
import { Stasts } from '@/components/Practica/Stasts';
import { ModoEstudio } from '@/components/Practica/ModoEstudio';

export const metadata: Metadata = {
  title: 'Configurar estudio',
  description:
    'Ajusta los parámetros de tu misión de aprendizaje: era histórica, tipo de ejercicio y dificultad antes de comenzar a practicar.',
  robots: { index: false, follow: false },
};

export default function Practicando() {
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

      <Stasts />

      <ModoEstudio />
    </main>
  );
}
