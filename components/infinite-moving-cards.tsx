// infinite-moving-cards.tsx

"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

// ... (definisi komponen dan props tetap sama)
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: readonly {
    title: string;
    description: string;
    tags: readonly string[];
    imageUrl: string | StaticImageData;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const addAnimation = useCallback(() => {
    const getDirection = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--animation-direction",
          direction === "left" ? "forwards" : "reverse"
        );
      }
    };

    const getSpeed = () => {
      if (containerRef.current) {
        let duration = "40s"; // normal
        if (speed === "fast") duration = "20s";
        else if (speed === "slow") duration = "80s";

        containerRef.current.style.setProperty(
          "--animation-duration",
          duration
        );
      }
    };

    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [direction, speed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  const [start, setStart] = useState(false);

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    // Langkah 1: Tambahkan kelas "group" pada container utama
    <div
      ref={containerRef}
      className={cn(
        "scroller group relative z-20 w-full  mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}>
      <ul
        ref={scrollerRef}
        className={cn(
          // Langkah 2: Tambahkan "pointer-events-none" dan ubah logika hover
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4 pointer-events-none",
          start && "animate-scroll",
          // Logika pause dipindah ke sini, bereaksi saat "group" (div utama) di-hover
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}>
        {items.map((item, idx) => (
          <li
            // Langkah 3: Tambahkan "pointer-events-auto" untuk mengaktifkan kembali interaksi pada kartu
            className='group/card h-88 w-[350px] shrink-0 perspective-[1000px] md:w-[450px]  rounded-xl pointer-events-auto'
            key={idx}>
            {/* Ganti "group-hover" menjadi "group-hover/card" agar tidak konflik */}
            <div className='relative h-full w-full rounded-xl shadow-xl transition-transform duration-500 transform-3d group-hover/card:[transform:rotateY(180deg)]'>
              {/* Sisi Depan Kartu (Gambar) */}
              <div className='absolute inset-0 rounded-xl backface-hidden'>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill={true}
                  className='h-full w-full rounded-xl object-cover'
                />
                <div className='absolute inset-0 rounded-xl bg-black/50 flex items-end p-6'>
                  <h3 className='text-2xl font-bold text-white'>
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Sisi Belakang Kartu (Deskripsi) */}
              <div className='absolute inset-0 h-full w-full rounded-xl bg-gray-200 p-6 text-center text-slate-800 backface-hidden [transform:rotateY(180deg)] dark:bg-zinc-800 dark:text-slate-200'>
                <div className='flex h-full flex-col items-center justify-center'>
                  <p className='grow overflow-y-auto text-sm'>
                    {" "}
                    {/* Tambah overflow-y-auto jika deskripsi panjang */}
                    {item.description}
                  </p>
                  <ul className='mt-4 flex flex-wrap justify-center gap-2'>
                    {item.tags.map((tag, index) => (
                      <li
                        key={index}
                        className='rounded-full bg-black/70 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white dark:text-white/70'>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
