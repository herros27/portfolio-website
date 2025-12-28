"use client";

import React, { useState } from "react";
import SectionHeading from "./ui/section-heading";

import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./ui/submit-btn";
import toast from "react-hot-toast";

interface ProfileData {
  email: string | null;
}

interface ContactProps {
  profile: ProfileData | null;
}

export default function Contact({ profile }: ContactProps) {
  const { ref } = useSectionInView("Contact", 0.40);
  const [pending, setPending] = useState(false);

  // Default email if no profile
  const contactEmail = profile?.email || "khairunsyah2714@gmail.com";

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
      ref={ref as React.LegacyRef<HTMLElement>}
      className='mb-20 sm:mb-28 w-[min(100%,38rem)] text-center'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}>
        <SectionHeading>Contact me</SectionHeading>
        <p className='text-gray-700 -mt-6 dark:text-white/80'>
          Please contact me directly at{" "}
          <a className='underline' href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>{" "}
          or through this form.
        </p>

        <form
          onSubmit={handleSubmit}
          className='mt-10 flex flex-col dark:text-black'>
          <input
            className='h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-hidden'
            name='senderEmail'
            type='email'
            required
            maxLength={500}
            placeholder='Your email'
          />
          <textarea
            className='h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-hidden'
            name='message'
            placeholder='Your message'
            required
            maxLength={5000}
          />
          <SubmitBtn pending={pending} />
        </form>
      </motion.div>
    </section>
  );
}
