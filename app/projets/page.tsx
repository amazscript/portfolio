import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { JsonLd } from "@/components/JsonLd";
import { getAllSorted } from "@/lib/projects";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Sélection de réalisations full-stack : API Laravel, applications Vue/Node, plugins WooCommerce, extensions et migrations. Chaque projet est un cas d'étude concret.",
  alternates: { canonical: "/projets" },
};

export default function ProjetsPage() {
  const projects = getAllSorted();

  return (
    <Container className="py-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Réalisations", path: "/projets" },
        ])}
      />
      <SectionHeading
        eyebrow="Réalisations"
        title="Des projets qui fonctionnent"
        intro="Filtrez par type de projet. Chaque carte mène à un cas d'étude détaillé : problème, décisions techniques, résultat."
      />
      <div className="mt-10">
        <ProjectsExplorer projects={projects} />
      </div>
    </Container>
  );
}
