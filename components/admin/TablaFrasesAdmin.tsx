'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sileo } from 'sileo';
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { eliminarFraseAdmin } from '@/actions/admin/eliminarFraseAdmin';
import { obtenerOpcionesFiltros } from '@/actions/admin/obtenerOpcionesFiltros';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  tematica: string;
  dificultad: number | null;
  edad: number | null;
  creador: string;
}

function buildQuery(params: Record<string, string | number | null | undefined>): string {
  const q = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (val != null && val !== '') q.set(key, String(val));
  }
  return q.toString();
}

export function TablaFrasesAdmin({
  frases,
  paginaActual,
  totalPages,
  buscar: initialBuscar,
  tematica: initialTematica,
  dificultad: initialDificultad,
  edad: initialEdad,
  creador: initialCreador,
}: Props) {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState(initialBuscar);

  const [tematicasList, setTematicasList] = useState<string[]>([]);
  const [dificultadesList, setDificultadesList] = useState<number[]>([]);
  const [edadesList, setEdadesList] = useState<number[]>([]);
  const [creadoresList, setCreadoresList] = useState<string[]>([]);

  const currentFilters = useMemo(
    () => ({
      buscar: initialBuscar || undefined,
      tematica: initialTematica || undefined,
      dificultad: initialDificultad ?? undefined,
      edad: initialEdad ?? undefined,
      creador: initialCreador || undefined,
    }),
    [initialBuscar, initialTematica, initialDificultad, initialEdad, initialCreador],
  );

  const fetchOptions = useCallback(
    async (filters: typeof currentFilters) => {
      const opts = await obtenerOpcionesFiltros(filters);
      setTematicasList(opts.tematicas);
      setDificultadesList(opts.dificultades);
      setEdadesList(opts.edades);
      setCreadoresList(opts.creadores);
    },
    [],
  );

  useEffect(() => {
    fetchOptions(currentFilters);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useCallback(
    (overrides: Record<string, string | number | null | undefined>) => {
      const params: Record<string, string | number | null | undefined> = {
        pagina: 1,
        ...currentFilters,
        ...overrides,
      };
      const q = buildQuery(params);
      router.push(`/admin/frases?${q}`);
    },
    [router, currentFilters],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== initialBuscar) {
        navigate({ buscar: searchInput || undefined });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, initialBuscar, navigate]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ buscar: searchInput || undefined });
  };

  const handleFilterChange = (
    key: string,
    value: string,
  ) => {
    const parsed = key === 'dificultad' || key === 'edad'
      ? (value === '__none__' ? undefined : Number(value))
      : (value === '__none__' ? undefined : value);

    const newFilters = { ...currentFilters, [key]: parsed };

    fetchOptions(newFilters);
    navigate({ [key]: parsed, pagina: 1 });
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
      },
    );
    if (esUltimo) {
      const params: Record<string, string | number | null | undefined> = {
        pagina: paginaActual - 1,
        ...currentFilters,
      };
      router.push(`/admin/frases?${buildQuery(params)}`);
    } else {
      router.refresh();
    }
  };

  const linkHref = (overrides: Record<string, string | number | null | undefined>) => {
    const params: Record<string, string | number | null | undefined> = {
      ...currentFilters,
      ...overrides,
    };
    return `/admin/frases?${buildQuery(params)}`;
  };

  const paginas = useMemo(() => generarPaginas(totalPages, paginaActual), [totalPages, paginaActual]);

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between gap-4">
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
                  navigate({ buscar: undefined });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="size-4" />
              </button>
            )}
          </form>
          <Link
            href="/admin/frases/nueva"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-purple text-surface-0 font-bold text-sm hover:bg-brand-purple/90 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            Nueva frase
          </Link>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Temática
            </label>
            <Select
              onValueChange={(v) => handleFilterChange('tematica', v)}
              value={initialTematica || '__none__'}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Temáticas</SelectLabel>
                  <SelectItem value="__none__">Todas</SelectItem>
                  {tematicasList.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Dificultad
            </label>
            <Select
              onValueChange={(v) => handleFilterChange('dificultad', v)}
              value={initialDificultad !== null ? String(initialDificultad) : '__none__'}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Dificultades</SelectLabel>
                  <SelectItem value="__none__">Todas</SelectItem>
                  {dificultadesList.map((d) => (
                    <SelectItem key={d} value={String(d)}>{d}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Edad
            </label>
            <Select
              onValueChange={(v) => handleFilterChange('edad', v)}
              value={initialEdad !== null ? String(initialEdad) : '__none__'}
            >
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Edades</SelectLabel>
                  <SelectItem value="__none__">Todas</SelectItem>
                  {edadesList.map((e) => (
                    <SelectItem key={e} value={String(e)}>{e}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Creador
            </label>
            <Select
              onValueChange={(v) => handleFilterChange('creador', v)}
              value={initialCreador || '__none__'}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Creadores</SelectLabel>
                  <SelectItem value="__none__">Todos</SelectItem>
                  {creadoresList.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {(initialTematica || initialDificultad !== null || initialEdad !== null || initialCreador) && (
            <button
              onClick={() => {
                setSearchInput('');
                fetchOptions({ buscar: undefined, tematica: undefined, dificultad: undefined, edad: undefined, creador: undefined });
                router.push('/admin/frases');
              }}
              className="h-9 px-3 rounded-lg text-xs text-text-muted hover:text-text-primary hover:bg-surface-3 transition-all border border-border-subtle"
            >
              Limpiar filtros
            </button>
          )}
        </div>
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
          {initialBuscar || initialTematica || initialDificultad !== null || initialEdad !== null || initialCreador
            ? 'No se encontraron frases con esos criterios'
            : 'No hay frases registradas'}
        </p>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-6">
          {paginaActual > 1 && (
            <Link
              href={linkHref({ pagina: paginaActual - 1 })}
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
                href={linkHref({ pagina: p })}
                className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  p === paginaActual
                    ? 'bg-brand-purple text-surface-0'
                    : 'text-text-secondary hover:bg-surface-3'
                }`}
              >
                {p}
              </Link>
            ),
          )}
          {paginaActual < totalPages && (
            <Link
              href={linkHref({ pagina: paginaActual + 1 })}
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
