'use client';

import Link from 'next/link';
import { ArrowLeft, GraduationCap, Calendar, Target, TrendingUp } from 'lucide-react';

interface ExamenData {
  examenId: string;
  titulo: string;
  correctas: number;
  total: number;
  porcentaje: number;
  fecha: Date;
}

interface Props {
  estudiante: {
    id: string;
    name: string;
    email: string;
    nivel: string;
    precicion_global: number;
    dias_racha: number;
  };
  totalExamenes: number;
  promedioGlobal: number | null;
  examenes: ExamenData[];
}

export function ResultadosEstudiante({ estudiante, totalExamenes, promedioGlobal, examenes }: Props) {
  return (
    <div className="space-y-6">
      <Link href="/profesor/resultados"
        className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm mb-4">
        <ArrowLeft className="w-4 h-4" />
        Volver a resultados
      </Link>

      <div className="bg-surface-2 border border-border-subtle rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
            <span className="font-display text-xl font-bold text-brand-green">
              {estudiante.name[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-[24px] sm:text-[28px] font-bold text-text-primary truncate">
              {estudiante.name}
            </h1>
            <p className="text-text-secondary text-sm truncate">{estudiante.email}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
              <span className="text-xs text-brand-green capitalize font-medium">
                {estudiante.nivel.toLowerCase().replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-text-muted flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {estudiante.dias_racha} días racha
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-4">
          <p className="font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">
            <GraduationCap className="w-3 h-3 inline mr-1" />
            Exámenes
          </p>
          <p className="font-display text-2xl font-bold text-text-primary">{totalExamenes}</p>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-4">
          <p className="font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            Promedio global
          </p>
          <p className={`font-display text-2xl font-bold ${promedioGlobal !== null && promedioGlobal >= 60 ? 'text-brand-green' : promedioGlobal !== null ? 'text-brand-amber' : 'text-red-400'}`}>
            {promedioGlobal !== null ? `${promedioGlobal}%` : '—'}
          </p>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-4">
          <p className="font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">
            <Target className="w-3 h-3 inline mr-1" />
            Precisión
          </p>
          <p className={`font-display text-2xl font-bold ${estudiante.precicion_global >= 70 ? 'text-brand-green' : 'text-brand-amber'}`}>
            {estudiante.precicion_global.toFixed(1)}%
          </p>
        </div>
      </div>

      {examenes.length > 0 && (
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
          <h3 className="font-display text-base font-bold text-text-primary mb-4">
            Historial de exámenes
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-2.5 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Examen</th>
                  <th className="text-center py-2.5 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Aciertos</th>
                  <th className="text-center py-2.5 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Puntaje</th>
                  <th className="text-center py-2.5 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {examenes.map((ex) => (
                  <tr key={ex.examenId} className="border-b border-border-subtle hover:bg-surface-3/50 transition-colors">
                    <td className="py-2.5 px-3">
                      <Link
                        href={`/profesor/resultados/examen/${ex.examenId}`}
                        className="text-text-primary font-medium hover:text-brand-green transition-colors"
                      >
                        {ex.titulo}
                      </Link>
                    </td>
                    <td className="py-2.5 px-3 text-center text-text-secondary">{ex.correctas}/{ex.total}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        ex.porcentaje >= 60 ? 'bg-brand-green/15 text-brand-green'
                        : ex.porcentaje >= 40 ? 'bg-brand-amber/15 text-brand-amber'
                        : 'bg-red-400/15 text-red-400'
                      }`}>
                        {ex.porcentaje}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center text-text-muted text-xs">
                      {new Date(ex.fecha).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {examenes.length === 0 && (
        <p className="text-center text-text-muted py-8">Este estudiante no ha realizado exámenes aún.</p>
      )}
    </div>
  );
}
