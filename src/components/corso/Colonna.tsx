"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Colonna del corso: max-w-188 (47rem). Il percorso di Grammatica (/a2/grammatica) da lg si
// allarga a 70rem (1120px): 4 schede dei tempi in fila con i titoli su una riga.
export function useColonnaLarga() {
  return /^\/[a-z0-9]+\/grammatica$/.test(usePathname());
}

export const LARGHEZZA_COLONNA = "max-w-188";
export const LARGHEZZA_COLONNA_LARGA = "max-w-188 lg:max-w-280";

export function Colonna({ as: Tag = "div", className, children }: { as?: "div" | "main"; className: string; children: ReactNode }) {
  const larga = useColonnaLarga();
  return <Tag className={`${larga ? LARGHEZZA_COLONNA_LARGA : LARGHEZZA_COLONNA} ${className}`}>{children}</Tag>;
}
