import { redirect } from 'next/navigation';
import { obtenerUsuarios } from '@/actions/admin/obtenerUsuarios';
import { TablaUsuariosAdmin } from '@/components/admin/TablaUsuariosAdmin';

export default async function AdminEstudiantes({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string; buscar?: string }>;
}) {
  const params = await searchParams;
  const pagina = parseInt(params.pagina ?? '1', 10) || 1;
  const buscar = params.buscar ?? '';

  const { usuarios, total, totalPages, paginaActual } = await obtenerUsuarios('ESTUDIANTE', {
    pagina,
    buscar: buscar || undefined,
  });

  if (usuarios.length === 0 && pagina > 1) {
    const query = new URLSearchParams({ pagina: String(totalPages) });
    if (buscar) query.set('buscar', buscar);
    redirect(`/admin/estudiantes?${query.toString()}`);
  }

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Estudiantes
        </h1>
        <p className="text-text-secondary">{total} estudiante{total !== 1 ? 's' : ''} registrado{total !== 1 ? 's' : ''}</p>
      </div>
      <TablaUsuariosAdmin
        usuarios={usuarios}
        paginaActual={paginaActual}
        totalPages={totalPages}
        buscar={buscar}
        rol="ESTUDIANTE"
      />
    </div>
  );
}
