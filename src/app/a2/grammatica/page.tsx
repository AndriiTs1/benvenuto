import { TabContent } from "@/components/corso/TabContent";
import { ConteggioEsercizi } from "@/components/esercizi/FattiEsercizi";
import { Elenco, RigaElenco } from "@/components/grammatica/Elenco";
import { BarraProgresso, BarraUnita, ConteggioStudiati, SeiQui } from "@/components/grammatica/Progresso";
import { PiastrellaTempo } from "@/components/grammatica/Tempo";
import { Tr } from "@/components/Tr";
import { idEsercizi } from "@/content/a2/esercizi";
import { getPercorso, type TappaPercorso, type UnitaPercorso } from "@/content/a2/grammatica";
import type { Locale } from "@/lib/lingue";
import { linguaScelta } from "@/lib/lingua-scelta";
import { STILE_TEMPO, TEMPI, type Tempo } from "@/lib/tempi";

// Percorso: "I tempi verbali" (unità con tempo in meta.json, nell'ordine di TEMPI),
// "Altri argomenti" (le altre, nell'ordine del curriculum), poi le tappe (test di metà corso).
// La lingua dei sottotitoli arriva dal cookie. Il vecchio ?vista=indice lo toglie proxy.ts.
export const instant = false;

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
        <BarraProgresso topicIds={ordine} />

        {tempi.length > 0 && (
          <Elenco titolo="I tempi verbali">
            {tempi.map((u, i) => (
              <RigaUnita key={u.id} u={u} ordine={ordine} locale={locale} first={i === 0} />
            ))}
          </Elenco>
        )}

        {altre.length > 0 && (
          <Elenco titolo="Altri argomenti">
            {altre.map((u, i) => (
              <RigaUnita key={u.id} u={u} ordine={ordine} locale={locale} first={i === 0} />
            ))}
          </Elenco>
        )}

        {tappe.map((t) => (
          <Elenco key={t.title}>
            <RigaTappa tappa={t} />
          </Elenco>
        ))}
      </div>
    </TabContent>
  );
}

// Riga di un'unità. Con tempo: piastrella colorata con icona e barra sottile nel colore del tempo
// (--c da STILE_TEMPO); senza: piastrella grigia con il numero. "Sei qui" sopra il titolo,
// "Esercizi x/y" sotto il sottotitolo; a destra solo "Studiati x/y" e il chevron.
function RigaUnita({ u, ordine, locale, first }: { u: UnitaPercorso; ordine: string[]; locale: Locale; first: boolean }) {
  const ids = u.argomenti.map((a) => a.id);
  return (
    <div style={u.tempo ? STILE_TEMPO[u.tempo] : undefined}>
      <RigaElenco
        href={`/a2/grammatica/unita/${u.number}`}
        leading={
          u.tempo ? (
            <PiastrellaTempo tempo={u.tempo} />
          ) : (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-label/[0.08] text-[17px] font-semibold text-label-2 tabular-nums dark:bg-label/[0.16]">
              {u.number}
            </span>
          )
        }
        trailing={
          <span className="shrink-0 text-[13px] text-label-2">
            Studiati <ConteggioStudiati topicIds={ids} />
          </span>
        }
        first={first}
      >
        <SeiQui topicIds={ids} ordine={ordine} />
        <span className="line-clamp-2 text-[17px] leading-snug font-semibold">{u.title}</span>
        <Tr locale={locale} size="sm" className="line-clamp-2">
          {u.subtitle}
        </Tr>
        <span className="mt-0.5 block text-[13px] text-label-2">
          <ConteggioEsercizi ids={ids.flatMap(idEsercizi)} />
        </span>
        {u.tempo && (
          <span className="mt-2 flex">
            <BarraUnita topicIds={ids} />
          </span>
        )}
      </RigaElenco>
    </div>
  );
}

// Tappa del percorso (test di metà corso): non ancora disponibile.
function RigaTappa({ tappa }: { tappa: TappaPercorso }) {
  return (
    <RigaElenco
      leading={
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 text-label-2" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round">
          <path d="m12 3.5 2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.8l-5.25 2.8 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
        </svg>
      }
      trailing={
        <span className="shrink-0 text-[15px] text-label-2">
          Unità {tappa.daUnita}–{tappa.aUnita}
        </span>
      }
      first
    >
      <span className="block text-[17px] leading-snug">{tappa.title}</span>
      <span className="mt-0.5 inline-block rounded-full bg-label/[0.08] px-2 py-0.5 text-[12px] font-medium text-label-2 dark:bg-label/[0.16]">
        In preparazione
      </span>
    </RigaElenco>
  );
}
