// Anteprima dei link: design/og.html → src/app/opengraph-image.png e twitter-image.png (1200×630).
// Uso: npm run render:og. Serve la rete: il font Inter arriva da Google Fonts.
import { copyFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const radice = process.cwd();
const sorgente = pathToFileURL(path.join(radice, "design/og.html")).href;
const og = path.join(radice, "src/app/opengraph-image.png");
const twitter = path.join(radice, "src/app/twitter-image.png");

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: "light" });
  await page.goto(sorgente, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const inter = await page.evaluate(() => [...document.fonts].some((f) => f.family === "Inter" && f.status === "loaded"));
  if (!inter) throw new Error("Font Inter non caricato (serve la rete): immagine non generata.");
  await page.screenshot({ path: og, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  copyFileSync(og, twitter);
  console.log(`Anteprima: ${path.relative(radice, og)}, ${path.relative(radice, twitter)} (1200×630)`);
} finally {
  await browser.close();
}
