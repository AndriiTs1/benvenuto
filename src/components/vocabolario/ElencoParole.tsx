import { Tr } from "@/components/Tr";
import type { ParolaVista } from "@/content/a2/vocabolario";

// Elenco di parole (Vocabolario, Parole chiave): italiano — traduzione nella lingua scelta,
// badge in italiano (ausiliare e participio dei verbi, plurale dei nomi, irr.), esempio in corsivo.
// Le note in russo di vocab.json (note, forms, irregular) non si mostrano.

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

export function ElencoParole({ parole, primaLinea = true }: { parole: ParolaVista[]; primaLinea?: boolean }) {
  return (
    <ul>
      {parole.map((parola, i) => {
        const aux = parola.pos === "verb" && parola.aux ? ausiliare(parola.aux) : null;
        const participio = parola.pos === "verb" ? parola.participle : undefined;
        return (
          <li
            key={parola.id}
            className={`border-separator px-4 py-2.5 ${i > 0 || primaLinea ? "border-t" : ""}`}
          >
            <p className="text-[16px] leading-normal md:text-[17px]">
              <span lang="it" className="font-medium">
                {parola.it}
              </span>
              {" — "}
              <Tr locale={parola.lingua}>{parola.traduzione}</Tr>
            </p>
            {(aux || participio || parola.plural || parola.irregolare) && (
              <p lang="it" className="mt-1 flex flex-wrap gap-1.5">
                {aux && <Badge>{aux}</Badge>}
                {participio && <Badge>{participio}</Badge>}
                {parola.plural && <Badge>{parola.plural}</Badge>}
                {parola.irregolare && <Badge>irr.</Badge>}
              </p>
            )}
            {parola.example && (
              <p lang="it" className="mt-1 text-[13px] leading-normal text-label-2 italic">
                {parola.example}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
