"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/lingue";
import { SEZIONI, type SezioneSlug } from "@/lib/sezioni";

// Titolo grande (stile iOS) della sezione aperta + sottotitolo nella lingua delle spiegazioni.
export function CourseHeader({
  locale,
  sottotitoli,
}: {
  locale: Locale;
  sottotitoli: Record<SezioneSlug, string>;
}) {
  const pathname = usePathname();
  const sezione = SEZIONI.find((s) => pathname.endsWith(`/${s.slug}`));
  // Nelle pagine interne (unità, argomento) il titolo è della pagina stessa.
  if (!sezione) return null;

  return (
    <div className="mt-2">
      {/* data-titolo-grande: lo osserva CourseNavBar per mostrare il titolo piccolo. */}
      <h1 data-titolo-grande className="text-[28px] leading-[1.15] font-bold tracking-[-0.02em] md:text-[40px]">
        {sezione.nome}
      </h1>
      <p lang={locale} className="mt-1 text-[15px] text-label-2 md:text-[17px]">
        {sottotitoli[sezione.slug]}
      </p>
    </div>
  );
}
