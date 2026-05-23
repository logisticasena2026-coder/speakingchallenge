'use client';
import { cn } from '@/lib/utils';
import { useConfiguracionUsuario } from '@/store/useConfiguracionUsuario';

export function FontSizeSelector() {
  const fuente = useConfiguracionUsuario((state) => state.tamanoFuente)
    const setFuente = useConfiguracionUsuario((state) => state.setTamanoFuente);

  const sizes = [
    { value: 'text-[12px]', label: 'A', desc: 'Pequeño' },
    { value: 'text-[14px]', label: 'A', desc: 'Mediano' },
    { value: 'text-[16px]', label: 'A', desc: 'Grande' },
    { value: 'text-[18px]', label: 'A', desc: 'Extra' },
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
            <span className={`font-display leading-none transition-colors ${fuente}`}>{size.label}</span>
            <span className="text-ui-badge text-text-muted-alt font-ui-label">{size.desc}</span>
          </button>
        ))}
      </div>
      <div
        className={`mt-4 p-4 rounded-xl border border-border-subtle bg-surface-2/30 text-center transition-all duration-300 ${fuente}`}
      >
        <p className="text-text-secondary leading-relaxed">
          The quick brown fox jumps over the lazy dog near the riverbank. A wizard&apos;s job is to
          vex chumps quickly in fog.
        </p>
        <p className={`text-text-muted-alt mt-2 transition-all ${fuente}`}>
          Vista previa: {sizes.find((s) => s.value === fuente)?.desc}
        </p>
      </div>
    </span>
  );
}
