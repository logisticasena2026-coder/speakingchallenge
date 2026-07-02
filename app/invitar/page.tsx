import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { requiereIngreso } from '@/lib/auth';
import { agregarProfesor } from '@/actions/estudiante/agregarProfesor';
import { ArrowLeft, CheckCircle2, XCircle, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Unirse a profesor - speakingchallenge',
  robots: { index: false, follow: false },
};

export default async function InvitarPage({
  searchParams,
}: {
  searchParams: Promise<{ codigo?: string }>;
}) {
  const { codigo } = await searchParams;

  if (!codigo) {
    return <ResultadoInvitacion tipo="error" titulo="Enlace inválido" mensaje="No se proporcionó un código de invitación. Revisa el enlace e inténtalo de nuevo." />;
  }

  const rol = await requiereIngreso();

  if (!rol) {
    redirect(`/auth/iniciar_sesion?redirect=${encodeURIComponent(`/invitar?codigo=${codigo}`)}`);
  }

  if (rol !== 'ESTUDIANTE') {
    return (
      <ResultadoInvitacion
        tipo="error"
        titulo="Cuenta no válida"
        mensaje="Debes iniciar sesión con una cuenta de estudiante para aceptar esta invitación."
      />
    );
  }

  const result = await agregarProfesor(codigo);

  if (!result.ok) {
    if (result.message === 'Ya estás vinculado a este profesor') {
      return (
        <ResultadoInvitacion
          tipo="info"
          titulo="Ya estás vinculado"
          mensaje={result.message}
          accionHref="/dashboard/actividades-profesor"
          accionLabel="Ir a mis profesores"
        />
      );
    }
    return (
      <ResultadoInvitacion
        tipo="error"
        titulo="No se pudo vincular"
        mensaje={result.message}
        accionHref="/dashboard/actividades-profesor"
        accionLabel="Intentar manualmente"
      />
    );
  }

  return (
      <ResultadoInvitacion
        tipo="exito"
        titulo="¡Vinculado con éxito!"
        mensaje={`Te has vinculado con ${result.profesor!.name}. Ahora podrá asignarte exámenes y seguir tu progreso.`}
      />
  );
}

function ResultadoInvitacion({
  tipo,
  titulo,
  mensaje,
  accionHref,
  accionLabel,
}: {
  tipo: 'exito' | 'error' | 'info';
  titulo: string;
  mensaje: string;
  accionHref?: string;
  accionLabel?: string;
}) {
  const iconos = {
    exito: { icono: CheckCircle2, color: 'text-brand-green', barra: 'via-brand-green' },
    error: { icono: XCircle, color: 'text-red-400', barra: 'via-red-400' },
    info: { icono: CheckCircle2, color: 'text-brand-amber', barra: 'via-brand-amber' },
  };

  const { icono: Icono, color, barra } = iconos[tipo];

  return (
    <main
      id="main-content"
      className="relative z-10 grow flex items-center justify-center px-container-px-mobile md:px-container-px-desktop py-24"
    >
      <div className="w-full max-w-md relative group">
        <div className="absolute -inset-0.5 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />
        <div className="relative bg-surface-1/40 backdrop-blur-2xl border border-white/5 p-padding-card-sm md:p-padding-card-lg rounded-xl shadow-2xl overflow-hidden text-center">
          <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent ${barra} to-transparent`} />
          <Icono className={`w-16 h-16 ${color} mx-auto mb-4`} />
          <h1 className="font-display text-2xl font-bold text-text-primary mb-2">{titulo}</h1>
          <p className="text-text-secondary mb-6">{mensaje}</p>
          <div className="flex flex-col gap-3">
            {accionHref && accionLabel && (
              <Link
                href={accionHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-green text-surface-0 font-bold text-sm hover:bg-brand-green/90 transition-all"
              >
                <GraduationCap className="w-4 h-4" />
                {accionLabel}
              </Link>
            )}
            <Link
              href="/"
              className="text-sm text-text-muted hover:text-brand-green transition-colors inline-flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
