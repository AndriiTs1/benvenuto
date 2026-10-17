import { Tr } from "@/components/Tr";
import type { ParolaChiave } from "@/content/a2/grammatica";

// Ausiliare breve per il badge: "essere", "avere" o, se il verbo li usa tutti e due, "essere / avere".
function ausiliare(aux: string) {
  const essere = aux.includes("essere");
  const avere = aux.includes("avere");
  if (essere && avere) return "essere / avere";
  return essere ? "essere" : avere ? "avere" : null;
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-label/[0.08] px-2 py-0.5 text-[12px] font-medium text-label-2 dark:bg-label/[0.16]">
      {children}
    </span>
  );
}

// "Parole chiave (N)": parole scelte per la lezione (keyWords), chiuso all'inizio.
export function ParoleChiave({ parole }: { parole: ParolaChiave[] }) {
  return (
    <details className="group overflow-hidden rounded-2xl bg-card">
      <summary className="flex min-h-[52px] cursor-pointer list-none items-center gap-3 px-4 text-[17px] font-semibold select-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-label [&::-webkit-details-marker]:hidden">
        <span className="flex-1">Parole chiave ({parole.length})</span>
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
      <ul>
        {parole.map((parola) => {
          const aux = parola.aux ? ausiliare(parola.aux) : null;
          return (
            <li key={parola.id} className="border-t border-separator px-4 py-2.5">
              <p className="text-[16px] leading-normal md:text-[17px]">
                <span lang="it" className="font-medium">
                  {parola.it}
                </span>
                {" — "}
                <Tr locale={parola.lingua}>{parola.traduzione}</Tr>
              </p>
              {(aux || parola.participle || parola.irregolare) && (
                <p lang="it" className="mt-1 flex flex-wrap gap-1.5">
                  {aux && <Badge>{aux}</Badge>}
                  {parola.participle && <Badge>{parola.participle}</Badge>}
                  {parola.irregolare && <Badge>irr.</Badge>}
                </p>
              )}
              {parola.example && (
                <p lang="it" className="mt-1 text-[13px] leading-normal text-label-2">
                  {parola.example}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </details>
  );
}
