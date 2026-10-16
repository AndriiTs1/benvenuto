"use client";

import { useProgress, type StatoArgomento } from "@/lib/progress";

const NOMI_STATO = { nessuno: "Non iniziato", seen: "Aperto", studied: "Studiato" };

// Punto di stato dell'argomento: ○ non aperto, ◐ aperto, ● studiato.
export function PuntoStato({ topicId }: { topicId: string }) {
  const stato: StatoArgomento | undefined = useProgress().topics[topicId];
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-grammar" role="img" aria-label={NOMI_STATO[stato ?? "nessuno"]}>
      <circle cx="8" cy="8" r="6.5" fill={stato === "studied" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" />
      {stato === "seen" && <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />}
    </svg>
  );
}

function useStudiati(topicIds: string[]) {
  const { topics } = useProgress();
  return topicIds.filter((id) => topics[id] === "studied").length;
}

// "{N} di {totale} argomenti studiati" + barra sottile.
export function BarraProgresso({ topicIds }: { topicIds: string[] }) {
  const studiati = useStudiati(topicIds);
  const totale = topicIds.length;
  return (
    <div>
      <p className="text-[15px] text-label-2 tabular-nums">
        {studiati} di {totale} argomenti studiati
      </p>
      <div
        role="progressbar"
        aria-label="Argomenti studiati"
        aria-valuemin={0}
        aria-valuemax={totale}
        aria-valuenow={studiati}
        className="mt-2 h-1 overflow-hidden rounded-full bg-label/[0.08] dark:bg-label/[0.16]"
      >
        <div
          className="h-full rounded-full bg-grammar transition-[width] duration-300"
          style={{ width: `${totale ? (studiati / totale) * 100 : 0}%` }}
        />
      </div>
    </div>
  );
}

// "{studiati}/{totale}" oppure "{studiati} di {totale}".
export function ConteggioStudiati({ topicIds, separatore = "/" }: { topicIds: string[]; separatore?: string }) {
  const studiati = useStudiati(topicIds);
  return (
    <span className="tabular-nums">
      {studiati}
      {separatore}
      {topicIds.length}
    </span>
  );
}

// Cerchio con il numero dell'unità: contorno; pieno quando tutti gli argomenti sono studiati.
export function CerchioUnita({ numero, topicIds }: { numero: number; topicIds: string[] }) {
  const completa = useStudiati(topicIds) === topicIds.length;
  return (
    <span
      className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-grammar text-[15px] font-semibold tabular-nums ${
        completa ? "bg-grammar text-white dark:text-black" : "text-grammar"
      }`}
    >
      {numero}
    </span>
  );
}
