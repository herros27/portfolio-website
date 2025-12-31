"use client";

import React from "react";
import SectionHeading from "./ui/section-heading";
import Project from "./ui/projectCard";
import { useSectionInView } from "@/lib/hooks";
import { m } from "framer-motion";
import { FolderKanban, Sparkles } from "lucide-react";

interface ProjectData {
  title: string;
  description: string;
  imageUrl: string | null;
  tags: string[];
  demoUrl?: string | null;
  githubUrl?: string | null;
}

interface ProjectsProps {
  projects: ProjectData[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { ref } = useSectionInView("Projects", 0.2);

  return (
    <section
      ref={ref as React.LegacyRef<HTMLElement>}
      id='projects'
      className='scroll-mt-28 mb-28 relative py-10'>
      {/* Background decorations - full width */}
      <div className='absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none z-10 overflow-hidden'>
        <m.div
           animate={{
            scale: [1, 1.25, 1],
            x: [0, 80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className='absolute top-20 left-0 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl'
        />
        <m.div
           animate={{
            scale: [1, 1.25, 1],
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className='absolute bottom-20 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl'
        />
        <m.div
           animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/3 dark:bg-violet-500/5 rounded-full blur-3xl'
        />
      </div>

      {/* Header section */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='text-center mb-12 relative z-10'>
        <m.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-500 via-blue-500 to-violet-500 mb-4 shadow-lg shadow-blue-500/25'>
          <FolderKanban className='w-8 h-8 text-white' />
        </m.div>

        <SectionHeading>My Projects</SectionHeading>

        <p className='text-gray-600 dark:text-gray-400 text-sm mt-2 max-w-md mx-auto'>
          A collection of work that showcases my expertise in building digital
          solutions
        </p>

        {/* Stats badges */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className='flex items-center justify-center gap-3 mt-6'>
          <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-200/50 dark:border-blue-700/50'>
            <Sparkles className='w-3.5 h-3.5 text-blue-600 dark:text-blue-400' />
            <span className='text-xs font-medium text-blue-700 dark:text-blue-300'>
              {projects.length} Projects
            </span>
          </div>
          <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-200/50 dark:border-emerald-700/50'>
            <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
            <span className='text-xs font-medium text-emerald-700 dark:text-emerald-300'>
              Featured Work
            </span>
          </div>
        </m.div>
      </m.div>

      {/* Projects list */}
      <div className='relative z-10 space-y-8'>
        {projects.map((project, index) => (
          <Project
            key={index}
            {...project}
            imageUrl={project.imageUrl || ""}
            index={index}
          />
        ))}
      </div>

      {/* Bottom decoration */}
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className='flex justify-center mt-12'>
        <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 border border-blue-200/50 dark:border-blue-700/50'>
          <span className='text-xs text-gray-600 dark:text-gray-400 font-medium'>
            Hover cards to interact • Click links to explore
          </span>
        </div>
      </m.div>
    </section>
  );
}
