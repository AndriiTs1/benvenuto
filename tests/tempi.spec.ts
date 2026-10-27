import { expect, test } from "@playwright/test";

// Percorso: le unità dei tempi verbali (meta.json → tempo) stanno nel blocco «I tempi verbali»,
// in ordine presente, passato, imperfetto, futuro; i modi (meta.json → modo) in «I modi verbali»;
// le altre in «Altri argomenti»; poi il test di metà corso. Nella pagina dell'unità l'etichetta
// «Tempo verbale» resta solo per i tempi, «Modo verbale» solo per i modi.

const TEMPI = [1, 3, 4, 6];
const MODI = [9];
const SECONDARIE = [2, 5, 7, 8];
const MODI_TITOLO = "I modi verbali · Наклонения";

test.use({ viewport: { width: 390, height: 844 } });

// Titolo del blocco dei modi con la traduzione in russo.
test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
});

const blocco = (page: import("@playwright/test").Page, titolo: string) =>
  page.locator("main section", { has: page.getByRole("heading", { name: titolo, exact: true }) });
const unitaNelBlocco = (page: import("@playwright/test").Page, titolo: string) =>
  blocco(page, titolo)
    .locator('a[href^="/a2/grammatica/unita/"]')
    .evaluateAll((els) => els.map((e) => Number(e.getAttribute("href")!.split("/").pop())));

test("percorso: i 4 tempi in un blocco, in ordine; le altre unità in «Altri argomenti»", async ({ page }) => {
  await page.goto("/a2/grammatica");
  expect(await unitaNelBlocco(page, "I tempi verbali")).toEqual(TEMPI);
  expect(await blocco(page, "I tempi verbali").locator("[data-tempo]").evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.tempo))).toEqual([
    "presente",
    "passato",
    "imperfetto",
    "futuro",
  ]);
  expect(await unitaNelBlocco(page, "Altri argomenti")).toEqual(SECONDARIE);
  await expect(blocco(page, "Altri argomenti").locator("[data-tempo]")).toHaveCount(0);
  await expect(page.locator("main").getByText("Tempo verbale")).toHaveCount(0);
});

test("percorso: il condizionale in «I modi verbali», scheda come quelle dei tempi", async ({ page }) => {
  await page.goto("/a2/grammatica");
  expect(await unitaNelBlocco(page, MODI_TITOLO)).toEqual(MODI);
  await expect(blocco(page, MODI_TITOLO).locator("[data-modo='condizionale']")).toHaveCount(1);
  await expect(blocco(page, MODI_TITOLO).locator("[data-tempo]")).toHaveCount(0);
  const scheda = blocco(page, MODI_TITOLO).locator("a").first();
  await expect(scheda).toContainText("Unità 9");
  await expect(scheda).toContainText("Il condizionale");
  await expect(scheda).toContainText("Studiati 0/2 · Esercizi 0/60");
  await expect(page.getByText("0 di 25 argomenti")).toBeVisible();
});

// Da lg la scheda del condizionale ha la larghezza e l'altezza delle schede dei tempi (prima colonna).
test("percorso 1280: scheda del condizionale larga e alta come quelle dei tempi", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto("/a2/grammatica");
  const misure = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("main [data-tempo], main [data-modo]")].map((p) => {
      const b = p.closest("div.relative")!.getBoundingClientRect();
      return { w: Math.round(b.width), h: Math.round(b.height), x: Math.round(b.left) };
    }),
  );
  expect(misure).toHaveLength(5);
  const [presente, , , , condizionale] = misure;
  for (const m of misure) expect(m).toMatchObject({ w: presente.w, h: presente.h });
  expect(condizionale.x).toBe(presente.x);
});

test("percorso: test di metà corso dopo i due blocchi", async ({ page }) => {
  await page.goto("/a2/grammatica");
  const ordine = await page
    .locator("main")
    .locator('h2, :text("Test metà corso")')
    .evaluateAll((els) => els.map((e) => e.textContent?.trim()));
  // "Verifica" (titolo della colonna della tappa) è nascosto sotto md ma resta nel DOM.
  expect(ordine).toEqual(["I tempi verbali", MODI_TITOLO, "Altri argomenti", "Verifica", "Test metà corso"]);
});

test("pagina dell'unità: etichetta solo per i tempi e per i modi", async ({ page }) => {
  for (const n of [...TEMPI, ...MODI, ...SECONDARIE]) {
    await page.goto(`/a2/grammatica/unita/${n}`);
    await expect(page.locator("main").getByText("Tempo verbale")).toHaveCount(TEMPI.includes(n) ? 1 : 0);
    await expect(page.locator("main").getByText("Modo verbale")).toHaveCount(MODI.includes(n) ? 1 : 0);
  }
});

// Le piastrelle dei tempi e dei modi hanno davvero il colore del proprio token (non trasparente), in entrambi i temi.
for (const tema of ["light", "dark"] as const) {
  test(`piastrelle dei tempi: colore del token (${tema})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: tema });
    await page.goto("/a2/grammatica");
    const colori = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("main [data-tempo], main [data-modo]")].map((el) => {
        const prova = document.createElement("span");
        prova.style.backgroundColor = el.dataset.tempo ? `var(--tempo-${el.dataset.tempo})` : `var(--modo-${el.dataset.modo})`;
        document.body.append(prova);
        const token = getComputedStyle(prova).backgroundColor;
        prova.remove();
        return { tempo: el.dataset.tempo ?? el.dataset.modo, sfondo: getComputedStyle(el).backgroundColor, token };
      }),
    );
    expect(colori.map((c) => c.tempo)).toEqual(["presente", "passato", "imperfetto", "futuro", "condizionale"]);
    for (const c of colori) {
      expect(c.sfondo, c.tempo).not.toBe("rgba(0, 0, 0, 0)");
      expect(c.token, c.tempo).not.toBe("rgba(0, 0, 0, 0)");
      expect(c.sfondo, c.tempo).toBe(c.token);
    }
  });
}
