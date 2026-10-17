import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChariotMotion } from "@/components/essai-motion/ChariotMotion";
import { getZoneBuildings } from "@/lib/zone";

/**
 * Page d'essai : la séquence du chariot en motion design 2D (SVG), pour comparer avec
 * la zone 3D de l'accueil. Hors du groupe (site) : pas d'en-tête, rendu plein écran.
 * Non indexée.
 */
export const metadata: Metadata = {
  title: "Essai motion design",
  robots: { index: false, follow: false },
  alternates: { canonical: "/essai-motion" },
};

export default function EssaiMotionPage() {
  const building = getZoneBuildings().find((candidate) => candidate.id === "a-propos");
  if (!building || building.card.kind !== "about") notFound();

  return (
    <main id="main">
      <ChariotMotion
        about={{
          sign: building.sign,
          title: building.title,
          highlight: building.highlight,
          text: building.card.text,
          chiffres: building.card.chiffres,
          availability: building.card.availability,
        }}
      />
    </main>
  );
}
