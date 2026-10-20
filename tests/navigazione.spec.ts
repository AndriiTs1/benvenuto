import { expect, test } from "@playwright/test";
import curriculum from "../src/content/a2/ru/curriculum.json";
import meta from "../src/content/a2/meta.json";

// Menu del corso: solo Grammatica e Vocabolario. I vecchi indirizzi (vista Indice, schede
// Esercizi e Comunicare) portano al percorso; Indietro negli esercizi torna all'argomento.

test.use({ viewport: { width: 390, height: 844 } });

for (const vecchio of ["/a2/grammatica?vista=indice", "/a2/esercizi", "/a2/comunicare"]) {
  test(`${vecchio} → /a2/grammatica`, async ({ page }) => {
    const risposta = await page.goto(vecchio);
    expect(risposta?.status()).toBe(200);
    expect(new URL(page.url()).pathname + new URL(page.url()).search).toBe("/a2/grammatica");
  });
}

test("menu: Grammatica e Vocabolario, niente Indice", async ({ page }) => {
  await page.goto("/a2/grammatica");
  const schede = page.getByRole("navigation", { name: "Sezioni del corso" }).getByRole("link");
  await expect(schede).toHaveText(["Grammatica", "Vocabolario"]);
  await expect(page.getByRole("link", { name: "Indice" })).toHaveCount(0);
  // Una sola tappa: il test di metà corso dopo l'unità 5.
  await expect(page.getByText("Test metà corso")).toHaveCount(1);
  await expect(page.getByText("Unità 1–5")).toBeVisible();
});

test("esercizi: Indietro porta all'argomento", async ({ page }) => {
  await page.goto("/a2/esercizi/il-passato-prossimo");
  await page.locator("header").getByRole("link", { name: "Torna all'argomento" }).click();
  await expect(page).toHaveURL(/\/a2\/grammatica\/il-passato-prossimo$/);
});

test("percorso e unità: progresso degli esercizi", async ({ page }) => {
  await page.goto("/a2/grammatica");
  await expect(page.getByText(/^Esercizi 0\/\d+$/)).toHaveCount(Object.keys(meta.units).length);
  await page.goto("/a2/grammatica/unita/3");
  await expect(page.getByText(/^Esercizi 0\/\d+$/)).toHaveCount(5);
});

test("percorso: «Sei qui» sull'unità in cui ci si è fermati, «Continua» solo dentro quella scheda", async ({ page }) => {
  const numero = (id: string) => (meta.units as Record<string, { number: number }>)[id].number;
  const slug = (id: string) => (meta.topics as Record<string, { slug: string }>)[id].slug;
  const [prima, seconda] = curriculum.units;
  await page.goto("/a2/grammatica");
  // Senza progresso: la prima unità del curriculum; "Continua" porta al suo primo argomento.
  await expect(page.getByText("Sei qui", { exact: true })).toHaveCount(1);
  const scheda = page.locator("main div", { has: page.locator(`a[href="/a2/grammatica/unita/${numero(prima.id)}"]`) }).last();
  await expect(scheda).toContainText("Sei qui");
  await expect(page.getByRole("link", { name: "Continua", exact: true })).toHaveCount(1);
  await expect(scheda.getByRole("link", { name: "Continua", exact: true })).toHaveAttribute("href", `/a2/grammatica/${slug(prima.topics[0])}`);
  for (const nome of ["Inizia", "Ripassa"]) await expect(page.locator("main").getByText(nome, { exact: true })).toHaveCount(0);

  // Prima unità studiata per intero → "Sei qui" passa alla seconda; la prima ha la spunta.
  await page.evaluate((ids) => {
    localStorage.setItem("bv_progress_a2", JSON.stringify({ topics: Object.fromEntries(ids.map((id) => [id, "studied"])), lastTopic: null }));
  }, prima.topics);
  await page.reload();
  await expect(page.getByText("Sei qui", { exact: true })).toHaveCount(1);
  await expect(page.locator(`a[href="/a2/grammatica/unita/${numero(seconda.id)}"]`)).toContainText("Sei qui");
  await expect(page.getByRole("img", { name: "Unità completata" })).toHaveCount(1);
});
