import { notFound } from "next/navigation";
import { PlayerEsercizi } from "@/components/esercizi/PlayerEsercizi";
import { getEsercizi, SLUG_ESERCIZI } from "@/content/a2/esercizi";
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
  return (
    <PlayerEsercizi
      topicId={dati.argomento.id}
      titolo={dati.argomento.title}
      slug={slug}
      voci={dati.voci}
      istruzioni={dati.istruzioni}
    />
  );
}
