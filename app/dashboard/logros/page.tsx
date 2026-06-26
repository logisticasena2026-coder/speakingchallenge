import type { Metadata } from 'next';
import { obtenerEstadoProgreso } from '@/actions/progreso/obtenerEstadoProgreso';
import {
  Trophy,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Logros | speakingchallenge',
  description: 'Todos tus logros e insignias desbloqueadas en speakingchallenge.',
  robots: { index: false, follow: false },
};

export default async function LogrosPage() {
  const progreso = await obtenerEstadoProgreso();

  const progresoData = progreso as unknown as { ok: boolean; logros_desbloqueados?: Array<{
    logro: { id: string; nombre: string; descripcion: string; icono: string; tipo: string; valor: number };
    desbloqueado_en: Date;
  }> };

  const logrosDesbloqueados = progresoData.logros_desbloqueados ?? [];
  const totalLogros = logrosDesbloqueados.length;

  return (
    <main className="pt-20 px-4 md:px-6 pb-10 relative z-10">
      <div className="max-w-250 mx-auto">
        <section className="ani d1 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 text-brand-amber" />
            <h1 className="font-display text-[28px] font-bold text-text-primary">Logros</h1>
          </div>
          <p className="text-sm text-text-secondary">
            {totalLogros} de 8 logros desbloqueados
          </p>
          <div className="mt-3 w-full h-2 bg-surface-4 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-amber shadow-[0_0_8px_rgba(245,166,35,0.5)] transition-all duration-500"
              style={{ width: `${(totalLogros / 8) * 100}%` }}
            />
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {logrosDesbloqueados.map((d) => (
            <div
              key={d.logro.id}
              className="group bg-surface-2 border border-brand-amber/20 rounded-xl p-5 transition-all duration-200 hover:border-brand-amber/40 hover:-translate-y-0.5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-brand-amber/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-brand-amber/10 flex items-center justify-center ring-1 ring-brand-amber/20">
                  <Trophy className="w-5 h-5 text-brand-amber" />
                </div>
                <div className="bg-brand-amber/12 border border-brand-amber/25 rounded-full px-2.5 py-0.5">
                  <span className="font-ui text-[8px] font-bold text-brand-amber uppercase tracking-wider">
                    Desbloqueado
                  </span>
                </div>
              </div>
              <h3 className="font-display text-sm font-bold text-white mb-1">{d.logro.nombre}</h3>
              <p className="text-xs text-text-muted">{d.logro.descripcion}</p>
              <p className="font-ui text-[9px] text-text-muted/60 mt-2">
                {new Date(d.desbloqueado_en).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          ))}
        </div>

        {logrosDesbloqueados.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Lock className="w-16 h-16 text-text-muted/20 mb-4" />
            <h2 className="font-display text-lg font-bold text-text-primary mb-2">Sin logros aún</h2>
            <p className="text-sm text-text-muted max-w-xs">
              Completa niveles, imperios y eras para desbloquear logros. Cada logro tiene su propio desafío.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
