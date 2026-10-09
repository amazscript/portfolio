import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Mail, MapPin, Phone, Clock, ShieldCheck, CheckCircle, Github, Linkedin } from "@/components/icons";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact et devis de projet web",
  description:
    "Contactez Denis Decilap, développeur full-stack freelance en Île-de-France. Réponse sous 24 h pour vos projets de site, application ou API.",
  alternates: { canonical: "/contact" },
};

/**
 * Rendu à l'exécution pour lire la clé Turnstile depuis l'environnement du serveur
 * (au lieu de la figer au build). Sans clé configurée, le formulaire marche sans anti-robot.
 */
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

      <PageHeader
        num="05"
        eyebrow="Contact"
        lines={["Parlons de", "votre projet"]}
        intro="Décrivez votre besoin en quelques lignes — site, application, API ou renfort. Je vous réponds sous 24 h, sans engagement."
        aside={
          <p className="font-mono text-sm uppercase tracking-[0.1em] text-[var(--accent)]">
            {site.responseTime}
          </p>
        }
      />

      <Container className="py-14">
        <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Contact" }]} />
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Formulaire */}
          <Reveal>
            <ContactForm turnstileSiteKey={process.env.TURNSTILE_SITE_KEY} />
          </Reveal>

          {/* Colonne latérale */}
          <div className="space-y-4">
            <Reveal delay={80}>
              <div className="glass-card rounded-[var(--radius-card)] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent)]">Pourquoi me contacter</p>
                <ul className="mt-4 space-y-4">
                  {reassurance.map((r) => (
                    <li key={r.title} className="flex gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
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
              <div className="glass-card rounded-[var(--radius-card)] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent)]">Coordonnées</p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 text-[var(--fg-soft)] transition-colors hover:text-[var(--accent)]">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--accent)]">
                        <Mail size={16} />
                      </span>
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${site.phone.international}`}
                      data-track="phone_click"
                      className="inline-flex items-center gap-2.5 text-[var(--fg-soft)] transition-colors hover:text-[var(--accent)]"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--accent)]">
                        <Phone size={16} />
                      </span>
                      {site.phone.display}
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
                      <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
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
                      className="grid h-11 w-11 place-items-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
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
