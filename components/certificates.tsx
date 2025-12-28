"use client";

import React from "react";
import SectionHeading from "./ui/section-heading";
import { useSectionInView } from "@/lib/hooks";
import InfiniteMovingCards from "./ui/infinite-moving-cards";
import { motion } from "framer-motion";
import { Award, Sparkles } from "lucide-react";

interface CertificateData {
  title: string;
  description: string | null;
  imageUrl: string | null;
  tags: string[];
  issueDate: Date;
  credentialUrl: string | null;
}

interface CertificatesProps {
  certificates: CertificateData[];
}

export default function Certificates({ certificates }: CertificatesProps) {
  const { ref } = useSectionInView("Certificates", 0.09);

  // Transform data to match the format expected by InfiniteMovingCards
  const items = certificates.map((cert) => ({
    title: cert.title,
    description: cert.description || "",
    imageUrl: cert.imageUrl || "",
    tags: cert.tags,
    issueDate: cert.issueDate,
    credentialUrl: cert.credentialUrl,
  }));

  return (
    <section
      ref={ref as React.LegacyRef<HTMLElement>}
      id='certificates'
      className='py-16 z-30 relative'>
      {/* Background decorations - full width */}
      <div className='absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none z-10'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/3 dark:bg-yellow-500/5 rounded-full blur-3xl' />
      </div>

      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='text-center mb-10 relative z-10'>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-amber-500 via-orange-500 to-red-500 mb-4 shadow-lg shadow-amber-500/25'>
          <Award className='w-8 h-8 text-white' />
        </motion.div>

        <SectionHeading>My Certificates</SectionHeading>

        <p className='text-gray-500 md:px-0 px-15 dark:text-gray-400 text-sm mt-2 max-w-md mx-auto'>
          Credentials that validate my expertise and continuous learning journey
        </p>

        {/* Stats badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className='flex items-center justify-center gap-3 mt-6'>
          <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-200/50 dark:border-amber-700/50'>
            <Sparkles className='w-3.5 h-3.5 text-amber-600 dark:text-amber-400' />
            <span className='text-xs font-medium text-amber-700 dark:text-amber-300'>
              {certificates.length} Certifications
            </span>
          </div>
          <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-200/50 dark:border-emerald-700/50'>
            <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
            <span className='text-xs font-medium text-emerald-700 dark:text-emerald-300'>
              Verified
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Infinite scrolling cards */}
      <div className='relative'>
        {/* Gradient overlays for smooth fade */}
        <div className='absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none' />
        <div className='absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none' />

        <InfiniteMovingCards
          items={items}
          direction='right'
          speed='normal'
          pauseOnHover={true}
          className='will-change-transform transform-gpu'
        />
      </div>

      {/* Bottom instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 2 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className='text-center text-xs  text-gray-400 dark:text-gray-500 mt-8'>
        Hover on cards to pause and explore • Click to verify credentials
      </motion.p>
    </section>
  );
}
