"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { ThreeDMarquee } from "@/components/3d-marquee";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      "https://api.unsplash.com/photos/random?count=30&client_id=Vke3mS727zZ9UUD-1q35lIOjX4y29RM4hShA1BFVZGE"
    )
      .then((res) => res.json())
      .then((data) => {
        const urls = data.map((photo: any) => photo.urls.regular);
        setImages(urls);
      });
  }, []);

  return (
    // 1. <section> diubah menjadi container utama yang relative dan mengatur layout
    <section
      ref={ref}
      id='home'
      className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-20 text-center'>
      {/* 2. Semua konten utama dibungkus dalam satu div dengan z-20 */}
      <div className='relative z-20 mx-auto max-w-200'>
        <div className='flex items-center justify-center'>
          <div className='relative'>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}>
              <Image
                src='https://res.cloudinary.com/dmwow6mmu/image/upload/v1753981088/Foto_CoCard_KKN_uoazuh.png'
                alt='Kemas Khairunsyah portrait'
                width='192'
                height='192'
                quality='95'
                priority={true}
                className='h-24 w-24 rounded-full border-[0.35rem] border-white object-cover shadow-xl'
              />
            </motion.div>

            <motion.span
              className='absolute bottom-0 right-0 text-4xl'
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

        {/* Teks h1 juga berada di dalam wrapper z-20 */}
        <motion.h1
          className='mb-10 mt-4 px-4 text-2xl font-medium leading-normal! sm:text-4xl'
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}>
          <span className='font-bold'>Hello, I'm Kemas Khairunsyah.</span> I'm a{" "}
          <span className='font-bold'>freelance developer</span> with{" "}
          <span className='font-bold'>2 years</span> of experience. I enjoy
          building <span className='italic'>sites & apps</span> with a focus on{" "}
          <span className='underline'>React (Next.js)</span>,{" "}
          <span className='underline'>Laravel</span>, and{" "}
          <span className='underline'>Mobile (Flutter & Kotlin)</span>.
        </motion.h1>

        {/* Tombol-tombol juga berada di dalam wrapper z-20 */}
        <motion.div
          className='flex flex-col items-center justify-center gap-2 px-4 text-lg font-medium sm:flex-row'
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
          }}>
          <Link
            href='#contact'
            className='group flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-white outline-hidden transition hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105'
            onClick={() => {
              setActiveSection("Contact");
              setTimeOfLastClick(Date.now());
            }}>
            Contact me here{" "}
            <BsArrowRight className='opacity-70 transition group-hover:translate-x-1' />
          </Link>

          <a
            className='borderBlack group flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3 outline-hidden transition focus:scale-110 hover:scale-110 active:scale-105 dark:bg-white/10'
            href='/CV.pdf'
            download
            aria-label='Download my CV'>
            Download CV{" "}
            <HiDownload className='opacity-60 transition group-hover:translate-y-1' />
          </a>

          <a
            className='borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60'
            href='https://www.linkedin.com/in/kemaskhairunsyah/?locale=in_ID'
            target='_blank'
            aria-label='View my LinkedIn profile'>
            <BsLinkedin />
          </a>

          <a
            className='borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-[1.35rem] text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60'
            href='https://github.com/herros27'
            target='_blank'
            aria-label='View my GitHub profile'>
            <FaGithubSquare />
          </a>
        </motion.div>
      </div>

      {/* 3. Overlay dan Marquee dipindahkan ke bagian bawah JSX */}

      <div className='absolute inset-0 z-10 h-full w-full bg-white/50 dark:bg-black/50' />
      <ThreeDMarquee
        className='pointer-events-none absolute inset-0 h-full w-full'
        images={images}
      />
    </section>
  );
}
