'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';

import { cn } from '@/lib/utils';

import { Home, MessageCircle, Dumbbell, Trophy, BookOpen, Settings } from 'lucide-react';

import Link from 'next/link';
export function Enlaces() {
  const terminalItems = [
    { label: 'Home', href: '/dashboard', icon: Home },
    { label: 'Sophia Chat', href: '#', icon: MessageCircle },
    { label: 'Practice', href: '#', icon: Dumbbell },
    { label: 'Logros', href: '#', icon: Trophy },
    { label: 'Library', href: '#', icon: BookOpen },
  ];

  const systemItems = [{ label: 'Configuración', href: '#', icon: Settings }];
  const pathname = usePathname();

  return (
    <SidebarContent className="mt-6">
      <SidebarGroup>
        <SidebarGroupLabel className="px-3 text-[10px] font-semibold text-text-muted uppercase tracking-[0.08em] mb-2">
          Navegacion
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {terminalItems.map((item) => {
              const estaActivo = pathname === item.href;
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={estaActivo}
                    className={cn(
                      'flex items-center gap-4 py-3 px-3 rounded-lg transition-all duration-250',
                      estaActivo
                        ? 'text-brand-green bg-brand-green/8'
                        : 'text-text-secondary hover:bg-surface-4 hover:text-brand-green',
                    )}
                  >
                    <Link href={item.href}>
                      <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span className="font-ui-label text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className="mt-8">
        <SidebarGroupLabel className="px-3 text-[10px] font-semibold text-text-muted uppercase tracking-[0.08em] mb-2">
          Personalizacion
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {systemItems.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className="flex items-center gap-4 py-3 px-3 rounded-lg text-text-secondary hover:bg-surface-4 hover:text-brand-green transition-all duration-250"
                  >
                    <Link href={item.href}>
                      <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span className="font-ui-label text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
