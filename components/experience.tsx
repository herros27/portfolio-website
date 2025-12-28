"use client";

import React, { useRef } from "react";
import SectionHeading from "./ui/section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { motion, useScroll, useTransform } from "framer-motion";
import { CgWorkAlt } from "react-icons/cg";
import { FaAndroid } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { SiFlutter } from "react-icons/si";

interface ExperienceData {
  id: string;
  title: string;
  company: string;
  location: string | null;
  description: string;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
  icon: string | null;
}

interface ExperienceProps {
  experiences: ExperienceData[];
}

// Map icon names to React icons
function getIcon(iconName: string | null) {
  switch (iconName) {
    case "graduation":
      return <LuGraduationCap />;
    case "android":
      return <FaAndroid />;
    case "flutter":
      return <SiFlutter />;
    case "work":
    default:
      return <CgWorkAlt />;
  }
}

// Format date range
function formatDateRange(startDate: Date, endDate: Date | null, current: boolean) {
  const start = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  
  if (current || !endDate) {
    return `${start} - Present`;
  }
  
  const end = new Date(endDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  
  return `${start} - ${end}`;
}

export default function Experience({ experiences }: ExperienceProps) {
  const { ref } = useSectionInView<HTMLElement>("Experience", 0.30);

  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headingScrollY } = useScroll({
    target: headingRef as React.RefObject<HTMLDivElement>,
    offset: ["0 1", "1.5 1"],
  });

  const headingScale = useTransform(headingScrollY, [0, 1], [0.8, 1]);
  const headingOpacity = useTransform(headingScrollY, [0, 1], [0.6, 1]);

  return (
    <section id='experience' ref={ref as React.LegacyRef<HTMLElement>} className='scroll-mt-28 mb-28 sm:mb-40'>
      <div ref={headingRef} className='mb-8'>
        <motion.div style={{ scale: headingScale, opacity: headingOpacity }}>
          <SectionHeading>My experience</SectionHeading>
        </motion.div>
      </div>

      <VerticalTimeline lineColor=''>
        {experiences.map((item) => (
          <TimelineElement key={item.id} item={item} />
        ))}
      </VerticalTimeline>
    </section>
  );
}

function TimelineElement({ item }: { item: ExperienceData }) {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLDivElement>,
    offset: ["0 1", "1.5 1"],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const dateStr = formatDateRange(item.startDate, item.endDate, item.current);

  return (
    <div ref={ref} className='vertical-timeline-element'>
      <VerticalTimelineElement
        visible={true}
        contentStyle={{
          background: "transparent",
          boxShadow: "none",
          border: "none",
          padding: 0,
        }}
        contentArrowStyle={{
          borderRight:
            theme === "light"
              ? "0.4rem solid #9ca3af"
              : "0.4rem solid rgba(255, 255, 255, 0.5)",
          display: "none",
        }}
        date={
          (
            <motion.span
              style={{ opacity: opacityProgess, display: "inline-block" }}>
              {dateStr}
            </motion.span>
          ) as unknown as string
        }
        icon={
          <motion.div
            className='w-full h-full'
            style={{ scale: scaleProgess, opacity: opacityProgess }}>
            {getIcon(item.icon)}
          </motion.div>
        }
        iconStyle={{
          background: theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
          fontSize: "1.5rem",
          boxShadow: "none",
          border: theme === "light" ? "1px solid rgba(0,0,0,0.05)" : "none",
        }}>
        <motion.div
          style={{
            scale: scaleProgess,
            opacity: opacityProgess,
          }}
          className='p-6 rounded-lg shadow-md border border-black/5 overflow-hidden relative'
          initial={false}>
          <div
            className={`absolute inset-0 -z-10 ${
              theme === "light" ? "bg-[#f3f4f6]" : "bg-[rgba(255,255,255,0.05)]"
            }`}></div>

          <h3 className='font-semibold capitalize'>{item.title}</h3>
          <p className='font-normal mt-0!'>{item.company}{item.location ? `, ${item.location}` : ""}</p>
          <p className='mt-1! font-normal! text-gray-700 dark:text-white/75'>
            {item.description}
          </p>
        </motion.div>
      </VerticalTimelineElement>
    </div>
  );
}
