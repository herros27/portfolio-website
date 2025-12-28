"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800/50",
        className
      )}
    />
  );
}

interface AdminCardSkeletonProps {
  className?: string;
  showImage?: boolean;
  lines?: number;
}

export function AdminCardSkeleton({
  className,
  showImage = true,
  lines = 3,
}: AdminCardSkeletonProps) {
  return (
    <div
      className={cn(
        "bg-white/80 dark:bg-gray-900/80 rounded-xl border border-gray-200 dark:border-gray-800 p-4 space-y-4",
        className
      )}
    >
      {showImage && (
        <div className="flex items-start gap-3">
          <Skeleton className="w-20 h-16 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")} />
        ))}
      </div>
      <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

interface AdminTableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function AdminTableSkeleton({ rows = 5, columns = 5 }: AdminTableSkeletonProps) {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4 flex items-center gap-4">
            <Skeleton className="w-16 h-12 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="w-16 h-6 rounded-full" />
              <Skeleton className="w-16 h-6 rounded-full" />
            </div>
            <Skeleton className="w-20 h-8 rounded-full" />
            <div className="flex gap-2">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface AdminPageSkeletonProps {
  title?: boolean;
  cards?: number;
  showTable?: boolean;
}

export function AdminPageSkeleton({
  title = true,
  cards = 3,
  showTable = true,
}: AdminPageSkeletonProps) {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-12 w-32 rounded-lg" />
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>

      {/* Desktop Table or Mobile Cards */}
      {showTable && (
        <div className="hidden md:block">
          <AdminTableSkeleton />
        </div>
      )}
      
      <div className="md:hidden space-y-4">
        {Array.from({ length: cards }).map((_, i) => (
          <AdminCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
