export type LevelCode = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type LevelStatus = "available" | "in_development";
export type Level = { code: LevelCode; name: string; description: string; status: LevelStatus };

export const LEVELS: Level[] = [
  { code: "A1", name: "Base", description: "Da zero: alfabeto, presentarsi, numeri", status: "in_development" },
  { code: "A2", name: "Elementare", description: "Raccontare il passato, descrivere persone, parlare del futuro", status: "available" },
  { code: "B1", name: "Intermedio", description: "Esprimere opinioni, raccontare esperienze, scrivere un'e-mail", status: "in_development" },
  { code: "B2", name: "Intermedio superiore", description: "Discutere e lavorare in italiano", status: "in_development" },
  { code: "C1", name: "Avanzato", description: "Esprimersi con precisione in ogni contesto", status: "in_development" },
  { code: "C2", name: "Padronanza", description: "Come un madrelingua colto", status: "in_development" },
];

/** Il livello del corso attuale (l'unico disponibile per ora). */
export const CURRENT_LEVEL: LevelCode = "A2";

export const LEVEL_COOKIE = "bv_level";
export const LEVEL_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isAvailableLevel(value: string | undefined | null): value is LevelCode {
  return LEVELS.some((level) => level.code === value && level.status === "available");
}

/** Prima sezione del corso: dove portano "Inizia/Continua il corso". */
export function courseHref(code: LevelCode) {
  return `${levelHref(code)}/grammatica`;
}

export function levelHref(code: LevelCode) {
  return `/${code.toLowerCase()}`;
}
