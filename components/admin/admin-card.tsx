"use client";

import React from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
  showBeam?: boolean;
  beamSize?: number;
  beamDuration?: number;
  beamDelay?: number;
  variant?: "default" | "primary" | "success" | "danger";
  animate?: boolean;
}

export default function AdminCard({
  children,
  className,
  showBeam = true,
  beamSize = 200,
  beamDuration = 8,
  beamDelay = 0,
  variant = "default",
  animate = true,
}: AdminCardProps) {
  const variantStyles = {
    default: "bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800",
    primary: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-600/10 border-blue-200 dark:border-blue-500/30",
    success: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-500/10 dark:to-green-600/10 border-emerald-200 dark:border-emerald-500/30",
    danger: "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-500/10 dark:to-rose-600/10 border-red-200 dark:border-red-500/30",
  };

  const CardWrapper = animate ? motion.div : "div";
  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 20 } as const,
        animate: { opacity: 1, y: 0 } as const,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
      }
    : {};

  return (
    <CardWrapper
      className={cn(
        "relative rounded-xl border backdrop-blur-sm overflow-hidden transition-colors duration-300",
        variantStyles[variant],
        className
      )}
      {...animationProps}
    >
      {showBeam && (
        <BorderBeam
          size={beamSize}
          duration={beamDuration}
          delay={beamDelay}
          borderWidth={2}
          colorFrom="#ffaa40"
          colorTo="#9c40ff"
        />
      )}
      {children}
    </CardWrapper>
  );
}
