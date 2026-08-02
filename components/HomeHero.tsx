"use client";

import { Button } from "@/components/ui";
import { MaskLine, FadeIn, Magnetic } from "@/components/motion";
import { ArrowRight } from "@/components/icons";
import { site } from "@/lib/site";

/**
 * Hero de l'accueil — typographie géante révélée ligne par ligne au chargement,
 * boutons magnétiques, ruban de technologies. Client pour les animations d'entrée.
 */
export function HomeHero() {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="py-20 sm:py-28">
          <FadeIn delay={0.1}>
            <p className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-soft)]">
              <span className="pulse-dot h-2 w-2 rounded-full bg-green-600" />
              {site.availability} — {site.area}
            </p>
          </FadeIn>

          <h1 className="max-w-5xl font-display text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
            <MaskLine delay={0.15}>Développeur full-stack</MaskLine>
            <MaskLine delay={0.27}>
              <span className="text-[var(--muted)]">freelance en Île-de-France</span>
            </MaskLine>
          </h1>

          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <FadeIn delay={0.55}>
              <p className="max-w-xl text-lg leading-relaxed text-[var(--muted)]">
                Je livre des <span className="font-medium text-[var(--fg-soft)]">produits qui tournent</span> :
                sites rapides, applications métier et API robustes — PHP, JavaScript/TypeScript ou Python,
                selon ce qui sert votre projet. Du besoin au déploiement, en {site.area}.
              </p>
            </FadeIn>
            <FadeIn delay={0.65} className="flex flex-wrap gap-3">
              <Magnetic>
                <Button href="/projets">
                  Voir mes réalisations
                  <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href="/contact" variant="secondary" data-umami-event="Contact-CTA">
                  Me contacter
                </Button>
              </Magnetic>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Ruban de technologies défilant — ligne de caractères, façon journal */}
      <FadeIn delay={0.8}>
        <div className="marquee-mask overflow-hidden border-t border-[var(--border)] py-4">
          <div className="marquee-track items-center gap-0">
            {[...site.stack, ...site.stack, ...site.stack].map((tech, i) => (
              <span
                key={i}
                className="flex items-center whitespace-nowrap font-mono text-sm uppercase tracking-[0.14em] text-[var(--muted)]"
              >
                {tech}
                <span aria-hidden="true" className="mx-5 text-[var(--accent)]">✳</span>
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
