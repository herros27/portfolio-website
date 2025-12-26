"use client";

import React, { useRef } from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  // 1. Setup animasi khusus untuk Heading
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headingScrollY } = useScroll({
    target: headingRef as React.RefObject<HTMLDivElement>,
    offset: ["1 1", "10.5 1"],
  });

  const headingScale = useTransform(headingScrollY, [0, 1], [0.8, 1]);
  const headingOpacity = useTransform(headingScrollY, [0, 1], [0.6, 1]);

  return (
    <section id='experience' ref={ref} className='scroll-mt-28 mb-28 sm:mb-40'>
      {/* 2. Bungkus Heading dengan Motion */}
      <motion.div
        ref={headingRef}
        style={{ scale: headingScale, opacity: headingOpacity }}
        className='mb-8' // Tambah margin biar rapi
      >
        <SectionHeading>My experience</SectionHeading>
      </motion.div>

      <VerticalTimeline lineColor=''>
        {experiencesData.map((item, index) => (
          <TimelineElement key={index} item={item} />
        ))}
      </VerticalTimeline>
    </section>
  );
}

function TimelineElement({ item }: { item: (typeof experiencesData)[number] }) {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLDivElement>,
    offset: ["0 1", "1.5 1"],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className='vertical-timeline-element'>
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
        // 3. Animasi TANGGAL: Bungkus string tanggal dengan motion.span
        date={
          (
            <motion.span
              style={{ opacity: opacityProgess, display: "inline-block" }}>
              {item.date}
            </motion.span>
          ) as any // Casting as any karena library expect string
        }
        // 4. Animasi ICON: Bungkus icon dengan motion.div menggunakan scaleProgress yang sama
        icon={
          <motion.div
            style={{ scale: scaleProgess, opacity: opacityProgess }}
            className='w-full h-full  '>
            {item.icon}
          </motion.div>
        }
        iconStyle={{
          background: theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
          fontSize: "1.5rem",
          boxShadow: "none", // Hilangkan shadow bawaan agar animasi opacity lebih bersih
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
          <p className='font-normal mt-0!'>{item.location}</p>
          <p className='mt-1! font-normal! text-gray-700 dark:text-white/75'>
            {item.description}
          </p>
        </motion.div>
      </VerticalTimelineElement>
    </div>
  );
}
