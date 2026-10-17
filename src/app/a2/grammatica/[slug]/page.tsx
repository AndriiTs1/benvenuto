import { notFound } from "next/navigation";
import { HoCapito, SegnaVisto } from "@/components/grammatica/AzioniArgomento";
import { ContenutoArgomento, GrigliaParticipi, Sezione } from "@/components/grammatica/ContenutoArgomento";
import { LezioneV2 } from "@/components/grammatica/LezioneV2";
import { LinkAvanti } from "@/components/grammatica/LinkAvanti";
import { ParoleChiave } from "@/components/grammatica/ParoleChiave";
import { Tr } from "@/components/Tr";
import { getArgomento, getParoleChiave, getPercorso, type TraduzioniParticipi } from "@/content/a2/grammatica";
import { getLezioneV2 } from "@/content/a2/lezioni";
import { DEFAULT_LOCALE } from "@/lib/lingue";
import { dizionario } from "@/lib/i18n";
import { linguaScelta } from "@/lib/lingua-scelta";

export async function generateStaticParams() {
  const { argomenti } = await getPercorso(DEFAULT_LOCALE);
  return argomenti.map((a) => ({ slug: a.slug }));
}

// Uno slug inesistente deve dare un vero 404: params si leggono fuori da Suspense.
export const instant = false;

export default async function ArgomentoPage({ params }: PageProps<"/a2/grammatica/[slug]">) {
  const { slug } = await params;
  const locale = await linguaScelta();
  const dati = await getArgomento(locale, slug);
  if (!dati) notFound();
  const { argomento, contenuto, esercizi, successivo, lingua } = dati;
  // Lezione nel nuovo formato, se c'è; altrimenti il contenuto di grammar.json.
  const v2 = await getLezioneV2(locale, argomento.id);
  const avvisoSoloRusso = lingua !== locale ? dizionario(locale).soloInRusso : null;
  // Parole chiave scelte a mano per la lezione v2; senza keyWords il blocco non c'è.
  const gruppiParole = v2?.lezione.keyWords ? await getParoleChiave(locale, v2.lezione.keyWords) : [];

  return (
    <article className="space-y-6">
      <SegnaVisto topicId={argomento.id} />

      <header>
        <p className="text-[15px] text-label-2">
          Unità {argomento.unita} · Argomento {argomento.indice} di {argomento.totaleUnita}
        </p>
        <h1 className="mt-1 text-[24px] leading-[1.2] font-bold tracking-[-0.02em] md:text-[40px] md:leading-[1.15]">
          {argomento.title}
        </h1>
        <Tr locale={locale} as="p" size="lg" className="mt-1">
          {argomento.subtitle}
        </Tr>
      </header>

      {v2 ? (
        <>
          {v2.lingua !== locale && (
            <p className="inline-block rounded-full bg-label/[0.08] px-3 py-1 text-[13px] text-label-2 dark:bg-label/[0.16]">
              Spiegazione disponibile in russo
            </p>
          )}
          <LezioneV2
            lezione={v2.lezione}
            lingua={v2.lingua}
            dopoTabelle={
              // Regola generale: se grammar.json ha irregular_participles, la griglia resta anche nel v2.
              Array.isArray(contenuto.irregular_participles) && (
                <Sezione titolo="Participi irregolari">
                  <GrigliaParticipi
                    righe={contenuto.irregular_participles as string[][]}
                    traduzioni={(contenuto.irregular_participles_tr ?? {}) as TraduzioniParticipi}
                    locale={locale}
                  />
                </Sezione>
              )
            }
          />
        </>
      ) : (
        <>
          {/* Argomento solo nel vecchio formato (russo): avviso per chi ha scelto un'altra lingua.
              Sparisce da solo quando l'argomento ha una lezione v2. */}
          {avvisoSoloRusso && (
            <Tr locale={locale} as="p" size="sm" className="block rounded-2xl bg-translation-soft px-4 py-3">
              {avvisoSoloRusso}
            </Tr>
          )}
          <ContenutoArgomento contenuto={contenuto} lingua={lingua} locale={locale} />
        </>
      )}

      {gruppiParole.length > 0 && <ParoleChiave gruppi={gruppiParole} />}

      {esercizi.length > 0 && (
        <Sezione titolo={`Esercizi (${esercizi.length})`}>
          <ul className="space-y-3">
            {esercizi.map((esercizio) => (
              <li key={esercizio.id} className="rounded-2xl bg-card p-4">
                <Tr locale={lingua} as="p" size="md">
                  {esercizio.task}
                </Tr>
                <details className="group mt-2">
                  <summary className="-mx-1 inline-flex min-h-11 cursor-pointer list-none items-center rounded-full px-1 text-[15px] font-medium text-accent select-none focus-visible:outline-2 focus-visible:outline-label [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">Mostra la soluzione</span>
                    <span className="hidden group-open:inline">Nascondi la soluzione</span>
                  </summary>
                  <p lang="it" className="mt-1 rounded-xl bg-bg-grouped p-3 text-[17px] leading-snug whitespace-pre-line dark:bg-label/[0.08]">
                    {esercizio.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </Sezione>
      )}

      <div className="space-y-2 pt-2">
        <HoCapito topicId={argomento.id} />
        {successivo ? (
          <LinkAvanti href={`/a2/grammatica/${successivo.slug}`}>Argomento successivo →</LinkAvanti>
        ) : (
          <LinkAvanti href="/a2/grammatica" indietro>
            Torna al percorso
          </LinkAvanti>
        )}
      </div>
    </article>
  );
}
