"use client";

import React from "react";
import SectionHeading from "./ui/section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { WarpBackground } from "@/components/ui/warp-background";
import parse from "html-react-parser";
import { Sparkles, Code2, Rocket } from "lucide-react";

interface ProfileData {
  about: string;
}

interface AboutProps {
  profile: ProfileData | null;
}

export default function About({ profile }: AboutProps) {
  const { ref } = useSectionInView("About", 0.5);

  // Default about text if no profile
  const aboutText =
    profile?.about ||
    `Currently pursuing a degree in Informatics Engineering at Universitas Ahmad Dahlan, I realized early on that my passion lies in building comprehensive digital ecosystems. Through intensive programs like Bangkit Academy & IDCamp, I honed my skills to bridge the gap between platforms. My favorite part of programming is architecting solutions that work seamlessly across devices. I thrive on tackling complex problems in Mobile (Kotlin/Flutter) and Web (Next.js) environments.

My core stack includes Kotlin, Flutter, React, Next.js, and TypeScript. Beyond building apps, I am deeply interested in Automation, CI/CD pipelines, and Library Development. I am currently looking for professional opportunities where I can apply my hybrid expertise to deliver high-quality software.

When I'm not coding, I enjoy exploring the depths of Blockchain technology and experimenting with system-level languages like Rust. I also believe in continuous growth and love sharing knowledge within the developer community.`;

  // Split into paragraphs
  const paragraphs = aboutText.split("\n\n").filter((p) => p.trim());

  // Icons for each paragraph
  const paragraphIcons = [
    <Sparkles
      key='sparkles'
      className='w-5 h-5 text-purple-500 dark:text-purple-400'
    />,
    <Code2 key='code' className='w-5 h-5 text-blue-500 dark:text-blue-400' />,
    <Rocket
      key='rocket'
      className='w-5 h-5 text-emerald-500 dark:text-emerald-400'
    />,
  ];

  return (
    <WarpBackground
      className='will-change-transform w-full min-h-[600px] transform-gpu z-20 p-6 md:p-10 rounded-2xl flex items-center justify-center bg-linear-to-br from-gray-50/50 via-white/30 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-200/20 dark:shadow-gray-900/50'
      beamSize={4}
      beamsPerSide={4}
      beamDuration={4}
      gridColor='rgba(99, 102, 241, 0.15)'>
      {/* Background decorations - full width */}
      <div className='absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none z-10 overflow-hidden'>
        <div
          className='absolute top-20 left-0 w-96 h-96 bg-fuchsia-500/10 dark:bg-fuchsia-500/10 rounded-full blur-3xl animate-float-1'
        />
        <div
          className='absolute bottom-20 right-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl animate-float-2'
        />
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-3xl animate-float-3'
        />
      </div>
      <section
        ref={ref as React.LegacyRef<HTMLElement>}
        id='about'
        className='max-w-4xl scroll-mt-28 px-4'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}>
          {/* Header with gradient */}
          <div className='text-center mb-8'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-green-600 via-lime-500 to-emerald-400
 mb-4 shadow-lg shadow-purple-500/25'>
              <Sparkles className='w-8 h-8 text-white' />
            </motion.div>
            <SectionHeading>About me</SectionHeading>
            <p className='text-gray-600 dark:text-gray-400 text-sm mt-2'>
              Get to know the person behind the code
            </p>
          </div>

          {/* Content cards */}
          <div className='flex flex-col gap-5'>
            {paragraphs.map((paragraph, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                className='group relative'>
                {/* Card */}
                <div className='relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md hover:border-indigo-300/50 dark:hover:border-indigo-600/50 transition-all duration-300'>
                  {/* Icon badge */}
                  <div className='absolute -left-3 top-5 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform'>
                    {paragraphIcons[index] || paragraphIcons[0]}
                  </div>

                  {/* Text content */}
                  <div className='ml-6 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed text-left'>
                    {parse(paragraph)}
                  </div>
                </div>

                {/* Connecting line */}
                {index < paragraphs.length - 1 && (
                  <div className='absolute left-2 top-16 w-0.5 h-5 bg-linear-to-b from-indigo-400/50 to-transparent' />
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className='flex justify-center mt-8'>
            <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200/50 dark:border-indigo-700/50'>
              <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
              <span className='text-xs text-gray-600 dark:text-gray-400 font-medium'>
                Open to opportunities
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </WarpBackground>
  );
}
