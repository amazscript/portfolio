import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

/** Geist porte titres et corps de texte : neutre, technique, très lisible. */
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

/** JetBrains Mono est réservée aux métadonnées techniques (tags, chiffres, overlines). */
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});
import { MotionProvider } from "@/components/MotionProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { personSchema, professionalServiceSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "développeur full-stack freelance",
    "développeur web Île-de-France",
    "développeur PHP Laravel Symfony",
    "développeur JavaScript TypeScript",
    "développeur Vue React Next.js",
    "développeur Node.js",
    "développeur Python Django",
    "création application web sur mesure",
    "développeur freelance 93",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1326" },
  ],
};

/**
 * Applique le thème avant le premier paint pour éviter le flash (FOUC).
 * Le sombre est le défaut assumé du site (classe .dark posée dès le rendu
 * serveur, donc valable même sans JS) ; seul un choix explicite « light »
 * enregistré par le visiteur la retire.
 */
const themeScript = `(function(){try{if(localStorage.getItem('theme')==='light'){document.documentElement.classList.remove('dark');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`dark ${geist.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">
        <JsonLd data={[personSchema(), professionalServiceSchema(), websiteSchema()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:font-semibold focus:text-[var(--accent-fg)]"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
