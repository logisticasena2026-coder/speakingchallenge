'use client';

import { ArrowLeft, HelpCircle, AlertTriangle, Terminal, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 max-w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-emerald-900/20">
        <div className="flex items-center gap-4">
          <Link
            href="/auth/iniciar_sesion"
            aria-label="Volver al inicio"
            className="text-emerald-400 hover:bg-white/5 transition-all duration-300 p-2 rounded-full active:scale-95"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="font-serif text-2xl font-bold tracking-widest text-emerald-400 drop-shadow-[0_0_8px_rgba(61,214,140,0.5)]">
            speakingchallenge
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Ayuda" className="text-slate-400 hover:text-emerald-300 transition-colors p-2 rounded-full active:scale-95">
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
      </header>
      <main id="main-content" className="grow flex flex-col items-center justify-center relative overflow-hidden px-container-px-mobile md:px-container-px-desktop pt-24 pb-12 min-h-screen" role="alert">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-era-rome-end rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-container rounded-full blur-[120px]" />
        </div>
        <div className="z-10 max-w-4xl w-full flex flex-col items-center text-center">
          <div className="relative mb-12 group">
            <div className="absolute inset-0 bg-error blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-white/10 glass-card p-1">
              <img
                alt="System Failure Visualization"
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClH6FKM5g9Wy9oJ58Lc60YiZco5Q3t6bkeyki8GdJbHG8u83p12eOm8YINioXXdYe_d19Fxfi7JrLZn8lPlAGwjwx8OWOk3WVRxSHiThdjhkWSu6N4WeQy4-WYHLgE7EZ89WN_gl-DeO-b9B4Y2-vbXkQVUpkrkLSBJvErsJ327UTuVKvgG_z89kJ65jpVoZ06ZP7eaoLZnuc_iS2OBHTz-iUoMM9S4bZVj0g0SJh9Udg7i-TBbETmjHYnivKX2bGFh1oIuP_dloiP"
              />
            </div>
            <div className="absolute -top-4 -right-4 bg-error-container text-on-error-container px-3 py-1 rounded-lg border border-error/50 flex items-center gap-2 shadow-lg">
              <AlertTriangle className="text-body-large w-4 h-4" />
              <span className="font-ui-label text-ui-label">SYSTEM_FATAL_500</span>
            </div>
          </div>
          <h2 className="font-h1-hero text-h1-hero text-text-primary mb-4 tracking-tighter uppercase">
            Colapso en el <span className="text-primary italic">continuo</span>{' '}
            <br className="hidden md:block" />
            lingüístico
          </h2>
          <p className="font-body-large text-body-large text-on-surface-variant max-w-2xl mb-8">
            Un error inesperado ha fragmentado la realidad. <br className="hidden md:block" />
            Emily está trabajando en la reparación.
          </p>
          <div className="w-full max-w-md bg-surface-1 border border-white/5 p-padding-card-sm rounded-xl mb-12 relative overflow-hidden shadow-inner">
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-era-rome-end to-primary-container" />
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between opacity-50">
                <span className="font-ui-label text-ui-badge tracking-widest uppercase">
                  System Diagnostics
                </span>
                <span className="font-ui-label text-ui-badge tracking-widest uppercase">
                  Status: Unstable
                </span>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5">
                <Terminal className="text-primary w-5 h-5" />
                <code className="font-mono text-sm text-primary-fixed-dim">
                  Error Code: TIMELINE_COLLAPSE_500
                  {error?.digest && `\nDigest: ${error.digest}`}
                </code>
              </div>
              <div className="mt-2 text-[11px] font-body-standard text-text-muted leading-relaxed">
                &gt; Trace: /history/eras/collapse_handler.sh <br />
                &gt; Memory Overflow: linguistic_matrix_buffer <br />
                &gt; Emily.init(repair_mode)
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <button
              onClick={reset}
              className="relative group px-8 py-4 bg-primary text-on-primary font-ui-label text-ui-label uppercase tracking-widest font-bold rounded-lg overflow-hidden transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(73,224,149,0.3)] hover:shadow-[0_0_30px_rgba(73,224,149,0.5)]"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              <span className="relative flex items-center gap-3">
                <RefreshCw className="w-5 h-5" />
                Reintentar salto temporal
              </span>
            </button>
            <Link
              href="/"
              className="px-8 py-4 bg-transparent border border-border-strong text-on-surface font-ui-label text-ui-label uppercase tracking-widest hover:bg-white/5 transition-all rounded-lg active:scale-95 flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Volver a la base
            </Link>
          </div>
        </div>
        <div className="fixed top-0 left-0 w-full h-1 bg-primary/20 animate-pulse z-40" />
        <div className="fixed bottom-0 left-0 w-full h-1 bg-error/20 animate-pulse z-40" />
      </main>
      <footer className="w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 mt-auto bg-slate-950/40 backdrop-blur-md border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <p className="font-ui-label text-ui-badge uppercase font-bold tracking-widest text-slate-500">
            © 2024 speakingchallenge. Master the ancient tongues.
          </p>
        </div>
        <div className="flex gap-8">
          <Link
            href="#"
            className="font-ui-label text-ui-badge uppercase font-bold tracking-widest text-slate-500 hover:text-emerald-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="font-ui-label text-ui-badge uppercase font-bold tracking-widest text-slate-500 hover:text-emerald-400 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="font-ui-label text-ui-badge uppercase font-bold tracking-widest text-slate-500 hover:text-emerald-400 transition-colors"
          >
            Support
          </Link>
        </div>
      </footer>
    </>
  );
}
