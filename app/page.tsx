import { ZoneExperience } from "@/components/zone/ZoneExperience";
import { getZoneBuildings } from "@/lib/zone";

/**
 * Accueil : la zone industrielle de nuit. Un bâtiment par rubrique du site, généré
 * depuis les mêmes données que les pages détaillées, vers lesquelles chaque fiche renvoie.
 * Métadonnées : celles du layout (title, description, Open Graph de l'accueil).
 */
export default function HomePage() {
  return <ZoneExperience buildings={getZoneBuildings()} />;
}
