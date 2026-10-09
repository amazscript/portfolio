const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy : liste ce que le navigateur a le droit de charger.
 * Toute nouvelle ressource tierce (script, iframe, appel réseau) doit être ajoutée ici,
 * sinon le navigateur la bloque.
 *
 * - 'unsafe-inline' (scripts) : script de thème du layout, init GA4 et scripts d'hydratation
 *   de Next. À remplacer par un nonce si le site passe un jour en rendu dynamique.
 * - 'unsafe-inline' (styles) : next/font, Framer Motion et les attributs style.
 * - Google : GA4 + mesure des conversions Google Ads, chargés seulement après consentement.
 * - Cloudflare : Turnstile du formulaire de contact.
 * - Plausible : uniquement si NEXT_PUBLIC_PLAUSIBLE_SRC est renseigné.
 */
const plausibleOrigin = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC
  ? new URL(process.env.NEXT_PUBLIC_PLAUSIBLE_SRC).origin
  : "";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ""}https://www.googletagmanager.com https://challenges.cloudflare.com ${plausibleOrigin}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://*.g.doubleclick.net https://*.google.com https://*.google.fr",
  "font-src 'self' data:",
  `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://pagead2.googlesyndication.com ${plausibleOrigin}`,
  "frame-src https://challenges.cloudflare.com https://td.doubleclick.net https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
]
  .map((directive) => directive.replace(/\s+/g, " ").trim())
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
