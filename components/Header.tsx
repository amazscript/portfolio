"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/site";
import { Button } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, Close, ArrowRight } from "@/components/icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] glass">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} — accueil`}>
          <Logo className="h-8 w-8 rounded-[2px] transition-transform group-hover:scale-105" />
          <span className="hidden font-display text-sm font-bold uppercase tracking-[0.14em] sm:inline">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group/nav relative px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {item.label}
                {/* Soulignement : plein si actif, sinon il se déploie au survol */}
                <span
                  className={`absolute inset-x-3 -bottom-px h-0.5 origin-left bg-[var(--accent)] transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="/contact" className="hidden sm:inline-flex" data-umami-event="Contact-CTA">
            Me contacter
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-[var(--border-strong)] text-[var(--fg)] md:hidden"
          >
            {open ? <Close size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] md:hidden"
            aria-label="Navigation mobile"
          >
            <div className="px-5 py-3">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-3 text-sm font-medium text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--fg)]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Button href="/contact" className="mt-2 w-full">
                Me contacter
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
