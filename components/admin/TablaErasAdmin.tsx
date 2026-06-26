'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { sileo } from 'sileo';
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Globe,
  Layers,
  BookOpen,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SkinValues } from '@/schemas/admin/imperio';
import { obtenerTodasEras } from '@/actions/admin/eras/obtenerTodas';
import { crearEra } from '@/actions/admin/eras/crear';
import { editarEra } from '@/actions/admin/eras/editar';
import { crearImperio } from '@/actions/admin/imperios/crear';
import { editarImperio } from '@/actions/admin/imperios/editar';
import { crearNivelesEnLote } from '@/actions/admin/niveles/crearLote';
import { eliminarNivel } from '@/actions/admin/niveles/eliminarNivel';
import { crearFraseNivel } from '@/actions/admin/crearFraseNivel';
import { editarFraseNivel } from '@/actions/admin/editarFraseNivel';
import { eliminarFraseNivel } from '@/actions/admin/eliminarFraseNivel';

type FraseMini = {
  id: number;
  fraseIngles: string;
  fraseEspanol: string;
  dificultad: number;
  tematica: string;
  creador: string;
};

type NivelFull = {
  id: string;
  imperio_id: string;
  orden: number;
  _count: { frases_nivel: number };
  frases_nivel: FraseMini[];
};

type ImperioFull = {
  id: string;
  era_id: string;
  nombre: string;
  orden: number;
  frases_propias: number;
  frases_para_desbloquear: number;
  porcentaje_aprobacion: number;
  umbral_bronce: number;
  umbral_plata: number;
  umbral_oro: number;
  skin: string | null;
  niveles: NivelFull[];
};

export type EraFull = {
  id: string;
  nombre: string;
  orden: number;
  color: string;
  imperios: ImperioFull[];
};

interface Props {
  erasIniciales: EraFull[];
}

export function TablaErasAdmin({ erasIniciales }: Props) {
  const { refresh } = useRouter();
  const [eras, setEras] = useState<EraFull[]>(erasIniciales);
  const [expandedEras, setExpandedEras] = useState<Set<string>>(new Set());
  const [expandedImperios, setExpandedImperios] = useState<Set<string>>(new Set());
  const [expandedNiveles, setExpandedNiveles] = useState<Set<string>>(new Set());

  // Dialog state
  const [openCreateEra, setOpenCreateEra] = useState(false);
  const [openEditEra, setOpenEditEra] = useState(false);
  const [openCreateImperio, setOpenCreateImperio] = useState(false);
  const [openEditImperio, setOpenEditImperio] = useState(false);
  const [openCreateNiveles, setOpenCreateNiveles] = useState(false);

  // Selected items for dialogs
  const [selectedEra, setSelectedEra] = useState<EraFull | null>(null);
  const [selectedImperio, setSelectedImperio] = useState<ImperioFull | null>(null);
  const [selectedEraId, setSelectedEraId] = useState('');

  // Form states
  const [eraForm, setEraForm] = useState({ nombre: '', orden: 1, color: '#8B5CF6' });
  const [imperioForm, setImperioForm] = useState({
    nombre: '',
    orden: 1,
    frases_propias: 0,
    frases_para_desbloquear: 0,
    porcentaje_aprobacion: 50,
    umbral_bronce: 65,
    umbral_plata: 75,
    umbral_oro: 98,
    skin: '',
  });
  const [loteCantidad, setLoteCantidad] = useState(10);

  // Create phrase in level state
  const [openCreateFraseNivel, setOpenCreateFraseNivel] = useState(false);
  const [createFraseNivelId, setCreateFraseNivelId] = useState('');
  const [createFraseForm, setCreateFraseForm] = useState({
    fraseIngles: '',
    fraseEspanol: '',
    dificultad: 5,
    tematica: '',
  });

  // Edit phrase in level state
  const [openEditFraseNivel, setOpenEditFraseNivel] = useState(false);
  const [editFraseNivelId, setEditFraseNivelId] = useState(0);
  const [editFraseForm, setEditFraseForm] = useState({
    fraseIngles: '',
    fraseEspanol: '',
    dificultad: 5,
    tematica: '',
  });

  const toggle = (set: Set<string>, key: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setter(next);
  };

  const refreshData = useCallback(async () => {
    const { eras: fresh } = await obtenerTodasEras();
    setEras(fresh);
  }, []);

  const handleCreateEra = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await sileo.promise(
      () => crearEra(eraForm),
      {
        loading: { title: 'Creando era...' },
        success: (r) => r.ok ? { title: 'Era creada' } : { title: 'Error', description: r.message },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      },
    );
    if (res?.ok) {
      setOpenCreateEra(false);
      setEraForm({ nombre: '', orden: eras.length + 1, color: '#8B5CF6' });
      await refreshData();
      refresh();
    }
  };

  const handleEditEra = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEra) return;
    const res = await sileo.promise(
      () => editarEra(selectedEra.id, eraForm),
      {
        loading: { title: 'Actualizando era...' },
        success: (r) => r.ok ? { title: 'Era actualizada' } : { title: 'Error', description: r.message },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      },
    );
    if (res?.ok) {
      setOpenEditEra(false);
      setSelectedEra(null);
      await refreshData();
      refresh();
    }
  };

  const openEditEraDialog = (era: EraFull) => {
    setSelectedEra(era);
    setEraForm({ nombre: era.nombre, orden: era.orden, color: era.color });
    setOpenEditEra(true);
  };

  const handleCreateImperio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEraId) return;
    const res = await sileo.promise(
      () => crearImperio(selectedEraId, { ...imperioForm, skin: imperioForm.skin || null }),
      {
        loading: { title: 'Creando imperio...' },
        success: (r) => r.ok ? { title: 'Imperio creado' } : { title: 'Error', description: r.message },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      },
    );
    if (res?.ok) {
      setOpenCreateImperio(false);
      setImperioForm({
        nombre: '', orden: 1, frases_propias: 0, frases_para_desbloquear: 0,
        porcentaje_aprobacion: 50, umbral_bronce: 65, umbral_plata: 75, umbral_oro: 98, skin: '',
      });
      await refreshData();
      refresh();
    }
  };

  const handleEditImperio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImperio) return;
    const res = await sileo.promise(
      () => editarImperio(selectedImperio.id, { ...imperioForm, skin: imperioForm.skin || null }),
      {
        loading: { title: 'Actualizando imperio...' },
        success: (r) => r.ok ? { title: 'Imperio actualizado' } : { title: 'Error', description: r.message },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      },
    );
    if (res?.ok) {
      setOpenEditImperio(false);
      setSelectedImperio(null);
      await refreshData();
      refresh();
    }
  };

  const openEditImperioDialog = (imp: ImperioFull) => {
    setSelectedImperio(imp);
    setImperioForm({
      nombre: imp.nombre,
      orden: imp.orden,
      frases_propias: imp.frases_propias,
      frases_para_desbloquear: imp.frases_para_desbloquear,
      porcentaje_aprobacion: imp.porcentaje_aprobacion,
      umbral_bronce: imp.umbral_bronce,
      umbral_plata: imp.umbral_plata,
      umbral_oro: imp.umbral_oro,
      skin: imp.skin ?? '',
    });
    setOpenEditImperio(true);
  };

  const handleCrearNiveles = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImperio) return;
    const res = await sileo.promise(
      () => crearNivelesEnLote({ imperio_id: selectedImperio.id, cantidad: loteCantidad }),
      {
        loading: { title: 'Creando niveles...' },
        success: (r) => r.ok ? { title: 'Niveles creados' } : { title: 'Error', description: r.message },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      },
    );
    if (res?.ok) {
      setOpenCreateNiveles(false);
      await refreshData();
      refresh();
    }
  };

  const handleCrearFraseNivel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createFraseNivelId) return;
    const res = await sileo.promise(
      () => crearFraseNivel({ ...createFraseForm, nivel_id: createFraseNivelId }),
      {
        loading: { title: 'Creando frase...' },
        success: (r) => r.ok ? { title: 'Frase creada' } : { title: 'Error', description: r.message },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      },
    );
    if (res?.ok) {
      setOpenCreateFraseNivel(false);
      setCreateFraseForm({ fraseIngles: '', fraseEspanol: '', dificultad: 5, tematica: '' });
      await refreshData();
      refresh();
    }
  };

  const handleEditarFraseNivel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFraseNivelId) return;
    const res = await sileo.promise(
      () => editarFraseNivel(editFraseNivelId, editFraseForm),
      {
        loading: { title: 'Actualizando frase...' },
        success: (r) => r.ok ? { title: 'Frase actualizada' } : { title: 'Error', description: r.message },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      },
    );
    if (res?.ok) {
      setOpenEditFraseNivel(false);
      await refreshData();
      refresh();
    }
  };

  const handleEliminarFraseNivel = async (fraseId: number) => {
    if (!confirm('¿Eliminar esta frase permanentemente?')) return;
    const res = await sileo.promise(
      () => eliminarFraseNivel(fraseId),
      {
        loading: { title: 'Eliminando frase...' },
        success: (r) => r.ok ? { title: 'Frase eliminada' } : { title: 'Error', description: r.message },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      },
    );
    if (res?.ok) {
      await refreshData();
      refresh();
    }
  };

  const openEditFraseDialog = (fr: FraseMini) => {
    setEditFraseNivelId(fr.id);
    setEditFraseForm({
      fraseIngles: fr.fraseIngles,
      fraseEspanol: fr.fraseEspanol,
      dificultad: fr.dificultad,
      tematica: fr.tematica,
    });
    setOpenEditFraseNivel(true);
  };

  const handleEliminarNivel = async (nivelId: string) => {
    if (!confirm('¿Eliminar este nivel permanentemente? Todas sus frases se eliminarán.')) return;
    const res = await sileo.promise(
      () => eliminarNivel(nivelId),
      {
        loading: { title: 'Eliminando nivel...' },
        success: (r) => r.ok ? { title: 'Nivel eliminado' } : { title: 'Error', description: r.message },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      },
    );
    if (res?.ok) {
      await refreshData();
      refresh();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
            Eras
          </h1>
          <p className="text-text-secondary">{eras.length} era(s) en total</p>
        </div>
        <Dialog open={openCreateEra} onOpenChange={setOpenCreateEra}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-purple text-surface-0 font-bold text-sm hover:bg-brand-purple/90 transition-all shrink-0">
              <Plus className="w-4 h-4" />
              Nueva era
            </button>
          </DialogTrigger>
          <DialogContent className="bg-surface-1 border border-border-default text-text-primary max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Crear era</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateEra} className="space-y-4">
              <div>
                <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Nombre</label>
                <input value={eraForm.nombre} onChange={(e) => setEraForm({ ...eraForm, nombre: e.target.value })} required className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple" />
              </div>
              <div>
                <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Orden</label>
                <input value={eraForm.orden} onChange={(e) => setEraForm({ ...eraForm, orden: Number(e.target.value) })} type="number" min={1} required className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple" />
              </div>
              <div>
                <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Color (hex)</label>
                <div className="flex gap-3 items-center">
                  <input value={eraForm.color} onChange={(e) => setEraForm({ ...eraForm, color: e.target.value })} type="color" className="w-12 h-10 rounded-lg cursor-pointer bg-surface-2 border border-border-subtle" />
                  <input value={eraForm.color} onChange={(e) => setEraForm({ ...eraForm, color: e.target.value })} placeholder="#8B5CF6" className="flex-1 bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple font-mono text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="px-5 py-2.5 rounded-lg bg-brand-purple text-surface-0 font-bold text-sm hover:bg-brand-purple/90 transition-all">Crear</button>
                <DialogClose asChild>
                  <button type="button" className="px-5 py-2.5 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">Cancelar</button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tree */}
      <div className="space-y-3">
        {eras.map((era) => (
          <div key={era.id} className="bg-surface-2 rounded-xl border border-border-subtle overflow-hidden">
            {/* Era header */}
            <button
              onClick={() => toggle(expandedEras, era.id, setExpandedEras)}
              className="w-full flex items-center gap-3 px-5 py-4 hover:bg-surface-3/50 transition-colors text-left"
              style={{ borderLeft: `4px solid ${era.color}` }}
            >
              {expandedEras.has(era.id) ? <ChevronDown className="w-5 h-5 shrink-0 text-text-muted" /> : <ChevronRight className="w-5 h-5 shrink-0 text-text-muted" />}
              <Globe className="w-5 h-5 shrink-0" style={{ color: era.color }} />
              <div className="flex-1 min-w-0">
                <span className="font-ui-label text-base font-semibold text-text-primary">{era.nombre}</span>
                <span className="ml-3 text-xs text-text-muted">Orden {era.orden} · {era.imperios.length} imperio(s)</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <div
                  onClick={(e) => { e.stopPropagation(); openEditEraDialog(era); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); openEditEraDialog(era); } }}
                  role="button"
                  tabIndex={0}
                  className="p-2 rounded-lg text-text-muted hover:text-brand-green hover:bg-brand-green/10 transition-all cursor-pointer"
                  title="Editar era"
                >
                  <Edit className="w-4 h-4" />
                </div>
                <Dialog open={openCreateImperio && selectedEraId === era.id} onOpenChange={(v) => { setOpenCreateImperio(v); if (v) setSelectedEraId(era.id); }}>
                  <DialogTrigger asChild>
                    <div
                      onClick={(e) => { e.stopPropagation(); setSelectedEraId(era.id); }}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setSelectedEraId(era.id); } }}
                      role="button"
                      tabIndex={0}
                      className="p-2 rounded-lg text-text-muted hover:text-brand-cyan hover:bg-brand-cyan/10 transition-all cursor-pointer"
                      title="Crear imperio"
                    >
                      <Plus className="w-4 h-4" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-surface-1 border border-border-default text-text-primary max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="font-display text-xl">Crear imperio en {eras.find(e => e.id === selectedEraId)?.nombre}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateImperio} className="space-y-4 max-h-[70vh] overflow-y-auto">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Nombre</label>
                          <input value={imperioForm.nombre} onChange={(e) => setImperioForm({ ...imperioForm, nombre: e.target.value })} required className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple" />
                        </div>
                        <div>
                          <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Orden</label>
                          <input value={imperioForm.orden} onChange={(e) => setImperioForm({ ...imperioForm, orden: Number(e.target.value) })} type="number" min={1} required className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Frases propias</label>
                          <input value={imperioForm.frases_propias} onChange={(e) => setImperioForm({ ...imperioForm, frases_propias: Number(e.target.value) })} type="number" min={0} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2 px-3 text-text-primary focus:ring-1 focus:ring-brand-purple text-sm" />
                        </div>
                        <div>
                          <label className="block font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Frases desbloquear</label>
                          <input value={imperioForm.frases_para_desbloquear} onChange={(e) => setImperioForm({ ...imperioForm, frases_para_desbloquear: Number(e.target.value) })} type="number" min={0} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2 px-3 text-text-primary focus:ring-1 focus:ring-brand-purple text-sm" />
                        </div>
                        <div>
                          <label className="block font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">% Aprobación</label>
                          <input value={imperioForm.porcentaje_aprobacion} onChange={(e) => setImperioForm({ ...imperioForm, porcentaje_aprobacion: Number(e.target.value) })} type="number" min={0} max={100} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2 px-3 text-text-primary focus:ring-1 focus:ring-brand-purple text-sm" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Bronce %</label>
                          <input value={imperioForm.umbral_bronce} onChange={(e) => setImperioForm({ ...imperioForm, umbral_bronce: Number(e.target.value) })} type="number" min={0} max={100} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2 px-3 text-text-primary focus:ring-1 focus:ring-brand-purple text-sm" />
                        </div>
                        <div>
                          <label className="block font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Plata %</label>
                          <input value={imperioForm.umbral_plata} onChange={(e) => setImperioForm({ ...imperioForm, umbral_plata: Number(e.target.value) })} type="number" min={0} max={100} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2 px-3 text-text-primary focus:ring-1 focus:ring-brand-purple text-sm" />
                        </div>
                        <div>
                          <label className="block font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Oro %</label>
                          <input value={imperioForm.umbral_oro} onChange={(e) => setImperioForm({ ...imperioForm, umbral_oro: Number(e.target.value) })} type="number" min={0} max={100} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2 px-3 text-text-primary focus:ring-1 focus:ring-brand-purple text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Skin</label>
                        <Select value={imperioForm.skin} onValueChange={(v) => setImperioForm({ ...imperioForm, skin: v === '__none__' ? '' : v })}>
                          <SelectTrigger className="w-full bg-surface-2 border border-border-subtle text-text-primary">
                            <SelectValue placeholder="Sin skin" />
                          </SelectTrigger>
                          <SelectContent className="bg-surface-1 border-border-default text-text-primary max-h-60">
                            <SelectItem value="__none__">Sin skin</SelectItem>
                            {SkinValues.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button type="submit" className="px-5 py-2.5 rounded-lg bg-brand-purple text-surface-0 font-bold text-sm hover:bg-brand-purple/90 transition-all">Crear</button>
                        <DialogClose asChild>
                          <button type="button" className="px-5 py-2.5 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">Cancelar</button>
                        </DialogClose>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </button>

            {/* Imperios */}
            {expandedEras.has(era.id) && (
              <div className="border-t border-border-subtle">
                {era.imperios.length === 0 && (
                  <p className="px-8 py-4 text-sm text-text-muted">Sin imperios. Crea uno con el botón +.</p>
                )}
                {era.imperios.map((imp) => (
                  <div key={imp.id}>
                    {/* Imperio header */}
                    <button
                      onClick={() => toggle(expandedImperios, imp.id, setExpandedImperios)}
                      className="w-full flex items-center gap-3 px-8 py-3 hover:bg-surface-3/30 transition-colors text-left border-b border-border-subtle/50"
                    >
                      {expandedImperios.has(imp.id) ? <ChevronDown className="w-4 h-4 shrink-0 text-text-muted" /> : <ChevronRight className="w-4 h-4 shrink-0 text-text-muted" />}
                      <Layers className="w-4 h-4 shrink-0 text-brand-cyan" />
                      <div className="flex-1 min-w-0">
                        <span className="font-ui-label text-sm text-text-primary">{imp.nombre}</span>
                        <span className="ml-2 text-xs text-text-muted">N{imp.orden} · {imp.niveles.length} nivel(es) · {imp.frases_propias} fp · {imp.porcentaje_aprobacion}%</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <div
                          onClick={(e) => { e.stopPropagation(); setSelectedImperio(imp); setLoteCantidad(10); setOpenCreateNiveles(true); }}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setSelectedImperio(imp); setLoteCantidad(10); setOpenCreateNiveles(true); } }}
                          role="button"
                          tabIndex={0}
                          className="p-1.5 rounded-lg text-text-muted hover:text-brand-green hover:bg-brand-green/10 transition-all cursor-pointer"
                          title="Crear niveles en lote"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                        <div
                          onClick={(e) => { e.stopPropagation(); openEditImperioDialog(imp); }}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); openEditImperioDialog(imp); } }}
                          role="button"
                          tabIndex={0}
                          className="p-1.5 rounded-lg text-text-muted hover:text-brand-green hover:bg-brand-green/10 transition-all cursor-pointer"
                          title="Editar imperio"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </button>

                    {/* Niveles */}
                    {expandedImperios.has(imp.id) && (
                      <div>
                        {imp.niveles.length === 0 && (
                          <p className="px-12 py-3 text-sm text-text-muted">Sin niveles. Créalos con el botón +.</p>
                        )}
                        {imp.niveles.map((nvl) => (
                          <div key={nvl.id}>
                            {/* Nivel header */}
                            <button
                              onClick={() => toggle(expandedNiveles, nvl.id, setExpandedNiveles)}
                              className="w-full flex items-center gap-3 px-12 py-2.5 hover:bg-surface-3/20 transition-colors text-left border-b border-border-subtle/30"
                            >
                              {expandedNiveles.has(nvl.id) ? <ChevronDown className="w-3.5 h-3.5 shrink-0 text-text-muted" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0 text-text-muted" />}
                              <BookOpen className="w-3.5 h-3.5 shrink-0 text-brand-purple" />
                              <div className="flex-1 min-w-0">
                                <span className="text-sm text-text-primary">Nivel {nvl.orden}</span>
                                <span className="ml-2 text-xs text-text-muted">{nvl._count.frases_nivel} frase(s)</span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <div
                                  onClick={(e) => { e.stopPropagation(); setCreateFraseNivelId(nvl.id); setCreateFraseForm({ fraseIngles: '', fraseEspanol: '', dificultad: 5, tematica: '' }); setOpenCreateFraseNivel(true); }}
                                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setCreateFraseNivelId(nvl.id); setOpenCreateFraseNivel(true); } }}
                                  role="button"
                                  tabIndex={0}
                                  className="p-1.5 rounded-lg text-text-muted hover:text-brand-green hover:bg-brand-green/10 transition-all cursor-pointer"
                                  title="Crear frase en este nivel"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </div>
                                <div
                                  onClick={(e) => { e.stopPropagation(); handleEliminarNivel(nvl.id); }}
                                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); handleEliminarNivel(nvl.id); } }}
                                  role="button"
                                  tabIndex={0}
                                  className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer"
                                  title="Eliminar nivel"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </div>
                              </div>
                            </button>

                            {/* Frases */}
                            {expandedNiveles.has(nvl.id) && (
                              <div className="bg-surface-3/30 px-14 py-3 border-b border-border-subtle/20">
                                {nvl.frases_nivel.length === 0 && (
                                  <p className="text-sm text-text-muted py-2">Sin frases. Crea una con el botón +.</p>
                                )}
                                {nvl.frases_nivel.map((fr) => (
                                  <div key={fr.id} className="flex items-center gap-3 py-1.5 group">
                                    <span className="text-xs text-text-muted w-8 shrink-0">#{fr.id}</span>
                                    <span className="text-sm text-text-primary flex-1 truncate">{fr.fraseIngles}</span>
                                    <span className="text-xs text-text-secondary hidden sm:block truncate max-w-40">{fr.fraseEspanol}</span>
                                    <span className="text-xs text-text-muted shrink-0">{fr.dificultad}d · {fr.tematica}</span>
                                    <div
                                      onClick={(e) => { e.stopPropagation(); openEditFraseDialog(fr); }}
                                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); openEditFraseDialog(fr); } }}
                                      role="button"
                                      tabIndex={0}
                                      className="p-1 rounded text-text-muted hover:text-brand-green opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                                      title="Editar frase"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                    </div>
                                    <div
                                      onClick={(e) => { e.stopPropagation(); handleEliminarFraseNivel(fr.id); }}
                                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); handleEliminarFraseNivel(fr.id); } }}
                                      role="button"
                                      tabIndex={0}
                                      className="p-1 rounded text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                                      title="Eliminar frase"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {eras.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            <Globe className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No hay eras configuradas</p>
            <p className="text-sm mt-1">Crea la primera era para empezar</p>
          </div>
        )}
      </div>

      {/* Create FraseNivel Dialog */}
      <Dialog open={openCreateFraseNivel} onOpenChange={setOpenCreateFraseNivel}>
        <DialogContent className="bg-surface-1 border border-border-default text-text-primary max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Crear frase en nivel</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCrearFraseNivel} className="space-y-4">
            <div>
              <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Inglés</label>
              <textarea
                value={createFraseForm.fraseIngles}
                onChange={(e) => setCreateFraseForm({ ...createFraseForm, fraseIngles: e.target.value })}
                rows={2}
                required
                className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple resize-none"
              />
            </div>
            <div>
              <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Español</label>
              <textarea
                value={createFraseForm.fraseEspanol}
                onChange={(e) => setCreateFraseForm({ ...createFraseForm, fraseEspanol: e.target.value })}
                rows={2}
                required
                className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Dificultad (1-10)</label>
                <input
                  value={createFraseForm.dificultad}
                  onChange={(e) => setCreateFraseForm({ ...createFraseForm, dificultad: Number(e.target.value) })}
                  type="number"
                  min={1}
                  max={10}
                  required
                  className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple"
                />
              </div>
              <div>
                <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Temática</label>
                <input
                  value={createFraseForm.tematica}
                  onChange={(e) => setCreateFraseForm({ ...createFraseForm, tematica: e.target.value })}
                  className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple"
                  placeholder="ej: Viajes"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-5 py-2.5 rounded-lg bg-brand-green text-surface-0 font-bold text-sm hover:bg-brand-green/90 transition-all">Crear frase</button>
              <DialogClose asChild>
                <button type="button" className="px-5 py-2.5 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">Cancelar</button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit FraseNivel Dialog */}
      <Dialog open={openEditFraseNivel} onOpenChange={setOpenEditFraseNivel}>
        <DialogContent className="bg-surface-1 border border-border-default text-text-primary max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Editar frase</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditarFraseNivel} className="space-y-4">
            <div>
              <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Inglés</label>
              <textarea
                value={editFraseForm.fraseIngles}
                onChange={(e) => setEditFraseForm({ ...editFraseForm, fraseIngles: e.target.value })}
                rows={2}
                required
                className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple resize-none"
              />
            </div>
            <div>
              <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Español</label>
              <textarea
                value={editFraseForm.fraseEspanol}
                onChange={(e) => setEditFraseForm({ ...editFraseForm, fraseEspanol: e.target.value })}
                rows={2}
                required
                className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Dificultad (1-10)</label>
                <input
                  value={editFraseForm.dificultad}
                  onChange={(e) => setEditFraseForm({ ...editFraseForm, dificultad: Number(e.target.value) })}
                  type="number"
                  min={1}
                  max={10}
                  required
                  className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple"
                />
              </div>
              <div>
                <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Temática</label>
                <input
                  value={editFraseForm.tematica}
                  onChange={(e) => setEditFraseForm({ ...editFraseForm, tematica: e.target.value })}
                  className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple"
                  placeholder="ej: Viajes"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-5 py-2.5 rounded-lg bg-brand-purple text-surface-0 font-bold text-sm hover:bg-brand-purple/90 transition-all">Guardar cambios</button>
              <DialogClose asChild>
                <button type="button" className="px-5 py-2.5 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">Cancelar</button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Era Dialog */}
      <Dialog open={openEditEra} onOpenChange={setOpenEditEra}>
        <DialogContent className="bg-surface-1 border border-border-default text-text-primary max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Editar era</DialogTitle>
          </DialogHeader>
          {selectedEra && (
            <form onSubmit={handleEditEra} className="space-y-4">
              <div>
                <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Nombre</label>
                <input value={eraForm.nombre} onChange={(e) => setEraForm({ ...eraForm, nombre: e.target.value })} required className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple" />
              </div>
              <div>
                <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Orden</label>
                <input value={eraForm.orden} onChange={(e) => setEraForm({ ...eraForm, orden: Number(e.target.value) })} type="number" min={1} required className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple" />
              </div>
              <div>
                <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Color</label>
                <div className="flex gap-3 items-center">
                  <input value={eraForm.color} onChange={(e) => setEraForm({ ...eraForm, color: e.target.value })} type="color" className="w-12 h-10 rounded-lg cursor-pointer bg-surface-2 border border-border-subtle" />
                  <input value={eraForm.color} onChange={(e) => setEraForm({ ...eraForm, color: e.target.value })} className="flex-1 bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple font-mono text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="px-5 py-2.5 rounded-lg bg-brand-purple text-surface-0 font-bold text-sm hover:bg-brand-purple/90 transition-all">Guardar</button>
                <DialogClose asChild>
                  <button type="button" className="px-5 py-2.5 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">Cancelar</button>
                </DialogClose>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Imperio Dialog */}
      <Dialog open={openEditImperio} onOpenChange={setOpenEditImperio}>
        <DialogContent className="bg-surface-1 border border-border-default text-text-primary max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Editar imperio</DialogTitle>
          </DialogHeader>
          {selectedImperio && (
            <form onSubmit={handleEditImperio} className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Nombre</label>
                  <input value={imperioForm.nombre} onChange={(e) => setImperioForm({ ...imperioForm, nombre: e.target.value })} required className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple" />
                </div>
                <div>
                  <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Orden</label>
                  <input value={imperioForm.orden} onChange={(e) => setImperioForm({ ...imperioForm, orden: Number(e.target.value) })} type="number" min={1} required className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Frases propias</label>
                  <input value={imperioForm.frases_propias} onChange={(e) => setImperioForm({ ...imperioForm, frases_propias: Number(e.target.value) })} type="number" min={0} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2 px-3 text-text-primary focus:ring-1 focus:ring-brand-purple text-sm" />
                </div>
                <div>
                  <label className="block font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Frases desbloquear</label>
                  <input value={imperioForm.frases_para_desbloquear} onChange={(e) => setImperioForm({ ...imperioForm, frases_para_desbloquear: Number(e.target.value) })} type="number" min={0} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2 px-3 text-text-primary focus:ring-1 focus:ring-brand-purple text-sm" />
                </div>
                <div>
                  <label className="block font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">% Aprobación</label>
                  <input value={imperioForm.porcentaje_aprobacion} onChange={(e) => setImperioForm({ ...imperioForm, porcentaje_aprobacion: Number(e.target.value) })} type="number" min={0} max={100} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2 px-3 text-text-primary focus:ring-1 focus:ring-brand-purple text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Bronce %</label>
                  <input value={imperioForm.umbral_bronce} onChange={(e) => setImperioForm({ ...imperioForm, umbral_bronce: Number(e.target.value) })} type="number" min={0} max={100} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2 px-3 text-text-primary focus:ring-1 focus:ring-brand-purple text-sm" />
                </div>
                <div>
                  <label className="block font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Plata %</label>
                  <input value={imperioForm.umbral_plata} onChange={(e) => setImperioForm({ ...imperioForm, umbral_plata: Number(e.target.value) })} type="number" min={0} max={100} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2 px-3 text-text-primary focus:ring-1 focus:ring-brand-purple text-sm" />
                </div>
                <div>
                  <label className="block font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Oro %</label>
                  <input value={imperioForm.umbral_oro} onChange={(e) => setImperioForm({ ...imperioForm, umbral_oro: Number(e.target.value) })} type="number" min={0} max={100} className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2 px-3 text-text-primary focus:ring-1 focus:ring-brand-purple text-sm" />
                </div>
              </div>
              <div>
                <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Skin</label>
                <Select value={imperioForm.skin} onValueChange={(v) => setImperioForm({ ...imperioForm, skin: v === '__none__' ? '' : v })}>
                  <SelectTrigger className="w-full bg-surface-2 border border-border-subtle text-text-primary">
                    <SelectValue placeholder="Sin skin" />
                  </SelectTrigger>
                  <SelectContent className="bg-surface-1 border-border-default text-text-primary max-h-60">
                    <SelectItem value="__none__">Sin skin</SelectItem>
                    {SkinValues.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="px-5 py-2.5 rounded-lg bg-brand-purple text-surface-0 font-bold text-sm hover:bg-brand-purple/90 transition-all">Guardar</button>
                <DialogClose asChild>
                  <button type="button" className="px-5 py-2.5 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">Cancelar</button>
                </DialogClose>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Niveles en Lote Dialog */}
      <Dialog open={openCreateNiveles} onOpenChange={setOpenCreateNiveles}>
        <DialogContent className="bg-surface-1 border border-border-default text-text-primary max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Crear niveles</DialogTitle>
          </DialogHeader>
          {selectedImperio && (
            <form onSubmit={handleCrearNiveles} className="space-y-4">
              <p className="text-sm text-text-secondary">Para <strong>{selectedImperio.nombre}</strong></p>
              <div>
                <label className="block font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Cantidad de niveles</label>
                <input value={loteCantidad} onChange={(e) => setLoteCantidad(Number(e.target.value))} type="number" min={1} max={100} required className="w-full bg-surface-2 border border-border-subtle rounded-lg py-2.5 px-4 text-text-primary focus:ring-1 focus:ring-brand-purple" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="px-5 py-2.5 rounded-lg bg-brand-purple text-surface-0 font-bold text-sm hover:bg-brand-purple/90 transition-all">Crear</button>
                <DialogClose asChild>
                  <button type="button" className="px-5 py-2.5 rounded-lg border border-border-subtle text-text-secondary font-bold text-sm hover:bg-surface-3 transition-all">Cancelar</button>
                </DialogClose>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
