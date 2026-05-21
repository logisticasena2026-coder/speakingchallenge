
import { cn } from '@/lib/utils';

export function SectionCard({
  icon: Icon,
  title,
  subtitle,
  accent = 'green',
  children,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  accent?: 'green' | 'amber' | 'purple';
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-border-default bg-surface-2/60 backdrop-blur-sm overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 left-4 right-4 h-px bg-linear-to-r opacity-60"
        style={{
          backgroundImage: `linear-gradient(to right, ${accent === 'green' ? '#3dd68c' : accent === 'amber' ? '#f5a623' : '#a855f7'}, transparent)`,
        }}
      />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center',
              accent === 'green'
                ? 'bg-brand-green/15'
                : accent === 'amber'
                  ? 'bg-brand-amber/15'
                  : 'bg-brand-purple/15',
            )}
          >
            <Icon
              className={cn(
                'w-4 h-4',
                accent === 'green'
                  ? 'text-brand-green'
                  : accent === 'amber'
                    ? 'text-brand-amber'
                    : 'text-brand-purple',
              )}
            />
          </div>
          <div>
            <h3 className="font-display text-lg text-text-primary tracking-tight">{title}</h3>
            <p className="text-xs text-text-muted font-ui-label">{subtitle}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
