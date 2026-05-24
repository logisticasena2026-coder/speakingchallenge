'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Camera, Sparkles, Upload } from 'lucide-react';
import { EnDesarrollo } from '@/components/EnDesarrollo';

const SKIN_ERAS = [
  {
    id: 'viking',
    label: 'Vikingo',
    skins: ['ImperioCivilización', 'ImperioAcadio'],
    color: 'border-cyan-500/40 bg-cyan-500/8 hover:bg-cyan-500/15',
    accent: 'text-cyan-400',
    gradient: 'from-cyan-500/20 via-blue-600/10 to-surface-2',
  },
  {
    id: 'egypt',
    label: 'Egipto',
    skins: ['ImperioAntiguoDeEgipto'],
    color: 'border-amber-500/40 bg-amber-500/8 hover:bg-amber-500/15',
    accent: 'text-amber-400',
    gradient: 'from-amber-500/20 via-yellow-700/10 to-surface-2',
  },
  {
    id: 'rome',
    label: 'Roma',
    skins: ['ImperioRomano', 'ImperioBizantino'],
    color: 'border-red-500/40 bg-red-500/8 hover:bg-red-500/15',
    accent: 'text-red-400',
    gradient: 'from-red-500/20 via-rose-800/10 to-surface-2',
  },
  {
    id: 'cyber',
    label: 'Cyber',
    skins: ['ImperioJaponés'],
    color: 'border-purple-500/40 bg-purple-500/8 hover:bg-purple-500/15',
    accent: 'text-purple-400',
    gradient: 'from-purple-500/20 via-violet-700/10 to-surface-2',
  },
] as const;

export function AvatarStudio() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  return (
    <EnDesarrollo>
      <div className="relative overflow-hidden rounded-2xl border border-border-default bg-surface-2/60 backdrop-blur-sm">
        <div className="absolute inset-0 bg-linear-to-br from-brand-green/[0.03] to-transparent pointer-events-none" />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-brand-green/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-green" />
            </div>
            <div>
              <h3 className="font-display text-lg text-text-primary tracking-tight">
                Avatar Studio
              </h3>
              <p className="text-xs text-text-muted font-ui-label">Forja tu identidad visual</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <div
                aria-hidden="true"
                className={cn(
                  'absolute -inset-3 rounded-full opacity-20 blur-2xl transition-all duration-700',
                  selectedEra
                    ? SKIN_ERAS.find((e) => e.id === selectedEra)?.gradient
                    : 'bg-brand-green/10',
                )}
              />
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                <div
                  className="absolute inset-0 rounded-full border border-border-subtle animate-rotate-ccw opacity-30"
                  style={{ borderStyle: 'dashed' }}
                />
                <div className="absolute inset-2 rounded-full border border-border-default opacity-20" />
                <div
                  className={cn(
                    'size-full rounded-full overflow-hidden border-2 transition-colors duration-500',
                    selectedEra
                      ? SKIN_ERAS.find((e) => e.id === selectedEra)?.color.split(' ')[0]
                      : 'border-border-default',
                  )}
                >
                  <div className="size-full bg-surface-3 flex items-center justify-center">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="size-full object-cover"
                      />
                    ) : (
                      <Camera className="w-10 h-10 text-text-muted-alt" />
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-surface-3 border-2 border-surface-0 flex items-center justify-center hover:bg-surface-4 transition-colors cursor-pointer shadow-lg"
                  aria-label="Subir imagen de avatar"
                >
                  <Upload className="w-4 h-4 text-brand-green" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Seleccionar imagen de avatar"
                />
              </div>
            </div>

            <div className="w-full space-y-3">
              <label className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label">
                Era del avatar
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {SKIN_ERAS.map((era) => (
                  <button
                    key={era.id}
                    type="button"
                    onClick={() => setSelectedEra(era.id)}
                    className={cn(
                      'relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer',
                      selectedEra === era.id
                        ? [era.color.split(' ')[0], era.color.split(' ')[1], 'shadow-lg'].join(' ')
                        : 'border-border-subtle bg-surface-3/50 hover:bg-surface-3 hover:border-border-default',
                    )}
                  >
                    <div
                      aria-hidden="true"
                      className={cn(
                        'w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold font-display uppercase',
                        selectedEra === era.id ? era.accent : 'text-text-muted',
                        selectedEra === era.id ? 'bg-white/5' : 'bg-surface-4',
                      )}
                    >
                      {era.label[0]}
                    </div>
                    <span
                      className={cn(
                        'text-xs font-medium transition-colors',
                        selectedEra === era.id ? 'text-text-primary' : 'text-text-secondary',
                      )}
                    >
                      {era.label}
                    </span>
                    {selectedEra === era.id && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_6px_rgba(61,214,140,0.6)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={cn(
                'relative w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer overflow-hidden',
                avatarPreview || selectedEra
                  ? 'bg-brand-green text-surface-0 hover:shadow-[0_0_24px_rgba(61,214,140,0.35)] hover:-translate-y-0.5'
                  : 'bg-surface-3 text-text-muted cursor-not-allowed',
              )}
              disabled={!avatarPreview && !selectedEra}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Generar Avatar
              </span>
              {(avatarPreview || selectedEra) && (
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-full hover:translate-x-full transition-transform duration-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </EnDesarrollo>
  );
}
