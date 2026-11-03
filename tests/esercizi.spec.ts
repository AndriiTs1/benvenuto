import { expect, test, type Page } from "@playwright/test";
import dati from "../src/content/a2/esercizi.json";
import meta from "../src/content/a2/meta.json";

// Player degli esercizi: risposta sbagliata → "Risposta corretta", giusta → successo,
// senza accento → giusta con avviso; schermata finale; argomento senza esercizi → 404.
// Argomenti grandi divisi in blocchi: /a2/esercizi/<slug>/<n>, ogni blocco con il suo giro.

type Voce = { id: string; type: string; answers?: string[]; options?: string[]; answer?: number };
type Insieme = { topic: string; items: Voce[]; blocchi?: { id: string; items: string[] }[] };
const insiemi = dati.sets as Insieme[];
const insieme = (topic: string) => insiemi.find((s) => s.topic === topic)!.items;
// Voci di un blocco (numero da 1), nell'ordine del blocco.
const blocco = (topic: string, numero: number) => {
  const s = insiemi.find((x) => x.topic === topic)!;
  return s.blocchi![numero - 1].items.map((id) => s.items.find((v) => v.id === id)!);
};
const risposta = (v: Voce) => (v.type === "fill" ? v.answers![0] : v.options![v.answer!]);
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
  const voci = blocco("g5-passato-prossimo-base", 1);
  await page.goto(`/a2/esercizi/${slug("g5-passato-prossimo-base")}/1`);
  await expect(page.getByText(`1 / ${voci.length}`, { exact: true })).toBeVisible();
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
  await page.goto("/a2/esercizi/uso-del-condizionale/1");
  await expect(page.getByText("Прочитай ситуацию и выбери, что сказать.")).toBeVisible();
  await page.getByRole("button", { name: "Dovresti dormire di più.", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Giusto");

  await page.getByRole("button", { name: /Lingua delle spiegazioni/ }).click();
  await page.getByRole("option", { name: "English" }).click();

  await expect(page.getByText("Read the situation and choose what to say.")).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Soft advice → dovresti");
  await expect(page.getByText("1 / 9", { exact: true })).toBeVisible();
});

test("riapro la pagina: Continua dal punto giusto, Ricomincia da 1", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
  const [prima, seconda] = blocco("g5-condizionale-uso", 1);
  await page.goto("/a2/esercizi/uso-del-condizionale/1");
  await page.getByRole("button", { name: risposta(prima), exact: true }).click();
  await page.getByRole("button", { name: "Avanti" }).click();
  await page.getByRole("button", { name: risposta(seconda), exact: true }).click();
  await page.getByRole("button", { name: "Avanti" }).click();
  await expect(page.getByText("3 / 9", { exact: true })).toBeVisible();

  await page.reload();
  await expect(page.getByText("2 / 9", { exact: true })).toBeVisible();
  await expect(page.getByText("esercizi fatti")).toBeVisible();
  await expect(page.getByRole("button", { name: "Ricomincia" })).toBeVisible();
  await page.getByRole("button", { name: "Continua dal 3" }).click();
  await expect(page.getByText("3 / 9", { exact: true })).toBeVisible();

  await page.reload();
  await page.getByRole("button", { name: "Ricomincia" }).click();
  await expect(page.getByText("1 / 9", { exact: true })).toBeVisible();

  await page.reload();
  await expect(page.getByText("1 / 9", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: /Continua dal/ })).toHaveCount(0);
});

test("blocco 1 di uso: alla fine «Blocco successivo →» porta al blocco 2", async ({ page }) => {
  const voci = blocco("g5-condizionale-uso", 1);
  await page.goto("/a2/esercizi/uso-del-condizionale/1");
  await expect(page.getByText("Blocco 1 di 5 · Consigli e opinioni")).toBeVisible();
  for (const voce of voci) {
    await rispondi(page, voce);
    await page.getByRole("button", { name: "Avanti" }).click();
  }
  await expect(page.getByText(`${voci.length} / ${voci.length}`, { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Blocco successivo →" }).click();
  await expect(page).toHaveURL(/\/a2\/esercizi\/uso-del-condizionale\/2$/);
  await expect(page.getByText("Blocco 2 di 5 · Desideri")).toBeVisible();
  await expect(page.getByText(`1 / ${blocco("g5-condizionale-uso", 2).length}`, { exact: true })).toBeVisible();
});

test("blocco inesistente → 404", async ({ page }) => {
  expect((await page.goto("/a2/esercizi/uso-del-condizionale/9"))?.status()).toBe(404);
  // Argomento senza blocchi: nessuna pagina di blocco.
  expect((await page.goto(`/a2/esercizi/${slug("g5-presente-regular")}/1`))?.status()).toBe(404);
});

test("argomento uso: i 5 blocchi prima della spiegazione", async ({ page }) => {
  await page.goto("/a2/grammatica/uso-del-condizionale");
  const primo = page.locator('a[href="/a2/esercizi/uso-del-condizionale/1"]').first();
  await expect(primo).toBeVisible();
  for (const n of [1, 2, 3, 4, 5]) {
    await expect(page.locator(`a[href="/a2/esercizi/uso-del-condizionale/${n}"]`)).toHaveCount(2); // in cima e in fondo
  }
  const sopra = await primo.evaluate((a) => {
    const teoria = [...document.querySelectorAll("main h2")].find((h) => h.textContent?.trim() === "In breve");
    return !!teoria && !!(a.compareDocumentPosition(teoria) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  expect(sopra).toBe(true);
});

test("unità 9: sotto gli argomenti le righe dei blocchi", async ({ page }) => {
  await page.goto("/a2/grammatica/unita/9");
  for (const [s, n] of [["condizionale-presente-le-forme", 3], ["uso-del-condizionale", 5]] as const) {
    for (let i = 1; i <= n; i++) await expect(page.locator(`a[href="/a2/esercizi/${s}/${i}"]`)).toHaveCount(1);
  }
  const riga = page.locator('a[href="/a2/esercizi/uso-del-condizionale/1"]');
  await expect(riga).toContainText("Blocco 1");
  await expect(riga).toContainText("Consigli e opinioni");
  await expect(riga).toContainText(`0/${blocco("g5-condizionale-uso", 1).length}`);
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
