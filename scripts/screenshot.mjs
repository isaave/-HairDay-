/**
 * Capturas de tela do HairDay com Playwright (evidência do board, passo 11).
 *
 * Usa o Chrome instalado no sistema (channel "chrome"), sem baixar browsers.
 *
 * Uso:
 *   1. Rode o dev server em um terminal: `npm run dev`
 *   2. Em outro terminal: `npm run screenshots`
 *
 * A URL pode ser sobrescrita: `URL=http://localhost:5173 npm run screenshots`
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.env.URL ?? "http://localhost:5199/";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });

for (const { name, width, height } of viewports) {
  const page = await browser.newPage({ viewport: { width, height } });

  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Agendar atendimento" }).waitFor();

  const title = await page.title();
  const heading = await page.getByRole("heading", { name: "Agendar atendimento" }).textContent();
  const periods = await page.locator("section[aria-label^='Agendamentos da']").all();

  await page.screenshot({ path: `screenshots/${name}.png` });

  console.log(`[${name}] ${width}x${height}`);
  console.log(`  título: ${title}`);
  console.log(`  heading: ${heading}`);
  console.log(`  períodos renderizados: ${periods.length} (esperado: 3)`);
  console.log(`  erros de console: ${consoleErrors.length}`);

  await page.close();
}

await browser.close();
console.log("\nCapturas salvas em screenshots/desktop.png e screenshots/mobile.png");
