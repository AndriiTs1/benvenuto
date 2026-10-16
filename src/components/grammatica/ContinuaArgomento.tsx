"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";

type Argomento = { id: string; slug: string; title: string; unita: number; indice: number; totaleUnita: number };

// Scheda "Inizia / Continua / Ripassa": porta al primo argomento non ancora studiato.
export function ContinuaArgomento({ argomenti }: { argomenti: Argomento[] }) {
  const { topics } = useProgress();
  const prossimo = argomenti.find((a) => topics[a.id] !== "studied");
  const argomento = prossimo ?? argomenti[0];
  const etichetta = !prossimo ? "Ripassa" : Object.keys(topics).length === 0 ? "Inizia" : "Continua";

  return (
    <Link
      href={`/a2/grammatica/${argomento.slug}`}
      transitionTypes={["nav-forward"]}
      className="group flex items-center gap-4 rounded-3xl bg-card p-5 transition active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-label"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold tracking-wide text-grammar uppercase">{etichetta}</span>
        <span className="mt-1 block text-[20px] leading-snug font-semibold">{argomento.title}</span>
        <span className="mt-0.5 block text-[15px] text-label-2">
          Unità {argomento.unita} · Argomento {argomento.indice} di {argomento.totaleUnita}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-label text-bg transition group-hover:opacity-85"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
