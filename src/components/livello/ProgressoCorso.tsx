"use client";

import { useProgress } from "@/lib/progress";

// "{N} studiati" a sinistra, "{P}%" a destra + barra di 8px: lo stesso progresso del percorso (bv_progress_a2).
export function ProgressoCorso({ topicIds }: { topicIds: string[] }) {
  const { topics } = useProgress();
  const studiati = topicIds.filter((id) => topics[id] === "studied").length;
  const totale = topicIds.length;
  const percento = totale ? Math.round((studiati / totale) * 100) : 0;
  return (
    <div>
      <p className="flex justify-between text-[13px] text-label-2 tabular-nums">
        <span>{studiati} studiati</span>
        <span>{percento}%</span>
      </p>
      <div
        role="progressbar"
        aria-label="Argomenti studiati"
        aria-valuemin={0}
        aria-valuemax={totale}
        aria-valuenow={studiati}
        className="mt-2 h-2 overflow-hidden rounded-full bg-(--primario-soft)"
      >
        <div className="h-full rounded-full bg-(--primario) transition-[width] duration-300" style={{ width: `${percento}%` }} />
      </div>
    </div>
  );
}
