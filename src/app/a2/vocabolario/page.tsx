import Link from "next/link";
import { TabContent } from "@/components/corso/TabContent";
import { Tr } from "@/components/Tr";
import { CercaParole } from "@/components/vocabolario/CercaParole";
import { ElencoParole } from "@/components/vocabolario/ElencoParole";
import { cercaParole, getGruppi } from "@/content/a2/vocabolario";
import { linguaScelta } from "@/lib/lingua-scelta";

// La ricerca dipende dall'URL (?q=), le traduzioni dal cookie.
export const instant = false;

export default async function VocabolarioPage({ searchParams }: PageProps<"/a2/vocabolario">) {
  const q = (await searchParams).q;
  const query = typeof q === "string" ? q.trim() : "";
  const locale = await linguaScelta();

  return (
    <TabContent>
      <div className="space-y-6">
        <CercaParole iniziale={query} />
        {query ? <Risultati query={query} locale={locale} /> : <Gruppi locale={locale} />}
      </div>
    </TabContent>
  );
}

async function Risultati({ query, locale }: { query: string; locale: Awaited<ReturnType<typeof linguaScelta>> }) {
  const trovate = await cercaParole(locale, query);
  return (
    <section aria-live="polite">
      <h2 className="mb-1.5 px-4 text-[13px] tracking-wide text-label-2 uppercase">
        {trovate.length === 1 ? "1 parola" : `${trovate.length} parole`}
      </h2>
      {trovate.length > 0 ? (
        <div className="overflow-hidden rounded-2xl bg-card">
          <ElencoParole parole={trovate} primaLinea={false} />
        </div>
      ) : (
        <p className="rounded-2xl bg-card p-6 text-center text-[17px] text-label-2">Nessuna parola trovata</p>
      )}
    </section>
  );
}

// 12 gruppi: nome italiano, sottotitolo nella lingua scelta, numero di parole.
async function Gruppi({ locale }: { locale: Awaited<ReturnType<typeof linguaScelta>> }) {
  const gruppi = await getGruppi(locale);
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {gruppi.map((g) => (
        <li key={g.slug}>
          <Link
            href={`/a2/vocabolario/${g.slug}`}
            transitionTypes={["nav-forward"]}
            className="flex h-full min-h-[88px] flex-col justify-center rounded-2xl bg-card px-4 py-3 transition active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span lang="it" className="text-[17px] leading-snug font-semibold">
              {g.it}
            </span>
            <Tr locale={g.lingua} size="sm" className="block">
              {g.sottotitolo}
            </Tr>
            <span className="mt-1 text-[13px] font-medium text-vocab tabular-nums">{g.totale} parole</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
