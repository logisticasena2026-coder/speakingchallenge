import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { editarFraseAdmin } from '@/actions/admin/editarFraseAdmin';
import { FormularioFraseAdmin } from '@/components/admin/FormularioFraseAdmin';

export default async function AdminEditarFrase({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fraseId = parseInt(id, 10);
  if (isNaN(fraseId)) notFound();

  const frase = await prisma.frasesDePractica.findUnique({
    where: { id: fraseId },
  });
  if (!frase) notFound();

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Editar Frase #{frase.id}
        </h1>
      </div>
      <FormularioFraseAdmin
        onSubmitAction={editarFraseAdmin.bind(null, fraseId)}
        modo="editar"
        defaultValues={{
          fraseIngles: frase.fraseIngles,
          fraseEspanol: frase.fraseEspanol,
          dificultad: frase.dificultad,
          tematica: frase.tematica,
          edad: frase.edad ?? undefined,
        }}
      />
    </div>
  );
}
