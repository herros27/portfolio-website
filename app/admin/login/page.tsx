"use client";

import { Suspense, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Lock, Mail, ArrowLeft, Loader2, Shield } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema) as never,
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successful!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/20 border border-blue-200/50 dark:border-blue-500/20 overflow-hidden'>
      <BorderBeam
        size={200}
        duration={8}
        borderWidth={1.5}
        colorFrom='#3b82f6'
        colorTo='#8b5cf6'
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-6 relative z-10'>
        {/* Email Field */}
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-slate-700 dark:text-blue-100 mb-2'>
            Email Address
          </label>
          <div className='relative'>
            <Mail
              size={18}
              className='absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 dark:text-blue-300'
            />
            <input
              {...register("email")}
              type='email'
              id='email'
              autoComplete='email'
              placeholder='admin@example.com'
              className='w-full pl-11 pr-4 py-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/30 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all'
            />
          </div>
          {errors.email && (
            <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-slate-700 dark:text-blue-100 mb-2'>
            Password
          </label>
          <div className='relative'>
            <Lock
              size={18}
              className='absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 dark:text-blue-300'
            />
            <input
              {...register("password")}
              type='password'
              id='password'
              autoComplete='current-password'
              placeholder='••••••••'
              className='w-full pl-11 pr-4 py-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/30 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all'
            />
          </div>
          {errors.password && (
            <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full py-3.5 px-4 bg-linear-to-r from-blue-500 via-indigo-500 to-violet-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25'>
          {isLoading ? (
            <span className='flex items-center justify-center gap-2'>
              <Loader2 size={20} className='animate-spin' />
              Signing in...
            </span>
          ) : (
            <span className='flex items-center justify-center gap-2'>
              <Shield size={18} />
              Sign In
            </span>
          )}
        </button>
      </form>

      {/* Back to Home Link */}
      <div className='mt-6 text-center relative z-10'>
        <a
          href='/'
          className='inline-flex items-center gap-2 text-sm text-slate-500 dark:text-blue-200/70 hover:text-slate-900 dark:hover:text-white transition-colors'>
          <ArrowLeft size={16} />
          Back to Portfolio
        </a>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
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
          <div className='relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 mb-4 shadow-lg shadow-indigo-500/30 overflow-hidden'>
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
            Admin Access
          </h1>
          <p className='text-slate-500 dark:text-blue-200/70 mt-2'>
            Sign in to manage your portfolio
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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='mt-8 text-center text-sm text-slate-400 dark:text-blue-200/50'>
          Secure admin access only
        </motion.p>
      </div>
    </AuroraBackground>
  );
}
