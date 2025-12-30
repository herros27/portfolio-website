import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import { Send, Mail } from "lucide-react";
import { ContactProps, ProfileData } from "../contact";

interface FormContactProps {
  pending: boolean;
  onSubmit: (formData: FormData) => Promise<boolean>;
  containerRef: React.RefObject<HTMLElement>;
}

export default function FormContact({
  pending,
  onSubmit,
  containerRef,
}: FormContactProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
    const success = await onSubmit(new FormData(e.currentTarget));
    
    if (success) {
      if (formRef.current) formRef.current.reset();
      setIsSuccess(true);
      
      // Reset success message and show form again after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  };

  return (
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

        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-[1.4rem] relative overflow-hidden transition-all duration-500 min-h-[400px] flex items-center justify-center">
           {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center text-center p-8 gap-4"
            >
               <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2"
              >
                <Send className="w-10 h-10 text-green-600 dark:text-green-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-sm">
                Thank you for contacting me, I will reply to your email later :)
              </p>
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5 }}
                className="h-1 bg-green-500/30 rounded-full w-full mt-4 overflow-hidden"
              >
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-green-500"
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className='relative flex flex-col gap-4 p-6 sm:p-8 w-full transition-all'>
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
            </motion.form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
