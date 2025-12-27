"use client";

import React, { useRef } from "react";
import SectionHeading from "./ui/section-heading";
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
  // Gunakan Generic HTMLElement agar aman
  const { ref } = useSectionInView<HTMLElement>("Experience", 0.30);

  // 1. Setup animasi Heading
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headingScrollY } = useScroll({
    target: headingRef as React.RefObject<HTMLDivElement>,
    offset: ["0 1", "1.5 1"],
  });

  const headingScale = useTransform(headingScrollY, [0, 1], [0.8, 1]);
  const headingOpacity = useTransform(headingScrollY, [0, 1], [0.6, 1]);

  return (
    <section id='experience' ref={ref} className='scroll-mt-28 mb-28 sm:mb-40'>
      {/* 2. SOLUSI FIX ERROR:
          Bungkus luar pakai DIV BIASA untuk memegang 'ref' dan 'className'.
          Div biasa tidak akan pernah error soal tipe data. */}
      <div ref={headingRef} className='mb-8'>
        {/* Animasi ditaruh di dalam. motion.div ini TIDAK memegang ref, jadi aman. */}
        <motion.div style={{ scale: headingScale, opacity: headingOpacity }}>
          <SectionHeading>My experience</SectionHeading>
        </motion.div>
      </div>

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

  // Ref khusus untuk elemen timeline ini
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLDivElement>,
    offset: ["0 1", "1.5 1"],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    // 3. Wrapper per Item: Gunakan DIV BIASA.
    // Ini menangani deteksi scroll (ref) dan layout CSS library.
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
        // Animasi TANGGAL
        date={
          (
            <motion.span
              style={{ opacity: opacityProgess, display: "inline-block" }}>
              {item.date}
            </motion.span>
          ) as unknown as string
        }
        // Animasi ICON
        icon={
          <motion.div
            className='w-full h-full'
            style={{ scale: scaleProgess, opacity: opacityProgess }}>
            {item.icon}
          </motion.div>
        }
        iconStyle={{
          background: theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
          fontSize: "1.5rem",
          boxShadow: "none",
          border: theme === "light" ? "1px solid rgba(0,0,0,0.05)" : "none",
        }}>
        {/* Animasi KARTU (Card) */}
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
