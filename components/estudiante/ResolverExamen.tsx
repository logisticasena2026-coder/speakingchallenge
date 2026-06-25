'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sileo } from 'sileo';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { enviarRespuestas } from '@/actions/estudiante/examen/enviarRespuestas';

interface Pregunta {
  id: string;
  tipo: string;
  pregunta: string;
  opciones: { label: string; text: string }[] | null;
  orden: number;
}

interface Props {
  examenId: string;
  titulo: string;
  profesor: string;
  preguntas: Pregunta[];
}

export function ResolverExamen({ examenId, titulo, profesor, preguntas }: Props) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [resultado, setResultado] = useState<{ total: number; correctas: number } | null>(null);
  const [enviando, setEnviando] = useState(false);

  const pregunta = preguntas[current];
  const total = preguntas.length;
  const respondidas = Object.keys(respuestas).length;
  const todasRespondidas = respondidas === total;

  const handleSelect = (preguntaId: string, respuesta: string) => {
    if (resultado) return;
    setRespuestas((prev) => ({ ...prev, [preguntaId]: respuesta }));
  };

  const handleEnviar = async () => {
    if (!todasRespondidas) return;
    setEnviando(true);
    try {
      const res = await sileo.promise(
        () => enviarRespuestas(examenId, Object.entries(respuestas).map(([pregunta_id, respuesta]) => ({ pregunta_id, respuesta }))),
        {
          loading: { title: 'Enviando respuestas...' },
          success: (res) => {
            if (!res.ok) throw new Error(res.message);
            return { title: 'Examen completado', description: `${res.correctas} de ${res.total} correctas` };
          },
          error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
        }
      );
      if (res?.ok) {
        setResultado({ total: res.total, correctas: res.correctas });
      }
    } finally {
      setEnviando(false);
    }
  };

  if (resultado) {
    const porcentaje = Math.round((resultado.correctas / resultado.total) * 100);
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
          porcentaje >= 70 ? 'bg-brand-green/20' : 'bg-brand-amber/20'
        }`}>
          {porcentaje >= 70 ? (
            <CheckCircle2 className="w-10 h-10 text-brand-green" />
          ) : (
            <XCircle className="w-10 h-10 text-brand-amber" />
          )}
        </div>
        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Examen completado</h2>
        <p className="text-text-secondary text-lg mb-6">
          {resultado.correctas} de {resultado.total} correctas
        </p>
        <div className="w-full max-w-xs mx-auto h-3 bg-surface-3 rounded-full overflow-hidden mb-6">
          <div className={`h-full rounded-full transition-all duration-700 ${
            porcentaje >= 70 ? 'bg-brand-green' : 'bg-brand-amber'
          }`} style={{ width: `${porcentaje}%` }} />
        </div>
        <p className={`text-xl font-bold ${porcentaje >= 70 ? 'text-brand-green' : 'text-brand-amber'}`}>
          {porcentaje}%
        </p>
        <button onClick={() => router.push('/dashboard/actividades-profesor')}
          className="mt-8 flex items-center gap-2 mx-auto px-6 py-3 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">
          <ArrowLeft className="w-4 h-4" />
          Volver a actividades
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.push('/dashboard/actividades-profesor')}
          className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        <div className="text-right">
          <h1 className="font-display text-xl font-bold text-text-primary">{titulo}</h1>
          <p className="text-text-muted text-xs">{profesor}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted mb-4">
        <span>Pregunta {current + 1} de {total}</span>
        <span>{respondidas}/{total} respondidas</span>
      </div>

      <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden mb-8">
        <div className="h-full bg-brand-amber rounded-full transition-all duration-300"
          style={{ width: `${((respondidas) / total) * 100}%` }} />
      </div>

      <div className="bg-surface-2 border border-border-subtle rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-brand-amber/20 text-brand-amber text-xs font-bold">
            {current + 1}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-3 text-text-muted">
            {pregunta.tipo === 'MULTIPLE_CHOICE' ? 'Opción múltiple' : 'Verdadero / Falso'}
          </span>
        </div>

        <p className="text-text-primary text-lg font-medium mb-6">{pregunta.pregunta}</p>

        {pregunta.tipo === 'MULTIPLE_CHOICE' && pregunta.opciones && (
          <div className="space-y-3">
            {pregunta.opciones.map((o) => {
              const selected = respuestas[pregunta.id] === o.label;
              return (
                <button
                  key={o.label}
                  onClick={() => handleSelect(pregunta.id, o.label)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-all ${
                    selected
                      ? 'border-brand-amber bg-brand-amber/10 text-text-primary'
                      : 'border-border-subtle bg-surface-3 text-text-secondary hover:border-brand-amber/50'
                  }`}
                >
                  <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${
                    selected ? 'bg-brand-amber text-surface-0' : 'bg-surface-2 text-text-muted'
                  }`}>
                    {o.label}
                  </span>
                  <span className="flex-1">{o.text}</span>
                </button>
              );
            })}
          </div>
        )}

        {pregunta.tipo === 'TRUE_FALSE' && (
          <div className="grid grid-cols-2 gap-4">
            {['VERDADERO', 'FALSO'].map((opt) => {
              const selected = respuestas[pregunta.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(pregunta.id, opt)}
                  className={`flex items-center justify-center gap-2 p-6 rounded-lg border text-lg font-bold transition-all ${
                    selected
                      ? 'border-brand-amber bg-brand-amber/10 text-brand-amber'
                      : 'border-border-subtle bg-surface-3 text-text-secondary hover:border-brand-amber/50'
                  }`}
                >
                  {opt === 'VERDADERO' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  {opt === 'VERDADERO' ? 'Verdadero' : 'Falso'}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all disabled:opacity-30">
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </button>

        {current < total - 1 ? (
          <button
            onClick={() => setCurrent((p) => Math.min(total - 1, p + 1))}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-amber text-surface-0 font-bold text-sm hover:bg-brand-amber/90 transition-all">
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleEnviar}
            disabled={!todasRespondidas || enviando}
            className="px-6 py-2.5 rounded-lg bg-brand-green text-surface-0 font-bold text-sm hover:bg-brand-green/90 transition-all disabled:opacity-50">
            {enviando ? 'Enviando...' : 'Finalizar examen'}
          </button>
        )}
      </div>
    </div>
  );
}
