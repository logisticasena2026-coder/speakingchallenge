'use client';

import { useFrasesStore } from '@/store/useFrasesStore';
import { cn } from '@/lib/utils';
import { BookOpen, Zap, Play, Radar, Users, Save, Shield } from 'lucide-react';
import { sileo } from 'sileo';
import { useState } from 'react';

import Link from 'next/link';
import { EnDesarrollo } from '@/components/EnDesarrollo';
import { Configuraciónes } from './Configuraciones';
import { ErasPractica } from './ErasPractica';
import type { GrupoConfig } from '@/store/useFrasesStore';

const grupoConfigurado = (g: GrupoConfig) =>
  g.nombre.trim() !== '' && g.integrantes.every((i) => i.trim() !== '');

export function ModoEstudio() {
  const modo = useFrasesStore((state) => state.modoDeEstudio);
  const setModo = useFrasesStore((state) => state.setModoDeEstudio);
  const protocoloGrupo = useFrasesStore((state) => state.protocoloGrupo);
  const gruposConfig = useFrasesStore((state) => state.gruposConfig);
  const setGrupoConfig = useFrasesStore((state) => state.setGrupoConfig);

  const [formData, setFormData] = useState<GrupoConfig[]>(gruposConfig);
  const [savedIndex, setSavedIndex] = useState<number | null>(null);

  const gruposInsuficientes =
    protocoloGrupo === 'escuadron' &&
    formData.filter(grupoConfigurado).length < 2;

  const handleSave = (index: number) => {
    setGrupoConfig(index, formData[index]);
    setSavedIndex(index);
    setTimeout(() => setSavedIndex(null), 1500);
  };
  return (
    <div className="space-y-5 mb-3 ani delay-anim-2 mt-3">
      <div className="flex items-center justify-center gap-4">
        <span className="font-ui-label text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          Modo de misión
        </span>
        <div className="inline-flex items-center rounded-full border border-border-default bg-surface-2 p-0.5 gap-0">
          <button
            onClick={() => setModo('Estudio')}
            className={cn(
              'relative rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer',
              modo === 'Estudio'
                ? 'bg-brand-green text-surface-0 shadow-[0_0_12px_rgba(61,214,140,0.3)]'
                : 'text-text-muted hover:text-text-secondary',
            )}
          >
            <BookOpen className="size-3.5" />
            Estudiar
          </button>
          <button
            onClick={() => setModo('Practica')}
            className={cn(
              'relative rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer',
              modo === 'Practica'
                ? 'bg-brand-green text-surface-0 shadow-[0_0_12px_rgba(61,214,140,0.3)]'
                : 'text-text-muted hover:text-text-secondary',
            )}
          >
            <Zap className="size-3.5" />
            Practicar
          </button>
        </div>
      </div>

      {modo === 'Estudio' ? (
        <>
          <section>
            <h2 className="sr-only">Era histórica</h2>
            <ErasPractica />
          </section>
          <EnDesarrollo>
            <div className="relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl animate-zoom-in">
              <div className="hud-corner-sm hud-corner-tl-sm" />
              <div className="hud-corner-sm hud-corner-tr-sm" />
              <div className="hud-corner-sm hud-corner-bl-sm" />
              <div className="hud-corner-sm hud-corner-br-sm" />
              <div className="flex flex-col justify-center items-center text-center p-6 sm:p-8">
                <div className="mb-4">
                  <Radar className="w-14 h-14 text-brand-green/20" />
                </div>
                <p className="text-sm text-text-muted mb-6 max-w-100 leading-relaxed">
                  Listo para sincronizar la conciencia con la era seleccionada. Todos los parámetros
                  están validados.
                </p>
                <button className="flex items-center justify-center gap-2 bg-brand-green text-surface-0 font-ui text-xs font-bold tracking-widest uppercase w-full sm:w-auto px-8 py-3.5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-[0_0_24px_rgba(61,214,140,0.4)] hover:-translate-y-0.5">
                  <Play className="w-5 h-5" />
                  Iniciar estudio
                </button>
              </div>
            </div>
          </EnDesarrollo>
        </>
      ) : (
        <>
          <section>
            <h2 className="sr-only">Configuración de grupo</h2>
            <Configuraciónes />
          </section>

          {protocoloGrupo === 'escuadron' && (
            <section>
              <h2 className="sr-only">grupos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ani delay-anim-3">
                {formData.map((grupo, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl p-4 sm:p-5 flex flex-col gap-4 transition-all duration-300 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.35)]"
                  >
                    <div className="hud-corner-sm hud-corner-tl-sm" />
                    <div className="hud-corner-sm hud-corner-tr-sm" />
                    <div className="hud-corner-sm hud-corner-bl-sm" />
                    <div className="hud-corner-sm hud-corner-br-sm" />

                    <div className="flex items-center gap-2.5 border-b border-white/6 pb-3">
                      <Shield className="size-4 text-brand-green" />
                      <h3 className="font-display text-sm font-semibold text-text-primary tracking-wide">
                        Escuadrón {index + 1}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor={`miembros-${index}`} className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted">
                          N.º de integrantes
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-text-muted pointer-events-none" />
                          <input
                            id={`miembros-${index}`}
                            type="number"
                            min={1}
                            max={10}
                            value={grupo.miembros}
                            onChange={(e) => {
                              const nuevo = Math.max(1, Math.min(10, Number(e.target.value)));
                              setFormData((prev) => {
                                const copy = [...prev];
                                const actual = copy[index];
                                const diff = nuevo - actual.integrantes.length;
                                const integrantes =
                                  diff > 0
                                    ? [...actual.integrantes, ...Array(diff).fill('')]
                                    : actual.integrantes.slice(0, nuevo);
                                copy[index] = { ...actual, miembros: nuevo, integrantes };
                                return copy;
                              });
                            }}
                            className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-3/60 border border-border-subtle text-text-primary text-sm font-ui placeholder:text-text-muted/50 outline-none transition-all duration-200 focus:border-brand-green/40 focus:shadow-[0_0_12px_rgba(61,214,140,0.12)] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            placeholder="2"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor={`nombre-escuadron-${index}`} className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted">
                          Nombre del escuadrón
                        </label>
                        <input
                          id={`nombre-escuadron-${index}`}
                          type="text"
                          value={grupo.nombre}
                          onChange={(e) => {
                            const v = formData.map((g, i) =>
                              i === index ? { ...g, nombre: e.target.value } : g,
                            );
                            setFormData(v);
                          }}
                          className="w-full h-10 px-3 rounded-lg bg-surface-3/60 border border-border-subtle text-text-primary text-sm font-ui placeholder:text-text-muted/50 outline-none transition-all duration-200 focus:border-brand-green/40 focus:shadow-[0_0_12px_rgba(61,214,140,0.12)]"
                          placeholder="Lobos del norte"
                        />
                      </div>

                      <div className="border-t border-white/6 pt-3">
                        <p className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted mb-2.5">
                          Integrantes ({grupo.integrantes.length})
                        </p>
                        <div className="flex flex-col gap-2">
                          {grupo.integrantes.map((nombre, mi) => (
                            <div key={mi} className="relative">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-ui text-[10px] font-bold text-text-muted/60 tabular-nums select-none">
                                {mi + 1}.
                              </span>
                              <input
                                type="text"
                                value={nombre}
                                aria-label={`Integrante ${mi + 1}`}
                                onChange={(e) => {
                                  const v = formData.map((g, i) =>
                                    i === index
                                      ? {
                                          ...g,
                                          integrantes: g.integrantes.map((n, j) =>
                                            j === mi ? e.target.value : n,
                                          ),
                                        }
                                      : g,
                                  );
                                  setFormData(v);
                                }}
                                className="w-full h-9 pl-7 pr-3 rounded-lg bg-surface-3/40 border border-border-subtle text-text-primary text-sm font-ui placeholder:text-text-muted/40 outline-none transition-all duration-200 focus:border-brand-cyan/40 focus:shadow-[0_0_12px_rgba(34,211,238,0.1)]"
                                placeholder={`Nombre del integrante ${mi + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSave(index)}
                      className="flex items-center justify-center gap-2 w-full h-10 rounded-lg border border-border-subtle bg-white/4 text-text-muted font-ui text-[11px] font-bold tracking-widest uppercase transition-all duration-200 hover:border-brand-green/30 hover:bg-brand-green/8 hover:text-brand-green cursor-pointer active:scale-[0.98]"
                    >
                      {savedIndex === index ? (
                        <>
                          <Save className="size-3.5" />
                          Guardado
                        </>
                      ) : (
                        <>
                          <Save className="size-3.5" />
                          Guardar
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
          <div className="relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl animate-zoom-in">
            <div className="hud-corner-sm hud-corner-tl-sm" />
            <div className="hud-corner-sm hud-corner-tr-sm" />
            <div className="hud-corner-sm hud-corner-bl-sm" />
            <div className="hud-corner-sm hud-corner-br-sm" />
            <div className="flex flex-col justify-center items-center text-center p-6 sm:p-8">
              <div className="mb-4">
                <Radar className="w-14 h-14 text-brand-green/20" />
              </div>
              <p className="text-sm text-text-muted mb-6 max-w-100 leading-relaxed">
                {protocoloGrupo === 'escuadron'
                  ? gruposInsuficientes
                    ? 'Configura al menos 2 grupos con nombre para practicar en modo Escuadrón Cronista'
                    : `Listo para practicar en equipo con ${formData.filter(grupoConfigurado).length} grupos configurados`
                  : 'Listo para comenzar a practicar cuando quieras. tienes 2.000 frases a tu disposicion'}
              </p>
              <Link
                href="/dashboard/estudiar/practicando"
                onClick={(e) => {
                  if (gruposInsuficientes) {
                    e.preventDefault();
                    sileo.error({
                      title: 'Configuración incompleta',
                      description:
                        'Se requieren al menos 2 grupos para practicar en modo Escuadrón Cronista',
                    });
                  }
                }}
                className={cn(
                  'flex items-center justify-center gap-2 font-ui text-xs font-bold tracking-widest uppercase w-full sm:w-auto px-8 py-3.5 rounded-xl transition-all duration-200',
                  gruposInsuficientes
                    ? 'bg-white/8 text-text-muted cursor-not-allowed'
                    : 'bg-brand-green text-surface-0 cursor-pointer hover:shadow-[0_0_24px_rgba(61,214,140,0.4)] hover:-translate-y-0.5',
                )}
              >
                <Play className="w-5 h-5" />
                Iniciar practica
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
