'use client';

export function Nivel() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none px-6 pb-4 hidden md:flex justify-between items-end">
      <div className="flex flex-col gap-1 opacity-55">
        <span className="font-ui text-[9px] font-bold tracking-[0.3em] uppercase text-brand-green">
          Era Antigua · Nivel 1
        </span>
        <div className="w-35 h-1.25 rounded bg-surface-4 overflow-hidden">
          <div className="h-full w-[75%] rounded bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)]"></div>
        </div>
      </div>
      <div className="text-right opacity-45">
        <span className="font-ui text-[9px] tracking-[0.3em] uppercase text-text-muted">
          Módulo: Pronunciación · Linking Sounds
        </span>
      </div>
    </div>
  );
}
