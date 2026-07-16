import { site } from "@/lib/site";
import type { Project } from "@/lib/projects";
import type { Post } from "@/lib/blog";
import type { Faq } from "@/lib/faq";
import { services } from "@/lib/services";

// Données structurées Schema.org — présentes dans le HTML initial (CDC §5.1).

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    url: site.url,
    knowsAbout: site.stack,
    sameAs: [site.social.github, site.social.linkedin],
    address: { "@type": "PostalAddress", addressRegion: "Île-de-France", addressCountry: "FR" },
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    email: `mailto:${site.email}`,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Île-de-France" },
      { "@type": "Country", name: "France" },
    ],
    address: { "@type": "PostalAddress", addressRegion: "Île-de-France", addressCountry: "FR" },
    knowsAbout: site.stack,
    priceRange: "€€",
    provider: { "@type": "Person", name: site.name },
    // Catalogue des prestations proposées (aide Google à comprendre l'offre).
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
        url: `${site.url}/services`,
      },
    })),
  };
}

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function articleSchema(p: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    url: `${site.url}/blog/${p.slug}`,
    datePublished: p.date,
    dateModified: p.date,
    keywords: p.tags.join(", "),
    articleSection: p.category,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${p.slug}` },
  };
}

export function projectSchema(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": p.category === "API" || p.category === "Extension" ? "SoftwareApplication" : "CreativeWork",
    name: p.title,
    description: p.tagline,
    url: `${site.url}/projets/${p.slug}`,
    author: { "@type": "Person", name: site.name },
    keywords: p.stack.join(", "),
    ...(p.demoUrl ? { sameAs: p.demoUrl } : {}),
  };
}
