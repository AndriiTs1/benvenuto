"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LARGHEZZA_COLONNA, LARGHEZZA_COLONNA_LARGA, useColonnaLarga } from "@/components/corso/Colonna";
import { SEZIONI } from "@/lib/sezioni";

// Barra in alto del corso. Su mobile resta ferma: quando il titolo grande (CourseHeader)
// passa sotto la barra, al centro compare il titolo piccolo e la barra diventa traslucida.
export function CourseNavBar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const barra = useRef<HTMLElement>(null);
  const sentinella = useRef<HTMLDivElement>(null);
  const [compatta, setCompatta] = useState(false);
  const sezione = SEZIONI.find((s) => pathname.endsWith(`/${s.slug}`));
  const larga = useColonnaLarga();

  useEffect(() => {
    // Si osserva il titolo grande; nelle pagine interne (senza titolo di scheda) l'inizio del contenuto.
    const bersaglio = document.querySelector("[data-titolo-grande]") ?? sentinella.current;
    if (!bersaglio || !barra.current) return;
    const altezza = barra.current.offsetHeight;
    const osservatore = new IntersectionObserver(
      ([voce]) => setCompatta(!voce.isIntersecting && voce.boundingClientRect.top < altezza),
      { rootMargin: `-${altezza}px 0px 0px 0px` },
    );
    osservatore.observe(bersaglio);
    return () => osservatore.disconnect();
  }, [pathname]);

  return (
    <>
      <header
        ref={barra}
        className="relative z-30 max-md:sticky max-md:top-0"
      >
        {/* Sfondo traslucido in un livello a parte: backdrop-filter sulla barra stessa farebbe
            da riferimento alla tab bar fissa (position: fixed) che sta qui dentro. */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 border-b transition-[opacity] duration-150 motion-reduce:transition-none md:hidden ${
            compatta ? "border-separator bg-bg/80 opacity-100 backdrop-blur-[20px]" : "border-transparent opacity-0"
          }`}
        />
        <div className={`mx-auto grid w-full ${larga ? LARGHEZZA_COLONNA_LARGA : LARGHEZZA_COLONNA} grid-cols-[1fr_auto_1fr] items-center px-4 pt-[max(1rem,env(safe-area-inset-top))] max-md:pb-1`}>
          {children}
          {sezione && (
            <p
              aria-hidden={!compatta}
              className={`col-start-2 row-start-1 truncate text-[17px] font-semibold transition-opacity duration-150 motion-reduce:transition-none md:hidden ${
                compatta ? "opacity-100" : "opacity-0"
              }`}
            >
              {sezione.nome}
            </p>
          )}
        </div>
      </header>
      <div ref={sentinella} aria-hidden="true" />
    </>
  );
}
