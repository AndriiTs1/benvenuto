import { TabContent } from "@/components/corso/TabContent";
import { FattiEsercizi } from "@/components/esercizi/FattiEsercizi";
import { Elenco, RigaElenco, TestoRiga } from "@/components/grammatica/Elenco";
import { Tr } from "@/components/Tr";
import { getIndiceEsercizi, type RigaEsercizi } from "@/content/a2/esercizi";
import type { Locale } from "@/lib/lingue";
import { linguaScelta } from "@/lib/lingua-scelta";

// La lingua dei sottotitoli arriva dal cookie.
export const instant = false;

export default async function EserciziPage() {
  const locale = await linguaScelta();
  const { titoloTest, test, altri } = await getIndiceEsercizi(locale);

  return (
    <TabContent>
      <div className="space-y-6">
        {test.length > 0 && (
          <Elenco titolo={titoloTest}>
            {test.map((r, i) => (
              <Riga key={r.id} riga={r} locale={locale} first={i === 0} />
            ))}
          </Elenco>
        )}
        {altri.length > 0 && (
          <section className="space-y-4">
            <h2 className="px-4 text-[13px] tracking-wide text-label-2 uppercase">Tutti gli argomenti</h2>
            {altri.map((u) => (
              <Elenco key={u.numero} titolo={`Unità ${u.numero} · ${u.titolo}`}>
                {u.righe.map((r, i) => (
                  <Riga key={r.id} riga={r} locale={locale} first={i === 0} />
                ))}
              </Elenco>
            ))}
          </section>
        )}
      </div>
    </TabContent>
  );
}

function Riga({ riga, locale, first }: { riga: RigaEsercizi; locale: Locale; first: boolean }) {
  return (
    <RigaElenco
      href={`/a2/esercizi/${riga.slug}`}
      leading={
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 text-exercises" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 5.5l4 4L9 19H5v-4z" />
          <path d="M12.5 7.5l4 4" />
        </svg>
      }
      trailing={
        <span className="shrink-0 text-[15px] text-label-2">
          <FattiEsercizi ids={riga.ids} sempre />
        </span>
      }
      first={first}
    >
      <TestoRiga titolo={riga.title} sotto={<Tr locale={locale}>{riga.subtitle}</Tr>} />
    </RigaElenco>
  );
}
