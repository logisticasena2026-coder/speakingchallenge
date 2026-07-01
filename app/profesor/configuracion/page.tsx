import { DatosDelAutenticado } from '@/lib/auth';
import { ConfiguracionAdminProfesorClient } from '@/components/configuracion-usuario/ConfiguracionAdminProfesorClient';

export default async function ProfesorConfiguracionPage() {
  const user = await DatosDelAutenticado();

  if (!user) return null;

  return (
    <ConfiguracionAdminProfesorClient
      currentAvatar={user.avatar}
    />
  );
}
