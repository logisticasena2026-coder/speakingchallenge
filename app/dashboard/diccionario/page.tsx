import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { obtenerPalabras } from '@/actions/diccionario/obtenerPalabras';
import { DiccionarioClient } from './DiccionarioClient';

export const metadata: Metadata = {
  title: 'Diccionario | speakingchallenge',
  description: 'Tus palabras guardadas para repasar.',
  robots: { index: false, follow: false },
};

export default async function DiccionarioPage() {
  const res = await obtenerPalabras();
  const palabras = res.ok ? res.palabras : [];

  return (
    <main className="pt-20 px-4 md:px-6 pb-10 relative z-10">
      <div className="max-w-250 mx-auto">
        <section className="ani d1 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-6 h-6 text-brand-cyan" />
            <h1 className="font-display text-[28px] font-bold text-text-primary">Diccionario</h1>
          </div>
          <p className="text-sm text-text-secondary">
            {palabras.length} {palabras.length === 1 ? 'palabra guardada' : 'palabras guardadas'}
          </p>
        </section>

        <DiccionarioClient palabrasIniciales={palabras} />
      </div>
    </main>
  );
}
