import { expect, test, type Page } from "@playwright/test";

// Figure con le parti (FiguraParti) in descrivere-una-persona: posizione nella pagina, le parti
// da lg (didascalie + linee) e sotto lg (numeri + elenco), plurali irregolari, tocco sul numero.
// Il viso: 12 parti (1–6 a sinistra, 7 la testa … 12 il collo a destra).
// Il busto e le braccia: 10 parti (1–5 a sinistra, 6 il petto … 10 il dito a destra), subito dopo il viso.

const PAGINA = "/a2/grammatica/descrivere-una-persona";
const FIGURE = [
  { id: "viso", titolo: "Il viso", parti: 12, irregolari: [3, 5, 10] }, // il sopracciglio, l'orecchio, il labbro
  { id: "busto", titolo: "Il busto e le braccia", parti: 10, irregolari: [2, 9, 10] }, // il braccio, la mano, il dito
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

  test("Il viso e Il busto, in quest'ordine, tra Come si forma e Tabelle", async ({ page, baseURL }) => {
    await apri(page, baseURL);
    for (const f of FIGURE) await expect(blocco(page, f.id).getByRole("heading", { name: f.titolo })).toBeVisible();
    const ordine = await page.evaluate(() => {
      const titolo = (t: string) => [...document.querySelectorAll("h2")].find((h) => h.textContent?.trim().toLowerCase() === t)!;
      const prima = (a: Node, b: Node) => !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
      const viso = document.querySelector("section[aria-labelledby='figura-viso']")!;
      const busto = document.querySelector("section[aria-labelledby='figura-busto']")!;
      return {
        visoDopoComeSiForma: prima(titolo("come si forma"), viso),
        bustoSubitoDopoViso: viso.nextElementSibling === busto,
        bustoPrimaDiTabelle: prima(busto, titolo("tabelle")),
      };
    });
    expect(ordine).toEqual({ visoDopoComeSiForma: true, bustoSubitoDopoViso: true, bustoPrimaDiTabelle: true });
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
