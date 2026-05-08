'use client'
import Link from 'next/link';
import { ArrowLeft, Feather, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 max-w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-emerald-900/20">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-emerald-400 cursor-pointer hover:bg-white/5 transition-all duration-300 p-2 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="font-serif text-2xl font-bold tracking-widest text-emerald-400 drop-shadow-[0_0_8px_rgba(61,214,140,0.5)]">
            PlayLenguage
          </h1>
        </div>

      </header>
      <main className="relative grow flex items-center justify-center px-container-px-mobile md:px-container-px-desktop mesh-linear overflow-hidden min-h-screen">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] left-[10%] opacity-20 float-slow">
            <div
              className="w-32 h-32 md:w-64 md:h-64 rounded-full border-4 border-emerald-500/20 animate-spin-slow"
              style={{ borderTopColor: 'rgba(61, 214, 140, 0.4)' }}
            />
          </div>
          <div className="absolute bottom-[20%] right-[15%] opacity-15 float-delayed">
            <div
              className="w-48 h-48 md:w-80 md:h-80 rounded-full border-2 border-emerald-400/10 animate-spin-reverse"
              style={{ borderBottomColor: 'rgba(61, 214, 140, 0.3)' }}
            />
          </div>
          <div className="absolute top-[60%] left-[75%] opacity-10 float-slow">
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-emerald-300/10 animate-spin-slow" />
          </div>
          <div className="absolute inset-0 bg-[radial-linear(circle_at_center,transparent_0%,#07090f_80%)]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl py-32">
          <div className="mb-8 inline-block">
            <span className="font-h1-hero text-h1-hero text-primary opacity-20 select-none tracking-tighter">
              404
            </span>
            <div className="h-1 w-full bg-linear-to-r from-transparent via-primary to-transparent -mt-8 md:-mt-16 blur-sm" />
          </div>
          <h2 className="font-h2-section text-[32px] md:text-h2-section text-on-surface mb-6 drop-shadow-lg">
            Viajero, te has perdido en el tiempo
          </h2>
          <p className="font-body-large text-body-large text-on-surface-variant mb-12 max-w-xl mx-auto opacity-80">
            Esta era no existe en nuestra línea temporal. Has cruzado un portal hacia un vacío donde
            los ecos del pasado aún no han sido escritos.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              href="/"
              className="group relative px-8 py-4 bg-primary text-on-primary font-ui-label text-ui-label font-bold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(73,224,149,0.3)] hover:shadow-[0_0_30px_rgba(73,224,149,0.5)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Volver al presente (Home)
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
            <button className="px-8 py-4 glass-panel text-on-surface font-ui-label text-ui-label font-medium rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2 border border-white/10">
              <Feather className="w-5 h-5" />
              Reportar anomalía
            </button>
          </div>
        </div>
      </main>
      <footer className="w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 mt-auto bg-slate-950/40 backdrop-blur-md border-t border-white/5">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="font-ui-label text-ui-badge uppercase font-bold tracking-widest text-slate-500">
            © 2024 PlayLenguage. Master the ancient tongues.
          </p>
        </div>
        <div className="flex gap-8">
          <Link
            className="font-ui-label text-ui-badge uppercase font-bold tracking-widest text-slate-500 hover:text-emerald-400 transition-colors"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="font-ui-label text-ui-badge uppercase font-bold tracking-widest text-slate-500 hover:text-emerald-400 transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="font-ui-label text-ui-badge uppercase font-bold tracking-widest text-slate-500 hover:text-emerald-400 transition-colors"
            href="#"
          >
            Support
          </Link>
        </div>
      </footer>
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 30s linear infinite;
        }
      `}</style>
    </>
  );
}
