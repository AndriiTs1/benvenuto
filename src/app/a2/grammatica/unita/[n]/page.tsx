import { notFound } from "next/navigation";
import { Elenco, RigaElenco, TestoRiga } from "@/components/grammatica/Elenco";
import { LinkAvanti } from "@/components/grammatica/LinkAvanti";
import { ConteggioStudiati, PuntoStato } from "@/components/grammatica/Progresso";
import { Tr } from "@/components/Tr";
import { getPercorso } from "@/content/a2/grammatica";
import { DEFAULT_LOCALE } from "@/lib/lingue";
import { linguaScelta } from "@/lib/lingua-scelta";

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

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-[34px] leading-tight font-bold tracking-tight md:text-5xl">Unità {u.number}</h1>
        <p className="mt-1 text-[20px] font-semibold">{u.title}</p>
        <Tr locale={locale} as="p" size="md">
          {u.subtitle}
        </Tr>
        <p className="mt-2 text-[15px] text-label-2">
          <ConteggioStudiati topicIds={u.argomenti.map((a) => a.id)} separatore=" di " /> studiati
        </p>
      </header>

      <Elenco>
        {u.argomenti.map((a, i) => (
          <RigaElenco key={a.id} href={`/a2/grammatica/${a.slug}`} leading={<PuntoStato topicId={a.id} />} first={i === 0}>
            <TestoRiga sopra={`Argomento ${a.indice}`} titolo={a.title} sotto={<Tr locale={locale}>{a.subtitle}</Tr>} />
          </RigaElenco>
        ))}
      </Elenco>

      {successiva && <LinkAvanti href={`/a2/grammatica/unita/${successiva.number}`}>Unità successiva →</LinkAvanti>}
    </div>
  );
}
