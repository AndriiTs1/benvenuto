import { expect, test } from "@playwright/test";

// Unità 9 · Il condizionale: collegamenti futuro ↔ le forme, traduzioni (ru / uk / en),
// esercizi: blocco 1 (fill, maiuscole e spazi ai lati non contano), blocco 4 (situazione + scelta).

const FORME = "/a2/grammatica/condizionale-presente-le-forme";
const FUTURO = "/a2/grammatica/il-futuro-semplice";

test.use({ viewport: { width: 390, height: 844 } });

const TESTI = {
  ru: { link: "Та же основа, что у будущего времени", inBreve: "это русское" },
  uk: { link: "Та сама основа, що й у майбутньому часі", inBreve: "це українське" },
  en: { link: "Same stem as the future tense", inBreve: "is English" },
};

for (const [lingua, t] of Object.entries(TESTI)) {
  test(`le forme (${lingua}): collegamento al futuro sotto il titolo, testi tradotti`, async ({ page, context, baseURL }) => {
    await context.addCookies([{ name: "bv_lang", value: lingua, url: baseURL! }]);
    await page.goto(FORME);
    const link = page.locator("[data-collegamento]");
    await expect(link).toHaveCount(1);
    await expect(link).toContainText("Stessa base del futuro → Il futuro");
    await expect(link).toContainText(t.link);
    await expect(link).toHaveAttribute("href", FUTURO);
    // Il collegamento viene prima di "In breve".
    const prima = await page.evaluate(() => {
      const l = document.querySelector("[data-collegamento]")!;
      const h = [...document.querySelectorAll("h2")].find((e) => e.textContent?.trim().toLowerCase() === "in breve")!;
      return !!(l.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(prima).toBe(true);
    await expect(page.locator(`main [lang='${lingua}']`).filter({ hasText: t.inBreve }).first()).toBeVisible();
  });
}

test("futuro: in fondo il collegamento al condizionale", async ({ page }) => {
  await page.goto(FUTURO);
  const link = page.locator("[data-collegamento]");
  await expect(link).toContainText("La stessa base → Il condizionale");
  await link.click();
  await expect(page).toHaveURL(FORME);
});

test("esercizi le forme: 32 voci, risposta con maiuscole e spazi giusta", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
  await page.goto("/a2/esercizi/condizionale-presente-le-forme");
  await expect(page.getByText("1 / 32", { exact: true })).toBeVisible();
  await expect(page.getByText("Поставь глагол в condizionale presente.")).toBeVisible();
  await page.getByRole("textbox", { name: "Risposta" }).fill("  Studierei ");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toContainText("Giusto!");
});

test("esercizi uso: situazione nella lingua scelta, 3 opzioni, spiegazione", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "bv_lang", value: "en", url: baseURL! }]);
  await page.goto("/a2/esercizi/uso-del-condizionale");
  await expect(page.getByText("1 / 28", { exact: true })).toBeVisible();
  await expect(page.getByText("Read the situation and choose what to say.")).toBeVisible();
  await expect(page.locator("#esercizio-frase")).toHaveText("Your friend is always tired. Give gentle advice.");
  await expect(page.locator("main li button")).toHaveCount(3);
  await page.getByRole("button", { name: "Dovrai dormire di più.", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Sbagliato");
  await expect(page.getByRole("status")).toContainText("Dovresti dormire di più.");
  await expect(page.getByRole("status")).toContainText("Soft advice → dovresti");
});

// 390px (e 375px): ogni tabella delle due lezioni (max 3 verbi) sta nella sua scheda, niente scorrimento di lato.
const CASI_TABELLE = [390, 375].flatMap((larghezza) => [FORME, "/a2/grammatica/uso-del-condizionale"].map((pagina) => ({ larghezza, pagina })));
for (const { larghezza, pagina } of CASI_TABELLE) {
  test(`${larghezza}: tabelle non più larghe della scheda (${pagina})`, async ({ page, context, baseURL }) => {
    await page.setViewportSize({ width: larghezza, height: 844 });
    await context.addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
    await page.goto(pagina);
    const larghe = await page.evaluate(() =>
      [...document.querySelectorAll("main table")]
        .map((t) => {
          const scheda = t.closest(".rounded-2xl")!;
          const contenitore = t.parentElement!;
          return {
            titolo: scheda.firstElementChild?.textContent?.slice(0, 40),
            tabella: Math.ceil(t.getBoundingClientRect().width),
            scheda: Math.floor(scheda.getBoundingClientRect().width),
            scorre: contenitore.scrollWidth > contenitore.clientWidth,
          };
        })
        .filter((m) => m.tabella > m.scheda || m.scorre),
    );
    expect(larghe).toEqual([]);
  });
}
