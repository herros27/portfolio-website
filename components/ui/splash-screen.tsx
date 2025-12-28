"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
export default function SplashScreen({
  finishLoading,
}: {
  finishLoading: () => void;
}) {
  // const greeting = "Welcome to My Portfolio";

  return (
    <motion.div
      className='fixed inset-0 z-99 w-full h-[101%] flex items-center justify-center bg-background text-foreground'
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 1, ease: "easeInOut" } }} // Efek layar naik ke atas
      onAnimationComplete={() => {
        // Opsional: Jika ingin trigger sesuatu setelah exit selesai
      }}>
      {/* ... Background Pattern ... */}
      <BackgroundRippleEffect cols={38} cellSize={50} />
      <div className='relative z-10 flex flex-col items-center  w-full'>
        {" "}
        {/* Tambah px-4 agar ada jarak di HP */}
        {/* PERUBAHAN ADA DI SINI */}
        <motion.div className='relative my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row mx-auto max-w-4xl text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100'>
          <LayoutTextFlip
            text='Welcome to '
            words={["My Portfolio", "Creative Space", "My World"]}
          />
        </motion.div>
        {/* Loading Bar Line */}
        <motion.div
          className='mt-8 h-1 w-0 bg-primary rounded-full'
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 10, ease: "easeInOut" }}
          onAnimationComplete={finishLoading} // Panggil fungsi selesai saat loading bar penuh
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2, duration: 10 }}
          className='mt-4 text-sm text-muted-foreground font-mono'>
          Loading experience...
        </motion.p>
      </div>
    </motion.div>
  );
}
