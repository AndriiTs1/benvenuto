// Переводы текстов задания по коду языка ("uk", "ru"). Пока не заполняются.
export type Traduzioni = Partial<Record<string, string>>;

type EsercizioBase = {
  istruzione: string;
  spiegazione: string;
  suggerimento: string;
  traduzioni?: Traduzioni;
};

export type EsercizioAscoltaScegli = EsercizioBase & {
  tipo: "ascolta-scegli";
  audio: string;
  opzioni: string[];
  risposta: string;
};

export type EsercizioScegli = EsercizioBase & {
  tipo: "scegli";
  domanda: string;
  opzioni: string[];
  risposta: string;
};

export type EsercizioAbbina = EsercizioBase & {
  tipo: "abbina";
  coppie: [string, string][];
};

export type EsercizioAscoltaScrivi = EsercizioBase & {
  tipo: "ascolta-scrivi";
  audio: string;
  risposta: string;
};

export type Esercizio =
  | EsercizioAscoltaScegli
  | EsercizioScegli
  | EsercizioAbbina
  | EsercizioAscoltaScrivi;

export type LezioneContenuto = {
  id: string;
  numero: string;
  titolo: string;
  minuti: number;
  imparerai: string[];
  // Экран знакомства перед упражнениями; если не задан, фаза пропускается.
  scopri?: "alfabeto";
  esercizi: Esercizio[];
};
