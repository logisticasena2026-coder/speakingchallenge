import { Metadata } from 'next';
import { Actividades } from '@/components/Landing/Actividades';
import { Creditos } from '@/components/Landing/Creditos';
import { Eras } from '@/components/Landing/Eras';
import { Juegos } from '@/components/Landing/Juegos';
import { Mapa } from '@/components/Landing/Mapa';
import { Presentacion } from '@/components/Landing/Presentacion';
import { Sistemas } from '@/components/Landing/Sistemas';
import { Emily } from '@/components/Landing/Emily';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'speakingchallenge - Speaking Challenge Online',
  description:
    'Aprende inglés viajando por el tiempo. Cuatro eras históricas te esperan: Vikings, Egypt, Rome y Cyber. Únete al desafío ahora.',
  robots: { index: true, follow: true },
};

export default function Home() {
  return (
    <>
      <header id="nav" className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            style={{
              background: 'rgba(7,9,15,0.85)',
              backdropFilter: 'blur(10px)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
            className="flex items-center justify-between h-16 px-4 sm:px-6 rounded-b-xl"
          >
            <Link href="#Presentacion" className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold">
                <Image
                  src="/Microfono.png"
                  width={1024}
                  height={1024}
                  alt="Logo de speakingchallenge"
                />
              </div>
              <span
                className="font-display font-semibold text-sm tracking-wide"
                style={{ color: 'var(--text-primary)' }}
              >
                speakingchallenge
              </span>
            </Link>

            <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-6">
              <Link href="#eras" className="nav-link">
                Eras
              </Link>
              <Link href="#sistemas" className="nav-link">
                Sistemas
              </Link>
              <Link href="#actividades" className="nav-link">
                Actividades
              </Link>
              <Link href="#emily" className="nav-link">
                Emily
              </Link>
              <Link href="#mapa" className="nav-link">
                Mapa
              </Link>
              <Link href="#juegos" className="nav-link">
                Juegos
              </Link>
              <Link href="#creditos" className="nav-link">
                Créditos
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/auth/iniciar_sesion" className="btn-primary text-sm">
                Iniciar viaje →
              </Link>
            </div>

            <button
              id="hamburger"
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Abrir menú de navegación"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect y="3" width="20" height="2" rx="1" />
                <rect y="9" width="20" height="2" rx="1" />
                <rect y="15" width="20" height="2" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main id="main-content">
        <Presentacion />
        <Eras />
        <Sistemas />
        <Actividades />
        <Emily />
        <Mapa />
        <Juegos />
        <Creditos />
      </main>

      <footer
        aria-label="Pie de página"
        className="py-10 px-4 sm:px-6"
        style={{ borderTop: '1px solid var(--border-subtle)', minHeight: '200px' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ background: 'var(--brand-green)', color: '#07090f' }}
              >
                P
              </div>
              <div>
                <p className="text-sm font-semibold font-display">
                  speakingchallenge
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  El despertar de los verbos perdidos
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-5">
              <Link href="#eras" className="nav-link text-xs">
                Eras
              </Link>
              <Link href="#sistemas" className="nav-link text-xs">
                Sistemas
              </Link>
              <Link href="#actividades" className="nav-link text-xs">
                Actividades
              </Link>
              <Link href="#emily" className="nav-link text-xs">
                Emily
              </Link>
              <Link href="#creditos" className="nav-link text-xs">
                Créditos
              </Link>
            </div>

            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © 2026 speakingchallenge
            </p>
          </div>

          <div
            className="mt-8 pt-6 text-center"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}
            >
              Restaura las habilidades lingüísticas perdidas en el tiempo
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
