# Portfolio — Denis Decilap

Portfolio de développeur full-stack freelance, conçu comme une véritable machine d'acquisition : rapide, optimisé pour le référencement et entièrement auto-hébergé.

🔗 **En ligne : [decilapdenis.fr](https://decilapdenis.fr)**

## ✨ Points clés

- **Performance** — site statique (SSG) Next.js 15 / React 19, images WebP, chargement < 1 s, Core Web Vitals au vert.
- **SEO complet** — architecture en cocon (une page par service), données structurées Schema.org (Person, ProfessionalService, Service, FAQPage, BlogPosting, BreadcrumbList…), sitemap dynamique, maillage interne, images Open Graph générées.
- **Blog** — articles pilotés par les données, rendus par un moteur de blocs typés, avec covers SVG générées.
- **Formulaire de contact** — envoi SMTP (Nodemailer), anti-robot Cloudflare Turnstile + honeypot + rate-limiting.
- **Analytics conforme RGPD** — mesure d'audience chargée uniquement après consentement (bannière cookies + mentions légales).
- **Thème clair/sombre**, accessible, responsive mobile-first.

## 🛠️ Stack

`Next.js 15` · `React 19` · `TypeScript` · `Tailwind CSS v4` · `Nodemailer` · `Docker` · `Traefik`

## 🚀 Déploiement

Conteneurisé avec **Docker**, servi derrière **Traefik** (SSL Let's Encrypt automatique), déployé en continu par `git push` sur un VPS.

```bash
make docker-dev   # développement local (hot-reload)
make prod         # build + déploiement production
```

## 📬 Contact

Un projet en tête ? [decilapdenis.fr/contact](https://decilapdenis.fr/contact) — réponse sous 24 h.
