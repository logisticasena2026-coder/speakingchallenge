import type { Metadata } from 'next';
import { Cinzel, Space_Grotesk, Inter, Geist } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { SileoToaster } from '@/components/SileoToaster';

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
    default: 'PlayLenguage - Aprende inglés a través del tiempo',
    template: '%s | PlayLenguage',
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
  authors: [{ name: 'PlayLenguage' }],
  creator: 'PlayLenguage',
  publisher: 'PlayLenguage',
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
    siteName: 'PlayLenguage',
    title: 'PlayLenguage - Aprende inglés a través del tiempo',
    description:
      'Plataforma de aprendizaje de inglés gamificada con IA. Viaja a través de 4 eras históricas mientras restauras los verbos perdidos del tiempo.',
    images: [
      {
        url: '/FoundPage.webp',
        width: 1200,
        height: 630,
        alt: 'PlayLenguage - Aprendizaje de inglés gamificado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlayLenguage - Aprende inglés a través del tiempo',
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
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <Header />
        {children}
        <SileoToaster />
        <Footer />
      </body>
    </html>
  );
}
