import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, Sparkles, Landmark, Cog } from 'lucide-react';
import { RecuperarContrasenaForm } from '@/components/forms/auth/recuperarContrasenaForm';
import { Particles } from '@/components/ui/particles';

export const metadata: Metadata = {
  title: 'Recuperar contraseña - speakingchallenge',
  description: 'Recupera el acceso a tu cuenta de speakingchallenge.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RecuperarContrasena() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 max-w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-emerald-900/20">
        <Link href="/auth/iniciar_sesion" className="flex items-center gap-2">
          <ArrowLeft className="text-primary w-5 h-5" aria-hidden="true" />
          <span className="font-serif text-2xl font-bold tracking-widest text-emerald-400 drop-shadow-[0_0_8px_rgba(61,214,140,0.5)]">
            speakingchallenge
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <HelpCircle
            className="text-slate-400 hover:text-emerald-300 transition-colors w-5 h-5"
            aria-hidden="true"
          />
        </div>
      </header>
      <main
        id="main-content"
        className="relative z-10 grow flex items-center justify-center px-container-px-mobile md:px-container-px-desktop py-24"
      >
        <div className="w-full max-w-md relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-surface-1/40 backdrop-blur-2xl border border-white/5 p-padding-card-sm md:p-padding-card-lg rounded-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent"></div>
            <div className="text-center mb-8">
              <h1 className="font-h2-section text-h2-section text-primary mb-2">
                Recuperar tu cuenta
              </h1>
              <p className="font-body-large text-body-standard text-text-secondary">
                Ingresa tu correo y te enviaremos un enlace para restaurar tu contraseña.
              </p>
            </div>
            <RecuperarContrasenaForm />
            <div className="mt-8 text-center pt-6 border-t border-white/5">
              <Link
                className="font-body-standard text-ui-label text-text-secondary hover:text-primary transition-colors group"
                href="/auth/iniciar_sesion"
              >
                <span className="text-primary font-bold group-hover:underline underline-offset-4">
                  Volver a iniciar sesión
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
          <Particles quantity={80} color="#3dd68c" size={0.5} staticity={60} ease={60} />
        </div>
      </main>
    </>
  );
}
