import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contraseña actualizada - PlayLenguage',
  description: 'Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContrasenaCambiada() {
  return (
    <>

      <main id="main-content" className="min-h-screen grow flex items-center justify-center px-4 relative" role="status" aria-live="polite">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
        </div>
        <section className="max-w-xl w-full text-center justify-center relative z-10">
          <div className="glass-panel rounded-xl p-10 md:p-16 flex flex-col items-center gap-8 shadow-2xl">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary/30 flex items-center justify-center bg-surface-1/80 glow-success">
                <CheckCircle
                  className="w-12 h-12 md:w-14 md:h-14 text-primary"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="font-h1-hero text-primary uppercase tracking-[0.2em] drop-shadow-[0_0_12px_rgba(96,243,166,0.4)]">
                Acceso Restaurado
              </h1>
              <p className="font-body-large text-text-secondary max-w-md mx-auto">
                Tu clave ha sido actualizada con éxito. El portal está listo para tu siguiente
                viaje.
              </p>
            </div>
            <div className="w-full pt-4">
              <Link
                href="/auth/iniciar_sesion"
                className="group relative w-full bg-primary hover:bg-primary-fixed-dim text-on-primary font-bold py-4 px-8 rounded-lg transition-all duration-300 transform active:scale-95 shadow-[0_0_20px_rgba(96,243,166,0.3)] overflow-hidden flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 font-ui-label text-base tracking-widest uppercase">
                  Iniciar Sesión
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <div className="fixed inset-0 -z-10 opacity-20">
        <div
          className="absolute bottom-0 left-0 w-full h-full"
          data-alt="A cinematic, high-tech control room environment with holographic green light interfaces and historical artifact outlines floating in a dark, atmospheric void. The aesthetic is a blend of futuristic spaceship technology and ancient library mystery, utilizing deep emerald and slate tones. Soft neon glows emanate from digital runes, creating a sense of restored order and technical precision in a dark-mode game interface background."
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDR43dswmlKrflpRJCQylMtoMbv0MQfw2OkZr_KJtG8DSLoJbuQXxNcSc1mAxl_S5usps4pS4KHSiwGyEZEH_sPou5njK3t6rA25U-gWWIEAyFZf81VYZ8a43Q7n-Ew3bdNXOoXKyxn06c1zkJUNgDGIL-NDq0pAySLRlfI86g3TPI381A3IeWjAlnWA2XZI5y4ZMjeM7PByPazZG7Do72zxZOR_OR9ecrRnFDqOWzK4rd6v7N2IEOMJnLTVV6srOcBZd-hbc90oPeJ')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
    </>
  );
}
