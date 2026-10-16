"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { LEVEL_COOKIE, LEVEL_COOKIE_MAX_AGE, courseHref, type LevelCode } from "@/lib/levels";

// Salva il livello nel cookie e apre il suo corso. Usato dalla card A2 e dal pulsante in basso.
export function ScegliLivello({
  code,
  className,
  children,
}: {
  code: LevelCode;
  className: string;
  children: ReactNode;
}) {
  const router = useRouter();

  function scegli() {
    document.cookie = `${LEVEL_COOKIE}=${code}; path=/; max-age=${LEVEL_COOKIE_MAX_AGE}; SameSite=Lax`;
    // Svuota la cache di navigazione: così "/" mostra subito "Continua il corso".
    router.refresh();
    router.push(courseHref(code), { transitionTypes: ["nav-forward"] });
  }

  return (
    <button type="button" onClick={scegli} className={className}>
      {children}
    </button>
  );
}
