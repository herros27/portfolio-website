"use client";

import React from "react";
import SectionHeading from "./ui/section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { WarpBackground } from "@/components/ui/warp-background";
import { LightRays } from "@/components/ui/light-rays";
import { SectionName } from "@/lib/types";
export default function About() {
  const { ref } = useSectionInView("About", 1);

  return (
    <section
      ref={ref}
      id='about'
      className='mb-28 max-w-5xl text-center leading-8 sm:mb-40 scroll-mt-28'>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}>
        {/* WarpBackground biasanya butuh padding internal agar konten tidak menempel ke efeknya */}
        <WarpBackground className='will-change-transform transform-gpu z-20 p-4 md:p-8 rounded-xl'>
          <LightRays className='will-change-transform transform-gpu animate-pulse' />
          <SectionHeading>About me</SectionHeading>

          {/* Typografi yang responsif */}
          <div className='flex flex-col gap-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300'>
            <p>
              Currently pursuing a degree in{" "}
              <span className='font-medium text-gray-900 dark:text-white'>
                Informatics Engineering
              </span>{" "}
              at Universitas Ahmad Dahlan, I realized early on that my passion
              lies in building comprehensive digital ecosystems. Through
              intensive programs like{" "}
              <span className='font-medium text-gray-900 dark:text-white'>
                Bangkit Academy & IDCamp
              </span>
              , I honed my skills to bridge the gap between platforms.{" "}
              <span className='italic'>My favorite part of programming</span> is
              architecting solutions that work seamlessly across devices. I{" "}
              <span className='underline decoration-wavy decoration-gray-400'>
                thrive
              </span>{" "}
              on tackling complex problems in{" "}
              <span className='font-medium text-gray-900 dark:text-white'>
                Mobile (Kotlin/Flutter)
              </span>{" "}
              and{" "}
              <span className='font-medium text-gray-900 dark:text-white'>
                Web (Next.js)
              </span>{" "}
              environments.
            </p>

            <p>
              My core stack includes{" "}
              <span className='font-medium text-gray-900 dark:text-white'>
                Kotlin, Flutter, React, Next.js, and TypeScript
              </span>
              . Beyond building apps, I am deeply interested in{" "}
              <span className='font-medium text-gray-900 dark:text-white'>
                Automation, CI/CD pipelines, and Library Development
              </span>
              . I am currently looking for{" "}
              <span className='font-medium text-gray-900 dark:text-white'>
                professional opportunities
              </span>{" "}
              where I can apply my hybrid expertise to deliver high-quality
              software.
            </p>

            <p>
              <span className='italic'>When I'm not coding</span>, I enjoy
              exploring the depths of{" "}
              <span className='font-medium text-gray-900 dark:text-white'>
                Blockchain technology
              </span>{" "}
              and experimenting with system-level languages like Rust. I also
              believe in continuous growth and love{" "}
              <span className='font-medium text-gray-900 dark:text-white'>
                sharing knowledge
              </span>{" "}
              within the developer community.
            </p>
          </div>
        </WarpBackground>
      </motion.div>
    </section>
  );
}
