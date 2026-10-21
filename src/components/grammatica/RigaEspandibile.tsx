"use client";

import { useId, useState, type ReactNode } from "react";

// Riga che si apre e chiude (scheda "Approfondisci" delle lezioni): titolo italiano · numero,
// chevron a destra che ruota di 90°. Si apre in 200 ms (altezza + opacità), senza animazione con
// prefers-reduced-motion. All'apertura della pagina è chiusa; lo stato non si ricorda.
// Chiusa, il contenuto è inert: non riceve il fuoco e non si legge.
export function RigaEspandibile({
  titolo,
  conteggio,
  prima = false,
  children,
}: {
  titolo: string;
  conteggio: number;
  /** Prima riga della scheda: senza linea sopra. */
  prima?: boolean;
  children: ReactNode;
}) {
  const [aperta, setAperta] = useState(false);
  const id = useId();
  const idPulsante = `${id}-pulsante`;
  const idContenuto = `${id}-contenuto`;

  return (
    <div className={prima ? "" : "border-t border-separator"}>
      <h3>
        <button
          type="button"
          id={idPulsante}
          aria-expanded={aperta}
          aria-controls={idContenuto}
          onClick={() => setAperta((a) => !a)}
          className="flex min-h-[52px] w-full items-center gap-3 px-4 py-2 text-[17px] font-semibold focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent max-md:text-center md:text-left"
        >
          <span className="flex-1">
            <span lang="it">{titolo}</span>
            <span className="font-normal text-label-2 tabular-nums"> · {conteggio}</span>
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`size-4 shrink-0 text-label-2 transition-transform duration-200 motion-reduce:transition-none ${aperta ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </h3>
      <div
        id={idContenuto}
        role="region"
        aria-labelledby={idPulsante}
        inert={!aperta}
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${
          aperta ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        {/* relative: anche gli elementi absolute (sr-only) restano tagliati e non allungano la pagina. */}
        <div className="relative min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
