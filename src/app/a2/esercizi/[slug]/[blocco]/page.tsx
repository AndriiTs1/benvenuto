import { notFound } from "next/navigation";
import { PlayerEsercizi } from "@/components/esercizi/PlayerEsercizi";
import { getEsercizi, PARAMETRI_BLOCCHI } from "@/content/a2/esercizi";
import { linguaScelta } from "@/lib/lingua-scelta";

export function generateStaticParams() {
  return PARAMETRI_BLOCCHI;
}

// Blocco inesistente → 404 (proxy.ts lo intercetta prima; notFound() resta come seconda difesa).
export const instant = false;

export default async function BloccoEserciziPage({ params }: PageProps<"/a2/esercizi/[slug]/[blocco]">) {
  const { slug, blocco } = await params;
  const numero = /^\d+$/.test(blocco) ? Number(blocco) : NaN;
  const locale = await linguaScelta();
  const dati = await getEsercizi(locale, slug, numero);
  if (!dati?.blocco) notFound();
  return (
    <PlayerEsercizi
      topicId={dati.argomento.id}
      chiave={`${dati.argomento.id}#${dati.blocco.numero}`}
      titolo={dati.argomento.title}
      slug={slug}
      voci={dati.voci}
      istruzioni={dati.istruzioni}
      blocco={dati.blocco}
    />
  );
}
