import { GraduationCap, Clock, Bot, Languages, Globe, Sparkles } from 'lucide-react';
import { OrbitingCircles } from '../ui/orbiting-circles';
import Image from 'next/image';

export function Sophia() {
  return (
    <section
      id="sophia"
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: 'var(--surface-1)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sophia image */}
          <div className="sophia-image-frame aspect-3/4 max-w-sm mx-auto lg:mx-0">
            <div className="relative h-125 w-full overflow-hidden flex items-center justify-center ">
              <OrbitingCircles>
                <Globe />
                <Sparkles />
                <GraduationCap />
              </OrbitingCircles>
              <OrbitingCircles radius={100} reverse>
                <Bot />
                <Languages />
                <Clock />
              </OrbitingCircles>
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1a3a5c, #0d2240)',
                  border: '2px solid rgba(61,214,140,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  fontFamily: "'Cinzel',serif",
                  fontSize: '36px',
                  color: 'var(--brand-green)',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }}
              >
                <Image src="/Sophia.png" alt="Sophia" width={500} height={500} />
              </div>
            </div>

            {/* Online badge */}
            <div
              className="absolute bottom-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(7,9,15,0.8)', border: '1px solid var(--border-subtle)' }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: '#22c55e', boxShadow: '0 0 6px #22c55e' }}
              ></span>
              <span
                style={{
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                En línea contigo
              </span>
            </div>
            {/* IA badge */}
            <div
              className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-center"
              style={{ background: 'rgba(7,9,15,0.8)', border: '1px solid rgba(61,214,140,0.2)' }}
            >
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--brand-green)',
                  letterSpacing: '0.1em',
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                IA MENTORA
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  fontFamily: "'Inter',sans-serif",
                  marginTop: '1px',
                }}
              >
                Personalizada
              </p>
            </div>
          </div>

          {/* <!-- Sophia content --> */}
          <div>
            <p className="section-label mb-3">Tu Mentora</p>
            <h2 className="display-heading text-3xl sm:text-4xl lg:text-5xl mb-4">
              Conoce a <span className="text-highlight-green">Sophia</span>
            </h2>
            <p
              className="text-sm sm:text-base mb-6"
              style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}
            >
              Lingüista viajera del tiempo y narradora del juego. Une los seis sistemas en una
              experiencia coherente: convierte tus errores en retos y tus logros en historia.
            </p>

            <div className="sophia-quote mb-8">
              <p
                className="text-sm sm:text-base italic mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                &ldquo;Veo que mejoraste la{' '}
                <strong style={{ color: 'var(--brand-green)' }}>th</strong> desde la última vez.
                ¡Esta vez probemos un debate corto en la Roma Imperial!&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'var(--brand-green)', color: '#07090f' }}
                >
                  <Image src="/Sophia.png" alt="Sophia" width={500} height={500} />
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  Sophia, mentora PlayLenguage
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                fontFamily: "'Inter',sans-serif",
                marginBottom: '14px',
              }}
            >
              Sophia recuerda y aprende
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list">
              <div className="capability-item" role="listitem">
                <span className="capability-dot"></span>Recuerda tu nombre
              </div>
              <div className="capability-item" role="listitem">
                <span className="capability-dot" aria-hidden="true"></span>Sigue tu nivel actual
              </div>
              <div className="capability-item" role="listitem">
                <span className="capability-dot" aria-hidden="true"></span>Guarda tus puntajes
              </div>
              <div className="capability-item" role="listitem">
                <span className="capability-dot" aria-hidden="true"></span>Detecta errores frecuentes
              </div>
              <div className="capability-item" role="listitem">
                <span
                  className="capability-dot"
                  style={{ background: 'var(--brand-amber)' }}
                  aria-hidden="true"
                ></span>
                Celebra tus logros
              </div>
              <div className="capability-item" role="listitem">
                <span className="capability-dot" style={{ background: 'var(--brand-cyan)' }} aria-hidden="true"></span>
                Crea retos a medida
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
