import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DatosDelAutenticado } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function EstudianteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const propietario = await DatosDelAutenticado();
  if (propietario) {
    return (
      <div className="flex h-screen overflow-hidden">
        <SidebarProvider defaultOpen={true}>
          <AppSidebar user={propietario} />
          <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">{children}</main>
        </SidebarProvider>
      </div>
    );
  }

  redirect('/');
}
