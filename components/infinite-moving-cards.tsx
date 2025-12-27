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
const CardItem = ({ item }: { item: Item }) => {
  return (
    <li
      className={cn(
        "group/card relative h-80 w-87.5 md:w-112.5 shrink-0 rounded-xl perspective-[1000px]",
        // Mengaktifkan kembali pointer events agar kartu bisa di-interaksi (hover/klik)
        "pointer-events-auto"
      )}>
      {/* Container untuk efek flip 3D */}
      <div className='relative h-full w-full rounded-xl shadow-xl transition-all duration-500 transform-3d group-hover/card:transform-[rotateY(180deg)]'>
        {/* === Sisi Depan (Gambar) === */}
        <div className='absolute inset-0 h-full w-full rounded-xl backface-hidden'>
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className='rounded-xl object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          <div className='absolute inset-0 flex items-end rounded-xl bg-black/40 p-6 transition-opacity group-hover/card:opacity-0'>
            <h3 className='text-2xl font-bold text-white drop-shadow-md'>
              {item.title}
            </h3>
          </div>
        </div>

        {/* === Sisi Belakang (Deskripsi & Tags) === */}
        <div className='absolute inset-0 h-full w-full rounded-xl bg-gray-100 p-6 text-center text-slate-800 transform-[rotateY(180deg)] backface-hidden dark:bg-zinc-800 dark:text-slate-200'>
          <div className='flex h-full flex-col items-center justify-center'>
            <h4 className='mb-2 text-lg font-bold'>{item.title}</h4>

            <div className='grow overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent'>
              <p className='text-sm leading-relaxed'>{item.description}</p>
            </div>

            <ul className='mt-4 flex flex-wrap justify-center gap-2'>
              {item.tags.map((tag, index) => (
                <li
                  key={index}
                  className='rounded-full bg-black/80 px-3 py-1 text-[0.65rem] uppercase tracking-wider text-white dark:bg-white/10'>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default InfiniteMovingCards;
