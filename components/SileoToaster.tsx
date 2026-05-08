'use client';

import { Toaster } from 'sileo';

export function SileoToaster() {
  const toasterOptions = {
    fill: '#07090f',
    borderColor: 'rgba(255, 255, 255, 0.10)',
    styles: {
      root: 'backdrop-blur-xl! bg-surface-2/90! border border-border-default! rounded-xl! shadow-2xl!',
      title: 'text-text-primary! font-sans! font-medium!',
      description: 'text-text-secondary!',
      badge: 'bg-brand-green/20! text-brand-green! border border-brand-green/30! rounded-md! font-sans! text-xs! uppercase! tracking-wide!',
      button: 'bg-white/10! text-text-primary! border border-white/10! rounded-lg! font-sans! hover:bg-white/20! hover:border-white/20! transition-all!',
      close: 'text-text-muted! hover:text-text-primary! transition-colors!',
    },
  };

  return <Toaster position="top-center" options={toasterOptions} />;
}
