"use client";

import React, { useRef } from "react";
import SectionHeading from "./ui/section-heading";
import { useSectionInView } from "@/lib/hooks";
import { motion, useScroll, useTransform } from "framer-motion";
import { IconCloud } from "@/components/ui/icon-cloud";

const slugs = [
  // "vuedotjs",

  "laravel",
  "netlify",
  "nextdotjs",
  "tailwindcss",
  "typescript",
  "javascript",
  "dart",
  "react",
  "flutter",
  "android",
  "html5",
  "python",
  "nodedotjs",
  "postgresql",
  "firebase",
  "docker",
  "git",
  "github",
  "androidstudio",
  "figma",
  "notion",
  "postman",
  "python",
  "kotlin",
  "supabase",
];
// Generate URL images
const images = slugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
);

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  // 1. Setup Animasi untuk HEADING
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef as React.RefObject<HTMLDivElement>,
    offset: ["0 1", "1.5 1"],
  });
  const headingScale = useTransform(headingProgress, [0, 1], [0.8, 1]);
  const headingOpacity = useTransform(headingProgress, [0, 1], [0.6, 1]);

  // 2. Setup Animasi untuk ICON CLOUD (Content)
  const cloudRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cloudProgress } = useScroll({
    target: cloudRef as React.RefObject<HTMLDivElement>,
    offset: ["0 1", "1.5 1"],
  });
  const cloudScale = useTransform(cloudProgress, [0, 1], [0.8, 1]);
  const cloudOpacity = useTransform(cloudProgress, [0, 1], [0.6, 1]);

  return (
    <section
      id='skills'
      ref={ref as any}
      className='mb-10 max-w-212 scroll-mt-28 text-center md:mb-28'>
      {/* 3. Terapkan Animasi ke Heading */}
      <motion.div
        ref={headingRef as any}
        style={{ scale: headingScale, opacity: headingOpacity }}
        className='mb-8'>
        <SectionHeading>My Skills</SectionHeading>
      </motion.div>

      {/* Container Layout */}
      <div className='flex items-center justify-center'>
        {/* 4. Terapkan Animasi ke IconCloud */}
        {/* Note: Saya menghapus 'scale-150' statis karena kita sudah pakai dynamic scaling dari motion */}
        <motion.div
          ref={cloudRef as any}
          style={{ scale: cloudScale, opacity: cloudOpacity }}
          className='relative scale-3d md:scale-200 pt-0 md:pt-20 flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg '>
          <IconCloud images={images} />
        </motion.div>
      </div>
    </section>
  );
}
