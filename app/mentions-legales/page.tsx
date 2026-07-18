import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et informations RGPD du site.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <Container className="py-16">
      <div className="prose max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight">Mentions légales</h1>

        <div className="mt-8 space-y-8 text-[var(--muted)]">
          <section>
            <h2 className="text-lg font-bold text-[var(--fg)]">Éditeur du site</h2>
            <p className="mt-2">
              <strong className="text-[var(--fg-soft)]">Denis Decilap</strong> — {site.role} freelance
              (nom commercial&nbsp;: AmazScript).<br />
              Entrepreneur individuel (EI), immatriculé au RNE le 20/03/2026.<br />
              SIREN&nbsp;: 102&nbsp;705&nbsp;746 — SIRET&nbsp;: 102&nbsp;705&nbsp;746&nbsp;00018.<br />
              Code APE&nbsp;: 6201Z (Programmation informatique).<br />
              Siège social&nbsp;: 1 rue de Marseille, 93800 Épinay-sur-Seine, France.<br />
              Contact&nbsp;: <a href={`mailto:${site.email}`} className="text-[var(--accent)]">{site.email}</a><br />
              Directeur de la publication&nbsp;: Denis Decilap.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--fg)]">Hébergement</h2>
            <p className="mt-2">
              Site hébergé par <strong className="text-[var(--fg-soft)]">Gandi SAS</strong>.<br />
              63-65 boulevard Masséna, 75013 Paris, France.<br />
              <a href="https://www.gandi.net" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">
                gandi.net
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--fg)]">Données personnelles (RGPD)</h2>
            <p className="mt-2">
              Les informations transmises via le formulaire de contact (nom, e-mail, message) sont utilisées
              uniquement pour répondre à votre demande et ne sont ni cédées ni revendues. Conformément au
              RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos
              données en écrivant à {site.email}.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--fg)]">Cookies & mesure d&apos;audience</h2>
            <p className="mt-2">
              Ce site utilise <strong>Google Analytics 4</strong> pour mesurer son audience (pages vues,
              provenance des visites, type d&apos;appareil). Cet outil dépose des cookies sur votre
              navigateur.
            </p>
            <p className="mt-2">
              Conformément à la réglementation, <strong>aucun cookie de mesure n&apos;est déposé avant votre
              consentement</strong> : ils ne sont activés que si vous cliquez sur «&nbsp;Accepter&nbsp;» dans
              le bandeau affiché lors de votre première visite. Vous pouvez modifier ou retirer votre choix à
              tout moment via le lien «&nbsp;Gérer les cookies&nbsp;» en pied de page.
            </p>
            <p className="mt-2">
              Les données collectées sont conservées 14&nbsp;mois et traitées par Google&nbsp;LLC ; elles ne
              servent à aucune fin publicitaire de ma part. En cas de refus, vous naviguez normalement, sans
              aucune mesure d&apos;audience.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--fg)]">Propriété intellectuelle</h2>
            <p className="mt-2">
              L&apos;ensemble du contenu de ce site (textes, code, visuels) est la propriété de {site.name},
              sauf mention contraire.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
