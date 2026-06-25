'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { sileo } from 'sileo';
import { agregarProfesor } from '@/actions/estudiante/agregarProfesor';
import { Key, Plus } from 'lucide-react';

export function AgregarProfesorModal({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const [codigo, setCodigo] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleAgregar = async () => {
    if (!codigo.trim()) return;
    setCargando(true);

    sileo.promise(
      () => agregarProfesor(codigo.trim()),
      {
        loading: { title: 'Vinculando...' },
        success: (res) => {
          if (!res.ok) throw new Error(res.message);
          setCodigo('');
          setCargando(false);
          onOpenChange(false);
          onSuccess();
          return { title: 'Vinculado', description: res.message };
        },
        error: (err) => {
          setCargando(false);
          return { title: 'Error', description: err instanceof Error ? err.message : 'Error inesperado' };
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface-2 border-border-default text-text-primary max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">Agregar Profesor</DialogTitle>
          <DialogDescription className="text-text-muted text-sm">
            Ingresa el código que te proporcionó tu profesor.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted size-4" />
            <input
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              placeholder="Ej: PROF-A7K23"
              className="w-full bg-surface-3 border border-border-subtle rounded-lg py-2.5 pl-10 pr-4 text-text-primary text-sm focus:ring-1 focus:ring-brand-green transition-all placeholder:text-text-muted/50 uppercase tracking-wider font-mono"
              maxLength={10}
              autoFocus
            />
          </div>

          <button
            onClick={handleAgregar}
            disabled={cargando || !codigo.trim()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-green text-surface-0 font-bold text-sm hover:bg-brand-green/90 transition-all disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            Vincularse
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
