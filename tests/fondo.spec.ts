import { expect, test, type Page } from "@playwright/test";

// Fondo e margine in basso, uguali su tutte le pagine (globals.css + app/a2/layout.tsx):
// - html ha lo stesso fondo della pagina: tirando oltre l'inizio o la fine (overscroll) niente
//   striscia di un altro colore; nessun contenitore della pagina ha un fondo proprio;
// - 1280: dall'ultimo blocco alla fine della pagina al massimo 64px (se la pagina scorre);
// - 390: con la tab bar in basso, alla fine della pagina l'ultimo blocco non finisce sotto la barra.

const PAGINE = [
  "/",
  "/livello",
  "/a2/grammatica",
  "/a2/grammatica/il-passato-prossimo",
  "/a2/vocabolario",
  "/a2/esercizi/il-passato-prossimo",
];

// Fondo di html, di body e di ogni contenitore da body a <main> (compreso): trasparenti o uguali a html.
function fondi(page: Page) {
  return page.evaluate(() => {
    const colore = (e: Element) => getComputedStyle(e).backgroundColor;
    const catena: string[] = [];
    for (let e = document.querySelector("main"); e && e !== document.body; e = e.parentElement) catena.push(colore(e));
    return { html: colore(document.documentElement), body: colore(document.body), catena };
  });
}

// Fondo dell'ultimo blocco visibile in <main> (senza elementi chiusi/inert né fissi) e altezza della pagina.
function fondoPagina(page: Page) {
  return page.evaluate(() => {
    let ultimo = 0;
    for (const e of document.querySelectorAll("main *")) {
      if (e.closest("[inert]") || !e.checkVisibility({ visibilityProperty: true })) continue;
      const r = e.getBoundingClientRect();
      if (r.height === 0 || getComputedStyle(e).position === "fixed") continue;
      ultimo = Math.max(ultimo, r.bottom + scrollY);
    }
    const barra = document.querySelector("nav[aria-label]");
    const fissa = barra && getComputedStyle(barra).position === "fixed" ? barra.getBoundingClientRect().height : 0;
    return { ultimo, altezza: document.documentElement.scrollHeight, schermo: innerHeight, tabBar: fissa };
  });
}

for (const colorScheme of ["light", "dark"] as const) {
  for (const width of [390, 1280]) {
    test.describe(`${width} ${colorScheme}`, () => {
      test.use({ viewport: { width, height: 844 }, colorScheme });

      for (const url of PAGINE) {
        test(`${url}: fondo di html = fondo della pagina, margine in basso`, async ({ page, context, baseURL }) => {
          await context.addCookies([{ name: "bv_lang", value: "ru", url: baseURL! }]);
          await page.goto(url);

          const { html, body, catena } = await fondi(page);
          expect(html).not.toBe("rgba(0, 0, 0, 0)");
          expect(body).toBe(html);
          for (const c of catena) expect(["rgba(0, 0, 0, 0)", html]).toContain(c);

          const { ultimo, altezza, schermo, tabBar } = await fondoPagina(page);
          const spazio = altezza - ultimo;
          if (width === 1280) {
            // Pagina più corta dello schermo: lo spazio sotto è lo schermo, non un margine da scorrere.
            if (altezza > schermo) expect(spazio).toBeLessThanOrEqual(64);
          } else if (tabBar > 0) {
            expect(spazio).toBeGreaterThanOrEqual(tabBar);
          }
        });
      }
    });
  }
}
