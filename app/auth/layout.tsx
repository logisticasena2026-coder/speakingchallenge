import { requiereIngreso } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const rol = await requiereIngreso();
  if (rol) {
    if (rol === 'ADMIN') redirect('/admin/dashboard');
    if (rol === 'PROFESOR') redirect('/profesor/dashboard');
    redirect('/dashboard');
  }

  return children;
}
