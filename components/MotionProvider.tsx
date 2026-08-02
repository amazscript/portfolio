"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Configure le mouvement pour tout le site.
 *
 * `reducedMotion="user"` délègue à framer-motion le respect de la préférence
 * système : les déplacements et mises à l'échelle sont neutralisés, les fondus
 * restent. C'est indispensable ici, car les composants doivent rendre le même
 * arbre d'éléments côté serveur et côté client — sinon l'hydratation échoue et
 * le contenu reste invisible (opacity 0) pour qui a activé « réduire les
 * animations ».
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
