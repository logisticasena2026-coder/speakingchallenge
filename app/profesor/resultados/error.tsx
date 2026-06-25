'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0 text-center">
      <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Error al cargar resultados</h2>
      <p className="text-text-muted mb-4">{error.message}</p>
      <button onClick={reset}
        className="px-6 py-3 rounded-lg bg-brand-amber text-surface-0 font-bold text-sm hover:bg-brand-amber/90 transition-all">
        Reintentar
      </button>
    </div>
  );
}
