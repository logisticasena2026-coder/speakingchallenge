import { DatosDelAutenticado } from '@/lib/auth';
import { ConfiguracionUsuarioClient } from './ConfiguracionUsuarioClient';

export default async function ConfiguracionPage() {
  const user = await DatosDelAutenticado();

  if (!user) return null;

  return (
    <ConfiguracionUsuarioClient
      currentAvatar={user.avatar}
      userName={user.name}
      userEmail={user.email}
      userFechaNacimiento={user.fecha_nacimiento?.toISOString().split('T')[0] ?? ''}
      userSexo={user.sexo ?? ''}
    />
  );
}
