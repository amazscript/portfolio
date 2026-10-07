import { site } from "@/lib/site";
import { getAllSorted } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { services } from "@/lib/services";

/**
 * /llms.txt (format https://llmstxt.org) — plan du site lisible par les assistants IA.
 * Généré au build depuis les mêmes données que le sitemap : rien à maintenir à la main.
 */
export const dynamic = "force-static";

const link = (title: string, path: string, description: string) =>
  `- [${title}](${site.url}${path}): ${description}`;

export function GET() {
  const content = [
    `# ${site.name} — ${site.role} freelance`,
    "",
    `> ${site.description}`,
    "",
    `Zone : ${site.area}. ${site.availability}. ${site.responseTime}.`,
    `Stack : ${site.stack.join(", ")}.`,
    `Contact : ${site.email} — ${site.url}/contact`,
    "",
    "## Services",
    ...services.map((s) => link(s.title, `/services/${s.slug}`, s.summary)),
    "",
    "## Réalisations (cas d'étude)",
    ...getAllSorted().map((p) => link(p.title, `/projets/${p.slug}`, p.tagline)),
    "",
    "## Articles",
    ...getAllPosts().map((p) => link(p.title, `/blog/${p.slug}`, p.excerpt)),
    "",
    "## Optional",
    link("À propos", "/a-propos", `Parcours et méthode de travail de ${site.name}.`),
    "",
  ].join("\n");

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
