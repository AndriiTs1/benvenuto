"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

// Campo di ricerca del Vocabolario: aggiorna ?q= nell'URL (dopo una breve pausa);
// la ricerca vera si fa sul server, così il vocabolario intero non arriva al browser.
export function CercaParole({ iniziale }: { iniziale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [testo, setTesto] = useState(iniziale);
  const [inCorso, startTransition] = useTransition();
  const attesa = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(attesa.current), []);

  function cambia(valore: string) {
    setTesto(valore);
    clearTimeout(attesa.current);
    attesa.current = setTimeout(() => {
      const q = valore.trim();
      startTransition(() => router.replace(q ? `${pathname}?q=${encodeURIComponent(q)}` : pathname, { scroll: false }));
    }, 250);
  }

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()}>
      <label className="relative block">
        <span className="sr-only">Cerca una parola</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-label-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4 4" />
        </svg>
        {/* id e name: senza, Chrome segnala un problema nel pannello Issues (campo di modulo anonimo). */}
        <input
          id="cerca-parole"
          name="q"
          type="search"
          value={testo}
          onChange={(e) => cambia(e.target.value)}
          placeholder="Cerca una parola"
          autoComplete="off"
          spellCheck={false}
          aria-busy={inCorso}
          className="h-12 w-full rounded-full bg-card pr-4 pl-11 text-[17px] text-label placeholder:text-label-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-md:text-center"
        />
      </label>
    </form>
  );
}
