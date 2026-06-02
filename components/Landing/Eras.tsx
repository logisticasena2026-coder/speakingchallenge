import Image from 'next/image';

export function Eras() {
  return (
    <section id="eras" className="py-20 sm:py-28 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Línea Temporal</p>
          <h2 className="display-heading text-3xl sm:text-4xl lg:text-5xl mb-4">
            Cinco eras, <span className="text-highlight-green">una travesía</span>
          </h2>
          <p
            className="text-sm sm:text-base max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Cada nivel desbloquea una era de la humanidad con sus propios imperios, estética y
            retos. Avanza desde la Antigüedad hasta el mundo Post-Humano restaurando los verbos
            perdidos del tiempo.
          </p>
        </div>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 list-none m-0 p-0"
          aria-label="Eras de la humanidad"
        >
          {/* Era 1: Antigua — ACTIVA */}
          <li className="era-card" aria-label="Era Antigua - Nivel Bronce - Activa">
            <div
              className="era-bg"
              style={{ height: '220px', position: 'relative', overflow: 'hidden' }}
            >
              <Image
                alt="Era Antigua"
                src="/eras/Era_Antigua.webp"
                height={1024}
                width={1536}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
              />
            </div>
            <div className="era-content">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-bronze">Nivel 1 · Bronce</span>
              </div>
              <div className="era-tag">Foundations</div>
              <div className="era-title">Antigua</div>
              <p className="era-desc">
                Egipto, Acadio, Babilonia, Asiria, Persia, Macedonia, Maurya, Cartago: las primeras
                grandes civilizaciones.
              </p>
            </div>
          </li>

          {/* Era 2: Medieval — ACTIVA */}
          <li className="era-card" aria-label="Era Medieval - Nivel Plata - Activa">
            <div
              className="era-bg"
              style={{ height: '220px', position: 'relative', overflow: 'hidden' }}
            >
              <Image
                alt="Era Medieval"
                src="/eras/Era_medieval.webp"
                width={1641}
                height={958}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
              />
            </div>
            <div className="era-content">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-silver">Nivel 2 · Plata</span>
              </div>
              <div className="era-tag">Building Blocks</div>
              <div className="era-title">Medieval</div>
              <p className="era-desc">
                Roma, Bizancio, Califato Omeya, Imperio Mongol, Otomano: el puente entre mundos.
              </p>
            </div>
          </li>

          {/* Era 3: Moderna — BLOQUEADA */}
          <li className="era-card locked">
            <div
              className="era-bg"
              style={{ height: '220px', position: 'relative', overflow: 'hidden' }}
            >
              <Image
                alt="Era Moderna"
                src="/eras/Era_Moderna.webp"
                width={1640}
                height={959}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
              />
            </div>
            <div className="lock-overlay">
              <div className="lock-icon">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                BLOQUEADO
              </span>
            </div>
            <div className="era-content" style={{ opacity: 0.5 }}>
              <div className="era-tag">Mastery</div>
              <div className="era-title">Moderna</div>
              <p className="era-desc">
                Azteca, Inca, Imperio Ruso, Británico, Japonés: expansión global e
                industrialización.
              </p>
            </div>
          </li>

          {/* Era 4: Crypto — BLOQUEADA */}
          <li className="era-card locked">
            <div
              className="era-bg"
              style={{ height: '220px', position: 'relative', overflow: 'hidden' }}
            >
              <Image
                alt="Era Crypto"
                src="/eras/Era_crypto.webp"
                width={1641}
                height={958}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
              />
            </div>
            <div className="lock-overlay">
              <div className="lock-icon">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                BLOQUEADO
              </span>
            </div>
            <div className="era-content" style={{ opacity: 0.5 }}>
              <div className="era-tag">Fluency</div>
              <div className="era-title">Crypto</div>
              <p className="era-desc">
                Satoshi, Ethereum, Solaria Chain, Quantum Ledger, Nexus AI: la revolución digital
                descentralizada.
              </p>
            </div>
          </li>

          {/* Era 5: Post-Humana — BLOQUEADA */}
          <li className="era-card locked">
            <div
              className="era-bg"
              style={{ height: '220px', position: 'relative', overflow: 'hidden' }}
            >
              <Image
                alt="Era Post-Humana"
                src="/eras/Era_postHUmana.webp"
                width={1642}
                height={959}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
              />
            </div>
            <div className="lock-overlay">
              <div className="lock-icon">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                BLOQUEADO
              </span>
            </div>
            <div className="era-content" style={{ opacity: 0.5 }}>
              <div className="era-tag">Transcendence</div>
              <div className="era-title">Post-Humana</div>
              <p className="era-desc">
                Titan Vanguard, Cyber Anunnaki, Atlantech Prime, Omega Cyborg, Guardianes del
                Pacífico: el despertar de la humanidad aumentada.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
