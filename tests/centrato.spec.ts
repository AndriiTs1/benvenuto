import { expect, test } from "@playwright/test";
import meta from "../src/content/a2/meta.json";

// Sotto md (qui 390px) tutto il contenuto del corso è al centro (.contenuto-corso, vedi CLAUDE.md)
// e la pagina non scorre in orizzontale. Barra in alto e tab bar sono fuori dal controllo.

const PAGINE = [
  "/a2/grammatica",
  "/a2/vocabolario",
  "/a2/vocabolario?q=mano",
  "/a2/vocabolario/la-vita-quotidiana",
  "/a2/vocabolario/salute-e-corpo",
  "/a2/vocabolario/salute-e-corpo?tipo=nomi",
  "/a2/esercizi/il-presente-verbi-regolari",
  "/a2/esercizi/che-tempo-fa",
  "/a2/esercizi/c-e-ci-sono",
  ...Object.values(meta.units).map((u) => `/a2/grammatica/unita/${u.number}`),
  ...Object.values(meta.topics).map((t) => `/a2/grammatica/${t.slug}`),
];

for (const lingua of ["ru", "en"]) {
  test.describe(`mobile 390 · ${lingua}`, () => {
    test.use({ viewport: { width: 390, height: 844 } });

    for (const percorso of PAGINE) {
      test(percorso, async ({ page, context, baseURL }) => {
        await context.addCookies([{ name: "bv_lang", value: lingua, url: baseURL! }]);
        await page.goto(percorso);
        // Anche il contenuto dei blocchi chiusi: soluzioni (<details>) e righe di "Approfondisci".
        await page.evaluate(() => {
          document.querySelectorAll<HTMLDetailsElement>(".contenuto-corso details").forEach((d) => (d.open = true));
          document
            .querySelectorAll<HTMLButtonElement>(".contenuto-corso button[aria-expanded='false'][aria-controls]")
            .forEach((b) => b.click());
        });
        await page.waitForTimeout(300); // apertura: 200 ms

        const { larghezza, scroll, sinistra, addossati } = await page.evaluate(() => {
          const radice = document.querySelector(".contenuto-corso");
          if (!radice) return { larghezza: innerWidth, scroll: -1, sinistra: ["manca .contenuto-corso"], addossati: [] };
          // Il blocco che decide l'allineamento: il primo antenato non inline.
          const blocco = (el: Element) => {
            let e: Element | null = el;
            while (e && e !== radice) {
              if (!["inline", "contents"].includes(getComputedStyle(e).display)) return e;
              e = e.parentElement;
            }
            return radice;
          };
          const fuori = new Set<string>();
          const giro = document.createTreeWalker(radice, NodeFilter.SHOW_TEXT);
          for (let n = giro.nextNode(); n; n = giro.nextNode()) {
            const testo = n.textContent?.trim();
            const el = n.parentElement;
            // [data-celle-a-sinistra]: elenchi-didascalie delle figure, colonne al centro e testo della cella a sinistra (voluto).
            if (!testo || !el || el.closest(".sr-only, [aria-hidden='true'], svg, [data-celle-a-sinistra]") || !el.getClientRects().length) continue;
            const allineamento = getComputedStyle(blocco(el)).textAlign;
            if (allineamento !== "center") fuori.add(`${allineamento}: ${testo.slice(0, 40)}`);
          }
          // Blocchi più stretti del genitore e attaccati al suo bordo sinistro (items-start,
          // justify-start…): il testo è "center" ma il blocco no. Le righe flex con più figli
          // (icona · testo · chevron) e le griglie a più colonne sono escluse: lì è voluto.
          const attaccati: string[] = [];
          for (const el of radice.querySelectorAll("*")) {
            const display = getComputedStyle(el).display;
            if (display === "none" || display === "inline" || display === "contents" || display.startsWith("table")) continue;
            if (el.closest(".sr-only, [aria-hidden='true'], svg, table") || !el.textContent?.trim()) continue;
            const genitore = el.parentElement;
            if (!genitore) continue;
            const g = getComputedStyle(genitore);
            const figli = [...genitore.children].filter((c) => c.getClientRects().length).length;
            if (g.display.includes("flex") && !g.flexDirection.startsWith("column") && figli > 1) continue;
            if (g.display.includes("grid") && g.gridTemplateColumns.split(" ").length > 1) continue;
            const r = el.getBoundingClientRect();
            const p = genitore.getBoundingClientRect();
            if (!r.width) continue;
            const sx = r.left - (p.left + parseFloat(g.paddingLeft) + parseFloat(g.borderLeftWidth));
            const dx = p.right - parseFloat(g.paddingRight) - parseFloat(g.borderRightWidth) - r.right;
            if (sx < 4 && dx - sx > 12) attaccati.push(`${Math.round(sx)}/${Math.round(dx)}: ${el.textContent.trim().slice(0, 40)}`);
          }
          return {
            larghezza: innerWidth,
            scroll: document.documentElement.scrollWidth,
            sinistra: [...fuori],
            addossati: attaccati,
          };
        });

        expect(sinistra, "testi non centrati").toEqual([]);
        expect(addossati, "blocchi attaccati a sinistra").toEqual([]);
        expect(scroll, "scroll orizzontale").toBeLessThanOrEqual(larghezza);
      });
    }
  });
}
