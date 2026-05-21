'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Flame,ArrowLeft, Radio } from 'lucide-react';
import { usePathname } from 'next/navigation';

import Link from "next/link"
export function HeaderDashboard() {
  const pathName = usePathname();
  return (
    <>
      {!pathName.includes('practicando') && (
        <header className="sticky top-0 h-16 bg-[rgba(7,9,15,0.92)]   border-b border-white/10 backdrop-blur-xl z-40 flex items-center justify-between p-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <SidebarTrigger />
          </div>


          { pathName.includes('sophia') && <div className='flex items-center justify-center gap-2.5'>

          <Link href="/dashboard" className="text-text-muted-alt hover:text-brand-green transition-colors">
    <ArrowLeft className="w-5 h-5" />
</Link>
<div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-green/20">
        <Radio className="w-4.5 h-4.5 text-brand-green" />
    </div>
    <div>
        <h1 className="text-sm font-semibold font-ui-label">Sophia Chat</h1>
        <p className="text-xs text-text-muted-alt">Tiempo real</p>
    </div>
</div>
          </div>}


          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-1.5 text-brand-amber">
              <Flame className="w-4 h-4" />
              <span className="font-display text-sm font-bold hidden sm:block">12</span>
            </div>
            <div className="relative">
              <Bell className="w-4 h-4 text-text-muted cursor-pointer hover:text-white/80 transition-all" />
              <span className="notif-dot"></span>
            </div>
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#1a3a5c] to-[#0d2240] border-2 border-brand-green/30 flex items-center justify-center font-display text-xs font-bold text-brand-green cursor-pointer">
              A
            </div>
          </div>
        </header>
      )}
    </>
  );
}
