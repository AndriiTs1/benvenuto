"use client";

import { useProgressoEsercizi } from "@/lib/progress";

// "fatti X / N": voci dell'argomento con una risposta salvata. Prima dell'idratazione 0.
export function FattiEsercizi({ ids, sempre = false }: { ids: string[]; sempre?: boolean }) {
  const { voci } = useProgressoEsercizi();
  const fatti = ids.filter((id) => id in voci).length;
  if (!fatti && !sempre) return null;
  return (
    <span className="tabular-nums">
      fatti {fatti} / {ids.length}
    </span>
  );
}
