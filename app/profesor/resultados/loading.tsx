export default function Loading() {
  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="mb-8">
        <div className="w-48 h-9 bg-surface-3 rounded-lg animate-pulse mb-2" />
        <div className="w-64 h-5 bg-surface-3 rounded-lg animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-surface-2 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-surface-2 rounded-xl animate-pulse" />
        <div className="h-64 bg-surface-2 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
