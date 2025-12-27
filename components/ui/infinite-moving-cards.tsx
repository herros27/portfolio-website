"use client";

import { cn } from "@/lib/utils";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Image, { StaticImageData } from "next/image";

// --- Tipe Data ---
interface Item {
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl: string | StaticImageData;
}

interface InfiniteMovingCardsProps {
  items: readonly Item[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

// --- Komponen Utama ---
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const repeatedItems = useMemo(() => {
    let newItems = [...items];
    // Ulangi terus sampai jumlah item minimal 6 (angka aman untuk layar desktop)
    while (newItems.length < 6) {
      newItems = [...newItems, ...items];
    }
    return newItems;
  }, [items]);

  // Logika untuk mengatur animasi
  const addAnimation = useCallback(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    // 1. Duplikasi konten untuk efek infinite scroll
    // Cek agar tidak duplikasi berulang kali jika re-render
    if (scrollerRef.current.children.length < repeatedItems.length * 2) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
    }

    // 2. Set Arah Animasi
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    // 3. Set Kecepatan Animasi
    let duration = "40s";
    if (speed === "fast") duration = "20s";
    else if (speed === "slow") duration = "80s";

    containerRef.current.style.setProperty("--animation-duration", duration);

    // 4. Mulai Animasi
    setStart(true);
  }, [direction, speed, repeatedItems.length]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        // "group" ditambahkan untuk mendeteksi hover pada parent
        "scroller group relative z-20 w-full overflow-hidden mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",

        className
      )}>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          // Pause animasi saat container (group) di-hover
          pauseOnHover && "group-hover:paused",
          // Pointer events none pada container agar tidak mengganggu scroll,
          // tapi nanti di-override di CardItem
          "pointer-events-none"
        )}>
        {repeatedItems.map((item, idx) => (
          <CardItem key={idx} item={item} />
        ))}
      </ul>
    </div>
  );
};

// --- Sub-Komponen Kartu (Agar kode lebih bersih) ---
// --- Sub-Komponen Kartu ---
const CardItem = ({ item }: { item: Item }) => {
  return (
    <li
      className={cn(
        // Mobile: w-72 (288px), Desktop: w-112.5 (450px)
        // Tinggi dikurangi sedikit di mobile agar tidak memenuhi layar (h-72)
        "group/card relative h-72 w-72 md:h-80 md:w-112.5 shrink-0 rounded-xl perspective-[1000px]",
        "pointer-events-auto"
      )}>
      <div className='relative h-full w-full rounded-xl shadow-xl transition-all duration-500 transform-3d group-hover/card:transform-[rotateY(180deg)]'>
        {/* === Sisi Depan === */}
        <div className='absolute inset-0 h-full w-full rounded-xl backface-hidden'>
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className='rounded-xl object-cover'
            sizes='(max-width: 768px) 80vw, 450px'
          />
          {/* Overlay text lebih kecil di mobile */}
          <div className='absolute inset-0 flex items-end rounded-xl bg-black/40 p-4 md:p-6 transition-opacity group-hover/card:opacity-0'>
            <h3 className='text-lg md:text-2xl font-bold text-white drop-shadow-md'>
              {item.title}
            </h3>
          </div>
        </div>

        {/* === Sisi Belakang === */}
        <div className='absolute inset-0 h-full w-full rounded-xl bg-gray-100 p-4 md:p-6 text-center text-slate-800 transform-[rotateY(180deg)] backface-hidden dark:bg-zinc-900 dark:text-slate-200'>
          <div className='flex h-full flex-col items-center justify-center'>
            <h4 className='mb-1 md:mb-2 text-sm md:text-lg font-bold line-clamp-1'>
              {item.title}
            </h4>

            <div className='grow overflow-y-auto px-1 scrollbar-none'>
              {/* Text size lebih kecil untuk mobile */}
              <p className='text-[12px] md:text-sm leading-relaxed opacity-90'>
                {item.description}
              </p>
            </div>

            <ul className='mt-3 flex flex-wrap justify-center gap-1.5'>
              {item.tags.slice(0, 3).map(
                (
                  tag,
                  index // Batasi tag di mobile agar tidak penuh
                ) => (
                  <li
                    key={index}
                    className='rounded-full bg-black/80 px-2 py-0.5 text-[10px] md:text-[0.65rem] uppercase tracking-wider text-white dark:bg-white/10'>
                    {tag}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default InfiniteMovingCards;
