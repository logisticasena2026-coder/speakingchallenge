import {
  Trophy,
  MapPin,
  Languages,
  Flame,
  Medal,
  Award,
  Globe,
  Crosshair,
  type LucideIcon,
  Lock,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Trophy,
  MapPin,
  Languages,
  Flame,
  Medal,
  Award,
  Globe,
  Crosshair,
};

interface LogroDef {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  tipo: string;
  valor: number;
}

interface LogroDesbloqueado {
  logro: LogroDef;
  desbloqueado_en: Date;
}

interface Props {
  desbloqueados: LogroDesbloqueado[];
  showAll?: boolean;
}

export function LogrosCard({ desbloqueados, showAll = false }: Props) {
  const logrosMostrados = showAll ? desbloqueados : desbloqueados.slice(0, 4);

  if (logrosMostrados.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Lock className="w-10 h-10 text-text-muted/30 mb-3" />
        <p className="text-sm text-text-muted">Aún no has desbloqueado logros</p>
        <p className="text-xs text-text-muted/60 mt-1">Completa niveles para comenzar</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {logrosMostrados.map((d) => {
        const Icon = iconMap[d.logro.icono] || Trophy;
        return (
          <div
            key={d.logro.id}
            className="group relative flex items-center gap-2 bg-brand-amber/8 border border-brand-amber/20 rounded-lg px-2.5 py-1.5 transition-all duration-200 hover:bg-brand-amber/12 hover:border-brand-amber/30"
            title={`${d.logro.nombre}: ${d.logro.descripcion}`}
          >
            <Icon className="w-3.5 h-3.5 text-brand-amber shrink-0" />
            <span className="font-ui text-[10px] font-semibold text-brand-amber whitespace-nowrap">
              {d.logro.nombre}
            </span>
            {!showAll && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-50">
                <div className="bg-surface-4 border border-white/10 rounded-lg px-3 py-2 shadow-xl min-w-40">
                  <p className="font-ui text-[10px] font-bold text-brand-amber">{d.logro.nombre}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{d.logro.descripcion}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {!showAll && desbloqueados.length > 4 && (
        <div className="flex items-center px-2.5 py-1.5 bg-surface-3 border border-white/6 rounded-lg">
          <span className="font-ui text-[10px] text-text-muted font-semibold">
            +{desbloqueados.length - 4}
          </span>
        </div>
      )}
    </div>
  );
}
