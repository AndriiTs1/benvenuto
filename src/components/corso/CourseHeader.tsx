"use client";

import { usePathname } from "next/navigation";
import { BarraProgresso } from "@/components/grammatica/Progresso";
import { Tr } from "@/components/Tr";
import type { Locale } from "@/lib/lingue";
import { SEZIONI, type SezioneSlug } from "@/lib/sezioni";

// Titolo grande (stile iOS) della sezione aperta + sottotitolo nella lingua delle spiegazioni.
export function CourseHeader({
  locale,
  sottotitoli,
  argomenti,
}: {
  locale: Locale;
  sottotitoli: Record<SezioneSlug, string>;
  /** id degli argomenti del percorso: in Grammatica il progresso generale sta accanto al titolo. */
  argomenti: string[];
}) {
  const pathname = usePathname();
  const sezione = SEZIONI.find((s) => pathname.endsWith(`/${s.slug}`));
  // Nelle pagine interne (unità, argomento) il titolo è della pagina stessa.
  if (!sezione) return null;

  return (
    <div className="mt-2 md:flex md:items-end md:justify-between md:gap-6">
      <div>
        {/* data-titolo-grande: lo osserva CourseNavBar per mostrare il titolo piccolo. */}
        <h1 data-titolo-grande className="text-[28px] leading-[1.15] font-bold tracking-[-0.02em] md:text-[40px]">
          {sezione.nome}
        </h1>
        <Tr locale={locale} as="p" size="lg" className="mt-1">
          {sottotitoli[sezione.slug]}
        </Tr>
      </div>
      {/* Grammatica: progresso generale; da md a destra del titolo, largo 320px. */}
      {sezione.slug === "grammatica" && (
        <div className="mt-4 md:mt-0 md:w-80 md:shrink-0 md:pb-1">
          <BarraProgresso topicIds={argomenti} />
        </div>
      )}
    </div>
  );
}
