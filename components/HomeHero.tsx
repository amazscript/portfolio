"use client";

import { Button, StatusPill } from "@/components/ui";
import { FadeIn, Magnetic } from "@/components/motion";
import { ArrowRight, MapPin, ShieldCheck } from "@/components/icons";
import { site } from "@/lib/site";

/**
 * Visuel du hero : portrait si `site.portrait` est renseigné, sinon panneau
 * généré (grille technique + monogramme). Évite d'afficher une photo d'emprunt
 * tant que la vraie n'a pas été déposée dans `public/`.
 */
function HeroVisual() {
  if (site.portrait) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={site.portrait}
        alt={`${site.name}, ${site.role.toLowerCase()} freelance`}
        className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
      />
    );
  }

  const initials = site.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div aria-hidden="true" className="relative h-full w-full bg-[var(--surface-2)]">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-[clamp(4rem,12vw,7rem)] font-bold tracking-[-0.04em] text-[var(--accent)] opacity-90">
          {initials}
        </span>
      </div>
    </div>
  );
}

/**
 * Hero de l'accueil — grille 12 colonnes : discours à gauche, portrait encadré
 * de verre à droite, badge de localisation en débord. Client pour les
 * animations d'entrée.
 */
export function HomeHero() {
  return (
    <section className="hero-gradient border-b border-[var(--border)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 sm:px-6">
        <div className="grid items-center gap-12 py-20 sm:py-28 md:grid-cols-12">
          <div className="space-y-8 md:col-span-7">
            <FadeIn delay={0.05}>
              <StatusPill>{site.availability}</StatusPill>
            </FadeIn>

            {/* Pas de FadeIn : le H1 est l'élément LCP, il doit être visible dès le HTML serveur. */}
            <h1 className="max-w-3xl font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              Développeur full-stack — architecte de solutions web sur mesure en{" "}
              <span className="text-[var(--accent)]">{site.region}</span>.
            </h1>

            <FadeIn delay={0.3}>
              <p className="max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
                Expertise approfondie sur{" "}
                <span className="font-semibold text-[var(--fg-soft)]">Laravel, Vue et Next.js</span>.
                Je conçois des interfaces rapides et des back-ends robustes — du besoin au
                déploiement.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} className="flex flex-wrap gap-4 pt-2">
              <Magnetic>
                <Button href="/projets" size="lg">
                  Voir mes réalisations
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover/btn:translate-x-0.5"
                  />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  href="/contact"
                  size="lg"
                  variant="secondary"
                  data-umami-event="Contact-CTA"
                >
                  Me contacter
                </Button>
              </Magnetic>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 font-mono text-[13px] text-[var(--muted)]">
                <span className="font-medium uppercase tracking-[0.1em] text-[var(--fg-soft)]">
                  Stack&nbsp;:
                </span>
                {site.coreStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.35} className="relative md:col-span-5">
            <div className="glass-card animate-float aspect-square overflow-hidden rounded-[var(--radius-card)]">
              <HeroVisual />
            </div>

            {/* Badge en débord — ancre le profil dans un lieu et un niveau */}
            <div className="glass-card absolute -bottom-6 -right-4 hidden rounded-xl p-5 lg:block">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--success)_14%,transparent)] text-[var(--success)]">
                  <ShieldCheck size={20} />
                </span>
                <span className="block">
                  <span className="block font-bold text-[var(--fg)]">{site.area}</span>
                  <span className="mt-0.5 flex items-center gap-1 text-sm text-[var(--muted)]">
                    <MapPin size={13} /> {site.role}
                  </span>
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
