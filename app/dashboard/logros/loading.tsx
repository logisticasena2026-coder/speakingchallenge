import { Trophy } from 'lucide-react';

export default function LogrosLoading() {
  return (
    <main className="pt-20 px-4 md:px-6 pb-10 relative z-10">
      <div className="max-w-250 mx-auto">
        <div className="ani d1 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 text-brand-amber animate-pulse" />
            <div className="h-8 w-32 bg-surface-3 rounded-lg animate-pulse" />
          </div>
          <div className="h-4 w-48 bg-surface-3 rounded animate-pulse mt-2" />
          <div className="mt-3 h-2 w-full bg-surface-4 rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-surface-2 border border-white/6 rounded-xl p-5">
              <div className="w-10 h-10 rounded-lg bg-surface-3 animate-pulse mb-3" />
              <div className="h-4 w-24 bg-surface-3 rounded animate-pulse mb-2" />
              <div className="h-3 w-full bg-surface-3 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
