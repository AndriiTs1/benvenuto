import { Tr } from "@/components/Tr";
import type { Locale } from "@/lib/lingue";

export type VoceVerbo = { it: string; participle: string; tr?: string };

// Griglia di schede da memorizzare "infinito → participio" (participi irregolari, essere o avere…):
// 1 colonna, 2 da md, riempita per righe. Il participio è ciò che va ricordato (grassetto,
// colore della grammatica); sotto la traduzione, se c'è. Contenuto delle celle al centro
// (eccezione voluta, vedi CLAUDE.md); colonne uguali (grid-cols-2 = minmax(0, 1fr) × 2).
// incorporata: dentro una scheda già bianca (niente sfondo proprio, linea sopra la prima riga).
export function GrigliaVerbi({
  voci,
  locale,
  incorporata = false,
}: {
  voci: VoceVerbo[];
  locale: Locale;
  incorporata?: boolean;
}) {
  return (
    <ul
      className={`grid grid-cols-1 md:grid-cols-2 ${incorporata ? "border-t border-separator" : "overflow-hidden rounded-2xl bg-card"}`}
    >
      {voci.map((voce, i) => (
        <li
          key={i}
          className={`border-separator px-4 py-3 text-center ${i > 0 ? "border-t" : ""} ${i === 1 ? "md:border-t-0" : ""} ${
            i % 2 === 1 ? "md:border-l" : ""
          }`}
        >
          <p lang="it" className="text-[17px] leading-snug">
            {voce.it}
            <span aria-hidden="true" className="text-label-2">
              {" → "}
            </span>
            <span className="sr-only">: </span>
            <span className="font-semibold text-grammar">{voce.participle}</span>
          </p>
          {voce.tr && (
            <Tr locale={locale} as="p" className="mt-0.5 text-[15px] leading-snug">
              {voce.tr}
            </Tr>
          )}
        </li>
      ))}
    </ul>
  );
}
