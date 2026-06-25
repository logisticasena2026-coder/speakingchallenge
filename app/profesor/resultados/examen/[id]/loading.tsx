export default function Loading() {
  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <div className="w-32 h-4 bg-surface-3 rounded animate-pulse mb-6" />
      <div className="w-64 h-9 bg-surface-3 rounded-lg animate-pulse mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-surface-2 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="h-48 bg-surface-2 rounded-xl animate-pulse mb-6" />
      <div className="h-64 bg-surface-2 rounded-xl animate-pulse" />
    </div>
  );
}
