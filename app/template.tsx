"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Transition de page : chaque navigation fait entrer le contenu en fondu-montée.
 * `template.tsx` est remonté par Next à chaque changement de route.
 * La préférence « réduire les animations » est gérée par MotionProvider.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
