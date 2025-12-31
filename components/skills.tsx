"use client";

import React, { useRef } from "react";
import SectionHeading from "./ui/section-heading";
import { useSectionInView } from "@/lib/hooks";
import { m, useScroll, useTransform } from "framer-motion";
import { IconCloud } from "@/components/ui/icon-cloud";
import { Cpu, Sparkles, Zap } from "lucide-react";

interface SkillData {
  id: string;
  name: string;
  category: string | null;
}

interface SkillsProps {
  skills: SkillData[];
}

// Default slugs for icon cloud if no skills in DB match
const defaultSlugs = [
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
  "kotlin",
  "supabase",
];

// Map skill names to simpleicons slugs
function getSlug(skillName: string): string {
  const slugMap: Record<string, string> = {
    html: "html5",
    css: "css3",
    javascript: "javascript",
    typescript: "typescript",
    react: "react",
    nextjs: "nextdotjs",
    "next.js": "nextdotjs",
    vue: "vuedotjs",
    "vue.js": "vuedotjs",
    angular: "angular",
    node: "nodedotjs",
    "node.js": "nodedotjs",
    python: "python",
    java: "java",
    kotlin: "kotlin",
    swift: "swift",
    flutter: "flutter",
    dart: "dart",
    android: "android",
    ios: "ios",
    firebase: "firebase",
    postgresql: "postgresql",
    mysql: "mysql",
    mongodb: "mongodb",
    docker: "docker",
    git: "git",
    github: "github",
    figma: "figma",
    tailwind: "tailwindcss",
    tailwindcss: "tailwindcss",
    laravel: "laravel",
    php: "php",
    supabase: "supabase",
  };

  const lower = skillName.toLowerCase();
  return slugMap[lower] || lower.replace(/\s+/g, "").replace(/\./g, "dot");
}

export default function Skills({ skills }: SkillsProps) {
  const { ref } = useSectionInView("Skills", 0.5);

  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef as React.RefObject<HTMLDivElement>,
    offset: ["0 1", "1.5 1"],
  });
  const headingScale = useTransform(headingProgress, [0, 1], [0.8, 1]);
  const headingOpacity = useTransform(headingProgress, [0, 1], [0.6, 1]);

  const cloudRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cloudProgress } = useScroll({
    target: cloudRef as React.RefObject<HTMLDivElement>,
    offset: ["0 1", "1.5 1"],
  });
  const cloudScale = useTransform(cloudProgress, [0, 1], [0.8, 1]);
  const cloudOpacity = useTransform(cloudProgress, [0, 1], [0.6, 1]);

  // Generate slugs from skills or use defaults
  const slugs =
    skills.length > 0 ? skills.map((s) => getSlug(s.name)) : defaultSlugs;

  // Generate URL images
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  // Get unique categories
  const categories = Array.from(
    new Set(skills.map((s) => s.category).filter(Boolean))
  );

  return (
    <section
      id='skills'
      ref={ref as React.LegacyRef<HTMLElement>}
      className='mb-10 w-full scroll-mt-28 text-center md:mb-28 relative py-10 px-4'>
      {/* Background decorations - full width */}
      <div className='absolute inset-y-0  left-1/2 -translate-x-1/2 w-screen pointer-events-none z-10 overflow-hidden'>
        <div
          className='absolute top-0 right-1/4 w-96 h-96 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl animate-float-4'
        />
        <div
          className='absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl animate-float-5'
        />
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/3 dark:bg-emerald-500/5 rounded-full blur-3xl animate-float-3'
        />
      </div>

      {/* Header section */}
      <m.div
        ref={headingRef as React.LegacyRef<HTMLDivElement>}
        style={{ scale: headingScale, opacity: headingOpacity }}
        className='mb-8 relative z-10 max-w-2xl mx-auto'>
        <m.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-teal-500 via-cyan-500 to-emerald-500 mb-4 shadow-lg shadow-cyan-500/25'>
          <Cpu className='w-8 h-8 text-white' />
        </m.div>

        <SectionHeading>My Skills</SectionHeading>

        <p className='text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md mx-auto'>
          Technologies and tools I use to bring ideas to life
        </p>

        {/* Stats badges */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className='flex items-center justify-center gap-3 mt-6 flex-wrap'>
          <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-200/50 dark:border-cyan-700/50'>
            <Sparkles className='w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400' />
            <span className='text-xs font-medium text-cyan-700 dark:text-cyan-300'>
              {slugs.length}+ Technologies
            </span>
          </div>
          <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-200/50 dark:border-emerald-700/50'>
            <Zap className='w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400' />
            <span className='text-xs font-medium text-emerald-700 dark:text-emerald-300'>
              Always Learning
            </span>
          </div>
        </m.div>
      </m.div>

      {/* Icon Cloud Container */}
      <div className='flex items-center justify-center scale-120 md:scale-125 relative z-10 py-12'>
        <m.div
          ref={cloudRef as React.LegacyRef<HTMLDivElement>}
          style={{ scale: cloudScale, opacity: cloudOpacity }}
          className='relative'>
          {/* Decorative ring */}
          <div
            className='absolute -inset-4 rounded-full border border-dashed border-gray-300/50 dark:border-gray-600/50'
            style={{ animation: "spin 30s linear infinite" }}
          />

          {/* Glow effect */}
          <div className='absolute -inset-8 bg-linear-to-r from-cyan-500/10 via-transparent to-teal-500/10 rounded-full blur-2xl' />

          {/* Cloud container - fixed size, centered */}
          <div className='relative bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-200/20 dark:shadow-black/30 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] flex items-center justify-center overflow-hidden'>
            <IconCloud images={images} />
          </div>
        </m.div>
      </div>

      {/* Skill categories */}
      {categories.length > 0 && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className='flex flex-wrap justify-center gap-2 mt-10 relative z-10'>
          {categories.slice(0, 6).map((category, index) => (
            <span
              key={index}
              className='px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300'>
              {category}
            </span>
          ))}
        </m.div>
      )}

      {/* Bottom instruction */}
      <p
        // initial={{ opacity: 0 }}
        // whileInView={{ opacity: 1 }}
        // viewport={{ once: true }}
        // transition={{ delay: 0.8 }}
        className='text-center text-xs text-gray-400 dark:text-gray-500 mt-8 relative z-10'>
        Drag to rotate • Click icons to focus
      </p>
    </section>
  );
}
