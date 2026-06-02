'use client';

import { useState, useReducer, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Camera, Sparkles, Upload } from 'lucide-react';
import { sileo } from 'sileo';
import { actualizarAvatar } from '@/actions/configuracion/actualizarAvatar';
import { AvatarCropDialog } from './AvatarCropDialog';
const SKIN_ERAS = [
  {
    id: 'antigua',
    label: 'Antigua',
    skins: ['ImperioCivilización', 'ImperioAcadio', 'ImperioAntiguoDeEgipto', 'ImperioBabilónico', 'ImperioHitita', 'ImperioAsirio', 'ImperioNeobabilónico', 'ImperioAqueménidaPersa', 'ImperioMacedonio', 'ImperioMaurya', 'ImperioCartaginés'],
    color: 'border-amber-500/40 bg-amber-500/8 hover:bg-amber-500/15',
    accent: 'text-amber-400',
    gradient: 'from-amber-500/20 via-yellow-700/10 to-surface-2',
  },
  {
    id: 'medieval',
    label: 'Medieval',
    skins: ['ImperioRomano', 'ImperioBizantino', 'CalifatoOmeya', 'ImperioMongol', 'ImperioOtomano'],
    color: 'border-red-500/40 bg-red-500/8 hover:bg-red-500/15',
    accent: 'text-red-400',
    gradient: 'from-red-500/20 via-rose-800/10 to-surface-2',
  },
  {
    id: 'moderna',
    label: 'Moderna',
    skins: ['ImperioAzteca', 'ImperioInca', 'ImperioRuso', 'ImperioBritánico', 'ImperioJaponés'],
    color: 'border-green-500/40 bg-green-500/8 hover:bg-green-500/15',
    accent: 'text-green-400',
    gradient: 'from-green-500/20 via-emerald-700/10 to-surface-2',
  },
  {
    id: 'crypto',
    label: 'Crypto',
    skins: ['ImperioSatoshi', 'ImperioEthereum', 'ImperioSolariaChain', 'ImperioQuantumLedger', 'ImperioNexusAI'],
    color: 'border-cyan-500/40 bg-cyan-500/8 hover:bg-cyan-500/15',
    accent: 'text-cyan-400',
    gradient: 'from-cyan-500/20 via-blue-600/10 to-surface-2',
  },
  {
    id: 'posthumana',
    label: 'Post-Humana',
    skins: ['ImperioTitanVanguard', 'ImperioCyberAnunnaki', 'ImperioAtlantechPrime', 'ImperioOmegaCyborg', 'GuardianesDelPacífico'],
    color: 'border-purple-500/40 bg-purple-500/8 hover:bg-purple-500/15',
    accent: 'text-purple-400',
    gradient: 'from-purple-500/20 via-violet-700/10 to-surface-2',
  },
] as const;

interface AvatarStudioState {
  selectedEra: string | null;
  avatarPreview: string | null;
  selectedFile: File | null;
  cropSrc: string | null;
}

type AvatarStudioAction =
  | { type: 'SELECT_ERA'; era: string | null }
  | { type: 'FILE_SELECTED'; cropSrc: string }
  | { type: 'CROP_CONFIRMED'; file: File; preview: string }
  | { type: 'CROP_CANCELLED' }
  | { type: 'AVATAR_SAVED' };

function avatarStudioReducer(state: AvatarStudioState, action: AvatarStudioAction): AvatarStudioState {
  switch (action.type) {
    case 'SELECT_ERA':
      return { ...state, selectedEra: action.era };
    case 'FILE_SELECTED':
      return { ...state, cropSrc: action.cropSrc };
    case 'CROP_CONFIRMED':
      return { ...state, cropSrc: null, selectedFile: action.file, avatarPreview: action.preview };
    case 'CROP_CANCELLED':
      return { ...state, cropSrc: null };
    case 'AVATAR_SAVED':
      return { ...state, selectedFile: null };
    default:
      return state;
  }
}

export function AvatarStudio({ currentAvatar }: Readonly<{ currentAvatar?: string | null }>) {
  const [state, dispatch] = useReducer(avatarStudioReducer, {
    selectedEra: null,
    avatarPreview: currentAvatar ?? null,
    selectedFile: null,
    cropSrc: null,
  });
  const [isPending, setIsPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      sileo.error({ title: 'Imagen muy grande', description: 'La imagen no puede superar 5MB' });
      e.target.value = '';
      return;
    }

    URL.revokeObjectURL(state.cropSrc ?? '');
    dispatch({ type: 'FILE_SELECTED', cropSrc: URL.createObjectURL(file) });
    e.target.value = '';
  };

  const handleCropConfirm = (croppedFile: File) => {
    URL.revokeObjectURL(state.cropSrc ?? '');
    if (state.avatarPreview?.startsWith('blob:')) URL.revokeObjectURL(state.avatarPreview);
    dispatch({ type: 'CROP_CONFIRMED', file: croppedFile, preview: URL.createObjectURL(croppedFile) });
  };

  const handleCropCancel = () => {
    URL.revokeObjectURL(state.cropSrc ?? '');
    dispatch({ type: 'CROP_CANCELLED' });
  };

  const handleGuardar = async () => {
    if (!state.selectedFile) return;

    const formData = new FormData();
    formData.append('avatar', state.selectedFile);
    setIsPending(true);

    try {
      const res = await actualizarAvatar(formData);
      if (!res.ok) throw new Error(res.message);
      if (state.avatarPreview?.startsWith('blob:')) URL.revokeObjectURL(state.avatarPreview);
      dispatch({ type: 'AVATAR_SAVED' });
      sileo.success({ title: 'Avatar guardado' });
    } catch (err: unknown) {
      sileo.error({
        title: 'Error al guardar el avatar',
        description: err instanceof Error ? err.message : 'Intenta de nuevo',
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
    <div className="relative overflow-hidden rounded-2xl border border-border-default bg-surface-2/60 backdrop-blur-sm">
      <div className="absolute inset-0 bg-linear-to-br from-brand-green/[0.03] to-transparent pointer-events-none" />

      <div className="relative p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-brand-green/15 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-brand-green" />
          </div>
          <div>
            <h3 className="font-display text-lg text-text-primary tracking-tight">Avatar Studio</h3>
            <p className="text-xs text-text-muted font-ui-label">
              Forja tu identidad visual
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="relative group">
            <div
              aria-hidden="true"
              className={cn(
                'absolute -inset-3 rounded-full opacity-20 blur-2xl transition-all duration-700',
                state.selectedEra
                  ? SKIN_ERAS.find((e) => e.id === state.selectedEra)?.gradient
                  : 'bg-brand-green/10',
              )}
            />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <div className="absolute inset-0 rounded-full border border-border-subtle animate-rotate-ccw opacity-30" style={{ borderStyle: 'dashed' }} />
              <div className="absolute inset-2 rounded-full border border-border-default opacity-20" />
              <div
                className={cn(
                  'size-full rounded-full overflow-hidden border-2 transition-colors duration-500',
                  state.selectedEra
                    ? SKIN_ERAS.find((e) => e.id === state.selectedEra)?.color.split(' ')[0]
                    : 'border-border-default',
                )}
              >
                <div className="size-full bg-surface-3 flex items-center justify-center">
                  {state.avatarPreview ? (
                    <img
                      src={state.avatarPreview}
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

          <fieldset className="w-full space-y-3">
            <legend className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.12em] font-ui-label">
              Era del avatar
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {SKIN_ERAS.map((era) => (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => dispatch({ type: 'SELECT_ERA', era: era.id })}
                  className={cn(
                    'relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer',
                    state.selectedEra === era.id
                      ? [era.color.split(' ')[0], era.color.split(' ')[1], 'shadow-lg'].join(' ')
                      : 'border-border-subtle bg-surface-3/50 hover:bg-surface-3 hover:border-border-default',
                  )}
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      'w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold font-display uppercase',
                      state.selectedEra === era.id ? era.accent : 'text-text-muted',
                      state.selectedEra === era.id ? 'bg-white/5' : 'bg-surface-4',
                    )}
                  >
                    {era.label[0]}
                  </div>
                  <span
                    className={cn(
                      'text-xs font-medium transition-colors whitespace-nowrap',
                      state.selectedEra === era.id ? 'text-text-primary' : 'text-text-secondary',
                    )}
                  >
                    {era.label}
                  </span>
                  {state.selectedEra === era.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_6px_rgba(61,214,140,0.6)]" />
                  )}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={handleGuardar}
            disabled={!state.selectedFile || isPending}
            className={cn(
              'relative w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer overflow-hidden',
              state.selectedFile && !isPending
                ? 'bg-brand-green text-surface-0 hover:shadow-[0_0_24px_rgba(61,214,140,0.35)] hover:-translate-y-0.5'
                : 'bg-surface-3 text-text-muted cursor-not-allowed',
            )}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              {isPending ? 'Guardando...' : 'Guardar Avatar'}
            </span>
            {state.selectedFile && !isPending && (
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-full hover:translate-x-full transition-transform duration-700" />
            )}
          </button>
        </div>
      </div>
    </div>

    {state.cropSrc && (
      <AvatarCropDialog
        imageSrc={state.cropSrc}
        onConfirm={handleCropConfirm}
        onCancel={handleCropCancel}
      />
    )}
    </>
  );
}
