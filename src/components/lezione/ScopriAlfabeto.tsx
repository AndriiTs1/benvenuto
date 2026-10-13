"use client";

import { useState } from "react";
import { ALFABETO, type Lettera } from "@/content/a1/alfabeto";
import { speak, useSpeechAvailable } from "@/lib/speech";
import { AudioNonDisponibile } from "./AudioNonDisponibile";
import { CAPSULA, FOCUS, RIEMPIMENTO } from "./ui";

export function ScopriAlfabeto({ onContinua }: { onContinua: () => void }) {
  const audioDisponibile = useSpeechAvailable();
  const [inAscolto, setInAscolto] = useState<string | null>(null);

  async function ascolta(lettera: Lettera) {
    setInAscolto(lettera.lettera);
    await speak(`${lettera.nome}. ${lettera.esempio}`);
    setInAscolto((attuale) => (attuale === lettera.lettera ? null : attuale));
  }

  function griglia(lettere: Lettera[]) {
    return (
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
        {lettere.map((lettera) => (
          <button
            key={lettera.lettera}
            type="button"
            onClick={() => ascolta(lettera)}
            className={`flex min-h-[84px] flex-col items-center justify-center rounded-2xl p-2 transition active:scale-[0.97] ${RIEMPIMENTO} ${FOCUS} ${
              inAscolto === lettera.lettera ? "ring-2 ring-label" : ""
            }`}
          >
            <span className="text-[30px] leading-none font-bold">{lettera.lettera}</span>
            <span className="mt-1.5 text-[14px] font-medium">{lettera.nome}</span>
            <span className="text-[12px] text-label-2">{lettera.esempio}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      <h1 className="text-[28px] leading-tight font-bold tracking-tight">Ascolta le lettere</h1>
      <p className="mt-1 text-[17px] text-label-2">Tocca una lettera per sentire il suo nome</p>
      {!audioDisponibile && (
        <div className="mt-4">
          <AudioNonDisponibile />
        </div>
      )}

      <div className="mt-6">{griglia(ALFABETO.filter((l) => !l.straniera))}</div>

      <h2 className="mt-8 mb-3 text-[20px] font-bold">Lettere straniere</h2>
      {griglia(ALFABETO.filter((l) => l.straniera))}

      <div className="mt-auto pt-8">
        <button type="button" onClick={onContinua} className={CAPSULA}>
          Continua
        </button>
      </div>
    </>
  );
}
