export function EstadisticaEstudiantePractica({
  frase,
  TotalFrases,
}: Readonly<{
  frase: number;
  TotalFrases: number;
}>) {
  return (
    <div className="ani d1 mb-4 w-full max-w-250 mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
        <div className="flex items-center gap-2.5">
          <span className="font-ui text-[9px] font-bold tracking-[0.08em] uppercase px-2 py-0.75 rounded bg-[rgba(180,100,30,0.2)] text-[#d97706] border border-[rgba(217,119,6,0.3)]">
            Era Vikinga
          </span>
          <span className="font-ui text-ui-badge font-semibold tracking-[0.12em] uppercase text-text-muted">
            Speaking Challenge
          </span>
          <span className="font-ui text-ui-badge text-text-muted">
            · Frase {frase} de {TotalFrases}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="text-[13px]">❤️</span>
            <span className="text-[13px]">❤️</span>
            <span className="text-[13px]">❤️</span>
          </div>
          <div className="w-px h-3.5 bg-white/6"></div>
          <span className="font-ui text-[11px] font-semibold text-brand-green">+50 XP</span>
        </div>
      </div>
      <div className="h-1.25 rounded bg-surface-4 overflow-hidden">
        <div
          className="h-full rounded bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)]"
          style={{ width: `${(frase / TotalFrases) * 100}%`, transition: 'width 0.8s ease' }}
        ></div>
      </div>
    </div>
  );
}
