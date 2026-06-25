import { requiereRol } from '@/lib/auth';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarProfesor } from '@/components/profesor/SidebarProfesor';

export default async function ProfesorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const usuario = await requiereRol('PROFESOR');

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider defaultOpen={true}>
        <SidebarProfesor user={usuario} />
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
