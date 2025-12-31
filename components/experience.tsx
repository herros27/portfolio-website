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
import { Briefcase, Sparkles, Clock } from "lucide-react";

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
function formatDateRange(
  startDate: Date,
  endDate: Date | null,
  current: boolean
) {
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
  const { ref } = useSectionInView<HTMLElement>("Experience", 0.3);

  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headingScrollY } = useScroll({
    target: headingRef as React.RefObject<HTMLDivElement>,
    offset: ["0 1", "1.5 1"],
  });

  const headingScale = useTransform(headingScrollY, [0, 1], [0.8, 1]);
  const headingOpacity = useTransform(headingScrollY, [0, 1], [0.6, 1]);

  return (
    <section
      id='experience'
      ref={ref as React.LegacyRef<HTMLElement>}
      className='scroll-mt-28 mb-28 sm:mb-40 relative py-10 px-4'>
      {/* Background decorations - full width */}
      <div className='absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none z-10 overflow-hidden'>
        <div
          className='absolute top-20 left-0 w-96 h-96 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-3xl animate-float-4'
        />
        <div
          className='absolute bottom-20 right-0 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl animate-float-5'
        />
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/3 dark:bg-fuchsia-500/5 rounded-full blur-3xl animate-float-6'
        />
      </div>

      {/* Header section */}
      <div ref={headingRef} className='mb-10 relative z-10'>
        <motion.div
          style={{ scale: headingScale, opacity: headingOpacity }}
          className='text-center'>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-rose-500 via-pink-500 to-fuchsia-500 mb-4 shadow-lg shadow-pink-500/25 mx-auto'>
            <Briefcase className='w-8 h-8 text-white' />
          </motion.div>

          <SectionHeading>My Experience</SectionHeading>

          <p className='text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md mx-auto'>
            My professional journey and key milestones
          </p>

          {/* Stats badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className='flex items-center justify-center gap-3 mt-6 flex-wrap'>
            <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 border border-rose-200/50 dark:border-rose-700/50'>
              <Sparkles className='w-3.5 h-3.5 text-rose-600 dark:text-rose-400' />
              <span className='text-xs font-medium text-rose-700 dark:text-rose-300'>
                {experiences.length} Experiences
              </span>
            </div>
            <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-200/50 dark:border-emerald-700/50'>
              <Clock className='w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400' />
              <span className='text-xs font-medium text-emerald-700 dark:text-emerald-300'>
                Growing Daily
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className='relative z-10'>
        <VerticalTimeline lineColor=''>
          {experiences.map((item, index) => (
            <TimelineElement key={item.id} item={item} index={index} />
          ))}
        </VerticalTimeline>
      </div>

      {/* Bottom instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className='text-center text-xs text-gray-400 dark:text-gray-500 mt-12 relative z-10'>
        Scroll to explore my journey
      </motion.p>
    </section>
  );
}

function TimelineElement({
  item,
  index,
}: {
  item: ExperienceData;
  index: number;
}) {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLDivElement>,
    offset: ["0 1", "1.5 1"],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const dateStr = formatDateRange(item.startDate, item.endDate, item.current);

  // Alternating gradient colors
  const gradients = [
    "from-rose-500/10 to-pink-500/5",
    "from-fuchsia-500/10 to-purple-500/5",
    "from-violet-500/10 to-indigo-500/5",
    "from-pink-500/10 to-rose-500/5",
  ];
  const gradient = gradients[index % gradients.length];

  const iconGradients = [
    "from-rose-500 to-pink-500",
    "from-fuchsia-500 to-purple-500",
    "from-violet-500 to-indigo-500",
    "from-pink-500 to-rose-500",
  ];
  const iconGradient = iconGradients[index % iconGradients.length];

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
              style={{ opacity: opacityProgess, display: "inline-block" }}
              className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              {dateStr}
            </motion.span>
          ) as unknown as string
        }
        icon={
          <motion.div
            className='absolute inset-0 flex items-center justify-center'
            style={{ scale: scaleProgess, opacity: opacityProgess }}>
            <div className='pt-2 flex items-center justify-center'>
              {getIcon(item.icon)}
            </div>
          </motion.div>
        }
        iconStyle={{
          background:
            theme === "light"
              ? "linear-gradient(135deg, #f43f5e, #ec4899)"
              : "linear-gradient(135deg, #f43f5e, #ec4899)",
          color: "white",
          fontSize: "1.25rem",
          boxShadow: "0 4px 20px rgba(244, 63, 94, 0.3)",
          border: "2px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <motion.div
          style={{
            scale: scaleProgess,
            opacity: opacityProgess,
          }}
          className={`p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden relative bg-linear-to-br ${gradient} backdrop-blur-sm hover:shadow-xl transition-shadow duration-300`}
          initial={false}>
       
          {/* Decorative corner */}
          <div
            className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-bl ${iconGradient} opacity-10 rounded-bl-full`}></div>

          {/* Current badge */}
          {item.current && (
            <div className='absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-200/50 dark:border-emerald-700/50'>
              <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
              <span className='text-[10px] font-medium text-emerald-700 dark:text-emerald-300'>
                Current
              </span>
            </div>
          )}

          <h3 className='font-bold text-lg text-gray-900 dark:text-white capitalize'>
            {item.title}
          </h3>
          <p className='font-medium text-sm text-gray-600 dark:text-gray-300 mt-1'>
            {item.company}
            {item.location ? ` • ${item.location}` : ""}
          </p>
          <p className='mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300'>
            {item.description}
          </p>
        </motion.div>
      </VerticalTimelineElement>
    </div>
  );
}
