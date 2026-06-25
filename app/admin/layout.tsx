import { requiereRol } from '@/lib/auth';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarAdmin } from '@/components/admin/SidebarAdmin';

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requiereRol('ADMIN');

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider defaultOpen={true}>
        <SidebarAdmin />
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
