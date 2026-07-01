'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProgresoItem {
  id: string;
  precision: number;
  tiempo: number;
  intentos: number;
  createdAt: Date;
  updatedAt: Date;
  estudiante: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    nivel: string;
  };
}

interface FraseInfo {
  id: number;
  fraseIngles: string;
  fraseEspanol: string;
  dificultad: number;
  tematica: string;
}

export function ProgresoPorFrase({
  frase,
  progreso,
}: {
  frase: FraseInfo;
  progreso: ProgresoItem[];
}) {
  return (
    <div>
      <Link
        href="/profesor/frases"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-brand-green transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a frases
      </Link>

      <div className="bg-surface-2 border border-border-subtle rounded-xl p-6 mb-8">
        <h2 className="font-display text-lg font-bold text-text-primary mb-2">{frase.fraseIngles}</h2>
        <p className="text-text-secondary mb-4">{frase.fraseEspanol}</p>
        <div className="flex gap-3 text-xs">
          <span className="px-2 py-1 rounded bg-surface-3 text-text-muted">Dificultad: {frase.dificultad}</span>
          <span className="px-2 py-1 rounded bg-surface-3 text-brand-cyan">{frase.tematica}</span>
        </div>
      </div>

      <h3 className="font-display text-md font-bold text-text-primary mb-4">
        Progreso de estudiantes ({progreso.length})
      </h3>

      {progreso.length === 0 ? (
        <p className="text-text-muted text-sm">Ningún estudiante ha practicado esta frase aún.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Estudiante</th>
                <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Precisión</th>
                <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Tiempo</th>
                <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Intentos</th>
                <th className="text-center py-3 px-3 font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted">Última práctica</th>
              </tr>
            </thead>
            <tbody>
              {progreso.map((p) => (
                <tr key={p.id} className="border-b border-border-subtle hover:bg-surface-3/50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 border border-border-subtle shrink-0">
                        <AvatarImage src={p.estudiante.avatar || ''} alt={p.estudiante.name} className="object-cover" />
                        <AvatarFallback className="text-xs font-bold bg-surface-3 text-text-secondary">{p.estudiante.name[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-text-primary font-medium">{p.estudiante.name}</p>
                        <p className="text-text-muted text-xs">{p.estudiante.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={p.precision >= 70 ? 'text-brand-green' : 'text-brand-amber'}>
                      {p.precision.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center text-text-secondary">
                    {Math.floor(p.tiempo / 60)}:{String(p.tiempo % 60).padStart(2, '0')} min
                  </td>
                  <td className="py-3 px-3 text-center text-text-secondary">{p.intentos}</td>
                  <td className="py-3 px-3 text-center text-text-muted text-xs">
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
