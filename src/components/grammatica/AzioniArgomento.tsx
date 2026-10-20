"use client";

import { useEffect } from "react";
import { IconCheck } from "@/components/lezione/ui";
import { segnaVisto, toggleStudiato, useProgress } from "@/lib/progress";

// Aprendo la pagina l'argomento diventa "seen" (se non è già studiato) e l'ultimo aperto.
export function SegnaVisto({ topicId }: { topicId: string }) {
  useEffect(() => segnaVisto(topicId), [topicId]);
  return null;
}

// "Ho capito" ↔ "Studiato" (con la spunta): un secondo tocco annulla.
export function HoCapito({ topicId }: { topicId: string }) {
  const studiato = useProgress().topics[topicId] === "studied";
  return (
    <button
      type="button"
      aria-pressed={studiato}
      onClick={() => toggleStudiato(topicId)}
      className={`h-[52px] w-full rounded-full text-[17px] font-semibold transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        studiato ? "bg-label/[0.08] text-label dark:bg-label/[0.16]" : "bg-(--primario) text-bg hover:opacity-85"
      }`}
    >
      {studiato ? (
        <span className="inline-flex items-center gap-1.5">
          Studiato
          <IconCheck className="size-[1.1em]" />
        </span>
      ) : (
        "Ho capito"
      )}
    </button>
  );
}
