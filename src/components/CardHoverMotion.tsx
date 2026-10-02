"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  disabled?: boolean;
}

export function CardHoverMotion({ children, disabled }: Props) {
  return (
    <motion.div
      whileHover={disabled ? undefined : { scale: 1.03, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
