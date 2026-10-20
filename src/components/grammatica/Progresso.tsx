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

// Progresso generale (intestazione di Grammatica): "{N} di {totale} argomenti" e "{P}%",
// barra di 6px nel colore del testo (il blu è del presente).
export function BarraProgresso({ topicIds }: { topicIds: string[] }) {
  const studiati = useStudiati(topicIds);
  const totale = topicIds.length;
  const percento = totale ? Math.round((studiati / totale) * 100) : 0;
  return (
    <div>
      <p className="flex justify-between gap-3 text-[15px] text-label-2 tabular-nums">
        <span>
          {studiati} di {totale} argomenti
        </span>
        <span>{percento}%</span>
      </p>
      <div
        role="progressbar"
        aria-label="Argomenti studiati"
        aria-valuemin={0}
        aria-valuemax={totale}
        aria-valuenow={studiati}
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-label/[0.08] dark:bg-label/[0.16]"
      >
        <div className="h-full rounded-full bg-label transition-[width] duration-300" style={{ width: `${percento}%` }} />
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

// Barra di 6px dell'unità di un tempo verbale: colore --c, fondo --c-soft (style del genitore).
export function BarraUnita({ topicIds }: { topicIds: string[] }) {
  const studiati = useStudiati(topicIds);
  const totale = topicIds.length;
  return (
    <span
      role="progressbar"
      aria-label="Argomenti studiati"
      aria-valuemin={0}
      aria-valuemax={totale}
      aria-valuenow={studiati}
      className="block h-1.5 w-full overflow-hidden rounded-full bg-(--c-soft)"
    >
      <span
        className="block h-full rounded-full bg-(--c) transition-[width] duration-300"
        style={{ width: `${totale ? (studiati / totale) * 100 : 0}%` }}
      />
    </span>
  );
}

// "Sei qui" sulla riga dell'unità in cui si è fermati: il primo argomento non studiato
// (ordine del percorso); se sono tutti studiati, il primo. Prima dell'idratazione: unità 1.
// Colore della riga: --c (tempo) oppure label-2 se la riga non ne ha uno.
export function SeiQui({ topicIds, ordine }: { topicIds: string[]; ordine: string[] }) {
  const { topics } = useProgress();
  const qui = ordine.find((id) => topics[id] !== "studied") ?? ordine[0];
  if (!topicIds.includes(qui)) return null;
  return (
    <span className="block text-[12px] font-semibold tracking-wide text-[var(--c,var(--label-2))] uppercase">Sei qui</span>
  );
}
