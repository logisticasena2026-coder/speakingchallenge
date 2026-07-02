import { requiereRol } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Users, BookOpen, Activity, GraduationCap } from 'lucide-react';
import { BotonCopiarInvitacion } from '@/components/profesor/BotonCopiarInvitacion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function ProfesorDashboard() {
  const profesor = await requiereRol('PROFESOR');

  const estudiantesIds = await prisma.estudianteProfesor.findMany({
    where: { profesor_id: profesor.id },
    select: { estudiante_id: true },
  });
  const ids = estudiantesIds.map((r) => r.estudiante_id);

  const [totalEstudiantes, totalExamenes, totalGrupos] = await Promise.all([
    prisma.user.count({ where: { id: { in: ids }, rol: 'ESTUDIANTE' } }),
    prisma.examen.count({ where: { profesor_id: profesor.id } }),
    prisma.grupo.count({ where: { profesor_id: profesor.id } }),
  ]);

  const estudiantesRecientes = await prisma.user.findMany({
    where: { id: { in: ids }, rol: 'ESTUDIANTE' },
    select: { id: true, name: true, email: true, avatar: true, ultima_sesion: true, nivel: true },
    orderBy: { ultima_sesion: 'desc' },
    take: 5,
  });

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Panel del Profesor
        </h1>
        <p className="text-text-secondary">Bienvenido, {profesor.name}</p>
        {profesor.codigo_profesor && (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="inline-block px-3 py-1 rounded-lg bg-brand-green/10 border border-brand-green/20 text-sm text-brand-green font-mono">
              Tu código: <strong>{profesor.codigo_profesor}</strong>
            </span>
            <BotonCopiarInvitacion codigo={profesor.codigo_profesor} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-brand-cyan/10">
              <Users className="w-5 h-5 text-brand-cyan" />
            </div>
            <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted">Estudiantes</span>
          </div>
          <p className="font-display text-3xl font-bold text-text-primary">{totalEstudiantes}</p>
        </div>

        <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-brand-green/10">
              <BookOpen className="w-5 h-5 text-brand-green" />
            </div>
            <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted">Exámenes</span>
          </div>
          <p className="font-display text-3xl font-bold text-text-primary">{totalExamenes}</p>
        </div>

        <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-brand-purple/10">
              <GraduationCap className="w-5 h-5 text-brand-purple" />
            </div>
            <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-text-muted">Grupos</span>
          </div>
          <p className="font-display text-3xl font-bold text-text-primary">{totalGrupos}</p>
        </div>
      </div>

      <div className="bg-surface-2 border border-border-subtle rounded-xl p-6">
        <h2 className="font-display text-lg font-bold text-text-primary mb-4">Estudiantes recientes</h2>
        {estudiantesRecientes.length === 0 ? (
          <p className="text-text-muted text-sm">No tienes estudiantes asignados todavía. Comparte tu código para que se vinculen.</p>
        ) : (
          <div className="space-y-3">
            {estudiantesRecientes.map((e) => (
              <div key={e.id} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9 border border-border-subtle shrink-0">
                    <AvatarImage src={e.avatar || ''} alt={e.name} className="object-cover" />
                    <AvatarFallback className="text-xs font-bold bg-surface-3 text-text-secondary">{e.name[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-text-primary font-medium">{e.name}</p>
                    <p className="text-text-muted text-xs">{e.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-brand-green capitalize">{e.nivel.toLowerCase().replace(/_/g, ' ')}</span>
                  {e.ultima_sesion && (
                    <p className="text-[10px] text-text-muted">{new Date(e.ultima_sesion).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
