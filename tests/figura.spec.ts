import { expect, test, type Page } from "@playwright/test";

// Figura "Il viso" (FiguraParti) in descrivere-una-persona: posizione nella pagina, le parti
// da lg (didascalie + linee) e sotto lg (numeri + elenco), plurali irregolari, tocco sul numero.
// 12 parti: 1–6 a sinistra, 7 la testa … 12 il collo a destra.

const PAGINA = "/a2/grammatica/descrivere-una-persona";
const PARTI = 12;
const IRREGOLARI = [3, 5, 10]; // il sopracciglio, l'orecchio, il labbro

const apri = async (page: Page, baseURL: string | undefined) => {
  await page.context().addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
  await page.goto(PAGINA);
  return page.locator("section[aria-labelledby='figura-viso']");
};

// Parti con "(plurale irregolare)" (testo per i lettori di schermo) dentro gli elementi dati.
const conIrregolare = (blocco: ReturnType<Page["locator"]>, selettore: string, attributo: string) =>
  blocco.locator(selettore).evaluateAll(
    (els, attr) => els.filter((el) => el.textContent?.includes("(plurale irregolare)")).map((el) => Number(el.getAttribute(attr))),
    attributo,
  );

test.describe("desktop 1280", () => {
  test.use({ viewport: { width: 1280, height: 1000 } });

  test("blocco «Il viso» tra Come si forma e Tabelle", async ({ page, baseURL }) => {
    const blocco = await apri(page, baseURL);
    await expect(blocco.getByRole("heading", { name: "Il viso" })).toBeVisible();
    const ordine = await page.evaluate(() => {
      const titolo = (t: string) => [...document.querySelectorAll("h2")].find((h) => h.textContent?.trim().toLowerCase() === t)!;
      const figura = document.querySelector("section[aria-labelledby='figura-viso']")!;
      const prima = (a: Node, b: Node) => !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
      return { dopoComeSiForma: prima(titolo("come si forma"), figura), primaDiTabelle: prima(figura, titolo("tabelle")) };
    });
    expect(ordine).toEqual({ dopoComeSiForma: true, primaDiTabelle: true });
  });

  test(`${PARTI} didascalie e ${PARTI} linee; plurale irregolare: ${IRREGOLARI.join(", ")}`, async ({ page, baseURL }) => {
    const blocco = await apri(page, baseURL);
    const vista = blocco.locator("[data-vista='desktop']");
    await expect(vista.locator("[data-n]")).toHaveCount(PARTI);
    for (const d of await vista.locator("[data-n]").all()) await expect(d).toBeVisible();
    // Le linee arrivano dopo la misura (ResizeObserver): una <g> per linea.
    await expect(vista.locator(":scope > svg g")).toHaveCount(PARTI);
    expect((await conIrregolare(vista, "[data-n]", "data-n")).sort((a, b) => a - b)).toEqual(IRREGOLARI);
  });
});

test.describe("mobile 390", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test(`${PARTI} numeri e ${PARTI} righe; plurale irregolare: ${IRREGOLARI.join(", ")}`, async ({ page, baseURL }) => {
    const blocco = await apri(page, baseURL);
    const vista = blocco.locator("[data-vista='mobile']");
    const numeri = vista.getByRole("button", { name: /^\d+: / });
    await expect(numeri).toHaveCount(PARTI);
    for (const n of await numeri.all()) await expect(n).toBeVisible();
    await expect(vista.locator("[data-riga]")).toHaveCount(PARTI);
    expect((await conIrregolare(vista, "[data-riga]", "data-riga")).sort((a, b) => a - b)).toEqual(IRREGOLARI);
    await expect(blocco.locator("[data-vista='desktop']")).toBeHidden();
  });

  test("tocco sul numero 3: riga 3 evidenziata", async ({ page, baseURL }) => {
    const blocco = await apri(page, baseURL);
    const vista = blocco.locator("[data-vista='mobile']");
    const riga = vista.locator("[data-riga='3']");
    await expect(riga).toHaveAttribute("aria-pressed", "false");
    await vista.getByRole("button", { name: "3: il sopracciglio" }).click();
    await expect(vista.getByRole("button", { name: "3: il sopracciglio" })).toHaveAttribute("aria-pressed", "true");
    await expect(riga).toHaveAttribute("aria-pressed", "true");
    await expect(vista.locator("[aria-pressed='true']")).toHaveCount(2); // solo numero 3 e riga 3
  });
});
