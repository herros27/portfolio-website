"use client";

import React, { useRef } from "react";
import SectionHeading from "./ui/section-heading";
import { useSectionInView } from "@/lib/hooks";
import { motion, useScroll, useTransform } from "framer-motion";
import { IconCloud } from "@/components/ui/icon-cloud";

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
    "html": "html5",
    "css": "css3",
    "javascript": "javascript",
    "typescript": "typescript",
    "react": "react",
    "nextjs": "nextdotjs",
    "next.js": "nextdotjs",
    "vue": "vuedotjs",
    "vue.js": "vuedotjs",
    "angular": "angular",
    "node": "nodedotjs",
    "node.js": "nodedotjs",
    "python": "python",
    "java": "java",
    "kotlin": "kotlin",
    "swift": "swift",
    "flutter": "flutter",
    "dart": "dart",
    "android": "android",
    "ios": "ios",
    "firebase": "firebase",
    "postgresql": "postgresql",
    "mysql": "mysql",
    "mongodb": "mongodb",
    "docker": "docker",
    "git": "git",
    "github": "github",
    "figma": "figma",
    "tailwind": "tailwindcss",
    "tailwindcss": "tailwindcss",
    "laravel": "laravel",
    "php": "php",
    "supabase": "supabase",
  };
  
  const lower = skillName.toLowerCase();
  return slugMap[lower] || lower.replace(/\s+/g, "").replace(/\./g, "dot");
}

export default function Skills({ skills }: SkillsProps) {
  const { ref } = useSectionInView("Skills", 0.50);

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
  const slugs = skills.length > 0 
    ? skills.map(s => getSlug(s.name))
    : defaultSlugs;
  
  // Generate URL images
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <section
      id='skills'
      ref={ref as React.LegacyRef<HTMLElement>}
      className='mb-10 max-w-212 scroll-mt-28 text-center md:mb-28'>
      <motion.div
        ref={headingRef as React.LegacyRef<HTMLDivElement>}
        style={{ scale: headingScale, opacity: headingOpacity }}
        className='mb-8'>
        <SectionHeading>My Skills</SectionHeading>
      </motion.div>

      <div className='flex items-center justify-center'>
        <motion.div
          ref={cloudRef as React.LegacyRef<HTMLDivElement>}
          style={{ scale: cloudScale, opacity: cloudOpacity }}
          className='relative scale-3d md:scale-200 pt-0 md:pt-20 flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg '>
          <IconCloud images={images} />
        </motion.div>
      </div>
    </section>
  );
}
