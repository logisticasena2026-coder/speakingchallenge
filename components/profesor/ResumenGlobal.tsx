'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, Users, GraduationCap, BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ExamenStats {
  id: string;
  titulo: string;
  totalPreguntas: number;
  completados: number;
  promedio: number | null;
  preguntaMasDificil: { id: string; total: number; correctas: number; porcentaje: number | null } | null;
}

interface GrupoStats {
  id: string;
  nombre: string;
  totalMiembros: number;
  completados: number;
  promedio: number | null;
}

interface Props {
  totalExamenes: number;
  totalEstudiantes: number;
  totalGrupos: number;
  estudiantesConRespuestas: number;
  examenes: ExamenStats[];
  grupos: GrupoStats[];
}

function TrendIcon({ value }: { value: number | null }) {
  if (value === null) return <Minus className="w-4 h-4 text-text-muted" />;
  if (value >= 60) return <TrendingUp className="w-4 h-4 text-brand-green" />;
  if (value >= 40) return <Minus className="w-4 h-4 text-brand-amber" />;
  return <TrendingDown className="w-4 h-4 text-red-400" />;
}

export function ResumenGlobal({ totalExamenes, totalEstudiantes, totalGrupos, estudiantesConRespuestas, examenes, grupos }: Props) {
  const router = useRouter();
  const promedioTodos = examenes.filter((e) => e.promedio !== null).reduce((s, e) => s + (e.promedio ?? 0), 0);
  const promedioGlobal = examenes.filter((e) => e.promedio !== null).length > 0
    ? Math.round(promedioTodos / examenes.filter((e) => e.promedio !== null).length)
    : null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-brand-cyan/10"><BookOpen className="w-5 h-5 text-brand-cyan" /></div>
            <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted">Exámenes</span>
          </div>
          <p className="font-display text-3xl font-bold text-text-primary">{totalExamenes}</p>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-brand-green/10"><Users className="w-5 h-5 text-brand-green" /></div>
            <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted">Estudiantes</span>
          </div>
          <p className="font-display text-3xl font-bold text-text-primary">{totalEstudiantes}</p>
          <p className="text-xs text-text-muted mt-1">{estudiantesConRespuestas} han respondido exámenes</p>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-brand-purple/10"><GraduationCap className="w-5 h-5 text-brand-purple" /></div>
            <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted">Grupos</span>
          </div>
          <p className="font-display text-3xl font-bold text-text-primary">{totalGrupos}</p>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-brand-amber/10"><BarChart3 className="w-5 h-5 text-brand-amber" /></div>
            <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted">Promedio global</span>
          </div>
          <p className="font-display text-3xl font-bold text-text-primary">
            {promedioGlobal !== null ? `${promedioGlobal}%` : '—'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
          <h3 className="font-display text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-brand-cyan" />
            Exámenes
          </h3>
          {examenes.length === 0 ? (
            <p className="text-text-muted text-sm py-4 text-center">No hay exámenes creados</p>
          ) : (
            <div className="space-y-2">
              {examenes.map((e) => (
                <button
                  key={e.id}
                  onClick={() => router.push(`/profesor/resultados/examen/${e.id}`)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-3 hover:bg-surface-3/70 transition-colors text-left"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-text-primary text-sm font-medium truncate">{e.titulo}</p>
                    <p className="text-text-muted text-xs mt-0.5">{e.completados} completados · {e.totalPreguntas} preguntas</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {e.promedio !== null && (
                      <span className={`font-mono text-sm font-bold ${e.promedio >= 60 ? 'text-brand-green' : e.promedio >= 40 ? 'text-brand-amber' : 'text-red-400'}`}>
                        {e.promedio}%
                      </span>
                    )}
                    <TrendIcon value={e.promedio} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
          <h3 className="font-display text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-brand-purple" />
            Grupos
          </h3>
          {grupos.length === 0 ? (
            <p className="text-text-muted text-sm py-4 text-center">No hay grupos creados</p>
          ) : (
            <div className="space-y-2">
              {grupos.map((g) => (
                <button
                  key={g.id}
                  onClick={() => router.push(`/profesor/grupos/${g.id}`)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-3 hover:bg-surface-3/70 transition-colors text-left"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-text-primary text-sm font-medium truncate">{g.nombre}</p>
                    <p className="text-text-muted text-xs mt-0.5">{g.completados}/{g.totalMiembros} completaron</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {g.promedio !== null && (
                      <span className={`font-mono text-sm font-bold ${g.promedio >= 60 ? 'text-brand-green' : g.promedio >= 40 ? 'text-brand-amber' : 'text-red-400'}`}>
                        {g.promedio}%
                      </span>
                    )}
                    <TrendIcon value={g.promedio} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
