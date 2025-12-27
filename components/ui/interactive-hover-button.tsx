import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        // Tambahkan border-input atau border-zinc-200 agar batas tombol terlihat di light mode
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold",
        className
      )}
      {...props}>
      <div className='flex items-center gap-2'>
        {/* PERBAIKAN DISINI:
           Ganti 'bg-primary' menjadi 'bg-neutral-950 dark:bg-white'.
           Ini memaksa titik menjadi Hitam Pekat di Light Mode, dan Putih di Dark Mode.
        */}
        <div className='h-2 w-2 rounded-full bg-neutral-950 transition-all duration-300 group-hover:scale-[100.8] dark:bg-white'></div>

        <span className='inline-block transition-all duration-300 text-black dark:text-white group-hover:translate-x-12 group-hover:opacity-0'>
          {children}
        </span>
      </div>

      {/* PERBAIKAN TEXT HOVER:
         Pastikan teks yang muncul berwarna putih di light mode (karena background jadi hitam),
         dan berwarna hitam di dark mode (karena background jadi putih).
      */}
      <div className='absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 dark:text-black'>
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
}
