import { obtenerPorEstudiante } from '@/actions/profesor/resultados/obtenerPorEstudiante';
import { ResultadosEstudiante } from '@/components/profesor/ResultadosEstudiante';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await obtenerPorEstudiante(id);
  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <ResultadosEstudiante {...data} />
    </div>
  );
}
