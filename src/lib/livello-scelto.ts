import { cookies } from "next/headers";
import { LEVEL_COOKIE, isAvailableLevel, type LevelCode } from "@/lib/levels";

// Livello salvato nel cookie bv_level (solo lato server), o null per chi è nuovo.
export async function livelloScelto(): Promise<LevelCode | null> {
  const level = (await cookies()).get(LEVEL_COOKIE)?.value;
  return isAvailableLevel(level) ? level : null;
}
