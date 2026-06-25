import { redirect } from 'next/navigation';
import { obtenerTodosGrupos } from '@/actions/profesor/grupo/obtenerTodos';
import { TablaGrupos } from '@/components/profesor/TablaGrupos';

export default async function ProfesorGrupos({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string; buscar?: string }>;
}) {
  const params = await searchParams;
  const pagina = parseInt(params.pagina ?? '1', 10) || 1;
  const buscar = params.buscar ?? '';

  const { grupos, total, totalPages, paginaActual } = await obtenerTodosGrupos({
    pagina,
    buscar: buscar || undefined,
  });

  if (grupos.length === 0 && pagina > 1) {
    const query = new URLSearchParams({ pagina: String(totalPages) });
    if (buscar) query.set('buscar', buscar);
    redirect(`/profesor/grupos?${query.toString()}`);
  }

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Grupos
        </h1>
        <p className="text-text-secondary">{total} grupo{total !== 1 ? 's' : ''} creado{total !== 1 ? 's' : ''}</p>
      </div>
      <TablaGrupos grupos={grupos} paginaActual={paginaActual} totalPages={totalPages} buscar={buscar} />
    </div>
  );
}
