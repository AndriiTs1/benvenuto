"use client";

import { useRef, useState } from "react";
import { speak } from "@/lib/speech";
import { FOCUS, RIEMPIMENTO } from "./ui";

type AbbinaProps = {
  coppie: [string, string][];
  // Вызывается, когда найдены все пары; errori — неверные попытки вида «B – effe».
  onFinito: (errori: string[]) => void;
};

function mescola<T>(valori: T[]): T[] {
  const copia = [...valori];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function Abbina({ coppie, onFinito }: AbbinaProps) {
  const [nomi] = useState(() => mescola(coppie.map(([, nome]) => nome)));
  const [lettera, setLettera] = useState<string | null>(null);
  const [trovate, setTrovate] = useState<string[]>([]);
  const [sbagliata, setSbagliata] = useState<[string, string] | null>(null);
  const errori = useRef<string[]>([]);

  function scegliNome(nome: string) {
    speak(nome);
    if (!lettera) return;

    const giusta = coppie.find(([l]) => l === lettera)?.[1];
    if (giusta === nome) {
      const nuove = [...trovate, lettera];
      setTrovate(nuove);
      setLettera(null);
      if (nuove.length === coppie.length) onFinito(errori.current);
    } else {
      errori.current = [...errori.current, `${lettera} – ${nome}`];
      setSbagliata([lettera, nome]);
      setLettera(null);
      setTimeout(() => setSbagliata(null), 600);
    }
  }

  const nomiTrovati = coppie.filter(([l]) => trovate.includes(l)).map(([, nome]) => nome);

  function stile(attivo: boolean, trovato: boolean, errato: boolean) {
    if (trovato) return "text-success ring-2 ring-success";
    if (errato) return "ring-2 ring-error";
    if (attivo) return "bg-card ring-2 ring-label";
    return "";
  }

  const bottone = `flex min-h-[56px] items-center justify-center rounded-2xl text-[20px] font-semibold transition disabled:cursor-default ${RIEMPIMENTO} ${FOCUS}`;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-3">
        {coppie.map(([l]) => {
          const trovato = trovate.includes(l);
          return (
            <button
              key={l}
              type="button"
              disabled={trovato}
              aria-pressed={lettera === l}
              onClick={() => setLettera(l)}
              className={`${bottone} ${stile(lettera === l, trovato, sbagliata?.[0] === l)}`}
            >
              {l}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-3">
        {nomi.map((nome) => {
          const trovato = nomiTrovati.includes(nome);
          return (
            <button
              key={nome}
              type="button"
              disabled={trovato}
              onClick={() => scegliNome(nome)}
              className={`${bottone} ${stile(false, trovato, sbagliata?.[1] === nome)}`}
            >
              {nome}
            </button>
          );
        })}
      </div>
    </div>
  );
}
