import { TabContent } from "@/components/corso/TabContent";
import { ConteggioEsercizi } from "@/components/esercizi/FattiEsercizi";
import { ContinuaArgomento } from "@/components/grammatica/ContinuaArgomento";
import { Elenco, RigaElenco, TestoRiga } from "@/components/grammatica/Elenco";
import { BarraProgresso, CerchioUnita, ConteggioStudiati } from "@/components/grammatica/Progresso";
import { Tr } from "@/components/Tr";
import { idEsercizi } from "@/content/a2/esercizi";
import { getPercorso, type TappaPercorso } from "@/content/a2/grammatica";
import { linguaScelta } from "@/lib/lingua-scelta";

// La lingua dei sottotitoli arriva dal cookie. Il vecchio ?vista=indice lo toglie proxy.ts.
export const instant = false;

export default async function GrammaticaPage() {
  const locale = await linguaScelta();
  const { unita, argomenti, tappe } = await getPercorso(locale);

  return (
    <TabContent>
      <div className="space-y-6">
        <BarraProgresso topicIds={argomenti.map((a) => a.id)} />

        <ContinuaArgomento
          argomenti={argomenti.map(({ id, slug, title, unita, indice, totaleUnita }) => ({
            id,
            slug,
            title,
            unita,
            indice,
            totaleUnita,
          }))}
        />

        <Elenco>
          {unita.map((u, i) => {
            const ids = u.argomenti.map((a) => a.id);
            const tappa = tappe.find((t) => t.afterUnit === u.number);
            return (
              <div key={u.id}>
                <RigaElenco
                  href={`/a2/grammatica/unita/${u.number}`}
                  leading={<CerchioUnita numero={u.number} topicIds={ids} />}
                  trailing={
                    <span className="shrink-0 text-[13px] leading-snug text-label-2 md:text-right">
                      <span className="block">
                        Studiati <ConteggioStudiati topicIds={ids} />
                      </span>
                      <span className="block">
                        <ConteggioEsercizi ids={ids.flatMap(idEsercizi)} />
                      </span>
                    </span>
                  }
                  first={i === 0}
                >
                  <TestoRiga titolo={u.title} sotto={<Tr locale={locale}>{u.subtitle}</Tr>} />
                </RigaElenco>
                {tappa && <RigaTappa tappa={tappa} />}
              </div>
            );
          })}
        </Elenco>
      </div>
    </TabContent>
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
      first={false}
    >
      <TestoRiga
        titolo={tappa.title}
        sotto={
          <span className="inline-block rounded-full bg-label/[0.08] px-2 py-0.5 text-[12px] font-medium text-label-2 dark:bg-label/[0.16]">
            In preparazione
          </span>
        }
      />
    </RigaElenco>
  );
}
