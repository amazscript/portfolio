"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Révèle son contenu en fondu-montée quand il entre dans le viewport.
 * En CSS (.reveal-item / .is-visible dans globals.css) plutôt qu'avec Framer Motion :
 * aucun attribut style posé sur la balise, et la préférence « réduire les animations »
 * est gérée par la feuille de style. Le délai est appliqué au moment du déclenchement.
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        timer = setTimeout(() => element.classList.add("is-visible"), delay);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-item ${className}`}>
      {children}
    </div>
  );
}
