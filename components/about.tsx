"use client";

import React from "react";
import SectionHeading from "./ui/section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { WarpBackground } from "@/components/ui/warp-background";
import { LightRays } from "@/components/ui/light-rays";
import parse from "html-react-parser";

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

  return (
    <section
      ref={ref as React.LegacyRef<HTMLElement>}
      id='about'
      className='mb-28 max-w-5xl text-center leading-8 sm:mb-40 scroll-mt-28'>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}>
        <WarpBackground className='will-change-transform transform-gpu z-20 p-4 md:p-8 rounded-xl'>
          <LightRays className='will-change-transform transform-gpu animate-pulse' />
          <SectionHeading>About me</SectionHeading>

          <div className='flex flex-col gap-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300'>
            {paragraphs.map((paragraph, index) => (
              // <p key={index}>{paragraph}</p>
              <div key={index}>{parse(paragraph)}</div>
            ))}
          </div>
        </WarpBackground>
      </motion.div>
    </section>
  );
}
