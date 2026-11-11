/**
 * Capturas de tela do HairDay com Playwright (evidência do board, passo 11).
 *
 * Usa o Chrome instalado no sistema (channel "chrome"), sem baixar browsers.
 * Captura os dois temas (dark e light) em desktop e mobile, totalizando
 * quatro imagens: desktop.png, desktop-light.png, mobile.png, mobile-light.png.
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
  const page = await browser.newPage({
    viewport: { width, height },
    colorScheme: "dark",
  });

  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Agendar atendimento" }).waitFor();

  // Tema dark (padrão do design original)
  await page.screenshot({ path: `screenshots/${name}.png` });
  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log(`[${name}] dark ${width}x${height} — fundo ${darkBg}, erros de console: ${consoleErrors.length}`);

  // Alterna para o tema claro e captura a variante
  await page.getByRole("button", { name: "Ativar tema claro" }).click();
  await page.waitForFunction(() => document.documentElement.dataset.theme === "light");
  await page.screenshot({ path: `screenshots/${name}-light.png` });
  const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log(`[${name}] light ${width}x${height} — fundo ${lightBg}, erros de console: ${consoleErrors.length}`);

  await page.close();
}

await browser.close();
console.log("\nCapturas salvas em screenshots/ (dark + light).");
