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
import { ExternalLink, Calendar } from "lucide-react";

// --- Tipe Data ---
interface Item {
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl: string | StaticImageData;
  issueDate?: Date | string;
  credentialUrl?: string | null;
}

interface InfiniteMovingCardsProps {
  items: readonly Item[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

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
  const [isPaused, setIsPaused] = useState(false);

  const repeatedItems = useMemo(() => {
    let newItems = [...items];
    while (newItems.length < 6) {
      newItems = [...newItems, ...items];
    }
    return newItems;
  }, [items]);

  const addAnimation = useCallback(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    if (scrollerRef.current.children.length < repeatedItems.length * 2) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
    }

    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    let duration = "40s";
    if (speed === "fast") duration = "20s";
    else if (speed === "slow") duration = "80s";

    containerRef.current.style.setProperty("--animation-duration", duration);
    setStart(true);
  }, [direction, speed, repeatedItems.length]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={() => pauseOnHover && setIsPaused(true)}
      onTouchEnd={() => pauseOnHover && setIsPaused(false)}
      className={cn(
        "scroller group relative z-20 w-full overflow-hidden mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}>
      <ul
        ref={scrollerRef}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          "pointer-events-none"
        )}>
        {repeatedItems.map((item, idx) => (
          <CardItem key={idx} item={item} />
        ))}
      </ul>
    </div>
  );
};

const CardItem = ({ item }: { item: Item }) => {
  // Format date if exists
  const formattedDate = item.issueDate
    ? new Date(item.issueDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <li
      className={cn(
        "group/card relative h-72 w-72 md:h-80 md:w-112.5 shrink-0 rounded-xl perspective-[1000px]",
        "pointer-events-auto"
      )}>
      <div className='relative h-full w-full rounded-xl shadow-xl transition-all duration-500 transform-3d group-hover/card:transform-[rotateY(180deg)]'>
        {/* Sisi Depan */}
        <div className='absolute inset-0 h-full w-full rounded-xl backface-hidden'>
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className='rounded-xl object-cover'
            sizes='(max-width: 768px) 80vw, 450px'
          />
          <div className='absolute inset-0 flex items-end rounded-xl bg-black/40 p-4 md:p-6 transition-opacity group-hover/card:opacity-0'>
            <h3 className='text-lg md:text-2xl font-bold text-white drop-shadow-md'>
              {item.title}
            </h3>
          </div>
        </div>

        {/* Sisi Belakang */}
        <div className='absolute inset-0 h-full w-full rounded-xl bg-gray-100 p-4 md:p-6 text-center text-slate-800 transform-[rotateY(180deg)] backface-hidden dark:bg-zinc-900 dark:text-slate-200'>
          <div className='flex h-full flex-col items-center justify-center'>
            <h4 className='mb-1 md:mb-2 text-sm md:text-lg font-bold line-clamp-1'>
              {item.title}
            </h4>
            
            {/* Issue Date */}
            {formattedDate && (
              <div className='flex items-center gap-1 text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mb-2'>
                <Calendar size={12} />
                {formattedDate}
              </div>
            )}
            
            <div className='grow overflow-y-auto px-1 scrollbar-none'>
              <p className='text-[12px] md:text-sm leading-relaxed opacity-90'>
                {item.description}
              </p>
            </div>
            
            {/* Credential Link */}
            {item.credentialUrl && (
              <a
                href={item.credentialUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-medium hover:bg-blue-500/30 transition-colors'
              >
                <ExternalLink size={12} />
                Verify Credential
              </a>
            )}
            
            <ul className='mt-2 flex flex-wrap justify-center gap-1.5'>
              {item.tags.map((tag, index) => (
                <li
                  key={index}
                  className='rounded-full bg-black/80 px-2 py-0.5 text-[10px] md:text-[0.65rem] uppercase tracking-wider text-white dark:bg-white/10'>
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
