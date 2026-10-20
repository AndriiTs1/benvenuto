import { expect, test } from "@playwright/test";

// Percorso: le unità dei tempi verbali (meta.json → tempo) stanno nel blocco «I tempi verbali»,
// in ordine presente, passato, imperfetto, futuro; le altre in «Altri argomenti»; poi il test
// di metà corso. Nella pagina dell'unità l'etichetta «Tempo verbale» resta solo per i tempi.

const TEMPI = [1, 3, 4, 6];
const SECONDARIE = [2, 5, 7, 8];

test.use({ viewport: { width: 390, height: 844 } });

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

test("percorso: test di metà corso dopo i due blocchi", async ({ page }) => {
  await page.goto("/a2/grammatica");
  const ordine = await page
    .locator("main")
    .locator('h2, :text("Test metà corso")')
    .evaluateAll((els) => els.map((e) => e.textContent?.trim()));
  expect(ordine).toEqual(["I tempi verbali", "Altri argomenti", "Test metà corso"]);
});

test("pagina dell'unità: etichetta solo per i tempi", async ({ page }) => {
  for (const n of [...TEMPI, ...SECONDARIE]) {
    await page.goto(`/a2/grammatica/unita/${n}`);
    await expect(page.locator("main").getByText("Tempo verbale")).toHaveCount(TEMPI.includes(n) ? 1 : 0);
  }
});

// Le piastrelle dei tempi hanno davvero il colore del proprio token (non trasparente), in entrambi i temi.
for (const tema of ["light", "dark"] as const) {
  test(`piastrelle dei tempi: colore del token (${tema})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: tema });
    await page.goto("/a2/grammatica");
    const colori = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("main [data-tempo]")].map((el) => {
        const prova = document.createElement("span");
        prova.style.backgroundColor = `var(--tempo-${el.dataset.tempo})`;
        document.body.append(prova);
        const token = getComputedStyle(prova).backgroundColor;
        prova.remove();
        return { tempo: el.dataset.tempo, sfondo: getComputedStyle(el).backgroundColor, token };
      }),
    );
    expect(colori.map((c) => c.tempo)).toEqual(["presente", "passato", "imperfetto", "futuro"]);
    for (const c of colori) {
      expect(c.sfondo, c.tempo).not.toBe("rgba(0, 0, 0, 0)");
      expect(c.token, c.tempo).not.toBe("rgba(0, 0, 0, 0)");
      expect(c.sfondo, c.tempo).toBe(c.token);
    }
  });
}
