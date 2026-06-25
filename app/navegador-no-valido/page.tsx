'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import {
  navegadorEsCompatible,
  type APIQueFalta,
  type ResultadoValidacion,
} from '@/lib/validarNavegador';
import Link from 'next/link';
import {
  ArrowLeft,
  TriangleAlert,
  CheckCircle2,
  Mic,
  Radio,
  AudioLines,
  Ear,
  ShieldBan,
} from 'lucide-react';
import { Particles } from '@/components/ui/particles';
import { FaChrome, FaEdge, FaSafari } from 'react-icons/fa';

const browsersSupported = [
  {
    name: 'Google Chrome',
    description: 'Soporte completo',
    recommended: true,
    icon: FaChrome,
  },
  {
    name: 'Microsoft Edge',
    description: 'Soporte completo',
    recommended: true,
    icon: FaEdge,
  },
  {
    name: 'Safari',
    description: 'Soporte completo (14.3+)',
    recommended: false,
    icon: FaSafari,
  },
];

const etiquetaAPI: Record<APIQueFalta, { titulo: string; descripcion: string; icono: React.ElementType }> = {
  'speech-recognition': {
    titulo: 'Web Speech API',
    descripcion: 'Reconocimiento de voz en tiempo real para el modo práctica',
    icono: Mic,
  },
  'web-audio': {
    titulo: 'Web Audio API',
    descripcion: 'Procesamiento de audio necesario para Emily',
    icono: AudioLines,
  },
  'audio-worklet': {
    titulo: 'AudioWorklet',
    descripcion: 'Procesamiento de audio en tiempo real para Emily',
    icono: Radio,
  },
  'get-user-media': {
    titulo: 'Acceso al micrófono',
    descripcion: 'Captura de audio desde tu micrófono',
    icono: Ear,
  },
  brave: {
    titulo: 'Brave Shield',
    descripcion: 'Brave bloquea intencionalmente las APIs de audio',
    icono: ShieldBan,
  },
};

export default function NavegadorNoValido() {
  const [estado, setEstado] = useState<ResultadoValidacion | null>(null);

  useEffect(() => {
    navegadorEsCompatible().then((res) => {
      if (res.compatible) {
        redirect('/dashboard');
      } else {
        setEstado(res);
      }
    });
  }, []);

  if (!estado) return null;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 max-w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-emerald-900/20">
        <Link href="/auth/iniciar_sesion" className="flex items-center gap-2">
          <ArrowLeft className="text-primary w-5 h-5" aria-hidden="true" />
          <span className="font-serif text-2xl font-bold tracking-widest text-emerald-400 drop-shadow-[0_0_8px_rgba(61,214,140,0.5)]">
            speakingchallenge
          </span>
        </Link>
      </header>

      <main
        id="main-content"
        className="relative z-10 grow flex items-center justify-center px-container-px-mobile md:px-container-px-desktop py-24"
      >
        <div className="w-full max-w-2xl relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-red-500/20 via-amber-500/20 to-red-500/20 rounded-xl blur opacity-30"></div>
          <div className="relative bg-surface-1/40 backdrop-blur-2xl border border-white/5 p-padding-card-sm md:p-padding-card-lg rounded-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-amber-500/40 to-transparent"></div>

            <div className="flex justify-center mb-6 ani d1">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-surface-2 border border-amber-500/20 rounded-full p-4">
                  <TriangleAlert className="w-10 h-10 text-amber-400" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="text-center mb-6 ani d1">
              <h1 className="font-h2-section text-h2-section text-primary mb-3">
                Navegador no compatible
              </h1>
              <p className="font-body-large text-body-standard text-text-secondary max-w-lg mx-auto leading-relaxed">
                Tu navegador actual no soporta{' '}
                {estado.apiQueFaltan.length === 1
                  ? 'la API necesaria'
                  : 'las APIs necesarias'}{' '}
                para usar <strong className="text-primary font-semibold">speakingchallenge</strong>.
              </p>
            </div>

            {estado.apiQueFaltan.length > 0 && (
              <div className="mb-8 ani d2">
                <div className="flex items-center gap-2 mb-4">
                  <TriangleAlert className="w-5 h-5 text-amber-400" aria-hidden="true" />
                  <h2 className="font-ui-label text-ui-label text-text-primary uppercase tracking-wider font-semibold">
                    APIs faltantes
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {estado.apiQueFaltan.map((api) => {
                    const info = etiquetaAPI[api];
                    const Icono = info.icono;
                    return (
                      <div
                        key={api}
                        className="bg-surface-2/50 border border-white/6 rounded-lg px-4 py-3 flex items-start gap-3"
                      >
                        <div className="mt-0.5 shrink-0">
                          <Icono className="w-5 h-5 text-amber-400" aria-hidden="true" />
                        </div>
                        <div>
                          <span className="font-ui-label text-ui-label text-text-primary font-semibold block">
                            {info.titulo}
                          </span>
                          <span className="font-ui-badge text-ui-badge text-text-muted-alt">
                            {info.descripcion}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-8 ani d2">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-brand-green" aria-hidden="true" />
                <h2 className="font-ui-label text-ui-label text-text-primary uppercase tracking-wider font-semibold">
                  Navegadores recomendados
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {browsersSupported.map((browser) => (
                  <div
                    key={browser.name}
                    className={`relative bg-surface-2 border rounded-xl p-5 flex flex-col items-center text-center transition-all duration-250 ease-out hover:-translate-y-0.5 hover:border-white/10 hover:shadow-[0_16px_32px_rgba(0,0,0,0.3)] ${
                      browser.recommended
                        ? 'border-brand-green/20 hover:shadow-[0_16px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(61,214,140,0.06)]'
                        : 'border-white/6'
                    }`}
                  >
                    {browser.recommended && (
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-brand-green/60 to-transparent rounded-t-xl"></div>
                    )}
                    <div className="mb-3">
                      <browser.icon />
                    </div>
                    <h3 className="font-h3-card text-ui-label text-text-primary font-semibold mb-1">
                      {browser.name}
                    </h3>
                    <span
                      className={`font-ui-badge text-ui-badge uppercase tracking-widest font-bold px-2 py-0.5 rounded ${
                        browser.recommended
                          ? 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                          : 'bg-text-muted/10 text-text-muted border border-text-muted/20'
                      }`}
                    >
                      {browser.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 ani d3">
              <div className="bg-surface-3/50 border border-border-subtle rounded-lg p-4">
                <p className="font-body-standard text-body-standard text-text-secondary leading-relaxed">
                  <strong className="text-text-primary">¿Por qué?</strong> speakingchallenge usa{' '}
                  <code className="font-ui-label text-ui-label bg-surface-4 px-1.5 py-0.5 rounded text-brand-cyan">
                    Web Speech API
                  </code>
                  ,{' '}
                  <code className="font-ui-label text-ui-label bg-surface-4 px-1.5 py-0.5 rounded text-brand-cyan">
                    Web Audio API
                  </code>{' '}
                  y{' '}
                  <code className="font-ui-label text-ui-label bg-surface-4 px-1.5 py-0.5 rounded text-brand-cyan">
                    AudioWorklet
                  </code>
                  , disponibles en navegadores basados en Chromium y Safari (14.3+).
                </p>
              </div>
            </div>

            <div className="text-center ani d4">
              <Link
                href="/"
                className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <Particles quantity={60} color="#f5a623" size={0.4} staticity={50} ease={50} />
        </div>
      </main>
    </>
  );
}
