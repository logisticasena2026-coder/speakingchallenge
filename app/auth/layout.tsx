import { requiereIngreso } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const hasActiveSession = await requiereIngreso();

  if (hasActiveSession) {
    redirect('/dashboard');
  }

  return children;
}
