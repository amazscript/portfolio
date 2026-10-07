import { ArrowRight } from "@/components/icons";
import type { Faq } from "@/lib/faq";

/** FAQ en accordéon natif (`<details>`) : contenu présent dans le HTML, lisible sans JavaScript. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="mt-10 max-w-3xl space-y-3">
      {faqs.map((f) => (
        <details
          key={f.question}
          className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 transition-colors hover:border-[var(--accent)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold marker:hidden">
            {f.question}
            <span className="shrink-0 text-[var(--accent)] transition-transform duration-300 group-open:rotate-45">
              <ArrowRight size={18} className="rotate-[-45deg]" />
            </span>
          </summary>
          <p className="pb-6 text-[var(--muted)]">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
