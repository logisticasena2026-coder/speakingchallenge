'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ExamenCard } from '@/components/estudiante/ExamenCard';
import { sileo } from 'sileo';
import { BookOpen, GraduationCap, ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { AgregarProfesorModal } from '@/components/estudiante/AgregarProfesorModal';
import { eliminarProfesor } from '@/actions/estudiante/eliminarProfesor';

interface Asignacion {
  id: string;
  examen_id: string;
  fecha_asignacion: Date;
  fecha_limite: Date | null;
  respondidas: number;
  completado: boolean;
  examen: {
    id: string;
    titulo: string;
    descripcion: string | null;
    createdAt: Date;
    profesor: { name: string };
    _count: { preguntas: number };
  };
}

interface Profesor {
  id: string;
  name: string;
  email: string;
  codigo_profesor: string | null;
  assignedAt: Date;
}

export default function ActividadesProfesor() {
  const router = useRouter();
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setCargando(true);
    try {
      const [examenesAsignados, profesoresData] = await Promise.all([
        import('@/actions/estudiante/examen/obtenerAsignados').then(m => m.obtenerExamenesAsignados()),
        import('@/actions/estudiante/obtenerProfesores').then(m => m.obtenerProfesores()),
      ]);
      setAsignaciones(examenesAsignados);
      setProfesores(profesoresData);
    } catch {
      sileo.error({ title: 'Error', description: 'No se pudieron cargar los datos' });
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleEliminarProfesor = async (id: string, name: string) => {
    if (!window.confirm(`¿Eliminar a ${name} de tu lista de profesores?`)) return;
    await sileo.promise(
      () => eliminarProfesor(id),
      {
        loading: { title: 'Eliminando...' },
        success: (res) => {
          setProfesores((prev) => prev.filter((p) => p.id !== id));
          fetchData();
          return { title: 'Profesor eliminado', description: res.message };
        },
        error: (err) => ({ title: 'Error', description: err instanceof Error ? err.message : 'Error' }),
      }
    );
  };

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-brand-green transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al dashboard
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-brand-amber/10">
            <GraduationCap className="w-6 h-6 text-brand-amber" />
          </div>
          <div>
            <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-text-primary">
              Actividades de Profesor
            </h1>
            <p className="text-text-secondary text-sm mt-0.5">
              Resuelve los exámenes que tus profesores han creado para ti
            </p>
          </div>
        </div>
      </div>

      {cargando ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface-2 border border-border-subtle rounded-xl p-6 min-h-[200px] animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {asignaciones.length > 0 ? (
            <div className="mb-10">
              <h2 className="font-display text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-amber" />
                Exámenes asignados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {asignaciones.map((a) => (
                  <ExamenCard key={a.id} asignacion={a} respondidas={a.respondidas} completado={a.completado} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-surface-2 border border-border-subtle rounded-xl mb-8">
              <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-muted text-lg mb-2">No tienes exámenes asignados</p>
              <p className="text-text-muted text-sm">Tus profesores asignarán exámenes que aparecerán aquí.</p>
            </div>
          )}

          <div>
            <h2 className="font-display text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-amber" />
              Mis profesores
            </h2>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-border-subtle text-text-muted hover:border-brand-green/40 hover:text-text-primary transition-all text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Agregar profesor
              </button>

              {profesores.map((p) => (
                <div key={p.id} className="flex items-center gap-3 bg-surface-2 border border-border-subtle rounded-lg px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-brand-amber/20 flex items-center justify-center text-brand-amber text-sm font-bold">
                    {p.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">{p.name}</p>
                    {p.codigo_profesor && (
                      <p className="text-text-muted text-[10px] font-mono">Código: {p.codigo_profesor}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleEliminarProfesor(p.id, p.name)}
                    className="ml-2 text-text-muted hover:text-red-400 transition-colors text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {profesores.length === 0 && (
              <p className="text-text-muted text-sm mt-2">
                No tienes profesores vinculados. Agrega uno usando el código que te proporcionaron.
              </p>
            )}
          </div>
        </>
      )}

      <AgregarProfesorModal open={modalOpen} onOpenChange={setModalOpen} onSuccess={fetchData} />
    </div>
  );
}
