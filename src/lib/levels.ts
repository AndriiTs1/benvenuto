export type LevelCode = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type Level = { code: LevelCode; name: string; description: string; available: boolean };

export const LEVELS: Level[] = [
  { code: "A1", name: "Base", description: "Da zero: alfabeto, presentarsi, numeri", available: true },
  { code: "A2", name: "Elementare", description: "Vita quotidiana: casa, lavoro, salute", available: false },
  { code: "B1", name: "Intermedio", description: "Raccontare, spiegare, scrivere un'e-mail", available: false },
  { code: "B2", name: "Intermedio superiore", description: "Discutere e lavorare in italiano", available: false },
  { code: "C1", name: "Avanzato", description: "Esprimersi con precisione in ogni contesto", available: false },
  { code: "C2", name: "Padronanza", description: "Come un madrelingua colto", available: false },
];

export const LEVEL_STORAGE_KEY = "benvenuto.level";
