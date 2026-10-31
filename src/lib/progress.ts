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

// --- Esercizi A2: risultato di ogni voce e miglior risultato per argomento ---

const ESERCIZI_A2_KEY = "bv_esercizi_a2";

export type ProgressoEsercizi = {
  voci: Record<string, { ok: boolean }>;
  /** Miglior risultato di un giro completo: argomento → giuste. */
  migliori: Record<string, number>;
};

const VUOTO_ESERCIZI: ProgressoEsercizi = { voci: {}, migliori: {} };

function parseEsercizi(value: unknown): ProgressoEsercizi {
  const dati = value as Partial<ProgressoEsercizi> | null;
  const voci: ProgressoEsercizi["voci"] = {};
  const migliori: ProgressoEsercizi["migliori"] = {};
  if (dati?.voci && typeof dati.voci === "object") {
    for (const [id, v] of Object.entries(dati.voci)) if (typeof v?.ok === "boolean") voci[id] = { ok: v.ok };
  }
  if (dati?.migliori && typeof dati.migliori === "object") {
    for (const [id, n] of Object.entries(dati.migliori)) if (typeof n === "number") migliori[id] = n;
  }
  return { voci, migliori };
}

export function salvaRisposta(id: string, ok: boolean) {
  const attuale = parseEsercizi(leggi(ESERCIZI_A2_KEY));
  scrivi(ESERCIZI_A2_KEY, { ...attuale, voci: { ...attuale.voci, [id]: { ok } } });
}

export function salvaMigliore(topicId: string, giuste: number) {
  const attuale = parseEsercizi(leggi(ESERCIZI_A2_KEY));
  if ((attuale.migliori[topicId] ?? -1) >= giuste) return;
  scrivi(ESERCIZI_A2_KEY, { ...attuale, migliori: { ...attuale.migliori, [topicId]: giuste } });
}

// Progresso degli esercizi; sul server e prima dell'idratazione è vuoto.
export function useProgressoEsercizi(): ProgressoEsercizi {
  const raw = useSyncExternalStore(subscribe, () => leggiRaw(ESERCIZI_A2_KEY), () => null);
  return useMemo(() => {
    try {
      return raw ? parseEsercizi(JSON.parse(raw)) : VUOTO_ESERCIZI;
    } catch {
      return VUOTO_ESERCIZI;
    }
  }, [raw]);
}

// --- Esercizi A2: giro in corso (per riprendere da dove ci si è fermati) ---

const GIRO_A2_KEY = "benvenuto.giro.a2";

export type EsitoSalvato = { ok: boolean; data: string; accento?: string; scelta?: number };

export type GiroSalvato = {
  ids: string[];
  pos: number;
  esiti: Record<string, EsitoSalvato>;
  ordini: Record<string, number[]>;
  completo: boolean;
};

function leggiGiri(): Record<string, unknown> {
  const dati = leggi(GIRO_A2_KEY);
  return dati && typeof dati === "object" && !Array.isArray(dati) ? (dati as Record<string, unknown>) : {};
}

export function leggiGiro(topicId: string): GiroSalvato | null {
  const g = leggiGiri()[topicId] as Partial<GiroSalvato> | undefined;
  if (
    !g ||
    !Array.isArray(g.ids) ||
    !g.ids.every((id) => typeof id === "string") ||
    !Number.isInteger(g.pos) ||
    !g.esiti ||
    typeof g.esiti !== "object" ||
    !g.ordini ||
    typeof g.ordini !== "object" ||
    typeof g.completo !== "boolean"
  )
    return null;
  return g as GiroSalvato;
}

export function salvaGiro(topicId: string, giro: GiroSalvato) {
  scrivi(GIRO_A2_KEY, { ...leggiGiri(), [topicId]: giro });
}

export function cancellaGiro(topicId: string) {
  const giri = leggiGiri();
  if (!(topicId in giri)) return;
  delete giri[topicId];
  scrivi(GIRO_A2_KEY, giri);
}
