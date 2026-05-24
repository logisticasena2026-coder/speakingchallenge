'use client'
import { BookOpen, CheckCircle, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useFrasesStore } from '@/store/useFrasesStore';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Configuraciónes() {
  const [tematicasList, setTematicasList] = useState<string[]>([]);
  const [dificultadesList, setDificultadesList] = useState<number[]>([]);
  const [edadesList, setEdadesList] = useState<number[]>([]);
  const [creadores, setCreadores] = useState<string[]>([]);
  const tematica = useFrasesStore((s) => s.tematica);
  const dificultad = useFrasesStore((s) => s.dificultad);
  const edad = useFrasesStore((s) => s.edad);
  const creador = useFrasesStore((s) => s.creador);
  const setTematica = useFrasesStore((s) => s.setTematica);
  const setDificultad = useFrasesStore((s) => s.setDificultad);
  const setEdad = useFrasesStore((s) => s.setEdad);
  const setCreador = useFrasesStore((s) => s.setCreador);

  useEffect(() => {
    import('@/actions/frases').then(({ obtenerTematicas, obtenerDificultades, obtenerEdades, obtenerCreadores }) =>
      Promise.all([
        obtenerTematicas().then(setTematicasList),
        obtenerDificultades().then(setDificultadesList),
        obtenerEdades().then(setEdadesList),
        obtenerCreadores().then(setCreadores),
      ])
    );
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ani delay-anim-3">
      <div className="relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl p-4 sm:p-6 flex flex-col gap-4 transition-all duration-300 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.35)]">
        <div className="hud-corner-sm hud-corner-tl-sm"></div>
        <div className="hud-corner-sm hud-corner-tr-sm"></div>
        <div className="hud-corner-sm hud-corner-bl-sm"></div>
        <div className="hud-corner-sm hud-corner-br-sm"></div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-2.5 cursor-help relative">
              <Users className="w-4 h-4 text-brand-green" />
              <span className="font-display text-sm font-semibold text-text-primary">
                Protocolo de Grupo
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Elige entre práctica individual o en grupo. Afecta la dificultad y recompensas.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col gap-2">
          <button className="flex items-center justify-between p-3.5 bg-brand-green/8 border-2 border-brand-green/30 rounded-xl cursor-pointer transition-all duration-200 hover:bg-brand-green/12">
            <div>
              <p className="font-ui text-sm font-semibold text-text-primary">Viajero Solitario</p>
              <p className="font-ui text-[11px] text-text-muted">Inmersión profunda individual</p>
            </div>
            <CheckCircle className="w-5 h-5 text-brand-green" />
          </button>
          <button className="flex items-center justify-between p-3.5 bg-white/2 border border-white/6 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/4 hover:border-white/10">
            <div>
              <p className="font-ui text-sm font-semibold text-text-secondary">
                Escuadrón Cronista
              </p>
              <p className="font-ui text-[11px] text-text-muted">Cooperación táctica múltiple</p>
            </div>
          </button>
        </div>
      </div>

      <div className="relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl p-4 sm:p-6 flex flex-col gap-4 transition-all duration-300 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.35)]">
        <div className="hud-corner-sm hud-corner-tl-sm"></div>
        <div className="hud-corner-sm hud-corner-tr-sm"></div>
        <div className="hud-corner-sm hud-corner-bl-sm"></div>
        <div className="hud-corner-sm hud-corner-br-sm"></div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-2.5 cursor-help relative">
              <BookOpen className="w-4 h-4 text-brand-cyan" />
              <span className="font-display text-sm font-semibold text-text-primary">
                Archivo de Temática
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Filtra las frases por temática y nivel de dificultad.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sel-tematica" className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted">
              Temática
            </label>
            <Select onValueChange={(value) => setTematica(value === '__none__' ? '' : value)} value={tematica}>
              <SelectTrigger id="sel-tematica" className="w-full">
                <SelectValue placeholder="Seleccionar temática" />
              </SelectTrigger>
              <SelectContent className="bg-surface-3">
                <SelectGroup>
                  <SelectLabel className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted">
                    Temáticas disponibles
                  </SelectLabel>
                  <SelectItem value="__none__">Sin filtro</SelectItem>
                  {tematicasList.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="sel-dificultad" className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted">
              Dificultad
            </label>
            <Select onValueChange={(value) => setDificultad(value === '__none__' ? '' : Number(value))} value={dificultad !== '' ? dificultad.toString() : ''}>
              <SelectTrigger id="sel-dificultad" className="w-full">
                <SelectValue placeholder="Seleccionar dificultad" />
              </SelectTrigger>
              <SelectContent className="bg-surface-3">
                <SelectGroup>
                  <SelectLabel className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted">
                    Niveles disponibles
                  </SelectLabel>
                  <SelectItem value="__none__">Sin filtro</SelectItem>
                  {dificultadesList.map((d) => (
                    <SelectItem key={d} value={d.toString()}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="relative rounded-xl border border-white/6 bg-surface-2/70 backdrop-blur-xl p-4 sm:p-6 flex flex-col gap-4 transition-all duration-300 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.35)]">
        <div className="hud-corner-sm hud-corner-tl-sm"></div>
        <div className="hud-corner-sm hud-corner-tr-sm"></div>
        <div className="hud-corner-sm hud-corner-bl-sm"></div>
        <div className="hud-corner-sm hud-corner-br-sm"></div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-2.5 cursor-help relative">
              <MapPin className="w-4 h-4 text-brand-amber" />
              <span className="font-display text-sm font-semibold text-text-primary">
                Origen de la Prueba
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Filtra por rango etario y creador de la prueba.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sel-edad" className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted">
              Edad equivalente
            </label>
            <Select onValueChange={(value) => setEdad(value === '__none__' ? '' : Number(value))} value={edad !== '' ? edad.toString() : ''}>
              <SelectTrigger id="sel-edad" className="w-full">
                <SelectValue placeholder="Seleccionar edad" />
              </SelectTrigger>
              <SelectContent className="bg-surface-3">
                <SelectGroup>
                  <SelectLabel className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted">
                    Rangos etarios
                  </SelectLabel>
                  <SelectItem value="__none__">Sin filtro</SelectItem>
                  {edadesList.map((e) => (
                    <SelectItem key={e} value={e.toString()}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="sel-creador" className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted">
              Creador de la prueba
            </label>
            <Select onValueChange={(value) => setCreador(value === '__none__' ? '' : value)} value={creador}>
              <SelectTrigger id="sel-creador" className="w-full">
                <SelectValue placeholder="Seleccionar creador" />
              </SelectTrigger>
              <SelectContent className="bg-surface-3">
                <SelectGroup>
                  <SelectLabel className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted">
                    Creadores
                  </SelectLabel>
                  <SelectItem value="__none__">Sin filtro</SelectItem>
                  {creadores.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
