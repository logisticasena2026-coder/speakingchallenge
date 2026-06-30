'use client';

import { useState, useCallback } from 'react';
import { Trash2, BookOpen, Search, Bookmark } from 'lucide-react';
import { sileo } from 'sileo';
import { eliminarPalabra } from '@/actions/diccionario/eliminarPalabra';

type Palabra = {
  id: string;
  palabra: string;
  traduccion: string;
  contexto: string | null;
  created_at: Date;
};

interface Props {
  palabrasIniciales: Palabra[];
}

export function DiccionarioClient({ palabrasIniciales }: Props) {
  const [palabras, setPalabras] = useState<Palabra[]>(palabrasIniciales);
  const [busqueda, setBusqueda] = useState('');

  const filtradas = busqueda.trim()
    ? palabras.filter(
        (p) =>
          p.palabra.toLowerCase().includes(busqueda.toLowerCase()) ||
          p.traduccion.toLowerCase().includes(busqueda.toLowerCase()),
      )
    : palabras;

  const handleEliminar = useCallback(async (id: string) => {
    const res = await eliminarPalabra(id);
    if (res.ok) {
      setPalabras((prev) => prev.filter((p) => p.id !== id));
      sileo.success({ title: 'Palabra eliminada' });
    }
  }, []);

  return (
    <div className="space-y-5">
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar palabra..."
          className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-3/60 border border-border-subtle text-text-primary text-sm outline-none transition-all focus:border-brand-cyan/40"
        />
      </div>

      {filtradas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Bookmark className="w-16 h-16 text-text-muted/20 mb-4" />
          <h2 className="font-display text-lg font-bold text-text-primary mb-2">
            {busqueda ? 'Sin resultados' : 'Sin palabras guardadas'}
          </h2>
          <p className="text-sm text-text-muted max-w-xs">
            {busqueda
              ? 'Ninguna palabra coincide con tu búsqueda.'
              : 'Las palabras que guardes aparecerán aquí. Puedes guardarlas desde la práctica o desde el chat con Emily.'}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtradas.map((p) => (
          <div
            key={p.id}
            className="group bg-surface-2 border border-white/6 rounded-xl p-4 transition-all duration-200 hover:border-brand-cyan/20 hover:-translate-y-0.5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-brand-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 flex items-center justify-center ring-1 ring-brand-cyan/20">
                <BookOpen className="w-4 h-4 text-brand-cyan" />
              </div>
              <button
                onClick={() => handleEliminar(p.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-red-500/10 text-text-muted hover:text-red-400 cursor-pointer"
                aria-label="Eliminar palabra"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-display text-base font-bold text-white mb-0.5">{p.palabra}</h3>
            <p className="text-sm text-text-secondary mb-2">{p.traduccion}</p>
            {p.contexto && (
              <p className="text-xs text-text-muted/60 italic">
                &ldquo;{p.contexto}&rdquo;
              </p>
            )}
            <p className="font-ui text-[9px] text-text-muted/40 mt-2">
              {new Date(p.created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
