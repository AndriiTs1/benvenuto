"use client";

import { useState } from "react";
import { ALFABETO, type Lettera } from "@/content/a1/alfabeto";
import { speak, useSpeechAvailable } from "@/lib/speech";
import { AudioNonDisponibile } from "./AudioNonDisponibile";
import { CAPSULA, FOCUS, RIEMPIMENTO } from "./ui";

export function ScopriAlfabeto({ onContinua }: { onContinua: () => void }) {
  const audioDisponibile = useSpeechAvailable();
  const [selezionata, setSelezionata] = useState<Lettera | null>(null);

  function scegli(lettera: Lettera) {
    setSelezionata(lettera);
    speak(`${lettera.nome}. ${lettera.esempio}`);
  }

  function griglia(lettere: Lettera[]) {
    return (
      <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-7">
        {lettere.map((lettera) => (
          <button
            key={lettera.lettera}
            type="button"
            aria-pressed={selezionata?.lettera === lettera.lettera}
            onClick={() => scegli(lettera)}
            className={`flex min-h-[56px] flex-col items-center justify-center rounded-xl p-1 transition active:scale-[0.96] ${RIEMPIMENTO} ${FOCUS} ${
              selezionata?.lettera === lettera.lettera ? "ring-2 ring-label" : ""
            }`}
          >
            <span className="text-[22px] leading-tight font-bold">{lettera.lettera}</span>
            <span className="text-[11px] leading-tight text-label-2">{lettera.nome}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      <h1 className="-mt-2 text-[28px] leading-tight font-bold tracking-tight">Ascolta le lettere</h1>

      <div
        aria-live="polite"
        className={`mt-3 flex min-h-[88px] items-center gap-4 rounded-2xl p-4 ${RIEMPIMENTO}`}
      >
        {selezionata ? (
          <>
            <span className="w-12 shrink-0 text-center text-[44px] leading-none font-bold">
              {selezionata.lettera}
            </span>
            <span>
              <span className="block text-[20px] font-semibold">{selezionata.nome}</span>
              <span className="block text-[15px] text-label-2">{selezionata.esempio}</span>
            </span>
          </>
        ) : (
          <span className="text-[17px] text-label-2">Tocca una lettera</span>
        )}
      </div>
      {!audioDisponibile && (
        <div className="mt-2">
          <AudioNonDisponibile />
        </div>
      )}

      <div className="mt-3">{griglia(ALFABETO.filter((l) => !l.straniera))}</div>

      <h2 className="mt-4 mb-1.5 text-[13px] text-label-2 uppercase">Lettere straniere</h2>
      {griglia(ALFABETO.filter((l) => l.straniera))}

      <div className="sticky bottom-0 -mx-5 mt-auto bg-bg/90 px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">
        <button type="button" onClick={onContinua} className={CAPSULA}>
          Continua
        </button>
      </div>
    </>
  );
}
