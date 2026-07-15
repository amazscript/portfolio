import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// On autorise explicitement les crawlers IA (GEO, CDC §5.4) : GPTBot, ClaudeBot,
// PerplexityBot, etc. — bloquer reviendrait à perdre les citations des moteurs de réponse.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/mentions-legales"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
