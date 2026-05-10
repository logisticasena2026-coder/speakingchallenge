import { Sidebar } from '@/components/ui/sidebar';

import { HeaderSidebar } from './Header';
import { Enlaces } from './Enlaces';
import { Prisma } from '@/generated/prisma/client';

export function AppSidebar({ user }: Readonly<{ user: Prisma.userGetPayload<object> }>) {
  return (
    <Sidebar className="border-r border-border-default bg-sidebar">
      <HeaderSidebar user={user} />
      <Enlaces />

    </Sidebar>
  );
}
