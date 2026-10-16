import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { CURRENT_LEVEL } from "@/lib/levels";
import { livelloScelto } from "@/lib/livello-scelto";

// La pagina attende il cookie sul server (niente Suspense): il pulsante giusto arriva
// già nell'HTML, senza segnaposto né comparsa ritardata.
export const instant = false;

export const metadata: Metadata = {
  title: `Benvenuto — Corso ${CURRENT_LEVEL}`,
};

const PULSANTE =
  "flex h-[52px] w-full items-center justify-center rounded-full bg-label text-[17px] font-semibold text-bg transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-label active:scale-[0.98] active:opacity-80 md:w-80";

// Un solo percorso: si passa sempre dalla scelta del livello. Cambia solo il testo.
async function Azioni() {
  const scelto = await livelloScelto();
  return (
    <Link href="/livello" transitionTypes={["nav-forward"]} className={PULSANTE}>
      {scelto ? "Continua" : "Inizia"}
    </Link>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <main className="flex min-h-dvh justify-center bg-bg text-label">
        <div className="flex w-full max-w-md flex-col px-6 pt-[max(4rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))] md:max-w-xl md:justify-center md:py-16">
          <div className="flex flex-1 flex-col items-center justify-center pt-10 pb-[12dvh] text-center md:flex-none md:p-0">
            <span className="rounded-full bg-label/[0.08] px-3 py-1 text-[13px] font-semibold text-label/70 dark:bg-label/[0.16]">
              Corso {CURRENT_LEVEL}
            </span>
            <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">Benvenuto</h1>
            <p className="mx-auto mt-3 max-w-xs text-center text-lg font-normal text-balance text-label-2 md:max-w-[32.5rem] md:text-xl">
              <span className="font-medium text-grammar">Grammatica</span>,{" "}
              <span className="font-medium text-vocab">vocabolario</span>,{" "}
              <span className="font-medium text-exercises">esercizi</span> e{" "}
              <span className="font-medium text-communicate">comunicazione</span> per il tuo corso
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch md:mt-10 md:items-center">
            <Azioni />
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
