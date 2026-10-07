"use client";

import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

/**
 * Fondu de page uniquement lors des navigations internes, pas au premier chargement :
 * sinon le HTML serveur arrive en `opacity: 0` et rien ne s'affiche avant
 * l'hydratation (LCP mobile retardé de ~2 s). Les effets ne tournant pas côté
 * serveur, ce drapeau reste à `false` pendant le rendu serveur et l'hydratation.
 */
let hasNavigated = false;

/**
 * Transition de page : chaque navigation fait entrer le contenu en fondu-montée.
 * `template.tsx` est remonté par Next à chaque changement de route.
 * La préférence « réduire les animations » est gérée par MotionProvider.
 */
export default function Template({ children }: { children: ReactNode }) {
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={hasNavigated ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
