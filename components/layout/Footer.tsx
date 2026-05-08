'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const Pathname = usePathname();
  return (
    <>
      {Pathname === '/' && (
        <footer
          role="contentinfo"
          aria-label="Pie de página"
          className="py-10 px-4 sm:px-6"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
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
                  <p className="text-sm font-semibold" style={{ fontFamily: "'Cinzel',serif" }}>
                    PlayLenguage
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
                <Link href="#sophia" className="nav-link text-xs">
                  Sophia
                </Link>
                <Link href="#creditos" className="nav-link text-xs">
                  Créditos
                </Link>
              </div>

              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                © 2026 PlayLenguage
              </p>
            </div>

            <div
              className="mt-8 pt-6 text-center"
              style={{ borderTop: '1px solid var(--border-subtle)' }}
            >
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: 'var(--text-muted)', letterSpacing: '0.2em' }}
              >
                Restaura las habilidades lingüísticas perdidas en el tiempo
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
