'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sileo } from 'sileo';
import { eliminarEstudiante } from '@/actions/profesor/eliminarEstudiante';
import { Trash2, Search } from 'lucide-react';

interface Estudiante {
  id: string;
  name: string;
  email: string;
  nivel: string;
  frases: number;
  precicion_global: number;
  dias_racha: number;
  ultima_sesion: Date | null;
  createdAt: Date;
  _count: { progreso_frases: number; respuestas_examen: number };
}

export function TablaEstudiantes({ estudiantes }: { estudiantes: Estudiante[] }) {
  const [search, setSearch] = useState('');
  const [lista, setLista] = useState(estudiantes);

  const filtrados = lista.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleEliminar = async (id: string, name: string) => {
    const confirmar = window.confirm(`¿Eliminar a ${name} de tu clase?`);
    if (!confirmar) return;

    sileo.promise(
      () => eliminarEstudiante(id),
      {
        loading: { title: 'Eliminando estudiante...' },
        success: (res) => {
          setLista((prev) => prev.filter((e) => e.id !== id));
          return { title: 'Estudiante eliminado', description: res.message };
        },
        error: (err) => ({
          title: 'Error',
          description: err instanceof Error ? err.message : 'Error inesperado',
        }),
      }
    );
  };

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted size-4" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar estudiante..."
          className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 pl-10 pr-4 text-text-primary text-sm focus:ring-1 focus:ring-brand-green transition-all placeholder:text-text-muted/50"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Nombre</th>
              <th className="text-left py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Email</th>
              <th className="text-left py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Nivel</th>
              <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Frases</th>
              <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Precisión</th>
              <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Racha</th>
              <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Exámenes</th>
              <th className="text-right py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((e) => (
              <tr key={e.id} className="border-b border-border-subtle hover:bg-surface-3/50 transition-colors">
                <td className="py-3 px-3">
                  <Link href={`/profesor/resultados/estudiante/${e.id}`}
                    className="text-text-primary font-medium hover:text-brand-green transition-colors">
                    {e.name}
                  </Link>
                </td>
                <td className="py-3 px-3 text-text-secondary text-xs">{e.email}</td>
                <td className="py-3 px-3">
                  <span className="text-xs text-brand-green capitalize">{e.nivel.toLowerCase().replace(/_/g, ' ')}</span>
                </td>
                <td className="py-3 px-3 text-center text-text-secondary">{e.frases}</td>
                <td className="py-3 px-3 text-center">
                  <span className={e.precicion_global >= 70 ? 'text-brand-green' : 'text-brand-amber'}>
                    {e.precicion_global.toFixed(1)}%
                  </span>
                </td>
                <td className="py-3 px-3 text-center text-text-secondary">{e.dias_racha} días</td>
                <td className="py-3 px-3 text-center text-text-secondary">{e._count.respuestas_examen}</td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => handleEliminar(e.id, e.name)}
                    className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all"
                    title="Eliminar de mi clase"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtrados.length === 0 && (
        <p className="text-center text-text-muted py-8">No se encontraron estudiantes</p>
      )}
    </div>
  );
}
