'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sileo } from 'sileo';
import { Search, Trash2, BookOpen, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { eliminarUsuario } from '@/actions/admin/eliminarUsuario';
import { ModalExamenesProfesor } from './ModalExamenesProfesor';

interface Usuario {
  id: string;
  name: string;
  email: string;
  rol: string;
  nivel: string;
  frases: number;
  precicion_global: number;
  dias_racha?: number;
  tiempo_promedio?: number;
  ultima_sesion: Date | null;
  createdAt: Date;
  codigo_profesor: string | null;
  _count: {
    progreso_frases: number;
    estudiantes_asignados: number;
    profesores_asignados: number;
  };
}

interface Props {
  usuarios: Usuario[];
  paginaActual: number;
  totalPages: number;
  buscar: string;
  rol: 'ESTUDIANTE' | 'PROFESOR';
}

export function TablaUsuariosAdmin({ usuarios, paginaActual, totalPages, buscar, rol }: Props) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(buscar);
  const [frasesModal, setFrasesModal] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    setSearchInput(buscar);
  }, [buscar]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== buscar) {
        const params = new URLSearchParams();
        if (searchInput) params.set('buscar', searchInput);
        params.set('pagina', '1');
        router.push(`/admin/${rol === 'ESTUDIANTE' ? 'estudiantes' : 'profesores'}?${params.toString()}`);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, buscar, router, rol]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput) params.set('buscar', searchInput);
    params.set('pagina', '1');
    router.push(`/admin/${rol === 'ESTUDIANTE' ? 'estudiantes' : 'profesores'}?${params.toString()}`);
  };

  const handleEliminar = async (id: string, name: string) => {
    if (!window.confirm(`¿Eliminar permanentemente a ${name}?`)) return;
    const esUltimo = usuarios.length === 1 && paginaActual > 1;
    await sileo.promise(
      () => eliminarUsuario(id),
      {
        loading: { title: 'Eliminando...' },
        success: (res) => ({ title: 'Usuario eliminado', description: res.message }),
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      }
    );
    const basePath = `/admin/${rol === 'ESTUDIANTE' ? 'estudiantes' : 'profesores'}`;
    if (esUltimo) {
      const params = new URLSearchParams({ pagina: String(paginaActual - 1) });
      if (buscar) params.set('buscar', buscar);
      router.push(`${basePath}?${params.toString()}`);
    } else {
      router.refresh();
    }
  };

  const hrefConBuscar = (paramsObj: Record<string, string>) => {
    const params = new URLSearchParams(paramsObj);
    if (buscar) params.set('buscar', buscar);
    const basePath = `/admin/${rol === 'ESTUDIANTE' ? 'estudiantes' : 'profesores'}`;
    return `${basePath}?${params.toString()}`;
  };

  const paginas = useMemo(() => generarPaginas(totalPages, paginaActual), [totalPages, paginaActual]);

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted size-4" />
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Buscar por nombre o email..."
          className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 pl-10 pr-10 text-text-primary text-sm focus:ring-1 focus:ring-brand-purple transition-all"
        />
        {searchInput && (
          <button
            type="button"
            onClick={() => {
              setSearchInput('');
              const basePath = `/admin/${rol === 'ESTUDIANTE' ? 'estudiantes' : 'profesores'}`;
              router.push(basePath);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="size-4" />
          </button>
        )}
      </form>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Nombre</th>
              <th className="text-left py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Email</th>
              {rol === 'PROFESOR' && <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Código</th>}
              {rol === 'PROFESOR' && <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Estudiantes</th>}
              {rol === 'PROFESOR' && <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Estudiantes</th>}
              {rol === 'ESTUDIANTE' && <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Nivel</th>}
              {rol === 'ESTUDIANTE' && <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Precisión</th>}
              {rol === 'ESTUDIANTE' && <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Practicadas</th>}
              {rol === 'ESTUDIANTE' && <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Racha</th>}
              {rol === 'ESTUDIANTE' && <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Tiempo</th>}
              {rol === 'ESTUDIANTE' && <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Último</th>}
              <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Registro</th>
              <th className="text-right py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Acción</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-b border-border-subtle hover:bg-surface-3/50 transition-colors">
                <td className="py-3 px-3 text-text-primary font-medium">{u.name}</td>
                <td className="py-3 px-3 text-text-secondary text-xs">{u.email}</td>
                {rol === 'PROFESOR' && (
                  <td className="py-3 px-3 text-center font-mono text-xs text-brand-amber">{u.codigo_profesor || '-'}</td>
                )}
                {rol === 'PROFESOR' && (
                  <td className="py-3 px-3 text-center text-text-secondary">{u._count.estudiantes_asignados}</td>
                )}
                {rol === 'ESTUDIANTE' && (
                  <td className="py-3 px-3 text-center">
                    <span className="text-xs text-brand-green capitalize">{u.nivel.toLowerCase().replace(/_/g, ' ')}</span>
                  </td>
                )}
                {rol === 'ESTUDIANTE' && (
                  <td className="py-3 px-3 text-center text-text-secondary">{u.precicion_global.toFixed(1)}%</td>
                )}
                {rol === 'ESTUDIANTE' && (
                  <td className="py-3 px-3 text-center text-text-secondary">{u._count.progreso_frases}</td>
                )}
                {rol === 'ESTUDIANTE' && (
                  <td className="py-3 px-3 text-center">
                    <span className={`text-xs font-semibold ${u.dias_racha && u.dias_racha > 0 ? 'text-brand-green' : 'text-text-muted'}`}>
                      {u.dias_racha || 0} días
                    </span>
                  </td>
                )}
                {rol === 'ESTUDIANTE' && (
                  <td className="py-3 px-3 text-center text-text-secondary text-xs">
                    {u.tiempo_promedio ? `${u.tiempo_promedio.toFixed(1)}s` : '-'}
                  </td>
                )}
                {rol === 'ESTUDIANTE' && (
                  <td className="py-3 px-3 text-center text-text-muted text-xs">
                    {u.ultima_sesion ? new Date(u.ultima_sesion).toLocaleDateString() : '-'}
                  </td>
                )}
                <td className="py-3 px-3 text-center text-text-muted text-xs">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {rol === 'PROFESOR' && (
                      <button
                        onClick={() => setFrasesModal({ id: u.id, name: u.name })}
                        className="p-2 rounded-lg text-text-muted hover:text-brand-amber hover:bg-brand-amber/10 transition-all"
                        title="Ver exámenes"
                      >
                        <BookOpen className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleEliminar(u.id, u.name)}
                      className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all"
                      title="Eliminar usuario"
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
      {usuarios.length === 0 && (
        <p className="text-center text-text-muted py-8">
          {buscar ? 'No se encontraron usuarios con ese criterio' : 'No hay usuarios registrados'}
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

      {frasesModal && (
        <ModalExamenesProfesor
          profesorId={frasesModal.id}
          profesorName={frasesModal.name}
          onClose={() => setFrasesModal(null)}
        />
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
