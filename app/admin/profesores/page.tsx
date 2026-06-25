import { redirect } from 'next/navigation';
import { obtenerUsuarios } from '@/actions/admin/obtenerUsuarios';
import { TablaUsuariosAdmin } from '@/components/admin/TablaUsuariosAdmin';

export default async function AdminProfesores({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string; buscar?: string }>;
}) {
  const params = await searchParams;
  const pagina = parseInt(params.pagina ?? '1', 10) || 1;
  const buscar = params.buscar ?? '';

  const { usuarios, total, totalPages, paginaActual } = await obtenerUsuarios('PROFESOR', {
    pagina,
    buscar: buscar || undefined,
  });

  if (usuarios.length === 0 && pagina > 1) {
    const query = new URLSearchParams({ pagina: String(totalPages) });
    if (buscar) query.set('buscar', buscar);
    redirect(`/admin/profesores?${query.toString()}`);
  }

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
            Profesores
          </h1>
          <p className="text-text-secondary">{total} profesor{total !== 1 ? 'es' : ''} registrado{total !== 1 ? 's' : ''}</p>
        </div>
        <a
          href="/admin/profesores/crear"
          className="px-4 py-2.5 rounded-lg bg-brand-amber text-surface-0 font-bold text-sm hover:bg-brand-amber/90 transition-all"
        >
          + Crear profesor
        </a>
      </div>
      <TablaUsuariosAdmin
        usuarios={usuarios}
        paginaActual={paginaActual}
        totalPages={totalPages}
        buscar={buscar}
        rol="PROFESOR"
      />
    </div>
  );
}
