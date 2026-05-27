'use client';

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import { Dialog } from 'radix-ui';
import { cn } from '@/lib/utils';
import { Check, X, ZoomIn, ZoomOut } from 'lucide-react';
import { sileo } from 'sileo';

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

async function getCroppedImg(imageSrc: string, pixelCrop: CroppedArea): Promise<File> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', () => reject(new Error('No se pudo cargar la imagen')));
    img.src = imageSrc;
  });

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) { reject(new Error('Canvas is empty')); return; }
      resolve(new File([blob], 'avatar.jpg', { type: 'image/jpeg' }));
    }, 'image/jpeg', 0.92);
  });
}

interface Props {
  imageSrc: string;
  onConfirm: (file: File) => void;
  onCancel: () => void;
}

export function AvatarCropDialog({ imageSrc, onConfirm, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
  const [confirming, setConfirming] = useState(false);

  const onCropComplete = useCallback((_: unknown, pixels: CroppedArea) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setConfirming(true);
    try {
      const file = await getCroppedImg(imageSrc, croppedAreaPixels);
      onConfirm(file);
    } catch {
      sileo.error({ title: 'Error al recortar', description: 'No se pudo procesar la imagen' });
    } finally {
      setConfirming(false);
    }
  };

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onCancel(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2',
            'rounded-2xl border border-border-default bg-surface-1 shadow-2xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
            'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          )}
          aria-describedby={undefined}
        >
          <Dialog.Title className="px-5 pt-5 text-sm font-semibold text-text-primary font-display tracking-tight">
            Ajustar imagen
          </Dialog.Title>

          {/* Crop area */}
          <div className="relative mx-5 mt-4 overflow-hidden rounded-xl bg-surface-3" style={{ height: 300 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: { borderRadius: '0.75rem' },
                mediaStyle: {},
                cropAreaStyle: { border: '2px solid rgba(61,214,140,0.8)', boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)' },
              }}
            />
          </div>

          {/* Zoom slider */}
          <div className="flex items-center gap-3 px-5 mt-4">
            <ZoomOut className="w-4 h-4 text-text-muted shrink-0" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-1 rounded-full accent-brand-green cursor-pointer bg-surface-4"
              aria-label="Zoom"
            />
            <ZoomIn className="w-4 h-4 text-text-muted shrink-0" />
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 px-5 py-5 mt-1">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-text-secondary bg-surface-3 hover:bg-surface-4 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={confirming}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-surface-0 bg-brand-green hover:shadow-[0_0_20px_rgba(61,214,140,0.35)] hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              <Check className="w-4 h-4" />
              {confirming ? 'Aplicando...' : 'Confirmar'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
