import type { Metadata } from 'next';
import { HeaderPractica } from '@/components/Practica/HeaderPractica';
import { MuestraDeFrases } from '@/components/Practica/MuestraDeFrases';
import { Nivel } from '@/components/Practica/Nivel';

export const metadata: Metadata = {
  title: 'Practicando',
  description:
    'Modo de práctica inmersiva con frases en inglés. Mejora tu pronunciación y comprensión mientras viajas a través del tiempo.',
  robots: { index: false, follow: false },
};

export default function Practicando() {
  return (
    <>
      <h1 className="sr-only">Práctica de pronunciación</h1>
      {' '}
      <div className="mesh-bg"></div>
      <div className="noise-layer"></div>
      <div className="particle-layer"></div>
      <div
        id="bgWave"
        className="fixed bottom-0 left-0 right-0 h-25 flex items-end justify-center gap-0.75 opacity-6 pointer-events-none z-0 px-6"
      ></div>
      <HeaderPractica />
      <div className="relative z-1 h-[calc(100vh-64px)] flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden px-4 py-5 md:px-6 md:py-6">
          <MuestraDeFrases />
        </div>
        <Nivel />
      </div>
    </>
  );
}
