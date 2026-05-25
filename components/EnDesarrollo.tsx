'use client';

import { cn } from '@/lib/utils';
import { Construction } from 'lucide-react';
import type { ReactNode } from 'react';

type Accent = 'green' | 'cyan' | 'amber' | 'purple';

const accentMap: Record<Accent, { color: string; border: string; bg: string }> = {
  green: { color: '#3dd68c', border: 'rgba(61,214,140,0.3)', bg: 'rgba(61,214,140,0.08)' },
  cyan: { color: '#22d3ee', border: 'rgba(34,211,238,0.3)', bg: 'rgba(34,211,238,0.08)' },
  amber: { color: '#f5a623', border: 'rgba(245,166,35,0.3)', bg: 'rgba(245,166,35,0.08)' },
  purple: { color: '#a855f7', border: 'rgba(168,85,247,0.3)', bg: 'rgba(168,85,247,0.08)' },
};

type EnDesarrolloProps = {
  children: ReactNode;
  mensaje?: string;
  acento?: Accent;
  visible?: boolean;
  className?: string;
};

export function EnDesarrollo({
  children,
  mensaje = 'En Desarrollo',
  acento = 'green',
  visible = true,
  className,
}: Readonly<EnDesarrolloProps>) {
  if (!visible) return <>{children}</>;

  const a = accentMap[acento];

  return (
    <div
      className={cn('relative overflow-hidden rounded-xl border', className)}
      style={{ borderColor: a.border }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: [
            `linear-gradient(${a.color}08 1px, transparent 1px)`,
            `linear-gradient(90deg, ${a.color}08 1px, transparent 1px)`,
          ].join(', '),
          backgroundSize: '24px 24px',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-2 right-2 z-20 h-px animate-scanline opacity-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${a.color}, transparent)`,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-3 z-20 size-4"
        style={{ borderTop: `1px solid ${a.border}`, borderLeft: `1px solid ${a.border}` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 z-20 size-4"
        style={{ borderTop: `1px solid ${a.border}`, borderRight: `1px solid ${a.border}` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-3 z-20 size-4"
        style={{ borderBottom: `1px solid ${a.border}`, borderLeft: `1px solid ${a.border}` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-3 z-20 size-4"
        style={{ borderBottom: `1px solid ${a.border}`, borderRight: `1px solid ${a.border}` }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 animate-construction-glow rounded-xl opacity-30"
        style={{
          boxShadow: `inset 0 0 24px ${a.color}20, 0 0 48px ${a.color}08`,
        }}
      />

      <div
        className="absolute left-1/2 top-3 z-30 -translate-x-1/2 animate-badge-glitch rounded-full border px-4 py-1 backdrop-blur-sm"
        style={{
          backgroundColor: a.bg,
          borderColor: a.border,
        }}
      >
        <div className="flex items-center gap-1.5">
          <Construction className="size-3" style={{ color: a.color }} />
          <span
            className="font-ui-label text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: a.color }}
          >
            {mensaje}
          </span>
        </div>
      </div>

      <div className="pointer-events-none opacity-70">{children}</div>
    </div>
  );
}
