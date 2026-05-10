import { Prisma } from '@/generated/prisma/client';
import { SidebarHeader } from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
export function HeaderSidebar({ user }: Readonly<{ user: Prisma.userGetPayload<object> }>) {
  const initials = user.name?.slice(0, 2).toUpperCase() || 'SA';
  return (
    <SidebarHeader className="pt-8 pb-6 px-6 border-b border-border-subtle">
      <div className="flex flex-col items-center">
        <div className="relative group cursor-pointer">
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-full opacity-15 bg-linear-to-tr from-brand-green to-brand-cyan blur-sm transition-opacity duration-500 group-hover:opacity-30"
          />
          <Avatar className="relative w-20 h-20 border-2 border-brand-green/30">
            <AvatarImage
              alt={`${user.name} Avatar`}
              src={user.avatar || ''}
              className="rounded-full object-cover"
            />
            <AvatarFallback className="bg-surface-3 text-text-secondary">{initials}</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="mt-4 text-h3-card text-text-primary tracking-tighter">{user.name}</h1>
        <p className="font-ui-label text-[10px] text-text-muted uppercase tracking-[0.08em]">
          AI Guide
        </p>
      </div>
    </SidebarHeader>
  );
}
