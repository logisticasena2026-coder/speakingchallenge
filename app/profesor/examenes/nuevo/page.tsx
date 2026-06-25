import { crearExamen } from '@/actions/profesor/examen/crear';
import { FormularioExamen } from '@/components/profesor/FormularioExamen';

export default function ProfesorNuevoExamen() {
  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Nuevo Examen
        </h1>
        <p className="text-text-secondary">Crea un nuevo examen para tus estudiantes</p>
      </div>
      <FormularioExamen onSubmitAction={crearExamen} modo="crear" />
    </div>
  );
}
