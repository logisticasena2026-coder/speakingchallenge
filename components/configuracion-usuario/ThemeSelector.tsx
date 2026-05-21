"use client"
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ThemeSelector() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  return (
    <div className="flex gap-2.5">
      {[
        { value: 'light' as const, icon: Sun, label: 'Claro', desc: 'Fondo claro' },
        { value: 'dark' as const, icon: Moon, label: 'Oscuro', desc: 'Fondo oscuro' },
      ].map((mode) => {
        const Icon = mode.icon;
        const selected = theme === mode.value;
        return (
          <button
            key={mode.value}
            type="button"
            onClick={() => setTheme(mode.value)}
            className={cn(
              'flex-1 flex items-center gap-3 py-2.5 px-4 rounded-xl border transition-all duration-200 cursor-pointer',
              selected
                ? 'border-brand-green/40 bg-brand-green/8 shadow-[0_0_12px_rgba(61,214,140,0.12)]'
                : 'border-border-subtle bg-surface-3/50 hover:bg-surface-3 hover:border-border-default',
            )}
          >
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                selected ? 'bg-brand-green/15 text-brand-green' : 'bg-surface-4 text-text-muted',
              )}
            >
              <Icon className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span
                className={cn(
                  'block text-xs font-medium leading-tight transition-colors',
                  selected ? 'text-text-primary' : 'text-text-secondary',
                )}
              >
                {mode.label}
              </span>
              <span className="block text-[10px] text-text-muted-alt font-ui-label leading-tight mt-0.5">
                {mode.desc}
              </span>
            </div>
            {selected && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_6px_rgba(61,214,140,0.6)] shrink-0" />
            )}
          </button>
        );
      })}
    </div>
  );
}
