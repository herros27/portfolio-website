"use client";

import React, { useState, useRef } from "react";
import SectionHeading from "./ui/section-heading";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./ui/submit-btn";
import toast from "react-hot-toast";
import { Send, Mail } from "lucide-react";
import FormContact from "./ui/3d-form-contact";

export interface ProfileData {
  email: string | null;
}

export interface ContactProps {
  profile: ProfileData | null;
}

export default function Contact({ profile }: ContactProps) {
  // Ref untuk Active Section (Navbar)
  const { ref: sectionInViewRef } = useSectionInView("Contact", 0.5);

  // Ref untuk Animasi Scroll Framer Motion
  const containerRef = useRef<HTMLElement>(null);

  const [pending, setPending] = useState(false);
  const contactEmail = profile?.email || "khairunsyah2714@gmail.com";

  const handleSubmit = async (formData: FormData): Promise<boolean> => {
    setPending(true);

    const { error } = await sendEmail(formData);
    setPending(false);

    if (error) {
      toast.error(error);
      return false;
    } else {
      toast.success("Email sent successfully!");
      return true;
    }
  };

  return (
    <section
      id='contact'
      ref={(el) => {
        // 1. Assign ke containerRef
        if (containerRef) {
          (containerRef as React.MutableRefObject<HTMLElement | null>).current =
            el;
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

      <FormContact
        onSubmit={handleSubmit}
        pending={pending}
        containerRef={containerRef}
      />
    </section>
  );
}
