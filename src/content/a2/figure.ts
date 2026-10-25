import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/lib/lingue";

// Figure con le parti indicate (src/content/a2/figure/<id>.json): il viso, il corpo…
// Il disegno è in components/grammatica/figure/<Id>.tsx (stesso id con l'iniziale maiuscola).
// x, y: punto della parte nelle coordinate del viewBox; side: lato della didascalia da lg in su.

export type ParteFigura = {
  n: number;
  side: "left" | "right";
  x: number;
  y: number;
  it: string;
  plural: string | null;
  irregular: boolean;
  tr: Record<Locale, string>;
};

export type Figura = {
  id: string;
  title: string;
  titleTr: Record<Locale, string>;
  viewBox: string;
  parts: ParteFigura[];
};

const CARTELLA = path.join(process.cwd(), "src/content/a2/figure");

// In produzione i file non cambiano: si leggono una volta sola.
const cache = new Map<string, Promise<Figura | null>>();

async function leggiFigura(id: string): Promise<Figura | null> {
  try {
    return JSON.parse(await readFile(path.join(CARTELLA, `${id}.json`), "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export function getFigura(id: string): Promise<Figura | null> {
  // Solo id semplici: niente percorsi fuori dalla cartella.
  if (!/^[a-z]+$/.test(id)) return Promise.resolve(null);
  if (process.env.NODE_ENV !== "production") return leggiFigura(id);
  if (!cache.has(id)) cache.set(id, leggiFigura(id));
  return cache.get(id)!;
}
