import { obtenerResumenGlobal } from '@/actions/profesor/resultados/obtenerResumenGlobal';
import { ResumenGlobal } from '@/components/profesor/ResumenGlobal';

export default async function ProfesorResultados() {
  const data = await obtenerResumenGlobal();

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">Resultados</h1>
        <p className="text-text-secondary">Estadísticas globales de exámenes, estudiantes y grupos</p>
      </div>
      <ResumenGlobal {...data} />
    </div>
  );
}
