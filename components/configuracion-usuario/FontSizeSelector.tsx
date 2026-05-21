'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function FontSizeSelector() {
  const sizes = [
    { value: 'sm', label: 'A', desc: 'Pequeño' },
    { value: 'md', label: 'A', desc: 'Mediano' },
    { value: 'lg', label: 'A', desc: 'Grande' },
    { value: 'xl', label: 'A', desc: 'Extra' },
  ];
  const [selected, setSelected] = useState('sm');

  return (
    <span>
      <div className="flex gap-2.5">
        {sizes.map((size) => (
          <button
            key={size.value}
            type="button"
            onClick={() => setSelected(size.value)}
            className={cn(
              'flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all duration-200 cursor-pointer',
              selected === size.value
                ? 'border-brand-green/40 bg-brand-green/8 shadow-[0_0_12px_rgba(61,214,140,0.12)]'
                : 'border-border-subtle bg-surface-3/50 hover:bg-surface-3 hover:border-border-default',
            )}
          >
            <span
              className={cn(
                'font-display leading-none transition-colors',
                selected === size.value ? 'text-brand-green' : 'text-text-secondary',
                size.value === 'sm' && 'text-sm',
                size.value === 'md' && 'text-base',
                size.value === 'lg' && 'text-xl',
                size.value === 'xl' && 'text-2xl',
              )}
            >
              {size.label}
            </span>
            <span className="text-ui-badge text-text-muted-alt font-ui-label">{size.desc}</span>
          </button>
        ))}
      </div>
      <p className={`text-center text-${selected}`}>Tamaño de muestra</p>
    </span>
  );
}
