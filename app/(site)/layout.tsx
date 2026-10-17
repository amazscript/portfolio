import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/**
 * Pages détaillées (réalisations, services, blog, à propos, contact, mentions légales) :
 * en-tête et pied de page du site. L'accueil, lui, est la zone 3D avec sa propre barre.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
