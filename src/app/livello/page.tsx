"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { LEVELS, LEVEL_STORAGE_KEY, type LevelCode } from "@/lib/levels";

function isAvailableLevel(value: string | null): value is LevelCode {
  return LEVELS.some((level) => level.code === value && level.available);
}

function readStoredLevel(): LevelCode | null {
  try {
    const stored = localStorage.getItem(LEVEL_STORAGE_KEY);
    return isAvailableLevel(stored) ? stored : null;
  } catch {
    // localStorage non disponibile (es. navigazione privata)
    return null;
  }
}

function subscribeToStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export default function LivelloPage() {
  const storedLevel = useSyncExternalStore(subscribeToStorage, readStoredLevel, () => null);
  const [picked, setPicked] = useState<LevelCode | null>(null);
  const selected = picked ?? storedLevel ?? "A1";

  function select(code: LevelCode) {
    setPicked(code);
    try {
      localStorage.setItem(LEVEL_STORAGE_KEY, code);
    } catch {
      // localStorage non disponibile (es. navigazione privata)
    }
  }

  return (
    <main className="min-h-dvh bg-bg-grouped text-label">
      <div className="mx-auto w-full max-w-md px-4 pt-[max(1rem,env(safe-area-inset-top))] md:max-w-lg">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-1 text-[17px] text-label hover:opacity-70"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
          Indietro
        </Link>

        <h1 className="mt-2 text-[34px] leading-tight font-bold tracking-tight">
          Scegli il tuo livello
        </h1>
        <p className="mt-1 text-[17px] text-label-2">Potrai cambiarlo in qualsiasi momento</p>

        <div
          role="radiogroup"
          aria-label="Livello"
          className="mt-6 overflow-hidden rounded-2xl bg-card"
        >
          {LEVELS.map((level, index) => {
            const isSelected = level.code === selected;
            return (
              <button
                key={level.code}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-disabled={!level.available}
                disabled={!level.available}
                onClick={() => select(level.code)}
                className={`flex min-h-[64px] w-full items-center gap-3 pl-4 text-left ${
                  level.available
                    ? "hover:bg-bg-grouped/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-label active:bg-bg-grouped"
                    : "cursor-default"
                }`}
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-[15px] font-semibold ${
                    level.available ? "bg-label text-bg" : "bg-bg-grouped text-label-2"
                  }`}
                >
                  {level.code}
                </span>
                <span
                  className={`flex min-h-[64px] flex-1 items-center gap-3 self-stretch py-3 pr-4 ${
                    index > 0 ? "border-t border-separator" : ""
                  }`}
                >
                  <span className="flex-1">
                    <span
                      className={`block text-[17px] font-semibold ${
                        level.available ? "" : "text-label-2"
                      }`}
                    >
                      {level.code} · {level.name}
                    </span>
                    <span className="block text-[15px] text-label-2">{level.description}</span>
                  </span>
                  {isSelected && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-5 shrink-0 text-label"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  )}
                  {!level.available && (
                    <span className="shrink-0 rounded-full bg-bg-grouped px-2.5 py-1 text-[13px] text-label-2">
                      Presto
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="sticky bottom-0 mt-8 bg-bg-grouped/85 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur">
          <Link
            href="/percorso"
            className="flex h-[52px] w-full items-center justify-center rounded-full bg-label text-[17px] font-semibold text-bg transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-label active:scale-[0.98] md:mx-auto md:w-80"
          >
            Continua con {selected}
          </Link>
        </div>
      </div>
    </main>
  );
}
