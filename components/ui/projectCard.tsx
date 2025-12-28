"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string | null;
  githubUrl?: string | null;
}

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  demoUrl,
  githubUrl,
}: ProjectProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className='group mb-3 sm:mb-8 last:mb-0'>
      <motion.div
        style={{
          scale: scaleProgess,
          opacity: opacityProgess,
        }}>
        <article className='bg-gray-200 max-w-2xl border border-black/5 rounded-lg overflow-hidden relative sm:pr-8 sm:min-h-[22rem] hover:bg-gray-250 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20'>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt='Project I worked on'
              quality={95}
              width={500}
              height={300}
              className='
        block w-full rounded-t-lg shadow-2xl 
        sm:absolute sm:top-8 sm:-right-40 sm:w-113 sm:block 
        transition 
        group-hover:scale-[1.04]
        group-hover:-translate-x-3
        group-hover:translate-y-3
        group-hover:-rotate-2
        group-even:sm:right-[initial] 
        group-even:sm:-left-40
        group-hover:group-even:translate-x-3
        group-hover:group-even:translate-y-3
        group-hover:group-even:rotate-2'
            />
          )}

          <div className='pt-5 pb-6 px-5 sm:pl-10 sm:pr-2 sm:pt-8 sm:pb-6 sm:max-w-[50%] flex flex-col sm:group-even:ml-72'>
            <h3 className='text-2xl font-semibold'>{title}</h3>
            <p className='mt-2 leading-relaxed text-gray-700 dark:text-white/70 text-sm sm:text-base'>
              {description}
            </p>
            
            {/* Links */}
            {(demoUrl || githubUrl) && (
              <div className='flex flex-wrap gap-2 mt-3'>
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium hover:bg-blue-500/30 transition-colors'
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-500/20 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium hover:bg-gray-500/30 transition-colors'
                  >
                    <Github size={14} />
                    Code
                  </a>
                )}
              </div>
            )}

            {/* Tags */}
            <ul className='flex flex-wrap mt-3 gap-1.5'>
              {tags.map((tag, index) => (
                <li
                  className='bg-black/70 px-2.5 py-1 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-white rounded-full dark:text-white/70'
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
