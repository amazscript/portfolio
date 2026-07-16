"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
        <Link href="/" className="group flex items-center gap-2.5 font-bold tracking-tight" aria-label={`${site.name} — accueil`}>
          <Logo className="h-9 w-9 rounded-xl shadow-[var(--glow)] transition-transform group-hover:scale-105" />
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full"
                    style={{ backgroundImage: "var(--brand-gradient)" }}
                  />
                )}
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--fg)] md:hidden"
          >
            {open ? <Close size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-3 md:hidden" aria-label="Navigation mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--fg)]"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" className="mt-2 w-full">
            Me contacter
          </Button>
        </nav>
      )}
    </header>
  );
}
