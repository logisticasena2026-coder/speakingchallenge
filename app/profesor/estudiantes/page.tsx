import { requiereRol } from '@/lib/auth';
import { obtenerEstudiantes } from '@/actions/profesor/obtenerEstudiantes';
import { TablaEstudiantes } from '@/components/profesor/TablaEstudiantes';

export default async function EstudiantesPage() {
  const profesor = await requiereRol('PROFESOR');
  const estudiantes = await obtenerEstudiantes();

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Mis Estudiantes
        </h1>
        <p className="text-text-secondary">
          {estudiantes.length} estudiante{estudiantes.length !== 1 ? 's' : ''} asignado{estudiantes.length !== 1 ? 's' : ''}
        </p>
      </div>

      {estudiantes.length === 0 ? (
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-12 text-center">
          <p className="text-text-muted text-lg mb-2">No tienes estudiantes asignados</p>
          <p className="text-text-muted text-sm">
            Comparte tu código <strong className="text-brand-green">{profesor.codigo_profesor}</strong> con tus estudiantes para que se vinculen.
          </p>
        </div>
      ) : (
        <TablaEstudiantes estudiantes={estudiantes} />
      )}
    </div>
  );
}
