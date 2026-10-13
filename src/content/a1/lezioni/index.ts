import type { LezioneContenuto } from "@/content/types";
import { LEZIONE_1_1 } from "./1-1";

const LEZIONI: Record<string, LezioneContenuto> = {
  "1-1": LEZIONE_1_1,
};

export function getLezioneContenuto(id: string): LezioneContenuto | undefined {
  return LEZIONI[id];
}
