"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  imageUrl,
}: ProjectProps) {
  // Gunakan HTMLDivElement agar aman
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    // 1. WRAPPER POSISI (LAYOUT): Div biasa.
    // Memegang 'ref' scroll dan margin antar item.
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className='group mb-3 sm:mb-8 last:mb-0'>
      {/* 2. WRAPPER ANIMASI: Motion Div.
          Hanya bertugas membesarkan/mengecilkan konten. */}
      <motion.div
        style={{
          scale: scaleProgess,
          opacity: opacityProgess,
        }}>
        {/* 3. KONTEN VISUAL (SEMANTIK): Article.
            Ini adalah "Kartu" itu sendiri. Saya ganti <section> jadi <article> 
            karena ini adalah item mandiri dalam list, lebih tepat secara SEO. */}
        <article className='bg-gray-200 max-w-2xl border border-black/5 rounded-lg overflow-hidden relative sm:pr-8 sm:h-80 hover:bg-gray-250 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20'>
          {/* 1. GAMBAR DIPINDAH KE ATAS */}
          <Image
            src={imageUrl}
            alt='Project I worked on'
            quality={95}
            width={500}
            height={300}
            className='
      /* Tampilan Mobile: Muncul paling atas */
      block w-full rounded-t-lg shadow-2xl 
      
      /* Tampilan Desktop: Kembali jadi melayang (absolute) */
      sm:absolute sm:top-8 sm:-right-40 sm:w-113 sm:block 
      
      /* Efek Animasi Desktop */
      transition 
      group-hover:scale-[1.04]
      group-hover:-translate-x-3
      group-hover:translate-y-3
      group-hover:-rotate-2

      /* Posisi untuk Kartu Genap di Desktop */
      group-even:sm:right-[initial] 
      group-even:sm:-left-40
      
      group-hover:group-even:translate-x-3
      group-hover:group-even:translate-y-3
      group-hover:group-even:rotate-2'
          />

          {/* 2. KONTEN TEKS */}
          <div className='pt-6 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-72'>
            <h3 className='text-2xl font-semibold'>{title}</h3>
            <p className='mt-2 leading-relaxed text-gray-700 dark:text-white/70'>
              {description}
            </p>
            <ul className='flex flex-wrap mt-4 gap-2 sm:mt-auto'>
              {tags.map((tag, index) => (
                <li
                  className='bg-black/70 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70'
                  key={index}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </motion.div>
    </section>
  );
}
