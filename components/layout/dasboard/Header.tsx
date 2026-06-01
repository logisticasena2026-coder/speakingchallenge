'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ArrowLeft, Radio } from 'lucide-react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
export function HeaderDashboard() {
  const pathName = usePathname();
  return (
    <>
      {!pathName.includes('practicando') && (
        <header className="sticky top-0 h-16 bg-[rgba(7,9,15,0.92)]   border-b border-white/10 backdrop-blur-xl z-40 flex items-center justify-between p-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <SidebarTrigger />
          </div>

          {pathName.includes('emily') && (
            <div className="flex items-center justify-center gap-2.5">
              <Link
                href="/dashboard"
                className="text-text-muted-alt hover:text-brand-green transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-green/20">
                  <Radio className="w-4.5 h-4.5 text-brand-green" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold font-ui-label">Emily Chat</h1>
                  <p className="text-xs text-text-muted-alt">Tiempo real</p>
                </div>
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
}
