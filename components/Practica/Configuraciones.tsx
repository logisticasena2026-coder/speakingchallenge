'use client';
import { BookOpen, CheckCircle, MapPin, Minus, Plus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useFrasesStore } from '@/store/useFrasesStore';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';

export function Configuraciónes() {
  const [tematicasList, setTematicasList] = useState<string[]>([]);
  const [dificultadesList, setDificultadesList] = useState<number[]>([]);
  const [edadesList, setEdadesList] = useState<number[]>([]);
  const [creadores, setCreadores] = useState<string[]>([]);
  const tematica = useFrasesStore((s) => s.tematica);
  const protocoloGrupo = useFrasesStore((s) => s.protocoloGrupo);
  const setProtocoloGrupo = useFrasesStore((s) => s.setProtocoloGrupo);
  const cantidadGrupos = useFrasesStore((s) => s.cantidadGrupos);
  const agregarGrupo = useFrasesStore((s) => s.agregarGrupo);
  const quitarGrupo = useFrasesStore((s) => s.quitarGrupo);
  const dificultad = useFrasesStore((s) => s.dificultad);
  const edad = useFrasesStore((s) => s.edad);
  const creador = useFrasesStore((s) => s.creador);
  const setTematica = useFrasesStore((s) => s.setTematica);
  const setDificultad = useFrasesStore((s) => s.setDificultad);
  const setEdad = useFrasesStore((s) => s.setEdad);
  const setCreador = useFrasesStore((s) => s.setCreador);

  useEffect(() => {
    import('@/actions/frases').then(
      ({ obtenerTematicas, obtenerDificultades, obtenerEdades, obtenerCreadores }) =>
        Promise.all([
          obtenerTematicas().then(setTematicasList),
          obtenerDificultades().then(setDificultadesList),
          obtenerEdades().then(setEdadesList),
          obtenerCreadores().then(setCreadores),
        ]),
    );
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ani delay-anim-3">
      <Drawer>
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
                <p>
                  Elige entre práctica individual o en grupo. Afecta la dificultad y recompensas.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setProtocoloGrupo('solitario')}
              className={
                protocoloGrupo === 'solitario'
                  ? 'flex items-center justify-between p-3.5 bg-brand-green/8 border-2 border-brand-green/30 rounded-xl cursor-pointer transition-all duration-200 hover:bg-brand-green/12'
                  : 'flex items-center justify-between p-3.5 bg-white/2 border border-white/6 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/4 hover:border-white/10'
              }
            >
              <div>
                <p className="font-ui text-sm font-semibold text-text-primary">Viajero Solitario</p>
                <p className="font-ui text-[11px] text-text-muted">Inmersión profunda individual</p>
              </div>

              {protocoloGrupo === 'solitario' && (
                <CheckCircle className="w-5 h-5 text-brand-green" />
              )}
            </button>
            <DrawerTrigger asChild>
              <button
                onClick={() => setProtocoloGrupo('escuadron')}
                className={
                  protocoloGrupo === 'escuadron'
                    ? 'flex items-center justify-between p-3.5 bg-brand-green/8 border-2 border-brand-green/30 rounded-xl cursor-pointer transition-all duration-200 hover:bg-brand-green/12'
                    : 'flex items-center justify-between p-3.5 bg-white/2 border border-white/6 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/4 hover:border-white/10'
                }
              >
                <div>
                  <p className="font-ui text-sm font-semibold text-text-secondary">
                    Escuadrón Cronista
                  </p>
                  <p className="font-ui text-[11px] text-text-muted">
                    Cooperación táctica múltiple
                  </p>
                </div>
                {protocoloGrupo === 'escuadron' && (
                  <CheckCircle className="w-5 h-5 text-brand-green" />
                )}
              </button>
            </DrawerTrigger>
          </div>
        </div>

        <DrawerContent className="border-t border-white/6 bg-surface-1">
          <DrawerHeader className="text-center">
            <DrawerTitle className="font-display text-lg font-bold text-text-primary">
              Escuadrón Cronista
            </DrawerTitle>
            <DrawerDescription className="font-ui text-xs text-text-muted">
              Número de equipos para la misión
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex items-center justify-center gap-6 py-4">
            <button
              onClick={quitarGrupo}
              className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/4 text-text-secondary transition-all duration-200 hover:border-brand-green/40 hover:bg-brand-green/8 hover:text-brand-green active:scale-95 cursor-pointer"
            >
              <Minus className="size-5" />
            </button>

            <span className="font-display text-5xl font-bold text-brand-green tabular-nums select-none">
              {cantidadGrupos}
            </span>

            <button
              onClick={agregarGrupo}
              className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/4 text-text-secondary transition-all duration-200 hover:border-brand-green/40 hover:bg-brand-green/8 hover:text-brand-green active:scale-95 cursor-pointer"
            >
              <Plus className="size-5" />
            </button>
          </div>

          <DrawerFooter className="pt-2 pb-6">
            <DrawerClose asChild>
              <Button className="h-12 w-full rounded-xl bg-brand-green text-surface-0 font-ui text-sm font-bold tracking-widest uppercase transition-all duration-200 hover:bg-brand-green/90 hover:shadow-[0_0_20px_rgba(61,214,140,0.35)] cursor-pointer">
                Confirmar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

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
            <label
              htmlFor="sel-tematica"
              className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted"
            >
              Temática
            </label>
            <Select
              onValueChange={(value) => setTematica(value === '__none__' ? '' : value)}
              value={tematica}
            >
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
            <label
              htmlFor="sel-dificultad"
              className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted"
            >
              Dificultad
            </label>
            <Select
              onValueChange={(value) => setDificultad(value === '__none__' ? '' : Number(value))}
              value={dificultad !== '' ? dificultad.toString() : ''}
            >
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
            <label
              htmlFor="sel-edad"
              className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted"
            >
              Edad equivalente
            </label>
            <Select
              onValueChange={(value) => setEdad(value === '__none__' ? '' : Number(value))}
              value={edad !== '' ? edad.toString() : ''}
            >
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
            <label
              htmlFor="sel-creador"
              className="font-ui text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted"
            >
              Creador de la prueba
            </label>
            <Select
              onValueChange={(value) => setCreador(value === '__none__' ? '' : value)}
              value={creador}
            >
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
