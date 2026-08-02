import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { Github, Linkedin, Mail, MapPin, ArrowUpRight } from "@/components/icons";

export function Footer() {
  /** Année de mise en ligne — à mettre à jour au build si besoin. */
  const year = 2026;
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-10 px-5 py-16 sm:px-6 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-9 w-9 rounded-xl" />
            <span className="font-display text-lg font-bold tracking-[-0.02em]">{site.name}</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-[var(--muted)]">
            {site.role} freelance. Sites, applications et API sur mesure — {site.area}.
          </p>
          <div className="mt-4 flex gap-2">
            {[
              { href: site.social.github, label: "GitHub", Icon: Github },
              { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
              { href: `mailto:${site.email}`, label: "E-mail", Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--border-strong)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">Navigation</p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/mentions-legales" className="text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                Mentions légales
              </Link>
            </li>
            <li>
              <CookieSettingsButton className="text-left text-[var(--muted)] transition-colors hover:text-[var(--fg)]" />
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">Contact</p>
          <ul className="mt-3 space-y-2.5 text-sm text-[var(--muted)]">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-[var(--fg)]">
                <Mail size={15} /> {site.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin size={15} /> {site.area}
            </li>
            <li>
              <Link href="/contact" className="inline-flex items-center gap-1 font-semibold text-[var(--accent)] hover:underline">
                Démarrer un projet <ArrowUpRight size={14} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-1 px-5 py-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {year} {site.name}. Tous droits réservés.</span>
          <span>Conçu &amp; développé avec Next.js — sobre, rapide, accessible.</span>
        </div>
      </div>
    </footer>
  );
}
