import { notFound } from "next/navigation";
import { ConteggioEsercizi } from "@/components/esercizi/FattiEsercizi";
import { IntestazioneTempo } from "@/components/grammatica/Tempo";
import { Elenco, RigaElenco, TestoRiga } from "@/components/grammatica/Elenco";
import { LinkAvanti } from "@/components/grammatica/LinkAvanti";
import { BarraUnita, ConteggioStudiati, PuntoStato } from "@/components/grammatica/Progresso";
import { Tr } from "@/components/Tr";
import { idEsercizi } from "@/content/a2/esercizi";
import { getPercorso } from "@/content/a2/grammatica";
import { DEFAULT_LOCALE } from "@/lib/lingue";
import { linguaScelta } from "@/lib/lingua-scelta";
import { STILE_TEMPO } from "@/lib/tempi";

export async function generateStaticParams() {
  const { unita } = await getPercorso(DEFAULT_LOCALE);
  return unita.map((u) => ({ n: String(u.number) }));
}

// Un numero inesistente deve dare un vero 404: params si leggono fuori da Suspense.
export const instant = false;

export default async function UnitaPage({ params }: PageProps<"/a2/grammatica/unita/[n]">) {
  const { n } = await params;
  const locale = await linguaScelta();
  const { unita } = await getPercorso(locale);
  const posizione = unita.findIndex((u) => String(u.number) === n);
  if (posizione < 0) notFound();
  const u = unita[posizione];
  const successiva = unita[posizione + 1];
  const ids = u.argomenti.map((a) => a.id);

  // Unità di un tempo verbale: --c del tempo per intestazione, barra e punti di stato.
  return (
    <div style={u.tempo ? STILE_TEMPO[u.tempo] : undefined} className="space-y-6">
      <header>
        {/* In grande il nome dell'unità; sopra, in piccolo, "UNITÀ 3 · TEMPO VERBALE" nel colore
            del tempo (con la piastrella), oppure solo "UNITÀ 5" in grigio. */}
        {u.tempo ? (
          <IntestazioneTempo tempo={u.tempo} unita={u.number} />
        ) : (
          <p className="mb-1 text-[12px] font-semibold tracking-wide text-label-2 uppercase">Unità {u.number}</p>
        )}
        <h1 className="text-[34px] leading-tight font-bold tracking-tight md:text-5xl">{u.title}</h1>
        <Tr locale={locale} as="p" size="md" className="mt-1">
          {u.subtitle}
        </Tr>
        <p className="mt-2 text-[15px] text-label-2">
          <ConteggioStudiati topicIds={ids} separatore=" di " /> studiati
        </p>
        {u.tempo && (
          <div className="mx-auto mt-2 max-w-60 md:mx-0">
            <BarraUnita topicIds={ids} />
          </div>
        )}
      </header>

      <Elenco>
        {u.argomenti.map((a, i) => (
          <RigaElenco
            key={a.id}
            href={`/a2/grammatica/${a.slug}`}
            leading={<PuntoStato topicId={a.id} />}
            trailing={
              idEsercizi(a.id).length > 0 && (
                <span className="shrink-0 text-[13px] text-label-2">
                  <ConteggioEsercizi ids={idEsercizi(a.id)} />
                </span>
              )
            }
            first={i === 0}
          >
            <TestoRiga sopra={`Argomento ${a.indice}`} titolo={a.title} sotto={<Tr locale={locale}>{a.subtitle}</Tr>} />
          </RigaElenco>
        ))}
      </Elenco>

      {successiva && <LinkAvanti href={`/a2/grammatica/unita/${successiva.number}`}>Unità successiva →</LinkAvanti>}
    </div>
  );
}
