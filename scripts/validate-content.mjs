// Controllo dei contenuti A2: node scripts/validate-content.mjs (npm run validate:content).
// Esce con codice 1 se trova errori.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const CARTELLA = path.join(process.cwd(), "src/content/a2");
const errori = [];
const leggi = (file) => JSON.parse(readFileSync(file, "utf8"));
const testo = (v) => typeof v === "string" && v.trim() !== "";

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
// tempo (facoltativo): l'unità è un tempo verbale principale del percorso (lib/tempi.ts).
const TEMPI = ["presente", "passato", "imperfetto", "futuro"];
// modo (facoltativo): l'unità è un modo verbale (sezione «I modi verbali»); non insieme a tempo.
const MODI = ["condizionale"];
for (const [id, u] of Object.entries(meta.units)) {
  if (u.tempo !== undefined && !TEMPI.includes(u.tempo)) errori.push(`meta: ${id}.tempo "${u.tempo}" (${TEMPI.join(" | ")})`);
  if (u.modo !== undefined && !MODI.includes(u.modo)) errori.push(`meta: ${id}.modo "${u.modo}" (${MODI.join(" | ")})`);
  if (u.tempo !== undefined && u.modo !== undefined) errori.push(`meta: ${id} ha sia tempo sia modo`);
}
const numeri = Object.values(meta.units).map((u) => u.number);
if (new Set(numeri).size !== numeri.length) errori.push("meta: numeri di unità ripetuti");

// Cartelle delle lingue (ru, uk, en…): due lettere; le altre (figure/) non sono lingue.
const lingue = readdirSync(CARTELLA).filter((n) => /^[a-z]{2}$/.test(n) && statSync(path.join(CARTELLA, n)).isDirectory());
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
    // irregular_participles_tr: traduzione ru/uk/en per ogni infinito di irregular_participles.
    if (Array.isArray(t.irregular_participles)) {
      const tr = t.irregular_participles_tr;
      if (!tr || typeof tr !== "object") {
        errori.push(`${lingua}/grammar: ${t.id} senza irregular_participles_tr`);
      } else {
        for (const [infinito] of t.irregular_participles) {
          const mancanti = ["ru", "uk", "en"].filter((l) => !testo(tr[infinito]?.[l]));
          if (mancanti.length) errori.push(`${lingua}/grammar: ${t.id} "${infinito}" senza traduzione ${mancanti.join(", ")}`);
        }
      }
    }
    // irregular_groups: ogni participio di irregular_participles sta in un solo gruppo.
    if (Array.isArray(t.irregular_participles) && Array.isArray(t.irregular_groups)) {
      const gruppiDi = new Map();
      for (const [etichetta, elenco] of t.irregular_groups) {
        for (const p of String(elenco).split(",").map((x) => x.trim())) {
          gruppiDi.set(p, [...(gruppiDi.get(p) ?? []), etichetta]);
        }
      }
      for (const [, participio] of t.irregular_participles) {
        const g = gruppiDi.get(participio) ?? [];
        if (g.length !== 1) {
          errori.push(
            `${lingua}/grammar: ${t.id} participio "${participio}" in ${g.length} gruppi${g.length ? ` (${g.join(", ")})` : ""}`,
          );
        }
      }
    }
    if (!nelCurriculum.has(t.id)) errori.push(`${lingua}/grammar: argomento ${t.id} fuori dal curriculum`);
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
  // gruppi: numerati 1…N senza buchi, con nome italiano e traduzioni; ogni parola in un gruppo 1…N.
  const gruppi = vocab.gruppi ?? {};
  const numeroGruppi = Object.keys(gruppi).length;
  for (let n = 1; n <= numeroGruppi; n++) {
    const g = gruppi[String(n)];
    if (!g) errori.push(`${lingua}/vocab: manca il gruppo ${n} in "gruppi"`);
    else for (const campo of ["it", "ru", "uk", "en"]) if (!testo(g[campo])) errori.push(`${lingua}/vocab: gruppo ${n} senza ${campo}`);
  }
  for (const w of vocab.words) {
    if (!Number.isInteger(w.group) || w.group < 1 || w.group > numeroGruppi) {
      errori.push(`${lingua}/vocab: ${w.id}.group = ${w.group} (atteso 1–${numeroGruppi})`);
    }
    // Traduzioni: ru, uk, en non vuote; niente lettere solo russe in uk, niente cirillico in en.
    for (const l of ["ru", "uk", "en"]) {
      if (!testo(w[l])) errori.push(`${lingua}/vocab: ${w.id} senza traduzione ${l}`);
    }
    if (/[ыэъёЫЭЪЁ]/.test(w.uk ?? "")) errori.push(`${lingua}/vocab: ${w.id}.uk con lettere russe: "${w.uk}"`);
    if (/[\u0400-\u04FF]/.test(w.en ?? "")) errori.push(`${lingua}/vocab: ${w.id}.en con cirillico: "${w.en}"`);
    // it è italiano: le note sulla parola (inf., ora…) vanno in italiano, non nella lingua delle spiegazioni.
    if (/[\u0400-\u04FF]/.test(w.it ?? "")) errori.push(`${lingua}/vocab: ${w.id}.it con cirillico: "${w.it}"`);
    if (w.base !== undefined && !ids.has(w.base)) errori.push(`${lingua}/vocab: ${w.id}.base → parola inesistente ${w.base}`);
    if (w.base === w.id) errori.push(`${lingua}/vocab: ${w.id}.base punta a se stessa`);
    const chiave = w.it.toLowerCase();
    if (visti.has(chiave)) errori.push(`${lingua}/vocab: "${w.it}" ripetuta (${visti.get(chiave)}, ${w.id})`);
    visti.set(chiave, w.id);
  }
}

// Lezioni v2 (lezioni.json): campi obbligatori, id = topicId, stesse lezioni in tutte le lingue.
const avvisi = [];
const esempi = (v) => Array.isArray(v) && v.every((e) => testo(e?.it) && testo(e?.tr));
const CAMPI = {
  inBreve: (v) => Array.isArray(v) && v.length > 0 && v.every(testo),
  // steps può essere vuoto (argomento senza "Come si forma"); note facoltativa.
  formation: (v) => Array.isArray(v?.steps) && v.steps.every(testo) && (v.note === undefined || testo(v.note)),
  tables: (v) =>
    Array.isArray(v) &&
    v.every((t) =>
      // type "pairs": griglia di coppie con traduzione (a, b facoltativo, tr); altrimenti tabella normale.
      t?.type === "pairs"
        ? testo(t.title) &&
          typeof t.sep === "string" &&
          Array.isArray(t.items) &&
          t.items.length > 0 &&
          t.items.every((it) => testo(it?.a) && testo(it?.tr) && (it.b === undefined || testo(it.b))) &&
          (t.note === undefined || testo(t.note))
        : t?.type === undefined &&
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
const lezioniCompletePerLingua = {};
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
  lezioniCompletePerLingua[lingua] = file.lessons;
  for (const [topicId, lezione] of Object.entries(file.lessons)) {
    if (lezione?.id !== topicId) errori.push(`${lingua}/lezioni: id "${lezione?.id}" diverso dalla chiave ${topicId}`);
    if (!meta.topics[topicId]) errori.push(`${lingua}/lezioni: argomento ${topicId} assente in meta`);
    for (const [campo, valido] of Object.entries(CAMPI)) {
      if (!valido(lezione?.[campo])) errori.push(`${lingua}/lezioni: ${topicId}.${campo} mancante o non valido`);
    }
    // {{…}} è un frammento italiano senza a capo: oltre 24 caratteri esce dallo schermo a 375px.
    const campi = (valore, percorso) =>
      typeof valore === "string"
        ? [[percorso, valore]]
        : Array.isArray(valore)
          ? valore.flatMap((v, i) => campi(v, `${percorso}[${i}]`))
          : valore && typeof valore === "object"
            ? Object.entries(valore).flatMap(([k, v]) => campi(v, `${percorso}.${k}`))
            : [];
    for (const [percorso, testoCampo] of campi(lezione, topicId)) {
      for (const [, frammento] of testoCampo.matchAll(/\{\{(.*?)\}\}/g)) {
        if ([...frammento].length > 24) {
          errori.push(`${lingua}/lezioni: ${percorso} — {{${frammento}}} ha ${[...frammento].length} caratteri (max 24)`);
        }
      }
    }
    // formation.formula (facoltativa): parti e esempi solo in italiano (niente cirillico), tranne le parti
    // { tr } nella lingua delle spiegazioni; ogni esempio ha parti, frase italiana e traduzione.
    const CIRILLICO = /[\u0400-\u04FF]/;
    const formula = lezione?.formation?.formula;
    if (formula !== undefined) {
      const dove = `${topicId}.formation.formula`;
      const parti = (v) => Array.isArray(v) && v.length > 0 && v.every(testo);
      const partiFormula = Array.isArray(formula?.parts) && formula.parts.length > 0 && formula.parts.every((x) => testo(x) || testo(x?.tr));
      if (!partiFormula) errori.push(`${lingua}/lezioni: ${dove}.parts mancanti o vuote`);
      else if (formula.parts.some((x) => typeof x === "string" && CIRILLICO.test(x))) errori.push(`${lingua}/lezioni: ${dove}.parts solo in italiano`);
      if (!Array.isArray(formula?.examples)) errori.push(`${lingua}/lezioni: ${dove}.examples non è un elenco`);
      else
        formula.examples.forEach((e, i) => {
          if (!parti(e?.parts) || !testo(e?.it) || !testo(e?.tr)) errori.push(`${lingua}/lezioni: ${dove}.examples[${i}] senza parts, it o tr`);
          else if ([...e.parts, e.it].some((x) => CIRILLICO.test(x))) errori.push(`${lingua}/lezioni: ${dove}.examples[${i}] parts e it solo in italiano`);
        });
    }
    // links (facoltativo): collegamenti ad altri argomenti, at start|end, testo italiano, traduzione, argomento esistente.
    if (lezione?.links !== undefined) {
      if (!Array.isArray(lezione.links)) errori.push(`${lingua}/lezioni: ${topicId}.links non è un elenco`);
      else
        lezione.links.forEach((c, i) => {
          const dove = `${lingua}/lezioni: ${topicId}.links[${i}]`;
          if (c?.at !== "start" && c?.at !== "end") errori.push(`${dove}.at "${c?.at}" (start | end)`);
          if (!testo(c?.it) || !testo(c?.tr)) errori.push(`${dove} senza it o tr`);
          else if (CIRILLICO.test(c.it)) errori.push(`${dove}.it solo in italiano`);
          if (!meta.topics[c?.topic]) errori.push(`${dove} → argomento inesistente ${c?.topic}`);
          else if (c.topic === topicId) errori.push(`${dove} punta all'argomento stesso`);
        });
    }
    // auxChoice.intro (facoltativo): titolo e passi numerati.
    const intro = lezione?.auxChoice?.intro;
    if (intro !== undefined && (!testo(intro?.title) || !Array.isArray(intro?.steps) || intro.steps.length === 0 || !intro.steps.every(testo))) {
      errori.push(`${lingua}/lezioni: ${topicId}.auxChoice.intro senza title o steps`);
    }
    // auxChoice (facoltativo): gruppi con aux essere|avere; ogni verbo esiste nel vocabolario.
    if (lezione?.auxChoice !== undefined) {
      const ids = vocabPerLingua[lingua] ?? vocabPerLingua.ru ?? new Set();
      const ac = lezione.auxChoice;
      if (!testo(ac?.title) || !Array.isArray(ac?.groups)) {
        errori.push(`${lingua}/lezioni: ${topicId}.auxChoice senza title o groups`);
      } else {
        ac.groups.forEach((g, i) => {
          const dove = `${topicId}.auxChoice.groups[${i}]`;
          if (g?.aux !== "essere" && g?.aux !== "avere") errori.push(`${lingua}/lezioni: ${dove}.aux "${g?.aux}" (solo essere|avere)`);
          if (!testo(g?.title) || !testo(g?.text)) errori.push(`${lingua}/lezioni: ${dove} senza title o text`);
          if (!Array.isArray(g?.verbs)) {
            errori.push(`${lingua}/lezioni: ${dove}.verbs non è un elenco`);
            return;
          }
          for (const v of g.verbs) {
            if (!testo(v?.it) || !testo(v?.participle) || !testo(v?.tr)) errori.push(`${lingua}/lezioni: ${dove} verbo senza it/participle/tr (${v?.id})`);
            if (!ids.has(v?.id)) errori.push(`${lingua}/lezioni: ${dove} → parola inesistente ${v?.id}`);
          }
        });
      }
    }
    // keyWords (facoltativo): elenco di id oppure gruppi { title, ids }; gli id devono esistere
    // nel vocabolario della lingua (o in quello russo).
    if (lezione?.keyWords !== undefined) {
      const ids = vocabPerLingua[lingua] ?? vocabPerLingua.ru ?? new Set();
      const kw = lezione.keyWords;
      const tuttiId = Array.isArray(kw) && kw.every((k) => typeof k === "string");
      const tuttiGruppi =
        Array.isArray(kw) && kw.every((g) => g && typeof g === "object" && testo(g.title) && Array.isArray(g.ids));
      if (!tuttiId && !tuttiGruppi) {
        errori.push(`${lingua}/lezioni: ${topicId}.keyWords dev'essere un elenco di id o di gruppi { title, ids }`);
      } else {
        const elenco = tuttiId ? kw : kw.flatMap((g) => g.ids);
        for (const id of elenco) {
          if (!ids.has(id)) errori.push(`${lingua}/lezioni: ${topicId}.keyWords → parola inesistente ${id}`);
        }
      }
    }
  }
}
// Figure (facoltativo): "figure": ["viso", …] → content/a2/figure/<id>.json con tutti i campi, n senza ripetizioni,
// punti dentro il viewBox, e il disegno components/grammatica/figure/<Id>.tsx. Stesse figure in ru, uk, en.
const figureControllate = new Map(); // id → errori già trovati (ogni file si controlla una volta)
const CARTELLA_FIGURE = path.join(CARTELLA, "figure");
const DISEGNI = path.join(process.cwd(), "src/components/grammatica/figure");
function controllaFigura(id) {
  if (figureControllate.has(id)) return figureControllate.get(id);
  const err = [];
  const dove = `figure/${id}.json`;
  let f;
  if (!/^[a-z]+$/.test(id)) err.push(`figure: id "${id}" non valido (solo lettere minuscole)`);
  else {
    try {
      f = leggi(path.join(CARTELLA_FIGURE, `${id}.json`));
    } catch (e) {
      err.push(e.code === "ENOENT" ? `${dove} non esiste` : `${dove}: JSON non valido (${e.message})`);
    }
    const nome = id[0].toUpperCase() + id.slice(1);
    if (!existsSync(path.join(DISEGNI, `${nome}.tsx`))) err.push(`${dove}: manca il disegno components/grammatica/figure/${nome}.tsx`);
  }
  if (f) {
    const tradotto = (v) => ["ru", "uk", "en"].every((l) => testo(v?.[l]));
    if (f.id !== id) err.push(`${dove}: id "${f.id}" diverso dal nome del file`);
    if (!testo(f.title)) err.push(`${dove}: manca title`);
    if (!tradotto(f.titleTr)) err.push(`${dove}: titleTr senza ru, uk o en`);
    const vb = String(f.viewBox ?? "").trim().split(/\s+/).map(Number);
    const vbOk = vb.length === 4 && vb.every(Number.isFinite) && vb[2] > 0 && vb[3] > 0;
    if (!vbOk) err.push(`${dove}: viewBox non valido "${f.viewBox}" (4 numeri)`);
    if (!Array.isArray(f.parts) || f.parts.length === 0) err.push(`${dove}: parts mancanti o vuote`);
    else {
      const numeri = new Set();
      f.parts.forEach((p, i) => {
        const q = `${dove}: parts[${i}]`;
        if (!Number.isInteger(p?.n) || p.n < 1) err.push(`${q}.n non valido`);
        else if (numeri.has(p.n)) err.push(`${q}: n ${p.n} ripetuto`);
        numeri.add(p?.n);
        if (p?.side !== "left" && p?.side !== "right") err.push(`${q}.side "${p?.side}" (left | right)`);
        if (!Number.isFinite(p?.x) || !Number.isFinite(p?.y)) err.push(`${q}: x, y devono essere numeri`);
        else if (vbOk && (p.x < vb[0] || p.x > vb[0] + vb[2] || p.y < vb[1] || p.y > vb[1] + vb[3])) err.push(`${q}: punto (${p.x}, ${p.y}) fuori dal viewBox`);
        if (!testo(p?.it)) err.push(`${q}.it mancante`);
        else if (/[\u0400-\u04FF]/.test(p.it)) err.push(`${q}.it con cirillico`);
        if (p?.plural !== null && !testo(p?.plural)) err.push(`${q}.plural: testo o null`);
        if (typeof p?.irregular !== "boolean") err.push(`${q}.irregular: true o false`);
        else if (p.irregular && p.plural === null) err.push(`${q}: irregular senza plural`);
        if (!tradotto(p?.tr)) err.push(`${q}.tr senza ru, uk o en`);
      });
    }
  }
  figureControllate.set(id, err);
  return err;
}
for (const [lingua, lezioni] of Object.entries(lezioniCompletePerLingua)) {
  for (const [topicId, lezione] of Object.entries(lezioni)) {
    const ru = lezioniCompletePerLingua.ru?.[topicId]?.figure;
    if (lingua !== "ru" && JSON.stringify(ru) !== JSON.stringify(lezione?.figure)) errori.push(`${lingua}/lezioni: ${topicId}.figure diverso da ru`);
    if (lezione?.figure === undefined) continue;
    const fig = lezione.figure;
    if (!Array.isArray(fig) || fig.length === 0 || !fig.every(testo)) {
      errori.push(`${lingua}/lezioni: ${topicId}.figure dev'essere un elenco di id ("viso", …)`);
      continue;
    }
    if (new Set(fig).size !== fig.length) errori.push(`${lingua}/lezioni: ${topicId}.figure con id ripetuti`);
    for (const id of fig) for (const e of controllaFigura(id)) errori.push(`${lingua}/lezioni: ${topicId}.figure → ${e}`);
  }
}
// Tabelle "pairs": stesso numero di elementi in ru, uk, en (stessa posizione in tables).
for (const [topicId, ru] of Object.entries(lezioniCompletePerLingua.ru ?? {})) {
  (ru.tables ?? []).forEach((tabella, i) => {
    if (tabella?.type !== "pairs") return;
    for (const l of ["uk", "en"]) {
      const altra = lezioniCompletePerLingua[l]?.[topicId]?.tables?.[i];
      if (!altra) continue;
      if (altra.type !== "pairs") errori.push(`${l}/lezioni: ${topicId}.tables[${i}] dovrebbe essere "pairs" come in ru`);
      else if (altra.items?.length !== tabella.items.length)
        errori.push(`${l}/lezioni: ${topicId}.tables[${i}] ha ${altra.items?.length} elementi, ru ne ha ${tabella.items.length}`);
    }
  });
}
// Formula e test di "Essere o avere?": stessa forma in ru, uk, en (parti uguali, stesso numero di esempi e di passi).
for (const [topicId, ru] of Object.entries(lezioniCompletePerLingua.ru ?? {})) {
  for (const l of ["uk", "en"]) {
    const altra = lezioniCompletePerLingua[l]?.[topicId];
    if (!altra) continue;
    const fr = ru.formation?.formula;
    const fa = altra.formation?.formula;
    if (!!fr !== !!fa) errori.push(`${l}/lezioni: ${topicId}.formation.formula ${fr ? "manca" : "c'è solo qui"} (ru)`);
    else if (fr) {
      // Le parti italiane uguali; le parti { tr } sono tradotte (conta solo che siano nello stesso posto).
      const forma = (parti) => JSON.stringify(parti.map((x) => (typeof x === "string" ? x : { tr: true })));
      if (forma(fr.parts) !== forma(fa.parts)) errori.push(`${l}/lezioni: ${topicId}.formation.formula.parts diverse da ru`);
      if (fr.examples?.length !== fa.examples?.length) errori.push(`${l}/lezioni: ${topicId}.formation.formula.examples: ${fa.examples?.length}, ru ${fr.examples?.length}`);
    }
    const ir = ru.auxChoice?.intro;
    const ia = altra.auxChoice?.intro;
    if (!!ir !== !!ia) errori.push(`${l}/lezioni: ${topicId}.auxChoice.intro ${ir ? "manca" : "c'è solo qui"} (ru)`);
    else if (ir && ir.steps?.length !== ia.steps?.length) errori.push(`${l}/lezioni: ${topicId}.auxChoice.intro.steps: ${ia.steps?.length}, ru ${ir.steps?.length}`);
  }
}
const tutte = [...new Set(Object.values(lezioniPerLingua).flat())];
for (const lingua of ["ru", "uk", "en"]) {
  const mancanti = tutte.filter((id) => !lezioniPerLingua[lingua]?.includes(id));
  if (mancanti.length) avvisi.push(`${lingua}/lezioni: mancano ${mancanti.join(", ")}`);
}
// Esercizi interattivi (esercizi.json): istruzioni e spiegazioni in ru/uk/en, un solo "___",
// fill con risposte e suggerimento, choice con ≥ 2 opzioni diverse e risposta valida, id unici.
try {
  const es = leggi(path.join(CARTELLA, "esercizi.json"));
  const tradotto = (v) => ["ru", "uk", "en"].filter((l) => !testo(v?.[l]));
  for (const tipo of ["fill", "choice"]) {
    const mancano = tradotto(es.istruzioni?.[tipo]);
    if (mancano.length) errori.push(`esercizi: istruzioni.${tipo} senza ${mancano.join(", ")}`);
  }
  const visti = new Set();
  for (const insieme of es.sets ?? []) {
    if (!meta.topics[insieme.topic]) errori.push(`esercizi: argomento inesistente ${insieme.topic}`);
    if (!Array.isArray(insieme.items) || insieme.items.length === 0) errori.push(`esercizi: ${insieme.topic} senza items`);
    for (const v of insieme.items ?? []) {
      const dove = `esercizi: ${insieme.topic}/${v?.id}`;
      if (!testo(v?.id)) errori.push(`esercizi: ${insieme.topic} voce senza id`);
      else if (visti.has(v.id)) errori.push(`${dove} id ripetuto`);
      visti.add(v?.id);
      // choice con situation (testo nella lingua delle spiegazioni): niente frase italiana con "___".
      const conSituazione = v?.type === "choice" && v?.situation !== undefined;
      if (conSituazione) {
        const mancano = tradotto(v.situation);
        if (mancano.length) errori.push(`${dove} situation senza ${mancano.join(", ")}`);
        if (v.it !== undefined) errori.push(`${dove} con situation non serve "it"`);
        if (!testo(v.situationIt)) errori.push(`${dove} situation senza situationIt`);
        else if (/[\u0400-\u04FF]/.test(v.situationIt)) errori.push(`${dove} situationIt non è in italiano`);
      } else if ((String(v?.it ?? "").match(/___/g) ?? []).length !== 1) errori.push(`${dove} "it" deve avere un solo "___"`);
      if (v?.situationIt !== undefined && v?.situation === undefined) errori.push(`${dove} situationIt senza situation`);
      if (v?.task !== undefined && tradotto(v.task).length) errori.push(`${dove} task senza ${tradotto(v.task).join(", ")}`);
      const why = tradotto(v?.why);
      if (why.length) errori.push(`${dove} why senza ${why.join(", ")}`);
      if (v?.tr !== undefined && tradotto(v.tr).length) errori.push(`${dove} tr senza ${tradotto(v.tr).join(", ")}`);
      if (v?.type === "fill") {
        if (!testo(v.hint)) errori.push(`${dove} fill senza hint`);
        if (!Array.isArray(v.answers) || v.answers.length === 0 || !v.answers.every(testo)) errori.push(`${dove} fill senza answers`);
      } else if (v?.type === "choice") {
        const opzioni = Array.isArray(v.options) ? v.options : [];
        if (opzioni.length < 2 || !opzioni.every(testo) || new Set(opzioni).size !== opzioni.length)
          errori.push(`${dove} choice: servono ≥ 2 opzioni diverse`);
        if (!Number.isInteger(v.answer) || v.answer < 0 || v.answer >= opzioni.length) errori.push(`${dove} choice: answer fuori dalle opzioni`);
      } else errori.push(`${dove} type "${v?.type}" (fill | choice)`);
    }
  }
} catch (e) {
  if (e.code !== "ENOENT") errori.push(`esercizi.json non valido (${e.message})`);
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
