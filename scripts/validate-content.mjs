// Controllo dei contenuti A2: node scripts/validate-content.mjs (npm run validate:content).
// Esce con codice 1 se trova errori.
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const CARTELLA = path.join(process.cwd(), "src/content/a2");
const errori = [];
const leggi = (file) => JSON.parse(readFileSync(file, "utf8"));

const meta = leggi(path.join(CARTELLA, "meta.json"));

// Slug unici, in forma di URL, e diversi dal segmento "unita".
const slugs = new Map();
for (const [id, t] of Object.entries(meta.topics)) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.slug)) errori.push(`meta: slug non valido "${t.slug}" (${id})`);
  if (t.slug === "unita") errori.push(`meta: lo slug "unita" è riservato (${id})`);
  if (slugs.has(t.slug)) errori.push(`meta: slug "${t.slug}" ripetuto (${slugs.get(t.slug)}, ${id})`);
  slugs.set(t.slug, id);
  if (!t.title || !t.subtitle?.ru) errori.push(`meta: manca title o subtitle.ru (${id})`);
}
const numeri = Object.values(meta.units).map((u) => u.number);
if (new Set(numeri).size !== numeri.length) errori.push("meta: numeri di unità ripetuti");

const lingue = readdirSync(CARTELLA).filter((n) => statSync(path.join(CARTELLA, n)).isDirectory());
for (const lingua of lingue) {
  const file = (nome) => path.join(CARTELLA, lingua, nome);
  let curriculum, grammar;
  try {
    curriculum = leggi(file("curriculum.json"));
    grammar = leggi(file("grammar.json"));
  } catch {
    continue; // lingua senza questi file: si usa il russo
  }

  const nelCurriculum = new Set();
  for (const unita of curriculum.units) {
    if (!meta.units[unita.id]) errori.push(`${lingua}/curriculum: unità ${unita.id} assente in meta`);
    for (const id of unita.topics) {
      if (!meta.topics[id]) errori.push(`${lingua}/curriculum: argomento ${id} assente in meta`);
      if (nelCurriculum.has(id)) errori.push(`${lingua}/curriculum: argomento ${id} ripetuto`);
      nelCurriculum.add(id);
    }
  }
  for (const tappa of curriculum.milestones ?? []) {
    for (const u of [tappa.after_unit, ...(tappa.covers ?? [])]) {
      if (!meta.units[u]) errori.push(`${lingua}/curriculum: la tappa ${tappa.id} cita l'unità ${u} assente in meta`);
    }
  }

  const argomenti = new Set(grammar.topics.map((t) => t.id));
  for (const id of nelCurriculum) {
    if (!argomenti.has(id)) errori.push(`${lingua}/curriculum: argomento ${id} assente in grammar.json`);
  }
  for (const t of grammar.topics) {
    if (!nelCurriculum.has(t.id)) errori.push(`${lingua}/grammar: argomento ${t.id} fuori dal curriculum`);
    if (!meta.grammarGroups[String(t.group)]) errori.push(`${lingua}/grammar: gruppo ${t.group} assente in meta (${t.id})`);
    if (typeof t.lesson !== "string") errori.push(`${lingua}/grammar: lesson mancante (${t.id})`);
  }
  // Esercizi di lessico (topic "vocab-…") non appartengono alla grammatica.
  for (const e of grammar.exercises) {
    if (!argomenti.has(e.topic) && !e.topic.startsWith("vocab-")) errori.push(`${lingua}/grammar: esercizio ${e.id} con argomento sconosciuto ${e.topic}`);
  }
}
for (const id of Object.keys(meta.topics)) {
  if (!lingue.some((l) => {
    try {
      return leggi(path.join(CARTELLA, l, "curriculum.json")).units.some((u) => u.topics.includes(id));
    } catch {
      return false;
    }
  })) errori.push(`meta: argomento ${id} non usato nel curriculum`);
}

if (errori.length) {
  console.error(`Contenuti A2: ${errori.length} errori\n- ${errori.join("\n- ")}`);
  process.exit(1);
}
console.log(`Contenuti A2: ok (${Object.keys(meta.topics).length} argomenti, lingue: ${lingue.join(", ")})`);
