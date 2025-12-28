import { Skeleton } from "@/components/admin/admin-skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Profile Form */}
      <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
        {/* Photo Upload */}
        <div className="flex items-center gap-6">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>

        {/* Save Button */}
        <Skeleton className="h-12 w-32 rounded-lg" />
      </div>
    </div>
  );
}
