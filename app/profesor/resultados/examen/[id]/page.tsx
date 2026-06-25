import { notFound } from 'next/navigation';
import { obtenerPorExamen } from '@/actions/profesor/resultados/obtenerPorExamen';
import { DetalleResultadosExamen } from '@/components/profesor/DetalleResultadosExamen';

export default async function ProfesorResultadosExamen({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await obtenerPorExamen(id);
  if (!data) notFound();

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <DetalleResultadosExamen {...data} />
    </div>
  );
}
