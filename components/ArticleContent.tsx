import type { Block } from "@/lib/blog";
import { CheckCircle } from "@/components/icons";

// Rend les blocs typés d'un article (lib/blog.ts) avec le design system du site.
export function ArticleContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-10 scroll-mt-24 text-2xl font-bold tracking-tight">
                {b.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="text-[17px] leading-relaxed text-[var(--fg-soft)]">
                {b.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[var(--muted)]">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                      <CheckCircle size={13} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[var(--muted)]">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
                      {j + 1}
                    </span>
                    <span className="mt-0.5">{it}</span>
                  </li>
                ))}
              </ol>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm"
              >
                <code className="font-mono text-[var(--fg-soft)]">{b.code}</code>
              </pre>
            );
          case "callout":
            return (
              <div
                key={i}
                className="rounded-[var(--radius-card)] border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-5 text-[var(--fg-soft)]"
              >
                {b.text}
              </div>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-[var(--accent)] pl-5 text-lg font-medium italic text-[var(--fg-soft)]"
              >
                {b.text}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
