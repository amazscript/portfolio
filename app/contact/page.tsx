import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Mail, MapPin, Clock, ShieldCheck, CheckCircle, Github, Linkedin } from "@/components/icons";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Denis Decilap, développeur full-stack freelance en Île-de-France. Réponse sous 24 h pour vos projets de site, application ou API.",
  alternates: { canonical: "/contact" },
};

// Rendu à l'exécution pour lire la clé Turnstile depuis l'environnement du serveur
// (au lieu de la figer au build). Sans clé configurée, le formulaire marche sans anti-robot.
export const dynamic = "force-dynamic";

const reassurance = [
  { icon: Clock, title: "Réponse sous 24 h", text: "Un premier retour rapide, en français, sans jargon." },
  { icon: ShieldCheck, title: "Sans engagement", text: "Le premier échange et le devis sont gratuits." },
  { icon: CheckCircle, title: "Interlocuteur unique", text: "Vous parlez directement au développeur, pas à un commercial." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      {/* En-tête avec fond animé (cohérent avec l'accueil) */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid" />
          <div
            className="animate-float absolute -right-20 -top-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
            style={{ backgroundImage: "var(--brand-gradient)" }}
          />
        </div>
        <Container className="py-16 sm:py-20">
          <Reveal className="max-w-2xl">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Parlons de votre <span className="text-gradient">projet</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Décrivez votre besoin en quelques lignes — site, application, API ou renfort.
              Je vous réponds sous 24 h, sans engagement.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Formulaire */}
          <Reveal>
            <ContactForm turnstileSiteKey={process.env.TURNSTILE_SITE_KEY} />
          </Reveal>

          {/* Colonne latérale */}
          <div className="space-y-4">
            <Reveal delay={80}>
              <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
                <p className="text-sm font-semibold">Pourquoi me contacter</p>
                <ul className="mt-4 space-y-4">
                  {reassurance.map((r) => (
                    <li key={r.title} className="flex gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                        <r.icon size={18} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{r.title}</p>
                        <p className="text-sm text-[var(--muted)]">{r.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
                <p className="text-sm font-semibold">Coordonnées</p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 text-[var(--fg-soft)] transition-colors hover:text-[var(--accent)]">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--accent)]">
                        <Mail size={16} />
                      </span>
                      {site.email}
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-2.5 text-[var(--fg-soft)]">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--accent)]">
                      <MapPin size={16} />
                    </span>
                    {site.area}
                  </li>
                  <li className="inline-flex items-center gap-2.5 text-[var(--fg-soft)]">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--surface-2)]">
                      <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-green-500" />
                    </span>
                    {site.availability}
                  </li>
                </ul>

                <div className="mt-5 flex gap-2 border-t border-[var(--border)] pt-5">
                  {[
                    { href: site.social.github, label: "GitHub", Icon: Github },
                    { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] text-[var(--muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}
