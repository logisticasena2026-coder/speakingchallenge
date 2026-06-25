import { crearGrupo } from '@/actions/profesor/grupo/crear';
import { FormularioGrupo } from '@/components/profesor/FormularioGrupo';

export default function ProfesorNuevoGrupo() {
  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Nuevo Grupo
        </h1>
        <p className="text-text-secondary">Crea un grupo para organizar a tus estudiantes</p>
      </div>
      <FormularioGrupo onSubmitAction={crearGrupo} modo="crear" />
    </div>
  );
}
