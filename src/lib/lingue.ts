// Lingua delle spiegazioni (traduzioni, regole, note). L'interfaccia resta in italiano.
export type Locale = "ru" | "uk" | "en";

// Ordine e sigle del selettore. "UA" per l'ucraino (non "UK", che fa pensare al Regno Unito).
export const LOCALES: { code: Locale; sigla: string; nome: string }[] = [
  { code: "en", sigla: "EN", nome: "English" },
  { code: "uk", sigla: "UA", nome: "Українська" },
  { code: "ru", sigla: "RU", nome: "Русский" },
];

export const DEFAULT_LOCALE: Locale = "ru";
export const LANG_COOKIE = "bv_lang";
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: string | undefined | null): value is Locale {
  return LOCALES.some((locale) => locale.code === value);
}
