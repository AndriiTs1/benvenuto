"use client";

import { useProgressoEsercizi } from "@/lib/progress";

// Voci con una risposta salvata (bv_esercizi_a2). Prima dell'idratazione 0.
function useFatti(ids: string[]) {
  const { voci } = useProgressoEsercizi();
  return ids.filter((id) => id in voci).length;
}

// "fatti X / N" sotto la scheda Esercizi dell'argomento; niente finché non se n'è fatto uno.
export function FattiEsercizi({ ids }: { ids: string[] }) {
  const fatti = useFatti(ids);
  if (!fatti) return null;
  return (
    <span className="tabular-nums">
      fatti {fatti} / {ids.length}
    </span>
  );
}

// "Esercizi X/N" accanto agli argomenti studiati (percorso e pagina dell'unità).
export function ConteggioEsercizi({ ids }: { ids: string[] }) {
  const fatti = useFatti(ids);
  return (
    <span className="tabular-nums">
      Esercizi {fatti}/{ids.length}
    </span>
  );
}
