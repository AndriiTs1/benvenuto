import grammar from "./grammar.json";
import vocab from "./vocab.json";
import { SHOW_TEXTBOOK_CONTENT } from "@/lib/flags";

const NON_PUBBLICABILE = "не для публикации";

// Contenuto del manuale da nascondere quando SHOW_TEXTBOOK_CONTENT è false (vedi curriculum.json → copyright_rule).
export function isVisibile(item: { source?: string }) {
  return SHOW_TEXTBOOK_CONTENT || !item.source?.includes(NON_PUBBLICABILE);
}

export function statisticheA2() {
  return {
    argomenti: grammar.topics.length,
    parole: vocab.words.length,
    esercizi: grammar.exercises.filter(isVisibile).length,
  };
}
