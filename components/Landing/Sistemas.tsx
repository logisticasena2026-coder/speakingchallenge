export function Sistemas() {
  return (
    <section id="sistemas" className="py-20 sm:py-28 px-4 sm:px-6" style={{ background: 'var(--surface-1)' }}>
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <p className="section-label mb-3">Engranaje Pedagógico</p>
          <h2 className="display-heading text-3xl sm:text-4xl lg:text-5xl mb-4">Seis sistemas que <span
            className="text-highlight-green">crecen contigo</span></h2>
          <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>Cada sistema
            escala de Bronce a Diamante. Mientras más restauras, más complejos y personalizados se vuelven los
            retos.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

          {/* 01 Pronunciación */}
          <div className="system-card">
            <div className="flex items-start justify-between mb-4">
              <span className="system-num">01</span>
              <div className="waveform" style={{ height: '28px', opacity: 0.5 }}>
                <div className="waveform-bar" style={{ height: '8px', animationDelay: '0s' }}></div>
                <div className="waveform-bar" style={{ height: '16px', animationDelay: '0.1s' }}></div>
                <div className="waveform-bar" style={{ height: '12px', animationDelay: '0.2s' }}></div>
                <div className="waveform-bar" style={{ height: '20px', animationDelay: '0.05s' }}></div>
                <div className="waveform-bar" style={{ height: '10px', animationDelay: '0.15s' }}></div>
                <div className="waveform-bar" style={{ height: '18px', animationDelay: '0.25s' }}></div>
                <div className="waveform-bar" style={{ height: '8px', animationDelay: '0.1s' }}></div>
              </div>
            </div>
            <p className="section-label mb-1" style={{ color: 'var(--text-muted)' }}>Pronunciación</p>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Cinzel',serif" }}>Spiking Challenge</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Espectrograma en vivo y puntaje 0–100%
              con feedback fonético.</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="badge badge-bronze">Bronce</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>Palabras aisladas
                con sílabas resaltadas.</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-diamond">Diamante</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>Frases con
                linking sounds.</span>
            </div>
            <div className="divider mt-4"></div>
            <div className="space-y-1.5 mt-3">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Repeat & Match.</strong> Imita la frase y compara
                tu onda.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Phoneme Hunt.</strong> Detecta el sonido objetivo
                en una lista.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Linking Run.</strong> Conecta palabras sin pausas.
              </p>
            </div>
          </div>

          {/* 02 Verbose */}
          <div className="system-card">
            <div className="flex items-start justify-between mb-4">
              <span className="system-num">02</span>
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full"
                  style={{ background: 'rgba(61,214,140,0.2)', border: '1px solid rgba(61,214,140,0.3)' }}></div>
                <div className="w-7 h-7 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)' }}>
                </div>
              </div>
            </div>
            <p className="section-label mb-1" style={{ color: 'var(--text-muted)' }}>Asistente Conversacional</p>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Cinzel',serif" }}>Verbose</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Dos ventanas: tú y la IA. Modos oral,
              escrito o mixto. Resumen de errores al final.</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="badge badge-bronze">Bronce</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>Diálogos de 2
                turnos guiados.</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-diamond">Diamante</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>Diálogos de 8
                turnos con interrupciones.</span>
            </div>
            <div className="divider mt-4"></div>
            <div className="space-y-1.5 mt-3">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Roleplay temporal.</strong> Negocias con personajes
                históricos.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Debate Mode.</strong> Defiendes una postura contra
                la IA.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Error Recap.</strong> Sophia muestra los 3 errores
                top.</p>
            </div>
          </div>

          {/* 03 Video Insight */}
          <div className="system-card">
            <div className="flex items-start justify-between mb-4">
              <span className="system-num">03</span>
              <button aria-label="Reproducir video explicativo de Video Insight" className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'var(--brand-amber)', color: '#07090f' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </button>
            </div>
            <p className="section-label mb-1" style={{ color: 'var(--text-muted)' }}>Comprensión Audiovisual</p>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Cinzel',serif" }}>Video Insight</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Idea principal, resumen evaluado por
              IA y preguntas en 3 niveles.</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="badge badge-bronze">Bronce</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>Videos cortos con
                apoyo visual claro.</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-diamond">Diamante</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>Noticias
                auténticas a velocidad real.</span>
            </div>
            <div className="divider mt-4"></div>
            <div className="space-y-1.5 mt-3">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Main Idea.</strong> Eliges la idea entre 4
                distractores.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Summary AI.</strong> La IA evalúa tu resumen.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>3 Lentes.</strong> Literal, inferencial y crítica.
              </p>
            </div>
          </div>

          {/* 04 Arcade & Trivia */}
          <div className="system-card">
            <div className="flex items-start justify-between mb-4">
              <span className="system-num">04</span>
              <div className="flex items-end gap-0.5">
                <div className="w-2 rounded-sm"
                  style={{ height: '10px', background: 'var(--brand-amber)', opacity: 0.6 }}></div>
                <div className="w-2 rounded-sm"
                  style={{ height: '16px', background: 'var(--brand-amber)', opacity: 0.8 }}></div>
                <div className="w-2 rounded-sm" style={{ height: '22px', background: 'var(--brand-amber)' }}></div>
              </div>
            </div>
            <p className="section-label mb-1" style={{ color: 'var(--text-muted)' }}>Juegos Didácticos</p>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Cinzel',serif" }}>Arcade & Trivia</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Trivia Fight y minijuegos como Fonetic
              Invaders y Grammar Runner.</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="badge badge-bronze">Bronce</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>Verdadero o falso
                con tiempo amplio.</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-diamond">Diamante</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>Análisis
                sintáctico a velocidad triple.</span>
            </div>
            <div className="divider mt-4"></div>
            <div className="space-y-1.5 mt-3">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Trivia Fight.</strong> Duelo 1v1 con vidas y
                combos.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Fonetic Invaders.</strong> Dispara al sonido
                objetivo.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Grammar Runner.</strong> Elige la forma verbal
                antes del choque.</p>
            </div>
          </div>

          {/* 05 Sophia */}
          <div className="system-card" style={{ borderColor: 'rgba(61,214,140,0.15)' }}>
            <div className="flex items-start justify-between mb-4">
              <span className="system-num">05</span>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: 'var(--brand-green)', color: '#07090f' }}>S</div>
            </div>
            <p className="section-label mb-1" style={{ color: 'var(--text-muted)' }}>Mentora Persistente</p>
            <h3 className="text-lg font-semibold mb-2"
              style={{ fontFamily: "'Cinzel',serif", color: 'var(--brand-green)' }}>Sophia</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Recuerda tu nombre, nivel, errores
              frecuentes y logros. Da feedback emocional.</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="badge badge-bronze">Bronce</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>Consejos básicos
                y motivación.</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-diamond">Diamante</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>Retos
                personalizados según tu historial.</span>
            </div>
            <div className="divider mt-4"></div>
            <div className="space-y-1.5 mt-3">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Daily Brief.</strong> Saludo personalizado y
                objetivo del día.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Reto a medida.</strong> Mini-quiz con tus errores
                frecuentes.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Saga Recap.</strong> Narra tus logros como
                capítulos.</p>
            </div>
          </div>

          {/* 06 Skill Tree */}
          <div className="system-card">
            <div className="flex items-start justify-between mb-4">
              <span className="system-num">06</span>
              <div className="grid grid-cols-3 gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--brand-cyan)' }}></div>
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--brand-cyan)' }}></div>
                <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(34,211,238,0.3)' }}></div>
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--brand-cyan)' }}></div>
                <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(34,211,238,0.3)' }}></div>
                <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(34,211,238,0.3)' }}></div>
              </div>
            </div>
            <p className="section-label mb-1" style={{ color: 'var(--text-muted)' }}>Ascenso Temático</p>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Cinzel',serif" }}>Skill Tree</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Árbol con 5 escalones por tema:
              lección, práctica, quiz, desafío y boss final.</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="badge badge-bronze">Bronce</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>Oraciones simples
                por escalón.</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-diamond">Diamante</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>Párrafos con
                conectores complejos.</span>
            </div>
            <div className="divider mt-4"></div>
            <div className="space-y-1.5 mt-3">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Lección narrativa.</strong> Concepto dentro de la
                historia de la era.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Boss final.</strong> Combate que desbloquea la
                siguiente era.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>· <strong
                style={{ color: 'var(--text-secondary)' }}>Ramas opcionales.</strong> Salta práctica si tu
                quiz fue ≥90%.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}