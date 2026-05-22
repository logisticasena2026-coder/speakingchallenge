'use client';
import { cn } from '@/lib/utils';
import { useConfiguracionUsuario } from '@/store/useConfiguracionUsuario';

export function FontSizeSelector() {
  const fuente = useConfiguracionUsuario((state) => state.tamanoFuente)
    const setFuente = useConfiguracionUsuario((state) => state.setTamanoFuent);

  const sizes = [
    { value: 'sm', label: 'A', desc: 'Pequeño' },
    { value: 'md', label: 'A', desc: 'Mediano' },
    { value: 'lg', label: 'A', desc: 'Grande' },
    { value: 'xl', label: 'A', desc: 'Extra' },
  ];

  return (
    <span>
      <div className="flex gap-2.5">
        {sizes.map((size) => (
          <button
            key={size.value}
            type="button"
            onClick={() => setFuente(size.value)}
            className={cn(
              'flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all duration-200 cursor-pointer',
              fuente === size.value
                ? 'border-brand-green/40 bg-brand-green/8 shadow-[0_0_12px_rgba(61,214,140,0.12)]'
                : 'border-border-subtle bg-surface-3/50 hover:bg-surface-3 hover:border-border-default',
            )}
          >
            <span
              className={cn(
                'font-display leading-none transition-colors',
                fuente === size.value ? 'text-brand-green' : 'text-text-secondary',
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
      <div
        className={cn(
          'mt-4 p-4 rounded-xl border border-border-subtle bg-surface-2/30 text-center transition-all duration-300',
          fuente === 'sm' && 'text-sm',
          fuente === 'md' && 'text-base',
          fuente === 'lg' && 'text-lg',
          fuente === 'xl' && 'text-xl',
        )}
      >
        <p className="text-text-secondary leading-relaxed">
          The quick brown fox jumps over the lazy dog near the riverbank. A wizard&apos;s job is to
          vex chumps quickly in fog.
        </p>
        <p
          className={cn(
            'text-text-muted-alt mt-2 transition-all',
            fuente === 'sm' && 'text-xs',
            fuente === 'md' && 'text-sm',
            fuente === 'lg' && 'text-base',
            fuente === 'xl' && 'text-lg',
          )}
        >
          Vista previa — {sizes.find((s) => s.value === fuente)?.desc}
        </p>
      </div>
    </span>
  );
}
