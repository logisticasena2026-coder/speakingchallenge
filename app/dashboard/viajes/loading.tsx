import { Compass } from 'lucide-react';

export default function ViajesLoading() {
  return (
    <main className="pt-20 px-4 md:px-6 pb-10 relative z-10">
      <div className="max-w-250 mx-auto">
        <div className="ani d1 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Compass className="w-6 h-6 text-brand-green animate-pulse" />
            <div className="h-8 w-40 bg-surface-3 rounded-lg animate-pulse" />
          </div>
          <div className="h-4 w-32 bg-surface-3 rounded animate-pulse mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="w-full h-60 bg-surface-3 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}
