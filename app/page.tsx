import { Metadata } from 'next';
import { Actividades } from '@/components/Landing/Actividades';
import { Creditos } from '@/components/Landing/Creditos';
import { Eras } from '@/components/Landing/Eras';
import { Juegos } from '@/components/Landing/Juegos';
import { Mapa } from '@/components/Landing/Mapa';
import { Presentacion } from '@/components/Landing/Presentacion';
import { Sistemas } from '@/components/Landing/Sistemas';
import { Sophia } from '@/components/Landing/Sophia';

export const metadata: Metadata = {
  title: 'speakingchallenge - Speaking Challenge Online',
  description: 'Aprende inglés viajando por el tiempo. Cuatro eras históricas te esperan: Vikings, Egypt, Rome y Cyber. Únete al desafío ahora.',
};

export default function Home() {
  return (
    <main id="main-content">
      <Presentacion />
      <Eras />
      <Sistemas />
      <Actividades />
      <Sophia />
      <Mapa />
      <Juegos />
      <Creditos />
    </main>
  );
}
