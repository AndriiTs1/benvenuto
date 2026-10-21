import { expect, test } from "@playwright/test";

// Pagina dell'argomento: le righe di "Approfondisci" sono chiuse all'apertura;
// un clic apre la riga e il contenuto si vede.

test.use({ viewport: { width: 390, height: 844 } });

for (const slug of ["il-passato-prossimo", "descrivere-una-persona"]) {
  test(`${slug}: righe chiuse all'apertura, clic → aperta`, async ({ page, context, baseURL }) => {
    await context.addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
    await page.goto(`/a2/grammatica/${slug}`);

    const righe = page.locator("button[aria-controls][aria-expanded]").filter({ hasText: /·/ });
    const numero = await righe.count();
    expect(numero).toBeGreaterThan(0);
    for (const riga of await righe.all()) await expect(riga).toHaveAttribute("aria-expanded", "false");

    const eccezioni = page.getByRole("button", { name: /Eccezioni/ });
    await eccezioni.click();
    await expect(eccezioni).toHaveAttribute("aria-expanded", "true");
    const regione = page.locator(`[id="${await eccezioni.getAttribute("aria-controls")}"]`);
    await expect(regione).toHaveAttribute("role", "region");
    await expect(regione).not.toHaveAttribute("inert");
    await expect.poll(() => regione.evaluate((r) => r.getBoundingClientRect().height)).toBeGreaterThan(40);
    await expect(regione.locator("li").first()).toBeVisible();
  });
}

// Passato prossimo: formula e passi visibili subito dopo "In breve" (non in Approfondisci);
// il test di "Essere o avere?" in cima al blocco; l'elenco dei participi irregolari è una riga chiusa.
test("il-passato-prossimo: formula aperta, test essere/avere, participi in Approfondisci", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
  await page.goto("/a2/grammatica/il-passato-prossimo");

  // exact: il titolo dell'argomento (h1) è "Come si forma: avere o essere".
  await expect(page.getByRole("heading", { name: "Come si forma", exact: true })).toBeVisible();
  await expect(page.locator("main p[lang='it']", { hasText: "avere / essere" }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /^Come si forma/ })).toHaveCount(0);

  await expect(page.getByText("Тест за 3 секунды")).toBeVisible();

  const participi = page.getByRole("button", { name: /Participi irregolari/ });
  await expect(participi).toHaveAttribute("aria-expanded", "false");
  // Non più una sezione a sé (h2) dopo le tabelle: solo la riga di Approfondisci.
  await expect(page.locator("main h2", { hasText: "Participi irregolari" })).toHaveCount(0);
});
