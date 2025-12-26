"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
export default function ThemeSwitch() {
  // const { theme, toggleTheme } = useTheme();

  return (
    <AnimatedThemeToggler
      className='fixed bottom-5 right-5 bg-white w-12 h-12 bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950 z-800'
      duration={4000}
    />
  );
}
