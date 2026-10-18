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

test.use({ viewport: { width: 390, height: 844 } });

test("riga «Parole chiave» di Approfondisci: clic senza contorno, Tab con contorno accent", async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
  await page.goto("/a2/grammatica/il-presente-verbi-regolari");
  // Prima si aprono tutte le righe di Approfondisci, poi si controlla quella di Parole chiave.
  await page.evaluate(() =>
    document
      .querySelectorAll<HTMLButtonElement>(".contenuto-corso button[aria-expanded='false'][aria-controls]")
      .forEach((b) => b.click()),
  );
  const pulsante = page.getByRole("button", { name: /Parole chiave/ });
  await pulsante.click();
  await expect(pulsante).toBeFocused();
  const id = await pulsante.getAttribute("id");
  expect(await contorno(page, `[id="${id}"]`)).toMatchObject({ stile: "none" });

  // Shift+Tab e Tab: il fuoco torna sulla riga, stavolta da tastiera.
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(pulsante).toBeFocused();
  await expect.poll(() => contorno(page, `[id="${id}"]`)).toMatchObject({ stile: "solid", larghezza: "2px", accento: true });
});
