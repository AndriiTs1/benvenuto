import { ConteggioBlocco } from "@/components/esercizi/FattiEsercizi";
import { Elenco, RigaElenco, TestoRiga } from "@/components/grammatica/Elenco";
import { Tr } from "@/components/Tr";
import type { blocchi } from "@/content/a2/esercizi";

export type BloccoElenco = ReturnType<typeof blocchi>[number];

// Una riga per blocco: "Blocco n", titolo italiano, traduzione, X/N → /a2/esercizi/<slug>/<n>.
// Si usa dentro un Elenco (anche quello dell'unità, sotto la riga dell'argomento: rientro).
export function RigheBlocchi({ slug, blocchi, rientro = false }: { slug: string; blocchi: BloccoElenco[]; rientro?: boolean }) {
  return blocchi.map((b) => (
    <RigaElenco
      key={b.numero}
      href={`/a2/esercizi/${slug}/${b.numero}`}
      leading={null}
      rientro={rientro}
      trailing={
        <span className="shrink-0 text-[13px] text-label-2">
          <ConteggioBlocco ids={b.ids} />
        </span>
      }
      first={!rientro && b.numero === 1}
    >
      <TestoRiga
        sopra={`Blocco ${b.numero}`}
        titolo={<span lang="it">{b.titoloIt}</span>}
        sotto={<Tr locale={b.titolo.lingua}>{b.titolo.testo}</Tr>}
      />
    </RigaElenco>
  ));
}

// Elenco dei blocchi di un argomento, con la riga "Esercizi · N" sopra.
export function ElencoBlocchi({ slug, blocchi }: { slug: string; blocchi: BloccoElenco[] }) {
  const totale = blocchi.reduce((n, b) => n + b.ids.length, 0);
  return (
    <Elenco titolo={`Esercizi · ${totale}`}>
      <RigheBlocchi slug={slug} blocchi={blocchi} />
    </Elenco>
  );
}
