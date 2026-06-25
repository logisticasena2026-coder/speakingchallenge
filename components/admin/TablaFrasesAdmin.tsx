'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sileo } from 'sileo';
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { eliminarFraseAdmin } from '@/actions/admin/eliminarFraseAdmin';

interface Frase {
  id: number;
  fraseIngles: string;
  fraseEspanol: string;
  dificultad: number;
  tematica: string;
  creador: string;
  Fec_Alta: Date | null;
  _count: { progreso: number };
}

interface Props {
  frases: Frase[];
  paginaActual: number;
  totalPages: number;
  buscar: string;
}

export function TablaFrasesAdmin({ frases, paginaActual, totalPages, buscar }: Props) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(buscar);

  useEffect(() => {
    setSearchInput(buscar);
  }, [buscar]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== buscar) {
        const params = new URLSearchParams();
        if (searchInput) params.set('buscar', searchInput);
        params.set('pagina', '1');
        router.push(`/admin/frases?${params.toString()}`);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, buscar, router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput) params.set('buscar', searchInput);
    params.set('pagina', '1');
    router.push(`/admin/frases?${params.toString()}`);
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm('¿Eliminar esta frase permanentemente?')) return;
    const esUltimo = frases.length === 1 && paginaActual > 1;
    await sileo.promise(
      () => eliminarFraseAdmin(id),
      {
        loading: { title: 'Eliminando...' },
        success: (res) => ({ title: 'Frase eliminada', description: res.message }),
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      }
    );
    if (esUltimo) {
      const params = new URLSearchParams({ pagina: String(paginaActual - 1) });
      if (buscar) params.set('buscar', buscar);
      router.push(`/admin/frases?${params.toString()}`);
    } else {
      router.refresh();
    }
  };

  const hrefConBuscar = (paramsObj: Record<string, string>) => {
    const params = new URLSearchParams(paramsObj);
    if (buscar) params.set('buscar', buscar);
    return `/admin/frases?${params.toString()}`;
  };

  const paginas = useMemo(() => generarPaginas(totalPages, paginaActual), [totalPages, paginaActual]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted size-4" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar frase..."
            className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 pl-10 pr-10 text-text-primary text-sm focus:ring-1 focus:ring-brand-purple transition-all"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput('');
                router.push('/admin/frases');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
        </form>
        <Link
          href="/admin/frases/nueva"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-purple text-surface-0 font-bold text-sm hover:bg-brand-purple/90 transition-all"
        >
          <Plus className="w-4 h-4" />
          Nueva frase
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Inglés</th>
              <th className="text-left py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Español</th>
              <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Dif.</th>
              <th className="text-left py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Temática</th>
              <th className="text-left py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Creador</th>
              <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Progreso</th>
              <th className="text-right py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {frases.map((f) => (
              <tr key={f.id} className="border-b border-border-subtle hover:bg-surface-3/50 transition-colors">
                <td className="py-3 px-3 text-text-primary max-w-48 truncate">{f.fraseIngles}</td>
                <td className="py-3 px-3 text-text-secondary max-w-48 truncate">{f.fraseEspanol}</td>
                <td className="py-3 px-3 text-center">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-3 text-text-muted">{f.dificultad}</span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-xs text-brand-cyan">{f.tematica}</span>
                </td>
                <td className="py-3 px-3 text-text-secondary text-xs truncate max-w-24">{f.creador}</td>
                <td className="py-3 px-3 text-center text-text-muted text-xs">{f._count.progreso}</td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/frases/${f.id}/editar`}
                      className="p-2 rounded-lg text-text-muted hover:text-brand-green hover:bg-brand-green/10 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleEliminar(f.id)}
                      className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {frases.length === 0 && (
        <p className="text-center text-text-muted py-8">
          {buscar ? 'No se encontraron frases con ese criterio' : 'No hay frases registradas'}
        </p>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-6">
          {paginaActual > 1 && (
            <Link
              href={hrefConBuscar({ pagina: String(paginaActual - 1) })}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-3 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
          )}
          {paginas.map((p, i) =>
            p === '...' ? (
              <span key={`e${i}`} className="px-2 text-text-muted select-none">...</span>
            ) : (
              <Link
                key={p}
                href={hrefConBuscar({ pagina: String(p) })}
                className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  p === paginaActual
                    ? 'bg-brand-purple text-surface-0'
                    : 'text-text-secondary hover:bg-surface-3'
                }`}
              >
                {p}
              </Link>
            )
          )}
          {paginaActual < totalPages && (
            <Link
              href={hrefConBuscar({ pagina: String(paginaActual + 1) })}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-3 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function generarPaginas(total: number, actual: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const paginas: (number | '...')[] = [1];

  if (actual > 3) {
    paginas.push('...');
  }

  const start = Math.max(2, actual - 1);
  const end = Math.min(total - 1, actual + 1);

  for (let i = start; i <= end; i++) {
    paginas.push(i);
  }

  if (actual < total - 2) {
    paginas.push('...');
  }

  paginas.push(total);

  return paginas;
}
