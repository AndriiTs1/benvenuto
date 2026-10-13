"use client";

import Link from "next/link";
import { useState } from "react";
import type { LezioneContenuto } from "@/content/types";
import { segnaCompletata } from "@/lib/progress";
import { EsercizioView, type Risultato } from "./EsercizioView";
import { ScopriAlfabeto } from "./ScopriAlfabeto";
import { CAPSULA, FOCUS, IconCheck, IconX, RIEMPIMENTO } from "./ui";

type Fase = "intro" | "scopri" | "esercizi" | "fine";

export function LessonPlayer({ lezione }: { lezione: LezioneContenuto }) {
  const [fase, setFase] = useState<Fase>("intro");
  const [indice, setIndice] = useState(0);
  const [risultati, setRisultati] = useState<Risultato[]>([]);

  const totaleEsercizi = lezione.esercizi.length;
  const conScopri = Boolean(lezione.scopri);
  const primoEsercizio = conScopri ? 2 : 1;
  // Шаги: intro, (scopri), упражнения, fine — прогресс считается по всем фазам.
  const passiTotali = primoEsercizio + totaleEsercizi;
  const passo =
    fase === "intro"
      ? 0
      : fase === "scopri"
        ? 1
        : fase === "esercizi"
          ? primoEsercizio + indice
          : passiTotali;

  function avanti(risultato: Risultato) {
    const nuovi = [...risultati, risultato];
    setRisultati(nuovi);
    if (indice + 1 < totaleEsercizi) {
      setIndice(indice + 1);
    } else {
      segnaCompletata(lezione.id);
      setFase("fine");
    }
    window.scrollTo(0, 0);
  }

  function ripeti() {
    setFase("intro");
    setIndice(0);
    setRisultati([]);
  }

  return (
    <div className={`min-h-dvh text-label ${fase === "scopri" ? "bg-bg-grouped" : "bg-bg"}`}>
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] md:max-w-lg">
        <header className="flex items-center gap-3">
          <Link
            href="/percorso"
            aria-label="Chiudi"
            className={`-ml-2.5 flex size-11 shrink-0 items-center justify-center rounded-full text-label-2 hover:text-label ${FOCUS}`}
          >
            <IconX className="size-6" />
          </Link>
          <div
            role="progressbar"
            aria-label="Avanzamento della lezione"
            aria-valuemin={0}
            aria-valuemax={passiTotali}
            aria-valuenow={passo}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-separator"
          >
            <div
              className="h-full rounded-full bg-label transition-[width] duration-500 ease-out"
              style={{ width: `${(passo / passiTotali) * 100}%` }}
            />
          </div>
        </header>

        <main className="mt-6 flex flex-1 flex-col">
          {fase === "intro" && (
            <>
              <p className="text-[15px] text-label-2">Lezione {lezione.numero}</p>
              <h1 className="text-[34px] leading-tight font-bold tracking-tight">{lezione.titolo}</h1>
              <h2 className="mt-8 text-[17px] font-semibold">Imparerai</h2>
              <ul className="mt-3 flex flex-col gap-3">
                {lezione.imparerai.map((punto) => (
                  <li key={punto} className="flex items-start gap-3 text-[17px]">
                    <IconCheck className="mt-0.5 size-5 shrink-0 text-label-2" />
                    {punto}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] text-label-2">circa {lezione.minuti} min</p>
              <div className="mt-auto pt-8">
                <button
                  type="button"
                  onClick={() => setFase(conScopri ? "scopri" : "esercizi")}
                  className={CAPSULA}
                >
                  Inizia
                </button>
              </div>
            </>
          )}

          {fase === "scopri" && (
            <ScopriAlfabeto
              onContinua={() => {
                setFase("esercizi");
                window.scrollTo(0, 0);
              }}
            />
          )}

          {fase === "esercizi" && (
            <EsercizioView
              key={indice}
              esercizio={lezione.esercizi[indice]}
              numero={indice + 1}
              lezioneId={lezione.id}
              onContinua={avanti}
            />
          )}

          {fase === "fine" && (
            <Fine risultati={risultati} totale={totaleEsercizi} onRipeti={ripeti} />
          )}
        </main>
      </div>
    </div>
  );
}

type FineProps = { risultati: Risultato[]; totale: number; onRipeti: () => void };

function Fine({ risultati, totale, onRipeti }: FineProps) {
  const corrette = risultati.filter((r) => r.corretto).length;
  const sbagliate = risultati
    .map((risultato, i) => ({ ...risultato, numero: i + 1 }))
    .filter((r) => !r.corretto);

  return (
    <>
      <div className="flex flex-col items-center pt-6 text-center">
        <IconCheck className="size-20 text-success" />
        <h1 className="mt-4 text-[34px] leading-tight font-bold tracking-tight">Lezione completata</h1>
        <p className="mt-1 text-[17px] text-label-2">
          {corrette} di {totale} corrette
        </p>
      </div>

      {sbagliate.length > 0 && (
        <section className={`mt-8 rounded-2xl p-5 ${RIEMPIMENTO}`}>
          <h2 className="text-[17px] font-semibold">Da ripassare</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {sbagliate.map((r) => (
              <li key={r.numero} className="text-[15px]">
                <span className="text-label-2">
                  Esercizio {r.numero}
                  {r.datoUtente && <>: {r.datoUtente}</>}
                </span>
                <span className="block font-semibold">{r.rispostaGiusta}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-auto flex flex-col items-stretch gap-1 pt-8">
        <Link href="/percorso" className={CAPSULA}>
          Torna al percorso
        </Link>
        <button
          type="button"
          onClick={onRipeti}
          className={`h-11 rounded-full text-[17px] text-label-2 hover:text-label md:mx-auto md:px-6 ${FOCUS}`}
        >
          Ripeti la lezione
        </button>
      </div>
    </>
  );
}
