import { redirect } from 'next/navigation';
import { obtenerTodosExamenes } from '@/actions/profesor/examen/obtenerTodos';
import { TablaExamenes } from '@/components/profesor/TablaExamenes';

export default async function ProfesorExamenes({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string; buscar?: string }>;
}) {
  const params = await searchParams;
  const pagina = parseInt(params.pagina ?? '1', 10) || 1;
  const buscar = params.buscar ?? '';

  const { examenes, total, totalPages, paginaActual } = await obtenerTodosExamenes({
    pagina,
    buscar: buscar || undefined,
  });

  if (examenes.length === 0 && pagina > 1) {
    const query = new URLSearchParams({ pagina: String(totalPages) });
    if (buscar) query.set('buscar', buscar);
    redirect(`/profesor/examenes?${query.toString()}`);
  }

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Exámenes
        </h1>
        <p className="text-text-secondary">{total} examen{total !== 1 ? 'es' : ''} creado{total !== 1 ? 's' : ''}</p>
      </div>
      <TablaExamenes examenes={examenes} paginaActual={paginaActual} totalPages={totalPages} buscar={buscar} />
    </div>
  );
}
