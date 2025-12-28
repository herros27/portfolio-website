"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  // State untuk mengontrol menu hamburger di mobile
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='z-50 relative'>
      <motion.div
        className='hidden sm:block fixed top-0 left-1/2 h-18 w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/3 backdrop-blur-0.5rem sm:top-6 sm:h-13 sm:w-172 sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75'
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}></motion.div>

      <nav className='hidden sm:flex  fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0'>
        <ul className='flex w-88 flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5'>
          {links.map((link) => (
            <motion.li
              className='h-3/4 flex items-center justify-center relative'
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}>
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 hover:text-gray-700 transition dark:text-gray-100 dark:hover:text-gray-700",
                  {
                    "text-gray-100 dark:text-gray-200":
                      activeSection === link.name,
                  }
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}>
                {link.name}

                {link.name === activeSection && (
                  <motion.span
                    className='bg-gray-700 rounded-full absolute inset-0 -z-10 dark:bg-gray-700'
                    layoutId='activeSection'
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Admin Button - Desktop Floating */}
      <motion.div
        className='hidden sm:block fixed top-6 right-6 z-50'
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}>
        <Link
          href='/admin'
          className='flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30 transition-all hover:scale-105 font-medium shadow-lg backdrop-blur-sm border border-blue-500/30'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z'
            />
          </svg>
          <span className='hidden lg:inline'>Irun Access Only</span>
        </Link>
      </motion.div>

      {/* ==================== MOBILE VIEW (Visible only on Mobile) ==================== */}

      {/* Tombol Hamburger Floating */}
      <motion.div
        className='fixed top-4 right-4 z-999 sm:hidden'
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='bg-white w-3rem h-3rem scale-190 bg-opacity-80 backdrop-blur-0.5rem border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-190 transition-all dark:bg-gray-950 dark:border-black/40'>
          {/* Icon Hamburger / Close */}
          {isOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-gray-950 dark:text-gray-50'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-gray-950 dark:text-gray-50'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          )}
        </button>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed top-20 right-4 w-64 bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-40 shadow-2xl rounded-2xl p-4 flex flex-col items-center justify-center gap-2 dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-90 sm:hidden z-998'
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}>
            <ul className='flex flex-col items-center gap-4 text-[0.9rem] font-medium text-gray-500 w-full'>
              {links.map((link) => (
                <li key={link.hash} className='w-full'>
                  <Link
                    className={clsx(
                      "flex w-full items-center justify-center p-3 rounded-lg hover:bg-gray-100 hover:text-gray-950 transition dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200",
                      {
                        "text-gray-950 bg-gray-200 dark:bg-gray-800 dark:text-gray-100":
                          activeSection === link.name,
                      }
                    )}
                    href={link.hash}
                    onClick={() => {
                      setActiveSection(link.name);
                      setTimeOfLastClick(Date.now());
                      setIsOpen(false); // Tutup menu setelah klik
                    }}>
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* Admin Button */}
              <li className='w-full pt-2 border-t border-gray-300 dark:border-gray-700'>
                <Link
                  href='/admin'
                  className='flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30 transition-colors font-medium'
                  onClick={() => setIsOpen(false)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z'
                    />
                  </svg>
                  Irun Access Only
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
