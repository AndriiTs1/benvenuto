import { useMemo, useSyncExternalStore } from "react";

const PROGRESS_KEY = "benvenuto.progress";
const ERRORI_KEY = "benvenuto.errori";
// storage срабатывает только в других вкладках; для текущей шлём своё событие.
const EVENTO = "benvenuto:progress";

export type Progress = { completate: string[] };

export type ErroreSalvato = {
  lezione: string;
  esercizio: number;
  datoUtente: string;
  rispostaGiusta: string;
  aiuto: boolean;
  data: string;
};

function leggiRaw(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function leggi(key: string): unknown {
  try {
    const raw = leggiRaw(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function scrivi(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(EVENTO));
  } catch {
    // localStorage non disponibile (es. navigazione privata)
  }
}

function parseProgress(value: unknown): Progress {
  const completate = (value as Progress | null)?.completate;
  return { completate: Array.isArray(completate) ? completate : [] };
}

export function getProgress(): Progress {
  return parseProgress(leggi(PROGRESS_KEY));
}

export function segnaCompletata(id: string) {
  const { completate } = getProgress();
  if (!completate.includes(id)) scrivi(PROGRESS_KEY, { completate: [...completate, id] });
}

export function getErrori(): ErroreSalvato[] {
  const errori = leggi(ERRORI_KEY);
  return Array.isArray(errori) ? errori : [];
}

export function aggiungiErrore(errore: ErroreSalvato) {
  scrivi(ERRORI_KEY, [...getErrori(), errore]);
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENTO, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENTO, onChange);
  };
}

// Список пройденных уроков; на сервере и до гидратации — пустой.
export function useCompletate(): string[] {
  const raw = useSyncExternalStore(subscribe, () => leggiRaw(PROGRESS_KEY), () => null);
  return useMemo(() => {
    try {
      return parseProgress(raw ? JSON.parse(raw) : null).completate;
    } catch {
      return [];
    }
  }, [raw]);
}
