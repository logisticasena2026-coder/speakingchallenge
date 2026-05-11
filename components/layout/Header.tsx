'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const Pathname = usePathname();

  return (
    <>
      {Pathname === '/' && (
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
                  <Image src="/Microfono.png" width={1024} height={1024} alt="Logo de speakingchallenge" />
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
                <Link href="#sophia" className="nav-link">
                  Sophia
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
      )}
      {/* <div id="mobile-menu" role="dialog" aria-label="Menú de navegación">
        <button
          id="close-menu"
          className="absolute top-6 right-6 p-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <Link
          href="#eras"
          className="nav-link text-xl"
          onClick={() => document.getElementById('mobile-menu')?.classList.remove('open')}
        >
          Eras
        </Link>
        <Link
          href="#sistemas"
          className="nav-link text-xl"
          onClick={() => document.getElementById('mobile-menu')?.classList.remove('open')}
        >
          Sistemas
        </Link>
        <Link
          href="#actividades"
          className="nav-link text-xl"
          onClick={() => document.getElementById('mobile-menu')?.classList.remove('open')}
        >
          Actividades
        </Link>
        <Link
          href="#sophia"
          className="nav-link text-xl"
          onClick={() => document.getElementById('mobile-menu')?.classList.remove('open')}
        >
          Sophia
        </Link>
        <Link
          href="#mapa"
          className="nav-link text-xl"
          onClick={() => document.getElementById('mobile-menu')?.classList.remove('open')}
        >
          Mapa
        </Link>
        <Link
          href="#juegos"
          className="nav-link text-xl"
          onClick={() => document.getElementById('mobile-menu')?.classList.remove('open')}
        >
          Juegos
        </Link>
        <Link
          href="#creditos"
          className="nav-link text-xl"
          onClick={() => document.getElementById('mobile-menu')?.classList.remove('open')}
        >
          Créditos
        </Link>
        <button className="btn-primary mt-4">Iniciar viaje →</button>
      </div> */}
    </>
  );
}
