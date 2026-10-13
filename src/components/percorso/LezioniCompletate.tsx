"use client";

import { useCompletate } from "@/lib/progress";

// «{пройдено} di {всего} lezioni» по сохранённому прогрессу.
export function LezioniCompletate({ ids, totale }: { ids: string[]; totale: number }) {
  const completate = useCompletate();
  const fatte = ids.filter((id) => completate.includes(id)).length;
  return (
    <>
      {fatte} di {totale} lezioni
    </>
  );
}
