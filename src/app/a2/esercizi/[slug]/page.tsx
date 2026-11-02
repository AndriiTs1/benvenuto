import { notFound } from "next/navigation";
import { ElencoBlocchi } from "@/components/esercizi/ElencoBlocchi";
import { PlayerEsercizi } from "@/components/esercizi/PlayerEsercizi";
import { LinkAvanti } from "@/components/grammatica/LinkAvanti";
import { Tr } from "@/components/Tr";
import { blocchi, getEsercizi, SLUG_ESERCIZI } from "@/content/a2/esercizi";
import { linguaScelta } from "@/lib/lingua-scelta";

export function generateStaticParams() {
  return SLUG_ESERCIZI.map((slug) => ({ slug }));
}

// Argomento senza esercizi → 404 (proxy.ts lo intercetta prima; notFound() resta come seconda difesa).
export const instant = false;

export default async function EserciziArgomentoPage({ params }: PageProps<"/a2/esercizi/[slug]">) {
  const { slug } = await params;
  const locale = await linguaScelta();
  const dati = await getEsercizi(locale, slug);
  if (!dati) notFound();

  // Argomento diviso in blocchi: qui si sceglie il blocco (ognuno ha la sua pagina e il suo giro).
  const elenco = blocchi(dati.argomento.id, locale);
  if (elenco.length > 0) {
    return (
      <div className="mx-auto w-full max-w-xl space-y-6">
        <header>
          <h1 lang="it" className="text-[24px] leading-[1.2] font-bold tracking-[-0.02em] md:text-[32px]">
            {dati.argomento.title}
          </h1>
          <Tr locale={locale} as="p" size="md" className="mt-1">
            {dati.argomento.subtitle}
          </Tr>
        </header>
        <ElencoBlocchi slug={slug} blocchi={elenco} />
        <LinkAvanti href={`/a2/grammatica/${slug}`} indietro>
          Torna all&apos;argomento
        </LinkAvanti>
      </div>
    );
  }

  return (
    <PlayerEsercizi
      topicId={dati.argomento.id}
      chiave={dati.argomento.id}
      titolo={dati.argomento.title}
      slug={slug}
      voci={dati.voci}
      istruzioni={dati.istruzioni}
    />
  );
}
