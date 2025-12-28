import { Skeleton } from "@/components/admin/admin-skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="w-12 h-12 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>

        {/* Preview Portfolio */}
        <div className="rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-20 w-full mb-6 rounded" />
          <Skeleton className="h-12 w-44 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
