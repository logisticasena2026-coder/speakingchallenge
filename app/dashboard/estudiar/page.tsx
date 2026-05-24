import type { Metadata } from 'next';
import { Configuraciónes } from '@/components/Practica/Configuraciones';
import { ErasPractica } from '@/components/Practica/ErasPractica';
import { Stasts } from '@/components/Practica/Stasts';
import { Play, Radar } from 'lucide-react';
import Link from 'next/link';
import { EnDesarrollo } from '@/components/EnDesarrollo';

export const metadata: Metadata = {
  title: 'Configurar estudio',
  description:
    'Ajusta los parámetros de tu misión de aprendizaje: era histórica, tipo de ejercicio y dificultad antes de comenzar a practicar.',
  robots: { index: false, follow: false },
};

export default function Practicando() {
  return (
    <main className="relative z-10 px-6 py-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8 ani delay-anim-1">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Configuración de Misión
        </h1>
        <p className="text-sm text-text-secondary max-w-100">
          Ajusta los parámetros antes del salto temporal
        </p>
      </div>

      <Stasts />

      <section>
        <h2 className="sr-only">Configuración de grupo</h2>
        <Configuraciónes />
      </section>
      <section>
        <h2 className="sr-only">Era histórica</h2>
        <ErasPractica />
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6 ani delay-anim-2">
        <EnDesarrollo className='mt-3'>
          <div className="mt-5 relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl ani delay-anim-4">
            <div className="hud-corner-sm hud-corner-tl-sm"></div>
            <div className="hud-corner-sm hud-corner-tr-sm"></div>
            <div className="hud-corner-sm hud-corner-bl-sm"></div>
            <div className="hud-corner-sm hud-corner-br-sm"></div>

            <div className="flex flex-col justify-center items-center text-center p-6 sm:p-8">
              <div className="mb-4">
                <Radar className="w-14 h-14 text-brand-green/20" />
              </div>
              <p className="text-sm text-text-muted mb-6 max-w-100 leading-relaxed">
                Listo para sincronizar la conciencia con la era seleccionada. Todos los parámetros
                están validados.
              </p>
              <button className="flex items-center justify-center gap-2 bg-brand-green text-surface-0 font-ui text-xs font-bold tracking-widest uppercase w-full sm:w-auto px-8 py-3.5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-[0_0_24px_rgba(61,214,140,0.4)] hover:-translate-y-0.5">
                <Play className="w-5 h-5" />
                Iniciar estudio
              </button>
            </div>
          </div>
        </EnDesarrollo>

        <div className="mt-5 relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl ani delay-anim-4">
          <div className="hud-corner-sm hud-corner-tl-sm"></div>
          <div className="hud-corner-sm hud-corner-tr-sm"></div>
          <div className="hud-corner-sm hud-corner-bl-sm"></div>
          <div className="hud-corner-sm hud-corner-br-sm"></div>

          <div className="flex flex-col justify-center items-center text-center p-6 sm:p-8">
            <div className="mb-4">
              <Radar className="w-14 h-14 text-brand-green/20" />
            </div>
            <p className="text-sm text-text-muted mb-6 max-w-100 leading-relaxed">
              Listo para comenzar a practicar cuando quieras. tienes 2.000 frases a tu disposicion
            </p>
            <Link
              href="/dashboard/estudiar/practicando"
              className="flex items-center justify-center gap-2 bg-brand-green text-surface-0 font-ui text-xs font-bold tracking-widest uppercase w-full sm:w-auto px-8 py-3.5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-[0_0_24px_rgba(61,214,140,0.4)] hover:-translate-y-0.5"
            >
              <Play className="w-5 h-5" />
              Iniciar practica
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
