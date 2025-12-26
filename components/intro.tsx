"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { ThreeDMarquee } from "@/components/3d-marquee";
import { BorderBeam } from "@/components/ui/border-beam";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useImages } from "@/components/providers/splash-provider";
export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  // const [images, setImages] = useState<string[]>([]);
  const images = useImages();
  return (
    <section
      ref={ref as React.Ref<HTMLDivElement>}
      id='home'
      className='relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden py-10 sm:py-20 text-center'>
      <div className='relative z-20 mx-auto w-full max-w-[50rem] px-4 sm:px-6'>
        <div className='flex items-center justify-center'>
          <div className='relative'>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}>
              <div className='relative overflow-hidden rounded-full shadow-xl'>
                <BorderBeam duration={6} size={200} />
                <Image
                  src='https://res.cloudinary.com/dmwow6mmu/image/upload/v1753981088/Foto_CoCard_KKN_uoazuh.png'
                  alt='Kemas Khairunsyah portrait'
                  width='192'
                  height='192'
                  quality='95'
                  priority={true}
                  className='h-24 w-24 rounded-full border-[0.35rem] border-white object-cover sm:h-32 sm:w-32'
                />
              </div>
            </motion.div>

            <motion.span
              className='absolute bottom-0 right-0 text-3xl sm:text-4xl'
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 125,
                delay: 0.1,
                duration: 0.7,
              }}>
              👋
            </motion.span>
          </div>
        </div>

        <motion.h1
          className='mb-8 mt-6 px-2 text-xl font-medium !leading-[1.5] sm:mb-10 sm:text-3xl lg:text-4xl'
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}>
          <span className='font-bold'>Hi, I'm Kemas.</span> I'm a{" "}
          <span className='font-bold'>programmer & developer</span> with a
          passion for{" "}
          <span className='italic'>mobile, web, and desktop automation</span>. I
          enjoy exploring{" "}
          <span className='underline decoration-wavy decoration-blue-400/50'>
            CI/CD pipelines
          </span>
          ,{" "}
          <span className='underline decoration-wavy decoration-blue-400/50'>
            library development
          </span>
          , and diving deep into{" "}
          <span className='underline decoration-wavy decoration-blue-400/50'>
            Blockchain technology
          </span>
          .
        </motion.h1>

        <motion.div
          className='flex flex-col items-center justify-center gap-4 px-4 text-lg font-medium sm:flex-row sm:gap-5'
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
          }}>
          <InteractiveHoverButton className='group flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-white outline-hidden transition hover:scale-105 hover:bg-gray-950 focus:scale-105 active:scale-100 sm:w-auto'>
            <Link
              href='#contact'
              onClick={() => {
                setActiveSection("Contact");
                setTimeOfLastClick(Date.now());
              }}>
              Contact me here
            </Link>
          </InteractiveHoverButton>

          <ShinyButton
            className='group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3 outline-hidden transition hover:scale-105 active:scale-100 dark:bg-white/10 sm:w-auto'
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/CV.pdf";
              link.download = "KemasCV.pdf";
              link.click();
            }}>
            Download CV{" "}
            <HiDownload className='opacity-60 transition group-hover:translate-y-1' />
          </ShinyButton>

          <div className='flex gap-4'>
            <a
              className='flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 dark:bg-white/10 dark:text-white/60'
              href='https://www.linkedin.com/in/kemaskhairunsyah/?locale=in_ID'
              target='_blank'
              aria-label='View my LinkedIn profile'>
              <BsLinkedin />
            </a>

            <a
              className='flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-[1.35rem] text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 dark:bg-white/10 dark:text-white/60'
              href='https://github.com/herros27'
              target='_blank'
              aria-label='View my GitHub profile'>
              <FaGithubSquare />
            </a>
          </div>
        </motion.div>
      </div>

      <div className='absolute inset-0 z-10 h-full w-full bg-white/60 backdrop-blur-[2px] dark:bg-black/60' />
      {/* ThreeDMarquee akan langsung menerima images yang sudah diload */}
      <ThreeDMarquee
        className='pointer-events-none absolute inset-0 z-0 h-full w-full opacity-50'
        images={images}
      />
    </section>
  );
}
