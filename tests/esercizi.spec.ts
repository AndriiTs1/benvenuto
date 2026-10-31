import { expect, test, type Page } from "@playwright/test";
import dati from "../src/content/a2/esercizi.json";
import meta from "../src/content/a2/meta.json";

// Player degli esercizi: risposta sbagliata → "Risposta corretta", giusta → successo,
// senza accento → giusta con avviso; schermata finale; argomento senza esercizi → 404.

type Voce = { id: string; type: string; answers?: string[]; options?: string[]; answer?: number };
const insieme = (topic: string) => dati.sets.find((s) => s.topic === topic)!.items as Voce[];
const slug = (topic: string) => (meta.topics as Record<string, { slug: string }>)[topic].slug;

async function rispondi(page: Page, voce: Voce, risposta?: string) {
  if (voce.type === "fill") {
    await page.getByRole("textbox", { name: "Risposta" }).fill(risposta ?? voce.answers![0]);
    await page.keyboard.press("Enter"); // Invio = Verifica
  } else {
    const testo = risposta ?? voce.options![voce.answer!];
    await page.getByRole("button", { name: testo, exact: true }).click();
  }
}

test.use({ viewport: { width: 390, height: 844 } });

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([{ name: "bv_lang", value: "uk", url: baseURL! }]);
});

test("presente: errore, risposte giuste, schermata finale, solo gli errori", async ({ page }) => {
  const voci = insieme("g5-presente-regular");
  await page.goto(`/a2/esercizi/${slug("g5-presente-regular")}`);

  for (const [i, voce] of voci.entries()) {
    await expect(page.getByText(`${i + 1} / ${voci.length}`, { exact: true })).toBeVisible();
    if (i === 0) {
      await rispondi(page, voce, voce.type === "fill" ? "zzz" : voce.options!.find((_, j) => j !== voce.answer));
      await expect(page.getByText("Risposta corretta:")).toBeVisible();
      await expect(page.getByRole("status")).toContainText("Sbagliato");
    } else {
      await rispondi(page, voce);
      await expect(page.getByRole("status")).toContainText("Giusto!");
      await expect(page.getByText("Risposta corretta:")).toHaveCount(0);
    }
    // Dopo la verifica il fuoco è su "Avanti".
    await expect(page.getByRole("button", { name: "Avanti" })).toBeFocused();
    await page.getByRole("button", { name: "Avanti" }).click();
  }

  await expect(page.getByText(`${voci.length - 1} / ${voci.length}`, { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Ripeti" })).toBeVisible();
  await expect(page.getByRole("main").getByRole("link", { name: "Torna all'argomento" })).toBeVisible();

  await page.getByRole("button", { name: "Solo gli errori" }).click();
  await expect(page.getByText("1 / 1", { exact: true })).toBeVisible();
});

test("passato prossimo: «e andata» senza accento è giusta, con l'avviso", async ({ page }) => {
  const voci = insieme("g5-passato-prossimo-base");
  await page.goto(`/a2/esercizi/${slug("g5-passato-prossimo-base")}`);
  const indice = voci.findIndex((v) => v.answers?.includes("è andata"));
  for (const voce of voci.slice(0, indice)) {
    await rispondi(page, voce);
    await page.getByRole("button", { name: "Avanti" }).click();
  }
  await rispondi(page, voci[indice], "e andata");
  await expect(page.getByRole("status")).toContainText("Giusto!");
  await expect(page.getByRole("status")).toContainText("Attenzione all'accento: è andata");
});

test("cambio lingua durante il giro: testi nella lingua nuova, risposte conservate", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
  await page.goto("/a2/esercizi/uso-del-condizionale");
  await expect(page.getByText("Прочитай ситуацию и выбери, что сказать.")).toBeVisible();
  await page.getByRole("button", { name: "Dovresti dormire di più.", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Giusto");

  await page.getByRole("button", { name: /Lingua delle spiegazioni/ }).click();
  await page.getByRole("option", { name: "English" }).click();

  await expect(page.getByText("Read the situation and choose what to say.")).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Soft advice → dovresti");
  await expect(page.getByText("1 / 40", { exact: true })).toBeVisible();
});

test("argomento senza esercizi → 404", async ({ page }) => {
  const risposta = await page.goto("/a2/esercizi/xyz");
  expect(risposta?.status()).toBe(404);
});

for (const larghezza of [375, 390]) {
  test(`nessuno scorrimento orizzontale a ${larghezza}px`, async ({ page }) => {
    await page.setViewportSize({ width: larghezza, height: 844 });
    for (const url of ["/a2/grammatica", `/a2/esercizi/${slug("g5-passato-prossimo-base")}`]) {
      await page.goto(url);
      await page.waitForTimeout(200);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(larghezza);
    }
  });
}
