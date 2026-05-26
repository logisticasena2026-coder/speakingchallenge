import Link from 'next/link';
import { Sonido } from '../sonido';

export function Presentacion() {
  return (
    <section
      className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden min-h-screen flex items-center"
      id="Presentacion"
    >

      <video
        autoPlay muted loop playsInline
        poster="/FoundPage.webp"
        className="absolute inset-0 size-full object-cover"
        style={{
          maskImage: 'linear-gradient(black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(black 80%, transparent)',
        }}
      >
        <source src="/FoundPage.webm" type="video/webm" />
        <source src="/FoundPage.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute top-1/4 right-1/4 size-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, var(--brand-green), transparent)',
          filter: 'blur(10px)',
        }}
      ></div>
      <div
        className="absolute bottom-1/4 left-1/3 size-64 rounded-full opacity-4"
        style={{
          background: 'radial-gradient(circle, var(--brand-cyan), transparent)',
          filter: 'blur(10px)',
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: 'var(--brand-green)' }}
          ></span>
          <span className="section-label">El despertar de los verbos perdidos</span>
        </div>

        <h1
          className="display-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6 animate-in"
          style={{ fontSize: 'clamp(36px, 7vw, 80px)' }}
        >
          Cuatro eras,
          <br />
          <span className="text-highlight-green">una travesía</span>
        </h1>

        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-10 animate-in delay-100"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}
        >
          Aprende inglés como jamás lo has hecho. Desbloquea eras históricas, enfrenta desafíos
          arcade y restaura los verbos perdidos del tiempo con la guía de Emily, tu mentora IA.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 animate-in delay-200">
          <Link
            href="/auth/register"
            className="btn-primary w-full sm:w-auto text-base px-8 py-3 text-center"
          >
            Iniciar viaje →
          </Link>
          <Link href="#sistemas" className="btn-ghost w-full sm:w-auto text-center">
            Ver cómo funciona
          </Link>
        </div>

        <ul
          className="flex flex-wrap justify-center gap-2 animate-in delay-300"
          aria-label="Características"
        >
          <li className="feature-pill">
            <span aria-hidden="true">🎮</span> Gamificado
          </li>
          <li className="feature-pill">
            <span aria-hidden="true">🤖</span> IA tutora
          </li>
          <li className="feature-pill">
            <span aria-hidden="true">📊</span> Progreso real
          </li>
          <li className="feature-pill">
            <span aria-hidden="true">🆓</span> Sin tarjeta
          </li>
        </ul>

        <Sonido />
      </div>
    </section>
  );
}
