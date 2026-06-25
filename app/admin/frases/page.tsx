import { redirect } from 'next/navigation';
import { obtenerTodasFrases } from '@/actions/admin/obtenerTodasFrases';
import { TablaFrasesAdmin } from '@/components/admin/TablaFrasesAdmin';

export default async function AdminFrases({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string; buscar?: string; tematica?: string; dificultad?: string; edad?: string; creador?: string }>;
}) {
  const params = await searchParams;
  const pagina = parseInt(params.pagina ?? '1', 10) || 1;
  const buscar = params.buscar ?? '';
  const tematica = params.tematica ?? '';
  const dificultad = params.dificultad ? parseInt(params.dificultad, 10) : undefined;
  const edad = params.edad ? parseInt(params.edad, 10) : undefined;
  const creador = params.creador ?? '';

  const { frases, total, totalPages, paginaActual } = await obtenerTodasFrases({
    pagina,
    buscar: buscar || undefined,
    tematica: tematica || undefined,
    dificultad,
    edad,
    creador: creador || undefined,
  });

  if (frases.length === 0 && pagina > 1) {
    const query = new URLSearchParams({ pagina: String(totalPages) });
    if (buscar) query.set('buscar', buscar);
    if (tematica) query.set('tematica', tematica);
    if (dificultad) query.set('dificultad', String(dificultad));
    if (edad) query.set('edad', String(edad));
    if (creador) query.set('creador', creador);
    redirect(`/admin/frases?${query.toString()}`);
  }

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Frases
        </h1>
        <p className="text-text-secondary">{total} frase{total !== 1 ? 's' : ''} en total</p>
      </div>
      <TablaFrasesAdmin
        frases={frases}
        paginaActual={paginaActual}
        totalPages={totalPages}
        buscar={buscar}
        tematica={tematica}
        dificultad={dificultad ?? null}
        edad={edad ?? null}
        creador={creador}
      />
    </div>
  );
}
