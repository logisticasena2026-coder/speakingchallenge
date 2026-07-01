'use client';

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Prisma } from '@/generated/prisma/client';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  BarChart3,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

export function SidebarProfesor({
  user,
}: Readonly<{ user: Prisma.userGetPayload<object> }>) {
  const initials = user.name?.slice(0, 2).toUpperCase() || 'PR';

  return (
    <Sidebar className="border-r border-border-default bg-sidebar">
      <SidebarHeader className="pt-8 pb-6 px-6 border-b border-border-subtle">
        <div className="flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-full opacity-15 bg-linear-to-tr from-brand-amber to-brand-cyan blur-sm transition-opacity duration-500 group-hover:opacity-30"
            />
            <Avatar className="relative w-20 h-20 border-2 border-brand-amber/30">
              <AvatarImage
                alt={`${user.name} Avatar`}
                src={user.avatar || ''}
                className="rounded-full object-cover"
              />
              <AvatarFallback className="bg-surface-3 text-text-secondary">{initials}</AvatarFallback>
            </Avatar>
          </div>
          <p className="mt-4 text-h3-card text-text-primary tracking-tighter">{user.name}</p>
          <p className="font-ui-label text-[10px] text-brand-amber uppercase tracking-[0.08em]">
            Profesor
          </p>
          {user.codigo_profesor && (
            <p className="mt-1 font-mono text-[11px] text-text-muted tracking-wider">
              Código: <span className="text-brand-green font-bold">{user.codigo_profesor}</span>
            </p>
          )}
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
                <SidebarMenuButton asChild className="text-text-secondary hover:bg-surface-4 hover:text-brand-green">
                  <Link href="/profesor/dashboard">
                    <LayoutDashboard className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-ui-label text-sm">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-text-secondary hover:bg-surface-4 hover:text-brand-green">
                  <Link href="/profesor/estudiantes">
                    <Users className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-ui-label text-sm">Estudiantes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-text-secondary hover:bg-surface-4 hover:text-brand-green">
                  <Link href="/profesor/examenes">
                    <BookOpen className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-ui-label text-sm">Exámenes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-text-secondary hover:bg-surface-4 hover:text-brand-green">
                  <Link href="/profesor/grupos">
                    <GraduationCap className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-ui-label text-sm">Grupos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-text-secondary hover:bg-surface-4 hover:text-brand-green">
                  <Link href="/profesor/resultados">
                    <BarChart3 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-ui-label text-sm">Resultados</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-3 text-[10px] font-semibold text-text-muted uppercase tracking-[0.08em] mb-2">
            Sesión
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-text-secondary hover:bg-surface-4 hover:text-brand-green">
                  <Link href="/profesor/configuracion">
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
