"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Révèle son contenu en fondu-montée quand il entre dans le viewport.
 * La préférence « réduire les animations » est gérée globalement par
 * MotionProvider ; on rend donc toujours le même élément (voir son commentaire).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
