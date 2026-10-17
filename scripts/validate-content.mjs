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

// Vocabolario: base → parola esistente, nessun "it" ripetuto. Le lingue senza vocab.json usano il russo.
const vocabPerLingua = {};
for (const lingua of lingue) {
  let vocab;
  try {
    vocab = leggi(path.join(CARTELLA, lingua, "vocab.json"));
  } catch (e) {
    if (e.code !== "ENOENT") errori.push(`${lingua}/vocab: JSON non valido (${e.message})`);
    continue;
  }
  const ids = new Set(vocab.words.map((w) => w.id));
  vocabPerLingua[lingua] = ids;
  const visti = new Map();
  for (const w of vocab.words) {
    if (w.base !== undefined && !ids.has(w.base)) errori.push(`${lingua}/vocab: ${w.id}.base → parola inesistente ${w.base}`);
    if (w.base === w.id) errori.push(`${lingua}/vocab: ${w.id}.base punta a se stessa`);
    if (visti.has(w.it)) errori.push(`${lingua}/vocab: "${w.it}" ripetuta (${visti.get(w.it)}, ${w.id})`);
    visti.set(w.it, w.id);
  }
}

// Lezioni v2 (lezioni.json): campi obbligatori, id = topicId, stesse lezioni in tutte le lingue.
const avvisi = [];
const testo = (v) => typeof v === "string" && v.trim() !== "";
const esempi = (v) => Array.isArray(v) && v.every((e) => testo(e?.it) && testo(e?.tr));
const CAMPI = {
  inBreve: (v) => Array.isArray(v) && v.length > 0 && v.every(testo),
  formation: (v) => Array.isArray(v?.steps) && v.steps.length > 0 && v.steps.every(testo),
  tables: (v) =>
    Array.isArray(v) &&
    v.every(
      (t) =>
        testo(t?.title) &&
        typeof t.header === "boolean" &&
        Array.isArray(t.rows) &&
        t.rows.length > 0 &&
        t.rows.every((r) => Array.isArray(r) && r.every((c) => typeof c === "string")) &&
        (t.note === undefined || testo(t.note)),
    ),
  uses: (v) => Array.isArray(v) && v.every((u) => testo(u?.text) && testo(u?.it) && testo(u?.tr)),
  exceptions: (v) => Array.isArray(v) && v.every((e) => testo(e?.title) && testo(e?.text) && esempi(e?.examples)),
  mistakes: (v) => Array.isArray(v) && v.every((m) => testo(m?.wrong) && testo(m?.right) && testo(m?.why)),
  examples: esempi,
  summary: testo,
};
const lezioniPerLingua = {};
for (const lingua of lingue) {
  let file;
  try {
    file = leggi(path.join(CARTELLA, lingua, "lezioni.json"));
  } catch (e) {
    if (e.code !== "ENOENT") errori.push(`${lingua}/lezioni: JSON non valido (${e.message})`);
    continue;
  }
  if (!file?.lessons || typeof file.lessons !== "object") {
    errori.push(`${lingua}/lezioni: manca "lessons"`);
    continue;
  }
  lezioniPerLingua[lingua] = Object.keys(file.lessons).sort();
  for (const [topicId, lezione] of Object.entries(file.lessons)) {
    if (lezione?.id !== topicId) errori.push(`${lingua}/lezioni: id "${lezione?.id}" diverso dalla chiave ${topicId}`);
    if (!meta.topics[topicId]) errori.push(`${lingua}/lezioni: argomento ${topicId} assente in meta`);
    for (const [campo, valido] of Object.entries(CAMPI)) {
      if (!valido(lezione?.[campo])) errori.push(`${lingua}/lezioni: ${topicId}.${campo} mancante o non valido`);
    }
    // keyWords (facoltativo): id esistenti nel vocabolario della lingua (o in quello russo).
    if (lezione?.keyWords !== undefined) {
      const ids = vocabPerLingua[lingua] ?? vocabPerLingua.ru ?? new Set();
      if (!Array.isArray(lezione.keyWords)) errori.push(`${lingua}/lezioni: ${topicId}.keyWords non è un elenco`);
      else
        for (const id of lezione.keyWords) {
          if (!ids.has(id)) errori.push(`${lingua}/lezioni: ${topicId}.keyWords → parola inesistente ${id}`);
        }
    }
  }
}
const tutte = [...new Set(Object.values(lezioniPerLingua).flat())];
for (const lingua of ["ru", "uk", "en"]) {
  const mancanti = tutte.filter((id) => !lezioniPerLingua[lingua]?.includes(id));
  if (mancanti.length) avvisi.push(`${lingua}/lezioni: mancano ${mancanti.join(", ")}`);
}
if (avvisi.length) console.warn(`Avvisi:\n- ${avvisi.join("\n- ")}`);

if (errori.length) {
  console.error(`Contenuti A2: ${errori.length} errori\n- ${errori.join("\n- ")}`);
  process.exit(1);
}
const conLezioni = Object.entries(lezioniPerLingua).map(([l, ids]) => `${l} ${ids.length}`).join(", ");
console.log(
  `Contenuti A2: ok (${Object.keys(meta.topics).length} argomenti, lingue: ${lingue.join(", ")}; lezioni v2: ${conLezioni || "nessuna"})`,
);
