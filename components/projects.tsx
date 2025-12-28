"use client";

import React from "react";
import SectionHeading from "./ui/section-heading";
import Project from "./ui/projectCard";
import { useSectionInView } from "@/lib/hooks";

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
    <section ref={ref as React.LegacyRef<HTMLElement>} id='projects' className='scroll-mt-28 mb-28'>
      <SectionHeading>My projects</SectionHeading>
      <div>
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} imageUrl={project.imageUrl || ""} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
