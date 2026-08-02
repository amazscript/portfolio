"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "@/components/icons";

/** Bascule de thème : la classe .dark sur <html> active le thème sombre. */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Passer en thème clair" : "Passer en thème sombre"}
      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-[2px] border border-[var(--border-strong)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)]"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
