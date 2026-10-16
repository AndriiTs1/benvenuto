"use client";

import { useEffect } from "react";
import { segnaVisto, toggleStudiato, useProgress } from "@/lib/progress";

// Aprendo la pagina l'argomento diventa "seen" (se non è già studiato) e l'ultimo aperto.
export function SegnaVisto({ topicId }: { topicId: string }) {
  useEffect(() => segnaVisto(topicId), [topicId]);
  return null;
}

// "Ho capito" ↔ "Studiato ✓": un secondo tocco annulla.
export function HoCapito({ topicId }: { topicId: string }) {
  const studiato = useProgress().topics[topicId] === "studied";
  return (
    <button
      type="button"
      aria-pressed={studiato}
      onClick={() => toggleStudiato(topicId)}
      className={`h-[52px] w-full rounded-full text-[17px] font-semibold transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-label ${
        studiato ? "bg-label/[0.08] text-label dark:bg-label/[0.16]" : "bg-label text-bg hover:opacity-85"
      }`}
    >
      {studiato ? "Studiato ✓" : "Ho capito"}
    </button>
  );
}
