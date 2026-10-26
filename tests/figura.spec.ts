import { expect, test, type Page } from "@playwright/test";

// Figure con le parti (FiguraParti) in descrivere-una-persona: posizione nella pagina, le parti
// da lg (didascalie + linee) e sotto lg (numeri + elenco), plurali irregolari, tocco sul numero.
// Il viso: 12 parti (1–6 a sinistra, 7 la testa … 12 il collo a destra).
// Il busto e le braccia: 10 parti (1–5 a sinistra, 6 il petto … 10 il dito a destra), subito dopo il viso.
// Le gambe e i piedi: 7 parti (1–4 a sinistra, 5 la gamba … 7 il dito del piede a destra), dopo il busto.
// Le tre figure sono finestre della stessa Persona: giunture senza salti (collo, pantaloni).

const PAGINA = "/a2/grammatica/descrivere-una-persona";
const FIGURE = [
  { id: "viso", titolo: "Il viso", parti: 12, irregolari: [3, 5, 10] }, // il sopracciglio, l'orecchio, il labbro
  { id: "busto", titolo: "Il busto e le braccia", parti: 10, irregolari: [2, 9, 10] }, // il braccio, la mano, il dito
  { id: "gambe", titolo: "Le gambe e i piedi", parti: 7, irregolari: [2, 7] }, // il ginocchio, il dito del piede
];

// Larghezza in px di un colore del disegno lungo una riga orizzontale (y in unità della Persona):
// si percorre la riga e si guarda cosa è dipinto sopra (trasformazioni e finestra comprese).
const larghezzaColore = (page: Page, id: string, y: number, colore: string) =>
  page.evaluate(
    ([id, y, colore]) => {
      const sezione = document.querySelector(`section[aria-labelledby='figura-${id}']`)!;
      const disegno = [...sezione.querySelectorAll<SVGSVGElement>("svg[viewBox]")]
        .filter((s) => s.getBoundingClientRect().width > 0)
        .sort((a, b) => b.querySelectorAll("*").length - a.querySelectorAll("*").length)[0];
      disegno.scrollIntoView({ block: "center" });
      const r = disegno.getBoundingClientRect();
      const punto = disegno.createSVGPoint();
      punto.x = 0;
      punto.y = Number(y);
      const sy = punto.matrixTransform(disegno.getScreenCTM()!).y;
      const xs: number[] = [];
      for (let x = r.left; x <= r.right; x += 0.5) {
        const el = document.elementFromPoint(x, sy);
        const fill = el?.closest("svg") === disegno ? (el.getAttribute("fill") ?? el.parentElement?.getAttribute("fill")) : null;
        if (fill?.toLowerCase() === String(colore).toLowerCase()) xs.push(x);
      }
      return xs.length ? Math.max(...xs) - Math.min(...xs) : 0;
    },
    [id, y, colore] as const,
  );

// Giunture: la stessa riga della Persona vista in due finestre (y dentro entrambe le finestre).
const GIUNTURE = [
  { sopra: "viso", sotto: "busto", y: 450, colore: "#E9B893", cosa: "collo" }, // viso 90–470, busto 440–940
  { sopra: "busto", sotto: "gambe", y: 930, colore: "#3E4A61", cosa: "pantaloni / pantaloncini" }, // busto …–940, gambe 925–…
];

const apri = async (page: Page, baseURL: string | undefined) => {
  await page.context().addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
  await page.goto(PAGINA);
};
const blocco = (page: Page, id: string) => page.locator(`section[aria-labelledby='figura-${id}']`);

// Parti con "(plurale irregolare)" (testo per i lettori di schermo) dentro gli elementi dati.
const conIrregolare = (vista: ReturnType<Page["locator"]>, selettore: string, attributo: string) =>
  vista
    .locator(selettore)
    .evaluateAll(
      (els, attr) => els.filter((el) => el.textContent?.includes("(plurale irregolare)")).map((el) => Number(el.getAttribute(attr))),
      attributo,
    )
    .then((n) => n.sort((a, b) => a - b));

test.describe("desktop 1280", () => {
  test.use({ viewport: { width: 1280, height: 1000 } });

  test("le tre figure, in quest'ordine, tra Come si forma e Tabelle", async ({ page, baseURL }) => {
    await apri(page, baseURL);
    for (const f of FIGURE) await expect(blocco(page, f.id).getByRole("heading", { name: f.titolo })).toBeVisible();
    const ordine = await page.evaluate(() => {
      const titolo = (t: string) => [...document.querySelectorAll("h2")].find((h) => h.textContent?.trim().toLowerCase() === t)!;
      const prima = (a: Node, b: Node) => !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
      const viso = document.querySelector("section[aria-labelledby='figura-viso']")!;
      const busto = document.querySelector("section[aria-labelledby='figura-busto']")!;
      const gambe = document.querySelector("section[aria-labelledby='figura-gambe']")!;
      return {
        visoDopoComeSiForma: prima(titolo("come si forma"), viso),
        bustoSubitoDopoViso: viso.nextElementSibling === busto,
        gambeSubitoDopoBusto: busto.nextElementSibling === gambe,
        gambePrimaDiTabelle: prima(gambe, titolo("tabelle")),
      };
    });
    expect(ordine).toEqual({ visoDopoComeSiForma: true, bustoSubitoDopoViso: true, gambeSubitoDopoBusto: true, gambePrimaDiTabelle: true });
  });

  for (const f of FIGURE) {
    test(`${f.titolo}: ${f.parti} didascalie e ${f.parti} linee; plurale irregolare: ${f.irregolari.join(", ")}`, async ({ page, baseURL }) => {
      await apri(page, baseURL);
      const vista = blocco(page, f.id).locator("[data-vista='desktop']");
      await expect(vista.locator("[data-n]")).toHaveCount(f.parti);
      for (const d of await vista.locator("[data-n]").all()) await expect(d).toBeVisible();
      // Le linee arrivano dopo la misura (ResizeObserver): una <g> per linea.
      await expect(vista.locator(":scope > svg g")).toHaveCount(f.parti);
      expect(await conIrregolare(vista, "[data-n]", "data-n")).toEqual(f.irregolari);
    });
  }
});

// Nessun errore in console, anche quando la finestra cambia misura come con DevTools (screenshot fullPage):
// una misura a larghezza 0 dava Infinity / NaN negli attributi delle linee (3 errori per parte).
for (const larghezza of [1280, 390]) {
  test(`${larghezza}: console senza errori, anche dopo un ridimensionamento`, async ({ page, baseURL }) => {
    const errori: string[] = [];
    page.on("console", (m) => m.type() === "error" && errori.push(m.text()));
    page.on("pageerror", (e) => errori.push(e.message));
    await page.setViewportSize({ width: larghezza, height: 900 });
    await apri(page, baseURL);
    await expect(blocco(page, "busto").locator("[data-vista] [aria-label], [data-vista] [data-n]").first()).toBeAttached();
    await page.screenshot({ fullPage: true });
    await page.waitForTimeout(300);
    expect(errori).toEqual([]);
  });
}

for (const larghezza of [1280, 390]) {
  for (const g of GIUNTURE) {
    test(`${larghezza}: giuntura ${g.sopra} → ${g.sotto} (${g.cosa}), stessa larghezza ±2px`, async ({ page, baseURL }) => {
      await page.setViewportSize({ width: larghezza, height: 900 });
      await apri(page, baseURL);
      await expect(blocco(page, g.sotto).locator("[data-vista]").first()).toBeAttached();
      const sopra = await larghezzaColore(page, g.sopra, g.y, g.colore);
      const sotto = await larghezzaColore(page, g.sotto, g.y, g.colore);
      expect(sopra).toBeGreaterThan(20);
      expect(Math.abs(sopra - sotto)).toBeLessThanOrEqual(2);
    });
  }
}

test.describe("mobile 390", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const f of FIGURE) {
    test(`${f.titolo}: ${f.parti} numeri e ${f.parti} righe; plurale irregolare: ${f.irregolari.join(", ")}`, async ({ page, baseURL }) => {
      await apri(page, baseURL);
      const vista = blocco(page, f.id).locator("[data-vista='mobile']");
      const numeri = vista.getByRole("button", { name: /^\d+: / });
      await expect(numeri).toHaveCount(f.parti);
      for (const n of await numeri.all()) await expect(n).toBeVisible();
      await expect(vista.locator("[data-riga]")).toHaveCount(f.parti);
      expect(await conIrregolare(vista, "[data-riga]", "data-riga")).toEqual(f.irregolari);
      await expect(blocco(page, f.id).locator("[data-vista='desktop']")).toBeHidden();
    });
  }

  test("Il viso: tocco sul numero 3, riga 3 evidenziata", async ({ page, baseURL }) => {
    await apri(page, baseURL);
    const vista = blocco(page, "viso").locator("[data-vista='mobile']");
    const riga = vista.locator("[data-riga='3']");
    await expect(riga).toHaveAttribute("aria-pressed", "false");
    await vista.getByRole("button", { name: "3: il sopracciglio" }).click();
    await expect(vista.getByRole("button", { name: "3: il sopracciglio" })).toHaveAttribute("aria-pressed", "true");
    await expect(riga).toHaveAttribute("aria-pressed", "true");
    await expect(vista.locator("[aria-pressed='true']")).toHaveCount(2); // solo numero 3 e riga 3
  });
});
