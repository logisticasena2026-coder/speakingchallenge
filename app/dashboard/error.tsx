'use client';

import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function DashboardError({
  error,
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">
          Error en el dashboard
        </h2>
        <p className="text-sm text-text-muted mb-8">
          Algo salio mal al cargar esta seccion. Sophia ya esta trabajando en ello.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-green text-surface-0 font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(61,214,140,0.4)] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Reintentar
          </button>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 border border-white/10 text-text-secondary rounded-lg hover:bg-white/5 transition-all"
          >
            <Home className="w-4 h-4" />
            Volver
          </Link>
        </div>
      </div>
    </main>
  );
}
