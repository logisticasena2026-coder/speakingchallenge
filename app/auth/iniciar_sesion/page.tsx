import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Landmark, Cog } from 'lucide-react';
import { IniciarSesionForm } from '@/components/forms/auth/iniciarSesionForm';
import { Particles } from '@/components/ui/particles';

export const metadata: Metadata = {
  title: 'Iniciar sesión - speakingchallenge',
  description: 'Inicia sesión en speakingchallenge para continuar tu aventura de aprendizaje de inglés.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Iniciar_sesion({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect: redirectUrl } = await searchParams;
  return (
    <>

      <main
        id="main-content"
        className="relative z-10 grow flex items-center justify-center px-container-px-mobile md:px-container-px-desktop py-24"
      >
        <div className="w-full max-w-md relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-surface-1/40 backdrop-blur-2xl border border-white/5 p-padding-card-sm md:p-padding-card-lg rounded-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent"></div>
            <div className="flex items-center justify-between mb-5">
              <Link href="/" className="flex items-center gap-1.5 group">
                <ArrowLeft className="text-primary w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
                <span className="font-serif text-xs font-bold tracking-widest text-emerald-400/80 group-hover:text-emerald-400 transition-colors">
                  speakingchallenge
                </span>
              </Link>
            </div>
            <div className="text-center mb-8">
              <h1 className="font-h2-section text-h2-section text-primary mb-2">
                Bienvenido de nuevo, Viajero
              </h1>
              <p className="font-body-large text-body-standard text-text-secondary">
                Continúa tu travesía por el tiempo.
              </p>
            </div>

            <IniciarSesionForm redirectUrl={redirectUrl} />

            <div className="mt-8 text-center pt-6 border-t border-white/5">
              <Link
                className="font-body-standard text-ui-label text-text-secondary hover:text-primary transition-colors group"
                href="/auth/register"
              >
                ¿Nuevo en el tiempo?{' '}
                <span className="text-primary font-bold group-hover:underline underline-offset-4">
                  Crea tu cuenta
                </span>
              </Link>
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-12 opacity-40" role="presentation">
            <div className="flex flex-col items-center">
              <Sparkles className="text-primary mb-1 w-6 h-6" aria-hidden="true" />
              <span className="text-ui-badge uppercase tracking-widest font-bold">Magia</span>
            </div>
            <div className="flex flex-col items-center">
              <Landmark className="text-secondary mb-1 w-6 h-6" aria-hidden="true" />
              <span className="text-ui-badge uppercase tracking-widest font-bold">Historia</span>
            </div>
            <div className="flex flex-col items-center">
              <Cog className="text-brand-cyan mb-1 w-6 h-6" aria-hidden="true" />
              <span className="text-ui-badge uppercase tracking-widest font-bold">Ciencia</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <Particles
            quantity={80}
            color="#3dd68c"
            size={0.5}
            staticity={60}
            ease={60}
          />
        </div>
      </main>
    </>
  );
}
