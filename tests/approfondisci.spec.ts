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
