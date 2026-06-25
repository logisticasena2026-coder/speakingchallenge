import { obtenerDashboardStats } from '@/actions/admin/obtenerDashboardStats';
import prisma from '@/lib/prisma';
import { Users, GraduationCap, BookOpen, Shield } from 'lucide-react';

export default async function AdminDashboard() {
  const stats = await obtenerDashboardStats();
  const ultimosUsuarios = await prisma.user.findMany({
    where: { rol: { in: ['ESTUDIANTE', 'PROFESOR'] } },
    select: { id: true, name: true, email: true, rol: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const cards = [
    { label: 'Estudiantes', value: stats.totalEstudiantes, icon: Users, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
    { label: 'Profesores', value: stats.totalProfesores, icon: GraduationCap, color: 'text-brand-amber', bg: 'bg-brand-amber/10' },
    { label: 'Frases generales', value: stats.totalFrases, icon: BookOpen, color: 'text-brand-green', bg: 'bg-brand-green/10' },
    { label: 'Frases de profesores', value: stats.totalFrasesProfesor, icon: Shield, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
  ];

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary mb-2">
          Panel de Administración
        </h1>
        <p className="text-text-secondary">Vista general del sistema</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => (
          <div key={card.label} className="bg-surface-2 border border-border-subtle rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
            <p className="font-display text-3xl font-bold text-text-primary">{card.value}</p>
            <p className="font-ui text-[10px] font-semibold uppercase tracking-wider text-text-muted mt-1">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-surface-2 border border-border-subtle rounded-xl p-6">
        <h2 className="font-display text-lg font-bold text-text-primary mb-4">Últimos registros</h2>
        {ultimosUsuarios.length === 0 ? (
          <p className="text-text-muted text-sm">No hay usuarios registrados</p>
        ) : (
          <div className="space-y-3">
            {ultimosUsuarios.map((u) => (
              <div key={u.id} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
                <div>
                  <p className="text-text-primary font-medium">{u.name}</p>
                  <p className="text-text-muted text-xs">{u.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${u.rol === 'PROFESOR' ? 'text-brand-amber' : 'text-brand-cyan'}`}>
                    {u.rol}
                  </span>
                  <span className="text-[10px] text-text-muted">{new Date(u.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
