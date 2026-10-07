import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllSorted } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { services } from "@/lib/services";

/**
 * `lastModified` n'est donné que là où il est vrai (date de l'article). Mettre la date
 * du build partout annonçait à chaque déploiement que tout avait changé : Google finit
 * alors par ignorer ce signal, y compris pour les vrais nouveaux articles.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projets", "/services", "/a-propos", "/blog", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const projectRoutes = getAllSorted().map((p) => ({
    url: `${site.url}/projets/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = getAllPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
