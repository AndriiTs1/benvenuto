// SHOW_TEXTBOOK_CONTENT: mostra i testi e gli esercizi del manuale con source «не для публикации».
// Valore esplicito "true"/"false" dall'env; altrimenti true in sviluppo, false in produzione.
function readFlag(value: string | undefined, fallback: boolean) {
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
}

export const SHOW_TEXTBOOK_CONTENT = readFlag(
  process.env.SHOW_TEXTBOOK_CONTENT,
  process.env.NODE_ENV !== "production",
);
