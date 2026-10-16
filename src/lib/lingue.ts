// Lingua delle spiegazioni (traduzioni, regole, note). L'interfaccia resta in italiano.
export type Locale = "ru" | "uk" | "en";

export const LOCALES: { code: Locale; nome: string }[] = [
  { code: "ru", nome: "Русский" },
  { code: "uk", nome: "Українська" },
  { code: "en", nome: "English" },
];

export const DEFAULT_LOCALE: Locale = "ru";
export const LANG_COOKIE = "bv_lang";
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: string | undefined | null): value is Locale {
  return LOCALES.some((locale) => locale.code === value);
}
