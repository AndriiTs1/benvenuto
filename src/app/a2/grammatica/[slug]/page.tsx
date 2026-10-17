import { notFound } from "next/navigation";
import { HoCapito, SegnaVisto } from "@/components/grammatica/AzioniArgomento";
import { ContenutoArgomento, Sezione } from "@/components/grammatica/ContenutoArgomento";
import { LezioneV2 } from "@/components/grammatica/LezioneV2";
import { LinkAvanti } from "@/components/grammatica/LinkAvanti";
import { Tr } from "@/components/Tr";
import { getArgomento, getPercorso } from "@/content/a2/grammatica";
import { getLezioneV2 } from "@/content/a2/lezioni";
import { DEFAULT_LOCALE, type Locale } from "@/lib/lingue";
import { linguaScelta } from "@/lib/lingua-scelta";

// Traduzione della parola nella lingua del contenuto (i file hanno sempre ru).
function traduzione(parola: { ru: string }, lingua: Locale) {
  const valore = (parola as Record<string, unknown>)[lingua];
  return typeof valore === "string" ? valore : parola.ru;
}

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
  const { argomento, contenuto, parole, esercizi, successivo, lingua } = dati;
  // Lezione nel nuovo formato, se c'è; altrimenti il contenuto di grammar.json.
  const v2 = await getLezioneV2(locale, argomento.id);

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
          <LezioneV2 lezione={v2.lezione} lingua={v2.lingua} />
        </>
      ) : (
        <ContenutoArgomento contenuto={contenuto} lingua={lingua} />
      )}

      {parole.length > 0 && (
        <details className="group overflow-hidden rounded-2xl bg-card">
          <summary className="flex min-h-[52px] cursor-pointer list-none items-center gap-3 px-4 text-[17px] font-semibold select-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-label [&::-webkit-details-marker]:hidden">
            <span className="flex-1">Parole di questa lezione ({parole.length})</span>
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
            {parole.map((parola) => (
              <li key={parola.id} className="border-t border-separator px-4 py-2.5">
                <p className="text-[17px] leading-snug">
                  <span className="font-medium">{parola.it}</span>
                  {" — "}
                  <Tr locale={lingua}>{traduzione(parola, lingua)}</Tr>
                </p>
                {parola.example && <p className="mt-0.5 text-[13px] text-label-2">{parola.example}</p>}
              </li>
            ))}
          </ul>
        </details>
      )}

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
