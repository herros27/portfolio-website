"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Code2 } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string | null;
  githubUrl?: string | null;
  index?: number;
}

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  demoUrl,
  githubUrl,
  index = 0,
}: ProjectProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  // Alternate gradient colors based on index
  const gradients = [
    "from-cyan-500/20 via-blue-500/10 to-transparent",
    "from-violet-500/20 via-purple-500/10 to-transparent",
    "from-rose-500/20 via-pink-500/10 to-transparent",
    "from-amber-500/20 via-orange-500/10 to-transparent",
    "from-emerald-500/20 via-green-500/10 to-transparent",
  ];
  const gradient = gradients[index % gradients.length];

  const tagColors = [
    "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-200/50 dark:border-cyan-700/50",
    "bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-200/50 dark:border-violet-700/50",
    "bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-200/50 dark:border-rose-700/50",
    "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200/50 dark:border-amber-700/50",
    "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-700/50",
  ];
  const tagColor = tagColors[index % tagColors.length];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className='group mb-3 sm:mb-8 last:mb-0'>
      <motion.div
        style={{
          scale: scaleProgess,
          opacity: opacityProgess,
        }}>
        <article
          className={`relative max-w-3xl mx-auto bg-linear-to-br ${gradient} backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/30 dark:hover:shadow-black/30`}>
          {/* Decorative elements */}
          <div className='absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-white/50 dark:from-white/5 to-transparent rounded-bl-full pointer-events-none' />
          <div className='absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-white/30 dark:from-white/5 to-transparent rounded-tr-full pointer-events-none' />

          <div className='grid md:grid-cols-2 gap-4 p-5 md:p-6'>
            {/* Content Column */}
            <div
              className={`flex flex-col justify-center ${index % 2 === 1 ? "md:order-2" : ""}`}>
              {/* Project number badge */}
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-8 h-8 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center'>
                  <Code2 className='w-4 h-4 text-white dark:text-gray-900' />
                </div>
                <span className='text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                  Project {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                {title}
              </h3>

              <p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4'>
                {description}
              </p>

              {/* Links */}
              {(demoUrl || githubUrl) && (
                <div className='flex flex-wrap gap-2 mb-4'>
                  {demoUrl && (
                    <a
                      href={demoUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`Live demo for ${title}`}
                      className='inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all hover:scale-105 shadow-lg shadow-blue-500/25'>
                      <ExternalLink size={14} />
                      Live Demo
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`View code for ${title}`}
                      className='inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:scale-105'>
                      <Github size={14} />
                      View Code
                    </a>
                  )}
                </div>
              )}

              {/* Tags */}
              <ul className='flex flex-wrap gap-1.5'>
                {tags.slice(0, 5).map((tag, tagIndex) => (
                  <li
                    className={`px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-full border ${tagColor}`}
                    key={tagIndex}>
                    {tag}
                  </li>
                ))}
                {tags.length > 5 && (
                  <li className='px-2.5 py-1 text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800'>
                    +{tags.length - 5}
                  </li>
                )}
              </ul>
            </div>

            {/* Image Column */}
            <div
              className={`relative ${index % 2 === 1 ? "md:order-1" : ""}`}>
              {imageUrl && (
                <div className='relative aspect-video rounded-xl overflow-hidden shadow-xl shadow-black/10 dark:shadow-black/30 group-hover:shadow-2xl transition-shadow duration-500'>
                  <Image
                    src={imageUrl}
                    alt={`${title} project screenshot`}
                    fill
                    quality={75}
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                  {/* Overlay on hover */}
                  <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4'>
                    <span className='text-white text-xs font-medium flex items-center gap-1'>
                      <ArrowUpRight size={14} />
                      View Project
                    </span>
                  </div>
                </div>
              )}

              {/* Floating decoration */}
              <div className='hidden md:block absolute -bottom-2 -right-2 w-16 h-16 rounded-xl bg-linear-to-br from-blue-500/20 to-violet-500/20 blur-xl pointer-events-none' />
            </div>
          </div>
        </article>
      </motion.div>
    </section>
  );
}
