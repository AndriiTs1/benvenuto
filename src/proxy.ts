import { NextResponse, type NextRequest } from "next/server";
import { MODULI_A1 } from "@/content/a1/moduli";
import meta from "@/content/a2/meta.json";
import esercizi from "@/content/a2/esercizi.json";
import vocab from "@/content/a2/ru/vocab.json";
import { slugGruppo } from "@/content/a2/slug";

// Indirizzi inesistenti → vero HTTP 404. Con cacheComponents la risposta inizia a scorrere
// prima che la pagina chiami notFound() (che resta come seconda difesa) e lo stato
// sarebbe 200: il controllo va fatto qui, prima del rendering.

const SLUG_ARGOMENTI = new Set(Object.values(meta.topics).map((t) => t.slug));
const NUMERI_UNITA = new Set(Object.values(meta.units).map((u) => String(u.number)));
const SLUG_GRUPPI = new Set(Object.values(vocab.gruppi).map((g) => slugGruppo(g.it)));
const SLUG_ESERCIZI = new Set(
  esercizi.sets.map((s) => (meta.topics as Record<string, { slug: string }>)[s.topic]?.slug).filter(Boolean),
);
const ID_MODULI = new Set(MODULI_A1.map((m) => String(m.id)));
const ID_LEZIONI = new Set(MODULI_A1.flatMap((m) => m.lezioni.map((l) => l.id)));

// Livello A1 in sviluppo (lib/levels.ts): in produzione le sue pagine non esistono ancora.
const PAGINE_A1 = ["/percorso", "/ripasso", "/quaderno", "/profilo"];

function esiste(pathname: string): boolean {
  const parti = pathname.split("/").filter(Boolean);
  const a1 = PAGINE_A1.includes(pathname) || parti[0] === "modulo" || parti[0] === "lezione";
  if (a1 && process.env.NODE_ENV === "production") return false;

  if (parti[0] === "a2" && parti[1] === "grammatica" && parti.length > 2) {
    if (parti[2] === "unita") return parti.length === 4 && NUMERI_UNITA.has(parti[3]);
    return parti.length === 3 && SLUG_ARGOMENTI.has(parti[2]);
  }
  if (parti[0] === "a2" && parti[1] === "vocabolario" && parti.length > 2) {
    return parti.length === 3 && SLUG_GRUPPI.has(parti[2]);
  }
  if (parti[0] === "a2" && parti[1] === "esercizi" && parti.length > 2) {
    return parti.length === 3 && SLUG_ESERCIZI.has(parti[2]);
  }
  if (parti[0] === "modulo") return parti.length === 2 && ID_MODULI.has(parti[1]);
  if (parti[0] === "lezione") return parti.length === 2 && ID_LEZIONI.has(parti[1]);
  return true;
}

export function proxy(request: NextRequest) {
  // La vista Indice non c'è più: il vecchio indirizzo apre il percorso.
  const { pathname, searchParams } = request.nextUrl;
  if (pathname === "/a2/grammatica" && searchParams.has("vista")) {
    const percorso = request.nextUrl.clone();
    percorso.searchParams.delete("vista");
    return NextResponse.redirect(percorso);
  }
  if (esiste(pathname)) return NextResponse.next();
  // Una route che non esiste: Next.js mostra la pagina 404 con stato 404.
  return NextResponse.rewrite(new URL("/_non-trovato", request.url));
}

export const config = {
  matcher: [
    "/a2/grammatica/:path*",
    "/a2/vocabolario/:path+",
    "/a2/esercizi/:path+",
    "/modulo/:path*",
    "/lezione/:path*",
    "/percorso",
    "/ripasso",
    "/quaderno",
    "/profilo",
  ],
};
