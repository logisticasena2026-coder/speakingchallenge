'use client';

import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, HelpCircle, Users, BarChart3 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface EstudianteScore {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  correctas: number;
  total: number;
  porcentaje: number;
  ultimaRespuesta: Date;
}

interface PreguntaStats {
  id: string;
  pregunta: string;
  tipo: string;
  total: number;
  correctas: number;
  porcentaje: number | null;
}

interface Props {
  examen: { id: string; titulo: string; descripcion: string | null; totalPreguntas: number };
  totalEstudiantes: number;
  promedioGlobal: number | null;
  maxScore: number | null;
  minScore: number | null;
  distribucion: number[];
  estudiantes: EstudianteScore[];
  preguntas: PreguntaStats[];
  preguntasMasFaciles: PreguntaStats[];
  preguntasMasDificiles: PreguntaStats[];
}

const BUCKET_LABELS = ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'];
const BUCKET_COLORS = ['bg-red-500/60', 'bg-orange-500/60', 'bg-brand-amber/60', 'bg-brand-green/60', 'bg-emerald-500/60'];

export function DetalleResultadosExamen({
  examen, totalEstudiantes, promedioGlobal, maxScore, minScore, distribucion,
  estudiantes, preguntas, preguntasMasFaciles, preguntasMasDificiles,
}: Props) {
  const maxDist = Math.max(...distribucion, 1);

  return (
    <div className="space-y-6">
      <Link href="/profesor/resultados"
        className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm mb-4">
        <ArrowLeft className="w-4 h-4" />
        Volver a resultados
      </Link>

      <div className="mb-2">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-1">{examen.titulo}</h1>
        {examen.descripcion && <p className="text-text-secondary">{examen.descripcion}</p>}
        <p className="text-text-muted text-sm mt-1">{examen.totalPreguntas} preguntas</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-4">
          <p className="font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">Estudiantes</p>
          <p className="font-display text-2xl font-bold text-text-primary">{totalEstudiantes}</p>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-4">
          <p className="font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">Promedio</p>
          <p className={`font-display text-2xl font-bold ${promedioGlobal !== null && promedioGlobal >= 60 ? 'text-brand-green' : promedioGlobal !== null && promedioGlobal >= 40 ? 'text-brand-amber' : 'text-red-400'}`}>
            {promedioGlobal !== null ? `${promedioGlobal}%` : '—'}
          </p>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-4">
          <p className="font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">Máximo</p>
          <p className="font-display text-2xl font-bold text-brand-green">{maxScore !== null ? `${maxScore}%` : '—'}</p>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-4">
          <p className="font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">Mínimo</p>
          <p className="font-display text-2xl font-bold text-red-400">{minScore !== null ? `${minScore}%` : '—'}</p>
        </div>
      </div>

      {totalEstudiantes > 0 && (
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
          <h3 className="font-display text-base font-bold text-text-primary flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-brand-amber" />
            Distribución de puntajes
          </h3>
          <div className="space-y-2">
            {distribucion.map((count, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-ui text-[10px] font-semibold text-text-muted w-16 shrink-0 text-right">{BUCKET_LABELS[i]}</span>
                <div className="flex-1 h-5 bg-surface-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${BUCKET_COLORS[i]}`}
                    style={{ width: `${(count / maxDist) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-text-secondary w-6 shrink-0">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {estudiantes.length > 0 && (
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
          <h3 className="font-display text-base font-bold text-text-primary flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-brand-cyan" />
            Estudiantes ({estudiantes.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-2.5 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Nombre</th>
                  <th className="text-center py-2.5 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Aciertos</th>
                  <th className="text-center py-2.5 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Puntaje</th>
                  <th className="text-center py-2.5 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Última respuesta</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((e) => (
                  <tr key={e.id} className="border-b border-border-subtle hover:bg-surface-3/50 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 border border-border-subtle shrink-0">
                          <AvatarImage src={e.avatar || ''} alt={e.name} className="object-cover" />
                          <AvatarFallback className="text-xs font-bold bg-surface-3 text-text-secondary">{e.name[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Link href={`/profesor/resultados/estudiante/${e.id}`}
                          className="text-text-primary font-medium hover:text-brand-green transition-colors">
                          {e.name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center text-text-secondary">{e.correctas}/{e.total}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        e.porcentaje >= 60 ? 'bg-brand-green/15 text-brand-green'
                        : e.porcentaje >= 40 ? 'bg-brand-amber/15 text-brand-amber'
                        : 'bg-red-400/15 text-red-400'
                      }`}>
                        {e.porcentaje}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center text-text-muted text-xs">
                      {new Date(e.ultimaRespuesta).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {preguntas.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
            <h3 className="font-display text-base font-bold text-text-primary flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-brand-green" />
              Preguntas más fáciles
            </h3>
            {preguntasMasFaciles.length === 0 ? (
              <p className="text-text-muted text-sm">Sin datos</p>
            ) : (
              <div className="space-y-3">
                {preguntasMasFaciles.map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-3">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-text-primary text-sm truncate">{p.pregunta}</p>
                      <p className="text-text-muted text-xs mt-0.5">{p.correctas}/{p.total} acertaron</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-brand-green shrink-0">{p.porcentaje}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
            <h3 className="font-display text-base font-bold text-text-primary flex items-center gap-2 mb-4">
              <TrendingDown className="w-4 h-4 text-red-400" />
              Preguntas más difíciles
            </h3>
            {preguntasMasDificiles.length === 0 ? (
              <p className="text-text-muted text-sm">Sin datos</p>
            ) : (
              <div className="space-y-3">
                {preguntasMasDificiles.map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-3">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-text-primary text-sm truncate">{p.pregunta}</p>
                      <p className="text-text-muted text-xs mt-0.5">{p.correctas}/{p.total} acertaron</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-red-400 shrink-0">{p.porcentaje}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
        <h3 className="font-display text-base font-bold text-text-primary flex items-center gap-2 mb-4">
          <HelpCircle className="w-4 h-4 text-brand-amber" />
          Todas las preguntas
        </h3>
        {preguntas.length === 0 ? (
          <p className="text-text-muted text-sm">Sin datos</p>
        ) : (
          <div className="space-y-3">
            {preguntas.map((p, i) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-3">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-surface-2 text-text-muted text-[10px] font-bold">{i + 1}</span>
                    <span className="text-text-primary text-sm truncate">{p.pregunta}</span>
                  </div>
                  <p className="text-text-muted text-xs ml-7">{p.correctas}/{p.total} acertaron · {p.tipo === 'MULTIPLE_CHOICE' ? 'Opción múltiple' : 'V/F'}</p>
                </div>
                {p.total > 0 && (
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-20 h-2 bg-surface-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${(p.porcentaje ?? 0) >= 60 ? 'bg-brand-green' : (p.porcentaje ?? 0) >= 40 ? 'bg-brand-amber' : 'bg-red-400'}`}
                        style={{ width: `${p.porcentaje ?? 0}%` }}
                      />
                    </div>
                    <span className={`font-mono text-xs font-bold w-10 text-right ${(p.porcentaje ?? 0) >= 60 ? 'text-brand-green' : (p.porcentaje ?? 0) >= 40 ? 'text-brand-amber' : 'text-red-400'}`}>
                      {p.porcentaje}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
