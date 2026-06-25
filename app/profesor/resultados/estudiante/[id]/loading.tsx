export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-4 w-32 bg-surface-3 rounded" />
      <div className="bg-surface-2 border border-border-subtle rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-surface-3" />
          <div className="flex-1 space-y-2">
            <div className="h-6 w-48 bg-surface-3 rounded" />
            <div className="h-4 w-64 bg-surface-3 rounded" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface-2 border border-border-subtle rounded-xl p-4">
            <div className="h-3 w-16 bg-surface-3 rounded mb-2" />
            <div className="h-7 w-12 bg-surface-3 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-surface-2 border border-border-subtle rounded-xl p-5">
        <div className="h-5 w-40 bg-surface-3 rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-surface-3 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
