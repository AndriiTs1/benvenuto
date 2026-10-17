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

function getProgress(): Progress {
  return parseProgress(leggi(PROGRESS_KEY));
}

export function segnaCompletata(id: string) {
  const { completate } = getProgress();
  if (!completate.includes(id)) scrivi(PROGRESS_KEY, { completate: [...completate, id] });
}

function getErrori(): ErroreSalvato[] {
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

// --- Grammatica A2: stato degli argomenti, senza registrazione ---

const PROGRESS_A2_KEY = "bv_progress_a2";

export type StatoArgomento = "seen" | "studied";
export type ProgressA2 = { topics: Record<string, StatoArgomento>; lastTopic: string | null };

const VUOTO_A2: ProgressA2 = { topics: {}, lastTopic: null };

function parseProgressA2(value: unknown): ProgressA2 {
  const dati = value as Partial<ProgressA2> | null;
  const topics: Record<string, StatoArgomento> = {};
  if (dati?.topics && typeof dati.topics === "object") {
    for (const [id, stato] of Object.entries(dati.topics)) {
      if (stato === "seen" || stato === "studied") topics[id] = stato;
    }
  }
  return { topics, lastTopic: typeof dati?.lastTopic === "string" ? dati.lastTopic : null };
}

function getProgressA2(): ProgressA2 {
  return parseProgressA2(leggi(PROGRESS_A2_KEY));
}

// Apertura della pagina dell'argomento: "seen" (se non è già "studied") e ultimo argomento.
export function segnaVisto(topicId: string) {
  const { topics, lastTopic } = getProgressA2();
  if (topics[topicId] && lastTopic === topicId) return;
  scrivi(PROGRESS_A2_KEY, {
    topics: { ...topics, [topicId]: topics[topicId] ?? "seen" },
    lastTopic: topicId,
  });
}

// "Ho capito": studied ↔ seen.
export function toggleStudiato(topicId: string) {
  const { topics } = getProgressA2();
  scrivi(PROGRESS_A2_KEY, {
    topics: { ...topics, [topicId]: topics[topicId] === "studied" ? "seen" : "studied" },
    lastTopic: topicId,
  });
}

// Progresso A2; sul server e prima dell'idratazione è vuoto (tutto a 0).
export function useProgress(): ProgressA2 {
  const raw = useSyncExternalStore(subscribe, () => leggiRaw(PROGRESS_A2_KEY), () => null);
  return useMemo(() => {
    try {
      return raw ? parseProgressA2(JSON.parse(raw)) : VUOTO_A2;
    } catch {
      return VUOTO_A2;
    }
  }, [raw]);
}
