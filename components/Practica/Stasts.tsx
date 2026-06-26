import { Clock, Flame, Languages } from 'lucide-react';

interface Props {
  frases: number;
  dias_racha: number;
  tiempo_promedio: number;
}

export function Stasts({ frases, dias_racha, tiempo_promedio }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 ani delay-anim-1">
      <div className="flex items-center gap-4 p-3 sm:p-5 bg-white/3 border border-white/6 rounded-xl">
        <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-brand-cyan" />
        <div>
          <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-1">
            Tiempo
          </p>
          <p className="font-display text-xl font-bold text-text-primary">
            {tiempo_promedio.toFixed(1)} min
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 p-3 sm:p-5 bg-white/3 border border-white/6 rounded-xl">
        <Languages className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />
        <div>
          <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-1">
            Frases
          </p>
          <p className="font-display text-xl font-bold text-text-primary">{frases}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 p-3 sm:p-5 bg-white/3 border border-white/6 rounded-xl">
        <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-brand-amber" />
        <div>
          <p className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-1">
            Racha
          </p>
          <p className="font-display text-xl font-bold text-text-primary">{dias_racha} días</p>
        </div>
      </div>
    </div>
  );
}
