import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

/** Big Shoulders (ex-« Big Shoulders Display ») : titres et chiffres, en capitales, façon signalétique d'entrepôt. */
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  variable: "--font-big-shoulders",
  // Next.js n'a pas les métriques de cette police pour caler une police de secours :
  // on en désigne une condensée, pour limiter le décalage au moment où elle se charge.
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "Roboto Condensed", "sans-serif-condensed", "sans-serif"],
});

/** IBM Plex Sans : texte courant, sobre et très lisible. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

/** IBM Plex Mono : étiquettes, dates, numéros et stack technique. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-plex-mono",
  // Petites étiquettes seulement : pas de préchargement, pour laisser la bande passante
  // aux polices du titre et du texte (élément LCP).
  preload: false,
});
import { MotionProvider } from "@/components/MotionProvider";
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
  applicationName: `${site.name} | Portfolio`,
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
      className={`dark ${bigShoulders.variable} ${plexSans.variable} ${plexMono.variable}`}
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
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
