// "use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowLeft, Loader2, Shield } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
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
        let message = "Login failed. Please try again.";
        switch (result.error) {
          case "CredentialsSignin":
            message = "Invalid email or password.";
            break;
          case "ACCOUNT_DISABLED":
            message = "Your account has been disabled. Please contact support.";
            break;
        }
    
        toast.error(message);
        return;
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
          className='w-full py-3.5 px-4 bg-linear-to-br from-neutral-700 via-gray-700 to-zinc-600
 text-white font-semibold rounded-lg hover:from-neutral-800 hover:via-gray-800 hover:to-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25'>
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
};

export default LoginForm;
