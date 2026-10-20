import Link from "next/link";
import { TabContent } from "@/components/corso/TabContent";
import { ConteggioEsercizi } from "@/components/esercizi/FattiEsercizi";
import { CartaTempo } from "@/components/grammatica/CartaTempo";
import { BarraUnita, ConteggioStudiati, SeiQui } from "@/components/grammatica/Progresso";
import { PiastrellaTempo } from "@/components/grammatica/Tempo";
import { ChevronRight } from "@/components/ListRow";
import { Tr } from "@/components/Tr";
import { idEsercizi } from "@/content/a2/esercizi";
import { getPercorso, type TappaPercorso, type UnitaPercorso } from "@/content/a2/grammatica";
import type { Locale } from "@/lib/lingue";
import { linguaScelta } from "@/lib/lingua-scelta";
import { TEMPI, type Tempo } from "@/lib/tempi";

// Percorso: "I tempi verbali" (unità con tempo in meta.json, nell'ordine di TEMPI) come schede:
// una sotto l'altra su mobile, 2×2 da sm, 4 in fila da lg (colonna di 1120px, vedi Colonna.tsx). Poi "Altri argomenti" (le altre unità,
// ordine del curriculum) in un elenco e la "Verifica" (tappe): da md affiancati, 2/3 e 1/3.
// Il progresso generale sta nell'intestazione (CourseHeader). Il vecchio ?vista=indice lo toglie proxy.ts.
export const instant = false;

const TITOLO_SEZIONE = "mb-1.5 px-4 text-[13px] tracking-wide text-label-2 uppercase";

export default async function GrammaticaPage() {
  const locale = await linguaScelta();
  const { unita, argomenti, tappe } = await getPercorso(locale);
  const ordine = argomenti.map((a) => a.id);
  const tempi = unita
    .filter((u): u is UnitaPercorso & { tempo: Tempo } => u.tempo !== null)
    .sort((a, b) => TEMPI.indexOf(a.tempo) - TEMPI.indexOf(b.tempo));
  const altre = unita.filter((u) => u.tempo === null);

  return (
    <TabContent>
      <div className="space-y-6">
        {tempi.length > 0 && (
          <section>
            <h2 className={TITOLO_SEZIONE}>I tempi verbali</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {tempi.map((u) => (
                <SchedaTempo key={u.id} u={u} ordine={ordine} locale={locale} />
              ))}
            </div>
          </section>
        )}

        <div className="space-y-6 md:grid md:grid-cols-3 md:items-start md:gap-4 md:space-y-0">
          {altre.length > 0 && (
            <section className="md:col-span-2">
              <h2 className={TITOLO_SEZIONE}>Altri argomenti</h2>
              <ul className="overflow-hidden rounded-2xl bg-card md:grid md:grid-cols-2 lg:grid-cols-1">
                {altre.map((u, i) => (
                  <RigaUnita key={u.id} u={u} i={i} ordine={ordine} locale={locale} />
                ))}
              </ul>
            </section>
          )}

          {tappe.length > 0 && (
            <section>
              <h2 className={`hidden md:block ${TITOLO_SEZIONE}`}>Verifica</h2>
              <div className="space-y-3">
                {tappe.map((t) => (
                  <SchedaTappa key={t.title} tappa={t} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </TabContent>
  );
}

// Scheda di un tempo: piastrella, "UNITÀ N", titolo, traduzione, barra, contatori.
// Mobile al centro; da md a sinistra. Bordo, "Sei qui", Continua e spunta: CartaTempo (client).
function SchedaTempo({ u, ordine, locale }: { u: UnitaPercorso & { tempo: Tempo }; ordine: string[]; locale: Locale }) {
  const ids = u.argomenti.map((a) => a.id);
  return (
    <CartaTempo
      tempo={u.tempo}
      href={`/a2/grammatica/unita/${u.number}`}
      argomenti={u.argomenti.map(({ id, slug }) => ({ id, slug }))}
      ordine={ordine}
    >
      <PiastrellaTempo tempo={u.tempo} grande />
      <span className="mt-3 block text-[12px] font-semibold tracking-wide text-(--c) uppercase">Unità {u.number}</span>
      <span className="mt-0.5 block text-[19px] leading-tight font-bold tracking-[-0.01em] md:text-[20px]">{u.title}</span>
      {/* Da lg: 14px, al massimo 2 righe. */}
      <Tr locale={locale} size="sm" className="mt-1 block lg:line-clamp-2 lg:text-[14px]">
        {u.subtitle}
      </Tr>
      <span className="mt-auto block w-full pt-4">
        <BarraUnita topicIds={ids} />
      </span>
      <span className="mt-2 block text-[13px] text-label-2">
        Studiati <ConteggioStudiati topicIds={ids} /> · <ConteggioEsercizi ids={ids.flatMap(idEsercizi)} />
      </span>
    </CartaTempo>
  );
}

// Riga di "Altri argomenti": piastrella grigia con il numero, titolo, traduzione, "x/y · Esercizi x/y".
// Da md a lg l'elenco ha 2 colonne (niente linea sopra la seconda riga, linea a sinistra della
// colonna destra); da lg torna a una colonna con righe larghe e traduzione intera.
function RigaUnita({ u, i, ordine, locale }: { u: UnitaPercorso; i: number; ordine: string[]; locale: Locale }) {
  const ids = u.argomenti.map((a) => a.id);
  return (
    <li
      className={`${i > 0 ? "border-t border-separator" : ""} ${i === 1 ? "md:border-t-0 lg:border-t" : ""} ${
        i % 2 === 1 ? "md:border-l md:border-separator lg:border-l-0" : ""
      }`}
    >
      <Link
        href={`/a2/grammatica/unita/${u.number}`}
        transitionTypes={["nav-forward"]}
        className="flex min-h-[60px] items-center gap-3 px-4 py-3 hover:bg-bg-grouped/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent active:bg-bg-grouped dark:hover:bg-label/[0.06] dark:active:bg-label/[0.1]"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-label/[0.08] text-[17px] font-semibold text-label-2 tabular-nums dark:bg-label/[0.16]">
          {u.number}
        </span>
        <span className="min-w-0 flex-1">
          <SeiQui topicIds={ids} ordine={ordine} />
          <span className="line-clamp-2 text-[17px] leading-snug font-semibold lg:line-clamp-none">{u.title}</span>
          <Tr locale={locale} size="sm" className="line-clamp-2 lg:line-clamp-none">
            {u.subtitle}
          </Tr>
          <span className="mt-0.5 block text-[13px] text-label-2">
            <ConteggioStudiati topicIds={ids} /> · <ConteggioEsercizi ids={ids.flatMap(idEsercizi)} />
          </span>
        </span>
        <ChevronRight />
      </Link>
    </li>
  );
}

// Tappa (test di metà corso), non ancora disponibile: scheda scura. Tema chiaro: fondo del colore
// del testo e testo bianco; tema scuro: superficie della scheda con bordo.
function SchedaTappa({ tappa }: { tappa: TappaPercorso }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-label p-4 text-bg dark:border dark:border-separator dark:bg-card dark:text-label">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-(--sezione-esercizi) text-bg">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="m12 3.5 2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.8l-5.25 2.8 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block text-[17px] leading-snug font-semibold">{tappa.title}</span>
        <span className="block text-[13px] text-bg/70 dark:text-label-2">
          Unità {tappa.daUnita}–{tappa.aUnita} · In preparazione
        </span>
      </span>
    </div>
  );
}
