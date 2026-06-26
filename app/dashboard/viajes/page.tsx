import type { Metadata } from 'next';
import { DatosDelAutenticado } from '@/lib/auth';
import { obtenerEstadoProgreso } from '@/actions/progreso/obtenerEstadoProgreso';
import { ViajesActivos } from '@/components/dashboard/ViajesActivos';
import { Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Viajes Activos | speakingchallenge',
  description: 'Todas tus eras activas y disponibles con su progreso.',
  robots: { index: false, follow: false },
};

export default async function ViajesPage() {
  const datos = await DatosDelAutenticado();
  const progreso = await obtenerEstadoProgreso();

  const progresoExt = progreso as unknown as {
    ok: boolean;
    eras: Array<{
      id: string; nombre: string; orden: number; color: string;
      estado: 'completado' | 'activo' | 'disponible' | 'bloqueado';
      imperios: Array<{ id: string; nombre: string; orden: number; completado: boolean; activo: boolean }>;
    }>;
  };
  const eras = progreso.ok && 'eras' in progreso ? progresoExt.eras : [];
  const viajes = eras.filter((e) => e.estado === 'activo' || e.estado === 'disponible');

  return (
    <main className="pt-20 px-4 md:px-6 pb-10 relative z-10">
      <div className="max-w-250 mx-auto">
        <section className="ani d1 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Compass className="w-6 h-6 text-brand-green" />
            <h1 className="font-display text-[28px] font-bold text-text-primary">Viajes Activos</h1>
          </div>
          <p className="text-sm text-text-secondary">
            {viajes.length} {viajes.length === 1 ? 'era disponible' : 'eras disponibles'} para explorar
          </p>
        </section>

        {viajes.length > 0 ? (
          <ViajesActivos eras={eras} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Compass className="w-16 h-16 text-text-muted/20 mb-4" />
            <h2 className="font-display text-lg font-bold text-text-primary mb-2">
              Sin viajes disponibles
            </h2>
            <p className="text-sm text-text-muted max-w-xs">
              Completa tu era actual para desbloquear nuevas eras y viajes.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
