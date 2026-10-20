"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { IconCheck } from "@/components/lezione/ui";
import { useProgress } from "@/lib/progress";
import { STILE_TEMPO, type Tempo } from "@/lib/tempi";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Scheda di un tempo verbale nel percorso. Il contenuto (piastrella, testi, barra, contatori)
// arriva dal server come children; qui solo ciò che dipende dal progresso (bv_progress_a2):
// - "Sei qui" (primo argomento non studiato del percorso, come prima): bordo 2px e ombra nel
//   colore del tempo, pillola "SEI QUI" e, sotto md, il pulsante "Continua" al primo
//   argomento non studiato dell'unità;
// - unità tutta studiata: spunta in un cerchio in alto a destra.
export function CartaTempo({
  tempo,
  href,
  argomenti,
  ordine,
  children,
}: {
  tempo: Tempo;
  href: string;
  argomenti: { id: string; slug: string }[];
  ordine: string[];
  children: ReactNode;
}) {
  const { topics } = useProgress();
  const qui = ordine.find((id) => topics[id] !== "studied") ?? ordine[0];
  const seiQui = argomenti.some((a) => a.id === qui);
  const completa = argomenti.every((a) => topics[a.id] === "studied");
  const prossimo = argomenti.find((a) => topics[a.id] !== "studied") ?? argomenti[0];

  return (
    <div
      style={STILE_TEMPO[tempo]}
      className={`relative flex flex-col rounded-[22px] border-2 bg-card md:rounded-3xl ${
        seiQui ? "border-(--c) shadow-(--c-shadow)" : "border-transparent"
      }`}
    >
      {/* Da lg la spunta è in linea con la piastrella (centro a 40px); se c'è anche "Sei qui", lì va la pillola. */}
      {completa && (
        <span
          role="img"
          aria-label="Unità completata"
          className={`absolute top-3 right-3 flex size-6 items-center justify-center rounded-full bg-(--c) text-bg lg:top-7 lg:right-4 ${
            seiQui ? "lg:hidden" : ""
          }`}
        >
          <IconCheck className="size-3.5" />
        </span>
      )}
      <Link
        href={href}
        transitionTypes={["nav-forward"]}
        className={`flex flex-1 flex-col items-center rounded-[20px] p-4 text-center transition active:scale-[0.99] md:items-start md:rounded-[22px] md:text-left ${FOCUS}`}
      >
        {seiQui && (
          // Sotto lg sopra la piastrella; da lg in alto a destra, in linea con la piastrella:
          // così le piastrelle delle 4 schede stanno alla stessa altezza.
          <span className="mb-2 rounded-full bg-(--c) px-2.5 py-0.5 text-[11px] leading-4 font-bold tracking-wide text-bg uppercase lg:absolute lg:top-[30px] lg:right-4 lg:mb-0">
            Sei qui
          </span>
        )}
        {children}
      </Link>
      {seiQui && (
        <Link
          href={`/a2/grammatica/${prossimo.slug}`}
          transitionTypes={["nav-forward"]}
          className={`mx-4 mb-4 flex h-12 items-center justify-center rounded-full bg-(--c) text-[17px] font-semibold text-bg transition active:scale-[0.98] md:hidden ${FOCUS}`}
        >
          Continua
        </Link>
      )}
    </div>
  );
}
