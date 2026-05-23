export function EstadisticaEstudiantePractica({
  frase,
  TotalFrases,
  fuente
}: Readonly<{
  frase: number;
  TotalFrases: number;
  fuente: string;
}>) {
  return (
    <div className="ani d1 mb-4 w-full max-w-250 mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
        <div className="flex items-center gap-2.5">
          <span className={`font-ui ${fuente} text-text-muted`}>
            Frase {frase + 1} de {TotalFrases}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="text-[13px]">❤️</span>
            <span className="text-[13px]">❤️</span>
            <span className="text-[13px]">❤️</span>
          </div>
          <div className="w-px h-3.5 bg-white/6"></div>
          <span className={`font-ui font-semibold text-brand-green ${fuente}`}>+50 XP</span>
        </div>
      </div>
      <div className="h-1.25 rounded bg-surface-4 overflow-hidden">
        <div
          className="h-full rounded bg-brand-green shadow-[0_0_8px_rgba(61,214,140,0.5)]"
          style={{ transform: `scaleX(${(frase + 1) / TotalFrases})`, transition: 'transform 0.8s ease', transformOrigin: 'left' }}
        ></div>
      </div>
    </div>
  );
}
