"use client";

import React, { useState, useRef } from "react";
import SectionHeading from "./ui/section-heading";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./ui/submit-btn";
import toast from "react-hot-toast";
import { Send, Mail } from "lucide-react";

interface ProfileData {
  email: string | null;
}

interface ContactProps {
  profile: ProfileData | null;
}

export default function Contact({ profile }: ContactProps) {
  // Ref untuk Active Section (Navbar)
  const { ref: sectionInViewRef } = useSectionInView("Contact", 0.5);

  // Ref untuk Animasi Scroll Framer Motion
  const containerRef = useRef<HTMLElement>(null);

  const [pending, setPending] = useState(false);
  const contactEmail = profile?.email || "khairunsyah2714@gmail.com";

  // Setup Scroll Animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center 30%"],
  });

  const rotateXRaw = useTransform(scrollYProgress, [0, 0.5, 0.7], [-75, 8, 0]);
  const rotateZRaw = useTransform(scrollYProgress, [0, 0.7], [-4, 0]);
  const zRaw = useTransform(scrollYProgress, [0, 0.7], [-200, 0]);
  const yRaw = useTransform(scrollYProgress, [0, 0.7], [160, 0]);
  const scaleRaw = useTransform(scrollYProgress, [0, 0.7], [0.85, 1]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0.7, 1]);

  const opacity = useSpring(opacityRaw, {
    stiffness: 80,
    damping: 20,
  });

  // Gerakan utama
  const spring = { stiffness: 120, damping: 25, mass: 0.6 };

  const rotateX = useSpring(rotateXRaw, spring);
  const rotateZ = useSpring(rotateZRaw, spring);
  const z = useSpring(zRaw, spring);
  const y = useSpring(yRaw, spring);
  const scale = useSpring(scaleRaw, spring);
  // Shadow dinamis
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px 60px 120px rgba(0,0,0,0.4)", "0px 20px 40px rgba(0,0,0,0.25)"]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(e.currentTarget);
    setPending(true);

    const { error } = await sendEmail(formData);
    setPending(false);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Email sent successfully!");
      form.reset();
    }
  };

  return (
    <section
      id='contact'
      ref={(el) => {
        // 1. Assign ke containerRef
        if (containerRef) {
          (containerRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }
        // 2. Assign ke sectionInViewRef
        if (sectionInViewRef) {
          if (typeof sectionInViewRef === "function") {
            sectionInViewRef(el);
          } else {
            (sectionInViewRef as React.MutableRefObject<any>).current = el;
          }
        }
      }}
      className='mb-20 sm:mb-28 w-full max-w-200 scroll-mt-24 mx-auto text-center px-4 perspective-[1600px]'>
      
      {/* Header section with Icon */}
      <div className='mb-10 sm:mb-14'>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 via-blue-500 to-sky-500 mb-4 shadow-lg shadow-blue-500/25'>
          <Mail className='w-8 h-8 text-white' />
        </motion.div>
        
        <SectionHeading>Contact Me</SectionHeading>

        <p className='text-gray-700 dark:text-white/80 max-w-2xl mx-auto leading-relaxed mt-2'>
          Please contact me directly at{" "}
          <a
            className='font-semibold bg-linear-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent hover:underline decoration-blue-500 decoration-2 underline-offset-4 transition-all'
            href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>{" "}
          or through this form.
        </p>
      </div>

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateZ: z,
          y,
          scale,
          opacity,
          boxShadow,
          transformStyle: "preserve-3d",
        }}
        className='origin-bottom'>
        <div className='relative group rounded-3xl p-0.5 sm:p-1 overflow-hidden shadow-[0_20px_50px_rgba(8,112,184,0.7)] dark:shadow-[0_20px_50px_rgba(30,64,175,0.3)]'>
          {/* Animated Background Glow */}
          <div className='absolute inset-0 bg-linear-to-br from-indigo-500 via-blue-500 to-sky-500 opacity-30 group-hover:opacity-100 blur-xl transition-opacity duration-700' />

          {/* Border Gradient */}
          <div className='absolute inset-0 bg-linear-to-br from-indigo-500 via-blue-500 to-sky-500 opacity-50 rounded-3xl' />
          
          <motion.div
            style={{ translateZ: -40 }}
            className='absolute inset-0 rounded-3xl bg-black/10'
          />
          
          <form
            onSubmit={handleSubmit}
            className='relative flex flex-col gap-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-[1.4rem] p-6 sm:p-8 shadow-2xl dark:shadow-blue-900/20'>
            <div className='flex flex-col gap-2 text-left'>
              <label
                htmlFor='senderEmail'
                className='text-sm font-medium text-gray-600 dark:text-gray-300 ml-1'>
                Email Address
              </label>
              <input
                className='h-14 px-5 rounded-xl border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-white/5 
                text-black dark:text-white placeholder:text-gray-400 
                focus:bg-white dark:focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                transition-all duration-300'
                name='senderEmail'
                id='senderEmail'
                type='email'
                required
                maxLength={500}
                placeholder='example@gmail.com'
              />
            </div>

            <div className='flex flex-col gap-2 text-left'>
              <label
                htmlFor='message'
                className='text-sm font-medium text-gray-600 dark:text-gray-300 ml-1'>
                Your Message
              </label>
              <textarea
                className='h-52 px-5 py-4 rounded-xl border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-white/5 
                text-black dark:text-white placeholder:text-gray-400 resize-none
                focus:bg-white dark:focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                transition-all duration-300'
                name='message'
                id='message'
                placeholder='Tell me about your project...'
                required
                maxLength={5000}
              />
            </div>

            <div className='mt-4 flex justify-end transform transition-transform hover:scale-105'>
              <SubmitBtn pending={pending} />
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
