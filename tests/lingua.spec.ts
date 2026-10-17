import { expect, test } from "@playwright/test";

// Selettore della lingua: anello di fuoco solo da tastiera (accent, 2px), mai dopo un clic.

const contorno = (page: import("@playwright/test").Page) =>
  page.evaluate(() => {
    const pulsante = document.querySelector<HTMLButtonElement>("button[aria-haspopup='listbox']")!;
    const capsula = pulsante.querySelector("span")!;
    const accento = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    const prova = document.createElement("span");
    prova.style.color = accento;
    document.body.append(prova);
    const coloreAccento = getComputedStyle(prova).color;
    prova.remove();
    const c = getComputedStyle(capsula);
    return {
      pulsante: getComputedStyle(pulsante).outlineStyle,
      capsula: c.outlineStyle,
      larghezza: c.outlineWidth,
      accento: c.outlineColor === coloreAccento,
    };
  });

test.use({ viewport: { width: 390, height: 844 } });

test("dopo il clic e la scelta della lingua: nessun contorno", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
  await page.goto("/a2/grammatica");
  const pulsante = page.getByRole("button", { name: /Lingua delle spiegazioni/ });

  await pulsante.click();
  expect(await contorno(page)).toMatchObject({ pulsante: "none", capsula: "none" });

  await page.getByRole("option", { name: "English" }).click();
  await expect(pulsante).toHaveAttribute("aria-expanded", "false");
  expect(await contorno(page)).toMatchObject({ pulsante: "none", capsula: "none" });
});

test("da tastiera: contorno accent di 2px", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
  await page.goto("/a2/grammatica");
  const pulsante = page.getByRole("button", { name: /Lingua delle spiegazioni/ });
  // Tab fino al selettore della lingua.
  for (let i = 0; i < 10 && !(await pulsante.evaluate((b) => b === document.activeElement)); i++) {
    await page.keyboard.press("Tab");
  }
  await expect(pulsante).toBeFocused();
  // La capsula ha una transizione di 150 ms: si aspetta il colore finale.
  await expect.poll(() => contorno(page)).toMatchObject({ capsula: "solid", larghezza: "2px", accento: true });
});
