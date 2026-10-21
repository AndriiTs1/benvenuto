"use client";

import { useId, useState } from "react";
import { Tr } from "@/components/Tr";
import type { Locale } from "@/lib/lingue";

type Verbo = { it: string; participle: string; tr: string };

// Quanti verbi si vedono subito in ogni gruppo: 3 righe da 2 sul telefono, 2 righe da 3 da md.
const VISIBILI = 6;

// Verbi di un gruppo di "Essere o avere?": piastrelle compatte (2 colonne, 3 da md),
// "andare → andato" (anche "alzarsi → mi sono alzato") in grassetto e la traduzione piccola
// sotto. Oltre i primi 6 il resto si apre sul posto con "Altri N"
// (come RigaEspandibile: 200 ms, chiuso è inert).
export function VerbiAusiliare({ verbi, locale }: { verbi: Verbo[]; locale: Locale }) {
  const [aperta, setAperta] = useState(false);
  const id = useId();
  const resto = verbi.slice(VISIBILI);

  const griglia = (voci: Verbo[]) => (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {voci.map((v) => (
        <li key={v.it} className="rounded-xl bg-bg-grouped px-2 py-2.5 text-center">
          {/* A capo solo dopo la freccia: "alzarsi →" e "mi sono alzato" restano interi. */}
          <p lang="it" className="text-[15px] leading-snug font-semibold">
            <span className="whitespace-nowrap">
              {v.it}
              <span aria-hidden="true" className="font-normal text-label-2">
                {" →"}
              </span>
            </span>
            <span className="sr-only">:</span> <span className="whitespace-nowrap">{v.participle}</span>
          </p>
          <Tr locale={locale} as="p" size="xs" className="mt-0.5 leading-snug">
            {v.tr}
          </Tr>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="px-4 pb-4">
      {griglia(verbi.slice(0, VISIBILI))}
      {resto.length > 0 && (
        <>
          <div
            id={id}
            inert={!aperta}
            className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${
              aperta ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="relative min-h-0 overflow-hidden">
              <div className="pt-2">{griglia(resto)}</div>
            </div>
          </div>
          <button
            type="button"
            aria-expanded={aperta}
            aria-controls={id}
            onClick={() => setAperta((a) => !a)}
            className="mx-auto mt-2 flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[15px] font-semibold text-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span lang="it">{aperta ? "Meno" : `Altri ${resto.length}`}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={`size-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${aperta ? "-rotate-90" : "rotate-90"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
