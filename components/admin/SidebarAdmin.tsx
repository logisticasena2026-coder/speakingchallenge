import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Globe,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

export function SidebarAdmin() {
  return (
    <Sidebar className="border-r border-border-default bg-sidebar">
      <SidebarHeader className="pt-8 pb-6 px-6 border-b border-border-subtle">
        <div className="flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-full opacity-15 bg-linear-to-tr from-brand-purple to-brand-cyan blur-sm transition-opacity duration-500 group-hover:opacity-30"
            />
            <Avatar className="relative w-20 h-20 border-2 border-brand-purple/30">
              <AvatarFallback className="bg-surface-3 text-brand-purple text-lg font-bold">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
          <p className="mt-4 text-h3-card text-text-primary tracking-tighter">Admin</p>
          <p className="font-ui-label text-[10px] text-brand-purple uppercase tracking-[0.08em]">
            Maestro
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-6">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] font-semibold text-text-muted uppercase tracking-[0.08em] mb-2">
            Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/dashboard" className="flex items-center gap-4 py-3 px-3 rounded-lg text-text-secondary hover:bg-surface-4 hover:text-brand-purple transition-all duration-250">
                    <LayoutDashboard className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-ui-label text-sm">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/estudiantes" className="flex items-center gap-4 py-3 px-3 rounded-lg text-text-secondary hover:bg-surface-4 hover:text-brand-purple transition-all duration-250">
                    <Users className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-ui-label text-sm">Estudiantes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/profesores" className="flex items-center gap-4 py-3 px-3 rounded-lg text-text-secondary hover:bg-surface-4 hover:text-brand-purple transition-all duration-250">
                    <GraduationCap className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-ui-label text-sm">Profesores</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/frases" className="flex items-center gap-4 py-3 px-3 rounded-lg text-text-secondary hover:bg-surface-4 hover:text-brand-purple transition-all duration-250">
                    <BookOpen className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-ui-label text-sm">Frases</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/eras" className="flex items-center gap-4 py-3 px-3 rounded-lg text-text-secondary hover:bg-surface-4 hover:text-brand-purple transition-all duration-250">
                    <Globe className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-ui-label text-sm">Eras</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-3 text-[10px] font-semibold text-text-muted uppercase tracking-[0.08em] mb-2">
            Sistema
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/configuracion" className="flex items-center gap-4 py-3 px-3 rounded-lg text-text-secondary hover:bg-surface-4 hover:text-brand-purple transition-all duration-250">
                    <Settings className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-ui-label text-sm">Configuración</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
