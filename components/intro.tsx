"use client";

import Image from "next/image";
import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import dynamic from "next/dynamic";
import parse from "html-react-parser";
import { BorderBeam } from "@/components/ui/border-beam";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useImages } from "@/components/providers/splash-provider";

const ThreeDMarquee = dynamic(() => import("@/components/ui/3d-marquee"), {
  ssr: false,
});

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  photoUrl: string | null;
  resumeUrl: string | null;
  github: string | null;
  linkedin: string | null;
}

interface IntroProps {
  profile: ProfileData | null;
}

export default function Intro({ profile }: IntroProps) {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const images = useImages();

  // Default values if no profile
  const name = profile?.name || "Kemas";
  const photoUrl =
    profile?.photoUrl ||
    "https://res.cloudinary.com/dmwow6mmu/image/upload/w_200,h_200,c_fill,g_face,f_auto,q_auto/v1753981088/Foto_CoCard_KKN_uoazuh.png";
  const bio =
    profile?.bio ||
    "I'm a programmer & developer with a passion for mobile, web, and desktop automation.";
  const githubUrl = profile?.github || "https://github.com/herros27";
  const linkedinUrl =
    profile?.linkedin || "https://www.linkedin.com/in/kemaskhairunsyah/";
  const resumeUrl = profile?.resumeUrl || "/CV.pdf";

  return (
    <section
      ref={ref as React.LegacyRef<HTMLElement>}
      id='home'
      className='relative flex min-h-max w-full flex-col items-center justify-center overflow-hidden py-10 sm:py-20 text-center'>
      <BorderBeam
        className='will-change-transform transform-gpu'
        duration={8}
        size={400}
        borderWidth={10}
      />
      <BorderBeam
        className='will-change-transform transform-gpu'
        duration={8}
        delay={3}
        size={400}
        borderWidth={10}
      />
      <div className='relative z-20 mx-auto w-full max-w-200 px-4 sm:px-6'>
        <div className='flex items-center justify-center'>
          <div className='relative'>
            <m.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}>
              <div className='relative overflow-hidden rounded-full shadow-xl'>
                <Image
                  src={photoUrl}
                  alt={`${name} portrait`}
                  width={192}
                  height={192}
                  quality={75}
                  priority={true}
                  sizes='(max-width: 640px) 96px, 128px'
                  className='h-24 w-24 rounded-full border-[0.35rem] border-white object-cover sm:h-32 sm:w-32'
                />
              </div>
            </m.div>

            <span
              className='absolute bottom-0 right-0 text-3xl sm:text-4xl'
              // initial={{ opacity: 0, scale: 0 }}
              // animate={{ opacity: 1, scale: 1 }}
              // transition={{
              //   type: "spring",
              //   stiffness: 125,
              //   delay: 0.1,
              //   duration: 0.7,
              // }}
              >
              👋
            </span>
          </div>
        </div>

        
        <h1 className="mb-8 mt-6 px-2 text-xl font-medium leading-normal sm:mb-10 sm:text-3xl lg:text-4xl">
          <span className="font-bold">
            Hawoo 🖐️, I'm {name.split(" ")[0]}.
          </span>{" "}
          <span dangerouslySetInnerHTML={{ __html: bio }} />
        </h1>


        <m.div
          className='flex flex-col items-center justify-center gap-4 px-4 text-lg font-medium sm:flex-row sm:gap-5'
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}>
          <InteractiveHoverButton
            onClick={() => {
              setActiveSection("Contact");
              setTimeOfLastClick(Date.now());
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className='group flex w-full items-center justify-center gap-2 rounded-full dark:bg-gray-900 bg-white px-7 py-3 text-white outline-hidden transition hover:scale-105 hover:bg-gray-950 focus:scale-105 active:scale-100 sm:w-auto'>
            <BorderBeam
              size={100}
              initialOffset={20}
              className='from-transparent via-red-500 to-transparent'
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
              }}
            />
            Contact me here
          </InteractiveHoverButton>

          <ShinyButton
            className='cursor-none group flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3 outline-hidden transition hover:scale-105 active:scale-100 dark:bg-white/10 sm:w-auto'
            onClick={() => {
              const link = document.createElement("a");
              link.href = resumeUrl;
              link.download = `${name.replace(/\s+/g, "")}CV.pdf`;
              link.click();
            }}>
            <span className='inline-flex items-center gap-2'>
              Download CV
              <HiDownload className='opacity-60 transition group-hover:translate-y-1' />
            </span>
          </ShinyButton>

          <div className='cursor-none flex gap-4'>
            <a
              className='cursor-none flex items-center gap-2 rounded-full bg-white p-4 text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 dark:bg-white/10 dark:text-white/60'
              href={linkedinUrl}
              target='_blank'
              aria-label='View my LinkedIn profile'>
              <BsLinkedin />
            </a>

            <a
              className=' flex items-center gap-2 rounded-full bg-white p-4 text-[1.35rem] text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 dark:bg-white/10 dark:text-white/60'
              href={githubUrl}
              target='_blank'
              aria-label='View my GitHub profile'>
              <FaGithubSquare />
            </a>
          </div>
        </m.div>
      </div>

      <div className='absolute inset-0 z-10 h-full w-full bg-white/60 backdrop-blur-[2px] dark:bg-black/60' />
      <ThreeDMarquee
        className='will-change-transform transform-gpu pointer-events-none absolute inset-0 z-0 h-full w-full opacity-50'
        images={images}
      />
    </section>
  );
}
