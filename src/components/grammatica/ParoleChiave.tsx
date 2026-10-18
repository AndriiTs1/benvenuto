import { Tr } from "@/components/Tr";
import { ElencoParole } from "@/components/vocabolario/ElencoParole";
import type { GruppoParoleChiave } from "@/content/a2/grammatica";
import type { Locale } from "@/lib/lingue";

// "Parole chiave (N)": parole scelte per la lezione (keyWords), chiuso all'inizio.
// Con i gruppi, ognuno ha il suo sottotitolo (italiano, maiuscoletto come i titoli di sezione).
export function ParoleChiave({
  gruppi,
  nota,
  locale,
}: {
  gruppi: GruppoParoleChiave[];
  /** Spiegazione sotto il titolo, nella lingua scelta (i18n: paroleChiaveNota). */
  nota: string;
  locale: Locale;
}) {
  const totale = gruppi.reduce((n, g) => n + g.parole.length, 0);
  return (
    <details className="group overflow-hidden rounded-2xl bg-card">
      <summary className="flex min-h-[52px] cursor-pointer list-none items-center gap-3 px-4 text-[17px] font-semibold select-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
        <span className="flex-1">Parole chiave ({totale})</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-4 shrink-0 text-label-2 transition-transform group-open:rotate-90"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </summary>
      <Tr locale={locale} as="p" size="sm" className="block px-4 pb-3">
        {nota}
      </Tr>
      {gruppi.map((gruppo, i) => (
        <section key={i}>
          {gruppo.title && (
            <h3 lang="it" className="border-t border-separator px-4 pt-4 pb-1.5 text-[13px] tracking-wide text-label-2 uppercase">
              {gruppo.title}
            </h3>
          )}
          <ElencoParole parole={gruppo.parole} />
        </section>
      ))}
    </details>
  );
}
