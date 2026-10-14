import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Balises Open Graph complètes d'une page. Indispensable dès qu'une page définit son propre
 * `openGraph` : Next.js remplace alors en bloc celui du layout (url, siteName, locale, image…),
 * sans fusionner.
 * `withDefaultImage` : à désactiver pour les routes qui ont leur propre `opengraph-image`.
 */
export function openGraphFor({
  path,
  title,
  description,
  type = "website",
  withDefaultImage = true,
}: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  withDefaultImage?: boolean;
}): NonNullable<Metadata["openGraph"]> {
  return {
    type,
    locale: site.locale,
    siteName: site.name,
    url: `${site.url}${path}`,
    title,
    description,
    ...(withDefaultImage ? { images: ["/opengraph-image"] } : {}),
  };
}
