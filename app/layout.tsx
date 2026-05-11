import type { Metadata } from 'next';
import { Cinzel, Space_Grotesk, Inter, Geist } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { SileoToaster } from '@/components/SileoToaster';
import Link from 'next/link';
import Image from 'next/image';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.speakingchallenge.online'),
  title: {
    default: 'speakingchallenge - Aprende inglés a través del tiempo',
    template: '%s | speakingchallenge',
  },
  description:
    'Plataforma de aprendizaje de inglés gamificada con IA. Viaja a través de 4 eras históricas (Vikinga, Egipto, Roma, Ciberpunk) mientras restauras los verbos perdidos del tiempo. Incluye speaking challenge, conversaciones con IA y juegos arcade.',
  keywords: [
    'aprender inglés',
    'inglés gamificado',
    'IA para aprendizaje',
    'speaking challenge',
    'verbos perdidos',
    'aprendizaje de idiomas',
    'conversación IA',
    'pronunciación inglés',
    'grammar runner',
    'trivia fight',
  ],
  authors: [{ name: 'speakingchallenge' }],
  creator: 'speakingchallenge',
  publisher: 'speakingchallenge',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.speakingchallenge.online',
    siteName: 'speakingchallenge',
    title: 'speakingchallenge - Aprende inglés a través del tiempo',
    description:
      'Plataforma de aprendizaje de inglés gamificada con IA. Viaja a través de 4 eras históricas mientras restauras los verbos perdidos del tiempo.',
    images: [
      {
        url: '/FoundPage.webp',
        width: 1200,
        height: 630,
        alt: 'speakingchallenge - Aprendizaje de inglés gamificado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'speakingchallenge - Aprende inglés a través del tiempo',
    description:
      'Plataforma de aprendizaje de inglés gamificada con IA. Viaja a través de 4 eras históricas mientras restauras los verbos perdidos del tiempo.',
    images: ['/FoundPage.webp'],
  },
  alternates: {
    canonical: 'https://www.speakingchallenge.online',
    languages: {
      es: 'https://www.speakingchallenge.online',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        cinzel.variable,
        spaceGrotesk.variable,
        inter.variable,
        'font-sans',
        geist.variable,
      )}
      data-scroll-behavior="smooth"
    >
      <body>
        <Link href="#main-content" className="skip-link">
          Saltar al contenido principal
        </Link>
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
        {children}
        <SileoToaster />
        <footer
          role="contentinfo"
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
                  <p className="text-sm font-semibold" style={{ fontFamily: "'Cinzel',serif" }}>
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
                <Link href="#sophia" className="nav-link text-xs">
                  Sophia
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
      </body>
    </html>
  );
}
