"use client";

import { Suspense, useState, useEffect } from "react";

import { Lock } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background";
import LoginForm from "./login-form";

const LoginPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check and apply theme on mount
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <AuroraBackground className='min-h-screen px-4' showRadialGradient={true}>
      {/* Theme Toggle */}
      {mounted && (
        <AnimatedThemeToggler
          className='fixed top-5 right-5 p-2.5 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all hover:scale-105 shadow-lg z-50'
          duration={400}
        />
      )}

      <div className='w-full max-w-md relative z-10'>
        {/* Logo/Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-8'>
          <div
            className='relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-neutral-900 via-gray-800 to-zinc-700
 mb-4 shadow-lg shadow-indigo-500/30 overflow-hidden'>
            <Lock className='w-9 h-9 text-white' />
            <BorderBeam
              size={100}
              duration={5}
              borderWidth={2}
              colorFrom='#60a5fa'
              colorTo='#a78bfa'
            />
          </div>
          <h1 className='text-3xl font-bold bg-linear-to-r from-slate-900 via-indigo-800 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent'>
            Irun Access
          </h1>
          <p className='text-slate-500 dark:text-blue-200/70 mt-2'>
            This area is restricted to authorized personnel only.
          </p>
        </motion.div>

        {/* Login Form with Suspense */}
        <Suspense
          fallback={
            <div className='bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-blue-200/50 dark:border-blue-500/20'>
              <div className='animate-pulse space-y-6'>
                <div>
                  <div className='h-4 w-24 bg-blue-200 dark:bg-blue-900/50 rounded mb-2' />
                  <div className='h-12 bg-blue-100 dark:bg-slate-800/50 rounded-lg' />
                </div>
                <div>
                  <div className='h-4 w-20 bg-blue-200 dark:bg-blue-900/50 rounded mb-2' />
                  <div className='h-12 bg-blue-100 dark:bg-slate-800/50 rounded-lg' />
                </div>
                <div className='h-12 bg-linear-to-r from-blue-500/50 via-indigo-500/50 to-violet-500/50 rounded-lg' />
              </div>
            </div>
          }>
          <LoginForm />
        </Suspense>

        {/* Footer */}
        <p className='mt-8 text-center text-sm text-slate-400 dark:text-blue-200/50'>
          Secure admin access only
        </p>
      </div>
    </AuroraBackground>
  );
};

export default LoginPage;
