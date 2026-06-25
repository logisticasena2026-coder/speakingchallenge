'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sileo } from 'sileo';
import { Search, Plus, ChevronLeft, ChevronRight, X, Eye, Edit, Trash2, FileQuestion } from 'lucide-react';
import { eliminarExamen } from '@/actions/profesor/examen/eliminar';

interface Examen {
  id: string;
  titulo: string;
  descripcion: string | null;
  createdAt: Date;
  _count: { preguntas: number; asignaciones: number };
}

interface Props {
  examenes: Examen[];
  paginaActual: number;
  totalPages: number;
  buscar: string;
}

export function TablaExamenes({ examenes, paginaActual, totalPages, buscar }: Props) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(buscar);

  useEffect(() => { setSearchInput(buscar); }, [buscar]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== buscar) {
        const params = new URLSearchParams();
        if (searchInput) params.set('buscar', searchInput);
        params.set('pagina', '1');
        router.push(`/profesor/examenes?${params.toString()}`);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, buscar, router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput) params.set('buscar', searchInput);
    params.set('pagina', '1');
    router.push(`/profesor/examenes?${params.toString()}`);
  };

  const handleEliminar = (id: string, titulo: string) => {
    if (!window.confirm(`¿Eliminar el examen "${titulo}" permanentemente?`)) return;
    sileo.promise(
      () => eliminarExamen(id),
      {
        loading: { title: 'Eliminando...' },
        success: (res) => ({ title: 'Examen eliminado', description: res.message }),
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      }
    );
    router.refresh();
  };

  const hrefConBuscar = (paramsObj: Record<string, string>) => {
    const params = new URLSearchParams(paramsObj);
    if (buscar) params.set('buscar', buscar);
    return `/profesor/examenes?${params.toString()}`;
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
            placeholder="Buscar examen..."
            className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 pl-10 pr-10 text-text-primary text-sm focus:ring-1 focus:ring-brand-amber transition-all"
          />
          {searchInput && (
            <button type="button" onClick={() => { setSearchInput(''); router.push('/profesor/examenes'); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors">
              <X className="size-4" />
            </button>
          )}
        </form>
        <Link href="/profesor/examenes/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-amber text-surface-0 font-bold text-sm hover:bg-brand-amber/90 transition-all">
          <Plus className="w-4 h-4" />
          Nuevo examen
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Título</th>
              <th className="text-left py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Descripción</th>
              <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Preguntas</th>
              <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Asignaciones</th>
              <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Creado</th>
              <th className="text-right py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {examenes.map((e) => (
              <tr key={e.id} className="border-b border-border-subtle hover:bg-surface-3/50 transition-colors">
                <td className="py-3 px-3 text-text-primary font-medium max-w-48 truncate">{e.titulo}</td>
                <td className="py-3 px-3 text-text-secondary text-xs max-w-48 truncate">{e.descripcion || '-'}</td>
                <td className="py-3 px-3 text-center text-text-secondary">{e._count.preguntas}</td>
                <td className="py-3 px-3 text-center text-text-secondary">{e._count.asignaciones}</td>
                <td className="py-3 px-3 text-center text-text-muted text-xs">{new Date(e.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/profesor/examenes/${e.id}`}
                      className="p-2 rounded-lg text-text-muted hover:text-brand-cyan hover:bg-brand-cyan/10 transition-all" title="Ver">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link href={`/profesor/examenes/${e.id}/editar`}
                      className="p-2 rounded-lg text-text-muted hover:text-brand-green hover:bg-brand-green/10 transition-all" title="Editar">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleEliminar(e.id, e.titulo)}
                      className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {examenes.length === 0 && (
        <p className="text-center text-text-muted py-8">
          {buscar ? 'No se encontraron exámenes' : 'No hay exámenes creados'}
        </p>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-6">
          {paginaActual > 1 && (
            <Link href={hrefConBuscar({ pagina: String(paginaActual - 1) })}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-3 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </Link>
          )}
          {paginas.map((p, i) =>
            p === '...' ? (
              <span key={`e${i}`} className="px-2 text-text-muted select-none">...</span>
            ) : (
              <Link key={p} href={hrefConBuscar({ pagina: String(p) })}
                className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  p === paginaActual ? 'bg-brand-amber text-surface-0' : 'text-text-secondary hover:bg-surface-3'
                }`}>{p}</Link>
            )
          )}
          {paginaActual < totalPages && (
            <Link href={hrefConBuscar({ pagina: String(paginaActual + 1) })}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-3 transition-all">
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function generarPaginas(total: number, actual: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const paginas: (number | '...')[] = [1];
  if (actual > 3) paginas.push('...');
  const start = Math.max(2, actual - 1);
  const end = Math.min(total - 1, actual + 1);
  for (let i = start; i <= end; i++) paginas.push(i);
  if (actual < total - 2) paginas.push('...');
  paginas.push(total);
  return paginas;
}
