import type { Metadata } from 'next';
import { EstadisticasSesion } from '@/components/Estadisticas/EstadisticasSesion';

export const metadata: Metadata = {
  title: 'Estadísticas de práctica | speakingchallenge',
  description:
    'Revisa las estadísticas de tu sesión de práctica: tiempo total, promedio por frase y precisión de pronunciación.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <div className="mesh-bg" />
      <div className="noise-layer" />
      <div className="particle-layer" />
      <EstadisticasSesion />
    </>
  );
}
