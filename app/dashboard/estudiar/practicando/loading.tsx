import { Loader2 } from 'lucide-react';

export default function PracticandoLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-brand-green animate-spin" />
        <p className="text-sm text-text-muted font-ui">Cargando frases de practica…</p>
      </div>
    </div>
  );
}
