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
  const sezione = SEZIONI.find((s) => pathname.endsWith(`/${s.slug}`)) ?? SEZIONI[0];

  return (
    <div className="mt-2 md:text-center">
      <h1 className="text-[34px] leading-tight font-bold tracking-tight md:text-5xl">{sezione.nome}</h1>
      <p lang={locale} className="mt-1 text-[15px] text-label-2 md:text-[17px]">
        {sottotitoli[sezione.slug]}
      </p>
    </div>
  );
}
