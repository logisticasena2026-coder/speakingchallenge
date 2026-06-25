import { crearFrase } from '@/actions/admin/crearFrase';
import { FormularioFraseAdmin } from '@/components/admin/FormularioFraseAdmin';

export default async function AdminNuevaFrase() {
  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Nueva Frase
        </h1>
        <p className="text-text-secondary">Crea una frase de práctica general</p>
      </div>
      <FormularioFraseAdmin
        onSubmitAction={crearFrase}
        modo="crear"
      />
    </div>
  );
}
