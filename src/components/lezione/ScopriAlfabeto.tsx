"use client";

import { useState } from "react";
import { ALFABETO, type Lettera } from "@/content/a1/alfabeto";
import { speak, useSpeechAvailable } from "@/lib/speech";
import { AudioNonDisponibile } from "./AudioNonDisponibile";
import { CAPSULA, FOCUS, IconSpeaker } from "./ui";

const ITALIANE = ALFABETO.filter((l) => !l.straniera);
const STRANIERE = ALFABETO.filter((l) => l.straniera);

const ETICHETTA = "text-[13px] font-semibold tracking-wide text-label-2 uppercase";

type ScopriAlfabetoProps = { numero: string; titolo: string; onContinua: () => void };

export function ScopriAlfabeto({ numero, titolo, onContinua }: ScopriAlfabetoProps) {
  const audioDisponibile = useSpeechAvailable();
  // Сразу показываем A; звук только по нажатию — без жеста браузер его не воспроизведёт.
  const [selezionata, setSelezionata] = useState<Lettera>(ALFABETO[0]);
  const [ascoltate, setAscoltate] = useState<Set<string>>(() => new Set());

  function ascolta(lettera: Lettera) {
    speak(`${lettera.nome}. ${lettera.esempio}`);
  }

  function scegli(lettera: Lettera) {
    setSelezionata(lettera);
    setAscoltate((prima) => new Set(prima).add(lettera.lettera));
    ascolta(lettera);
  }

  function griglia(lettere: Lettera[], righe: string) {
    return (
      <div className={`grid grid-cols-6 gap-2 sm:grid-cols-7 ${righe}`}>
        {lettere.map((lettera) => {
          const attiva = selezionata.lettera === lettera.lettera;
          const stile = attiva
            ? "bg-label text-bg"
            : lettera.straniera
              ? "border-[1.5px] border-dashed border-label-2/40 bg-transparent text-label"
              : "bg-card text-label shadow-(--shadow-sm)";
          return (
            <button
              key={lettera.lettera}
              type="button"
              aria-pressed={attiva}
              onClick={() => scegli(lettera)}
              className={`relative flex h-full max-h-[104px] min-h-[52px] w-full flex-col items-center justify-center gap-1 rounded-[16px] transition active:scale-[0.96] ${FOCUS} ${stile}`}
            >
              <span className="text-[clamp(22px,5vh,44px)] leading-none font-semibold">{lettera.lettera}</span>
              <span className={`text-[clamp(10px,1.5vh,14px)] leading-none ${attiva ? "text-bg/70" : "text-label-2"}`}>
                {lettera.nome}
              </span>
              {!attiva && ascoltate.has(lettera.lettera) && (
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 right-1.5 size-[5px] rounded-full bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="-mt-2 flex flex-1 flex-col gap-3.5">
      <div>
        <p className={ETICHETTA}>
          Lezione {numero} · {titolo}
        </p>
        <h1 className="text-[28px] leading-tight font-bold tracking-tight">Ascolta le lettere</h1>
      </div>

      <div
        aria-live="polite"
        className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-(--shadow-md)"
      >
        <span className="flex size-[92px] shrink-0 items-center justify-center rounded-[22px] bg-label text-[56px] font-bold text-bg">
          {selezionata.lettera}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[28px] leading-tight font-semibold">{selezionata.nome}</p>
          <p className="text-[17px] text-label-2">
            <span className="font-bold text-label">{selezionata.esempio.charAt(0)}</span>
            {selezionata.esempio.slice(1)}
          </p>
          {selezionata.nota && <p className="text-[13px] text-label-2">{selezionata.nota}</p>}
        </div>
        {audioDisponibile && (
          <button
            type="button"
            aria-label="Ascolta di nuovo"
            onClick={() => ascolta(selezionata)}
            className={`flex size-11 shrink-0 items-center justify-center rounded-full border-0 bg-bg-grouped text-label transition active:scale-95 ${FOCUS}`}
          >
            <IconSpeaker className="size-5" />
          </button>
        )}
      </div>
      {!audioDisponibile && <AudioNonDisponibile />}

      <div className="flex items-center gap-2.5">
        <div
          role="progressbar"
          aria-label="Lettere ascoltate"
          aria-valuemin={0}
          aria-valuemax={ALFABETO.length}
          aria-valuenow={ascoltate.size}
          className="h-1 flex-1 overflow-hidden rounded-full bg-separator"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${(ascoltate.size / ALFABETO.length) * 100}%` }}
          />
        </div>
        <span className="text-[13px] text-label-2 tabular-nums">
          {ascoltate.size} di {ALFABETO.length}
        </span>
      </div>

      {/* Плитки занимают всё свободное место до «Continua». Минимальные высоты сеток
          (ряды по 52px) не дают им сжаться на низких экранах — там страница прокручивается. */}
      <div className="flex flex-1 flex-col gap-2">
        {griglia(ITALIANE, "min-h-[232px] flex-[4] grid-rows-4 sm:min-h-[172px] sm:flex-[3] sm:grid-rows-3")}
        <div className="mt-1.5 flex items-baseline justify-between">
          <h2 className={ETICHETTA}>Lettere straniere</h2>
          <span className="text-[13px] text-label-2">kiwi, jeans, web…</span>
        </div>
        {griglia(STRANIERE, "min-h-[52px] flex-[1] grid-rows-1")}
      </div>

      <div className="sticky bottom-0 -mx-5 mt-auto bg-bg-grouped/90 px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">
        <button type="button" onClick={onContinua} className={CAPSULA}>
          Continua
        </button>
      </div>
    </div>
  );
}
