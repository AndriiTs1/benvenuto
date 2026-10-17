import { expect, test, type Page } from "@playwright/test";

// Anello di fuoco in tutto il corso: dopo un clic nessun contorno, da tastiera accent 2px
// (components/ModalitaInput.tsx + globals.css).

const contorno = (page: Page, selettore: string) =>
  page.evaluate((sel) => {
    const el = document.querySelector(sel)!;
    const prova = document.createElement("span");
    prova.style.color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    document.body.append(prova);
    const accento = getComputedStyle(prova).color;
    prova.remove();
    const c = getComputedStyle(el);
    return { stile: c.outlineStyle, larghezza: c.outlineWidth, accento: c.outlineColor === accento };
  }, selettore);

const SUMMARY = "summary:has-text('Parole chiave')";

test.use({ viewport: { width: 390, height: 844 } });

test("summary «Parole chiave»: clic senza contorno, Tab con contorno accent", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
  await page.goto("/a2/grammatica/il-presente-verbi-regolari");
  const summary = page.locator(SUMMARY);

  await summary.click();
  await expect(summary).toBeFocused();
  expect(await contorno(page, "details summary")).toMatchObject({ stile: "none" });

  // Shift+Tab e Tab: il fuoco torna sul summary, stavolta da tastiera.
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(summary).toBeFocused();
  await expect.poll(() => contorno(page, "details summary")).toMatchObject({ stile: "solid", larghezza: "2px", accento: true });
});
