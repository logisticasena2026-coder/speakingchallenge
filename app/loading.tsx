
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Loading() {
  return (
    <>

      <main id="main-content" className="grow flex flex-col items-center justify-center relative mesh-bg px-container-px-mobile md:px-container-px-desktop min-h-screen" role="status" aria-live="polite">
        <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
          <div className="absolute inset-0 portal-linear rounded-full animate-pulse-glow" />
          <div className="absolute inset-0 border border-primary/20 rounded-full animate-rotate-cw flex items-center justify-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-container rounded-full blur-[2px] shadow-[0_0_15px_#60f3a6]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-cyan rounded-full blur-[2px] shadow-[0_0_15px_#22d3ee]" />
          </div>
          <div className="absolute inset-8 border border-brand-cyan/30 border-dashed rounded-full animate-rotate-ccw" />
          <div className="absolute inset-16 border-2 border-primary/40 rounded-full flex items-center justify-center bg-surface-container-lowest/50 backdrop-blur-md shadow-inner overflow-hidden">
            <div className="flex flex-col items-center animate-float">
              <span className="text-primary font-h1-hero text-5xl md:text-6xl drop-shadow-[0_0_10px_rgba(96,243,166,0.6)]">
                84%
              </span>
            </div>
          </div>
          <div className="absolute -top-12 -right-8 opacity-20 text-3xl font-h3-card text-primary select-none rotate-12">
            ᚦ
          </div>
          <div className="absolute top-1/4 -left-16 opacity-20 text-4xl font-h3-card text-brand-cyan select-none -rotate-12">
            𓀀
          </div>
          <div className="absolute bottom-1/4 -right-12 opacity-20 text-2xl font-h3-card text-secondary select-none rotate-45">
            Σ
          </div>
        </div>
        <div className="mt-16 text-center max-w-md z-10">
          <h2 className="font-h2-section text-h3-card md:text-h2-section text-on-surface mb-4 tracking-tight drop-shadow-md">
            Abriendo portal temporal…
          </h2>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 bg-surface-container-high/40 border border-border-subtle px-6 py-3 rounded-full backdrop-blur-xl">
              <Sparkles className="text-primary w-5 h-5" />
              <p className="font-ui-label text-ui-label uppercase tracking-widest text-on-surface-variant">
                Sincronizando verbos vikingos…
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-32 w-full max-w-xs px-6">
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-primary to-brand-cyan shadow-[0_0_10px_rgba(96,243,166,0.5)]"
              style={{ width: '84%' }}
            />
          </div>
        </div>
      </main>
      <div className="fixed inset-0 pointer-events-none opacity-10 z-[-1]">
        <img
          alt="Celestial background"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqwRrM8ksELL-yTHwGWjXzci2JY4gb2_I91Gzli7188I9GA6AIIbP7DxmxlWtm67pi_LDbMBC32N2guT5M7pmg2ao_YmhA7faKEUnOzNVgrMpQAk0rTz6jw8qEdFyBmMR-kdSvLxHtypWP_cOKAAcXLutm_2kp-WTOoEUdVcdy3tF-9Y5q2gbbYyh56ilXzxxIUOKQclUqHmZdkroURgZ0RgWMp4Yw8L0wktN8Eu-SjpaGxckD7fHKIyc1DMNQKh7K7C1DAlszQ2Dt"
        />
      </div>
    </>
  );
}
