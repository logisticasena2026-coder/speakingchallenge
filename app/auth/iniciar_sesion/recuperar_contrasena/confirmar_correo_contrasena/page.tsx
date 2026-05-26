import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Clock, LogIn, ExternalLink, ArrowLeft } from 'lucide-react';
import { Sonido } from '@/components/sonido';

export const metadata: Metadata = {
  title: 'Correo de recuperación enviado - speakingchallenge',
  description: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
  robots: {
    index: false,
    follow: false,
  },
};

interface Props {
  searchParams: Promise<{ correo: string }>;
}

export default async function ConfirmarCorreoContrasena({ searchParams }: Readonly<Props>) {
  const { correo } = await searchParams;

  return (
    <>

      <main id="main-content" className="grow flex items-center justify-center relative px-container-px-mobile md:px-container-px-desktop pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-surface-0 to-transparent"></div>
        </div>
        <div className="relative w-full max-w-2xl z-10">
          <div className="bg-surface-2/40 backdrop-blur-xl border border-border-strong rounded-xl p-8 md:p-12 shadow-2xl shadow-black/80 flex flex-col items-center text-center gap-y-8">
            <div className="flex items-center justify-between w-full">
              <Link href="/auth/iniciar_sesion" className="flex items-center gap-1.5 group">
                <ArrowLeft className="text-primary w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
                <span className="font-serif text-xs font-bold tracking-widest text-emerald-400/80 group-hover:text-emerald-400 transition-colors">
                  speakingchallenge
                </span>
              </Link>
            </div>
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center animate-pulse shadow-[0_0_40px_rgba(96,243,166,0.2)]">
                <Mail className="w-12 h-12 text-primary" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-surface-4 border border-primary/50 flex items-center justify-center shadow-lg">
                <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="font-h1-hero text-h1-hero text-primary drop-shadow-[0_0_15px_rgba(96,243,166,0.3)]">
                Vínculo Enviado
              </h1>
              <p className="font-body-large text-body-large text-text-secondary max-w-md mx-auto leading-relaxed">
                Emily ha enviado las coordenadas Link {correo}. Revisa tu bandeja para continuar el
                salto temporal.
              </p>
            </div>
            <Sonido />
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
              <Link
                href="/auth/iniciar_sesion"
                className="relative overflow-hidden bg-primary text-on-primary font-ui-label text-ui-label px-8 py-4 rounded-lg font-bold tracking-wider glossy-effect transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(96,243,166,0.5)] active:scale-95 group flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  VOLVER AL LOGIN
                  <LogIn className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
              <Link
                href="https://mail.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-border-strong text-text-primary font-ui-label text-ui-label px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 hover:bg-white/5 hover:border-primary/50 active:scale-95 group flex items-center justify-center gap-2"
              >
                <span className="flex items-center justify-center gap-2">
                  IR AL CORREO
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
