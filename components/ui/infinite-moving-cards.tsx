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
import { ExternalLink, Calendar, Award, ChevronRight } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

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
  const [flippedCount, setFlippedCount] = useState(0);

  const repeatedItems = useMemo(() => {
    let newItems = [...items];
    while (newItems.length < 6) {
      newItems = [...newItems, ...items];
    }
    return newItems;
  }, [items]);

  // Use React to duplicate items for seamless loop, ensuring interactivity works on all cards
  const scrollerItems = useMemo(() => {
    return [...repeatedItems, ...repeatedItems];
  }, [repeatedItems]);

  const addAnimation = useCallback(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    // Set animation direction
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    // Set animation speed
    let duration = "40s";
    if (speed === "fast") duration = "20s";
    else if (speed === "slow") duration = "80s";

    containerRef.current.style.setProperty("--animation-duration", duration);
    setStart(true);
  }, [direction, speed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  const handleCardFlip = useCallback((isFlipped: boolean) => {
    setFlippedCount((prev) => (isFlipped ? prev + 1 : Math.max(0, prev - 1)));
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={() => pauseOnHover && setIsPaused(true)}
      onTouchEnd={() => pauseOnHover && setIsPaused(false)}
      className={cn(
        "scroller group relative z-20 w-full overflow-hidden",
        className
      )}>
      <ul
        ref={scrollerRef}
        style={{
          animationPlayState: isPaused || flippedCount > 0 ? "paused" : "running",
          width: "max-content", // Ensure container fits all items
        }}
        className={cn(
          "flex min-w-full shrink-0 gap-6 py-6 flex-nowrap",
          start && "animate-scroll",
          "pointer-events-none" // Enable pointer events for children, disable for container drag if needed
        )}>
        {scrollerItems.map((item, idx) => (
          <CardItem 
            key={`${idx}-${item.title}`} 
            item={item} 
            onFlip={handleCardFlip}
          />
        ))}
      </ul>
    </div>
  );
};

const CardItem = ({ 
  item, 
  onFlip 
}: { 
  item: Item; 
  onFlip: (isFlipped: boolean) => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Format date if exists
  const formattedDate = item.issueDate
    ? new Date(item.issueDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;
    
  // Notify parent of flip state changes
  useEffect(() => {
    onFlip(isFlipped);
    // Cleanup if component unmounts while flipped:
    return () => {
      if (isFlipped) onFlip(false);
    };
  }, [isFlipped, onFlip]);

  return (
    <li
      className={cn(
        "group/card relative h-80 w-80 md:h-96 md:w-[450px] shrink-0 rounded-2xl perspective-[1000px]",
        "pointer-events-auto cursor-pointer"
      )}
      onClick={() => setIsFlipped((prev) => !prev)}>
      <div
        className={cn(
          "relative h-full w-full rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 transition-all duration-700 transform-3d group-hover/card:transform-[rotateY(180deg)]",
          isFlipped && "transform-[rotateY(180deg)]"
        )}>
        {/* Front Side */}
        <div className='absolute inset-0 h-full w-full rounded-2xl backface-hidden overflow-hidden'>
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className='rounded-2xl object-cover transition-transform duration-700 group-hover/card:scale-110'
            sizes='(max-width: 768px) 80vw, 450px'
          />

          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent rounded-2xl' />

          {/* Content overlay */}
          <div className='absolute inset-0 flex flex-col justify-between p-5 md:p-6'>
            {/* Top badge */}
            <div className='flex justify-start'>
              <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30'>
                {/* <BorderBeam
                  size={30}
                  borderWidth={2}
                  initialOffset={20}
                  className='from-transparent via-red-500 to-transparent'
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 20,
                  }}
                /> */}
                <Award className='w-3.5 h-3.5 text-black' />
                <span className='text-xs font-medium text-black'>
                  Certificate
                </span>
              </div>
            </div>

            {/* Bottom content */}
            <div className='space-y-2'>
              <h3 className='text-lg md:text-2xl font-bold text-white drop-shadow-lg line-clamp-2'>
                {item.title}
              </h3>
              {formattedDate && (
                <div className='flex items-center gap-1.5 text-white/80'>
                  <Calendar size={14} />
                  <span className='text-xs md:text-sm'>{formattedDate}</span>
                </div>
              )}
              {/* Hint to flip */}
              <div className='flex items-center gap-1 text-white/60 text-xs pt-1'>
                <span>Tap or hover for details</span>
                <ChevronRight size={12} className='animate-pulse' />
              </div>
            </div>
          </div>

          {/* Decorative corner accent */}
          <div className='absolute top-0 left-0 w-24 h-24 bg-linear-to-br from-amber-500/30 to-transparent rounded-tl-2xl' />
        </div>

        {/* Back Side */}
        <div className='absolute inset-0 h-full w-full rounded-2xl bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-5 md:p-6 text-center transform-[rotateY(180deg)] backface-hidden border border-gray-200/50 dark:border-gray-700/50'>
          <div className='flex h-full flex-col'>
            {/* Header */}
            <div className='mb-3'>
              <div className='w-10 h-10 mx-auto rounded-xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-3 shadow-lg shadow-amber-500/25'>
                <Award className='w-5 h-5 text-white' />
              </div>
              <h4 className='text-sm md:text-base font-bold text-gray-900 dark:text-white line-clamp-2'>
                {item.title}
              </h4>

              {/* Issue Date */}
              {formattedDate && (
                <div className='flex items-center justify-center gap-1 text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mt-1'>
                  <Calendar size={10} />
                  {formattedDate}
                </div>
              )}
            </div>

            {/* Description */}
            <div className='grow overflow-y-auto px-1 scrollbar-none mb-3'>
              <p className='text-[11px] md:text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
                {item.description}
              </p>
            </div>

            {/* Credential Link */}
            {item.credentialUrl && (
              <a
                href={item.credentialUrl}
                target='_blank'
                rel='noopener noreferrer'
                onClick={(e) => e.stopPropagation()}
                className='inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-linear-to-r from-amber-500 to-orange-500 text-white text-[10px] md:text-xs font-semibold hover:from-amber-600 hover:to-orange-600 transition-all hover:scale-105 shadow-lg shadow-amber-500/25'>
                <ExternalLink size={12} />
                Verify Credential
              </a>
            )}

            {/* Tags */}
            <ul className='mt-3 flex flex-wrap justify-center gap-1.5'>
              {item.tags.slice(0, 4).map((tag, index) => (
                <li
                  key={index}
                  className='rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2.5 py-0.5 text-[9px] md:text-[10px] font-medium text-gray-600 dark:text-gray-300'>
                  {tag}
                </li>
              ))}
              {item.tags.length > 4 && (
                <li className='rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2.5 py-0.5 text-[9px] md:text-[10px] font-medium text-gray-500 dark:text-gray-400'>
                  +{item.tags.length - 4}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default InfiniteMovingCards;
