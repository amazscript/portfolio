import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Manifest PWA — servi à /manifest.webmanifest. Améliore l'ajout à l'écran
 * d'accueil sur mobile et la présentation de l'app.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070b16",
    theme_color: "#4f46e5",
    lang: "fr",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
