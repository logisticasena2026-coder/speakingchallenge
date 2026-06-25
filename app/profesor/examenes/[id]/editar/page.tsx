import { notFound } from 'next/navigation';
import { obtenerExamen } from '@/actions/profesor/examen/obtener';
import { editarExamen } from '@/actions/profesor/examen/editar';
import { FormularioExamen } from '@/components/profesor/FormularioExamen';

export default async function ProfesorEditarExamen({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const examen = await obtenerExamen(id);

  if (!examen) notFound();

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Editar Examen
        </h1>
        <p className="text-text-secondary">Modifica los datos del examen</p>
      </div>
      <FormularioExamen
        onSubmitAction={editarExamen.bind(null, id)}
        modo="editar"
        defaultValues={{ titulo: examen.titulo, descripcion: examen.descripcion || '' }}
      />
    </div>
  );
}
