import { Home } from 'lucide-react';
import Link from 'next/link';

export default function DashboardNotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="max-w-md">
        <div className="text-6xl font-display font-bold text-brand-green/30 mb-4">404</div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">
          Seccion no encontrada
        </h2>
        <p className="text-sm text-text-muted mb-8">
          La pagina que buscas no existe en esta linea temporal.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-green text-surface-0 font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(61,214,140,0.4)] transition-all"
        >
          <Home className="w-4 h-4" />
          Volver al dashboard
        </Link>
      </div>
    </main>
  );
}
