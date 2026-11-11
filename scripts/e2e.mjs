/**
 * Teste E2E do HairDay com Playwright (evidência do board, passo 11).
 *
 * Valida o fluxo completo: cadastro pelo formulário, exibição imediata
 * na agenda, exclusão pela lixeira e filtro por data com estado vazio.
 *
 * Uso:
 *   1. Rode o dev server em um terminal: `npm run dev`
 *   2. Em outro terminal: `npm run test:e2e`
 *
 * A URL pode ser sobrescrita: `URL=http://localhost:5173 npm run test:e2e`
 */
import { chromium } from "playwright";

const URL = process.env.URL ?? "http://localhost:5199/";

function assert(condition, message) {
  if (!condition) throw new Error(`FALHOU: ${message}`);
  console.log(`  ✓ ${message}`);
}

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});

await page.goto(URL, { waitUntil: "networkidle" });

console.log("\n[1] Renderização inicial");
await page.getByRole("heading", { name: "Agendar atendimento" }).waitFor();
await page.getByRole("heading", { name: "Agendamentos" }).waitFor();
assert((await page.title()) === "HairDay — Agendamentos", "título da página correto");
assert((await page.locator("section[aria-label^='Agendamentos da']").count()) === 3, "três períodos renderizados (Manhã, Tarde, Noite)");
assert((await page.locator("ul.hours button").count()) === 13, "grade com 13 horários de funcionamento");

console.log("\n[2] Cadastro de agendamento pelo formulário");
const primeiroNome = await page.locator("ul.hours li:has(button:not([disabled])) button").first().textContent();
await page.getByLabel("Cliente", { exact: true }).fill("Cliente Playwright");
await page.getByRole("button", { name: primeiroNome }).click();
await page.getByRole("button", { name: "Agendar" }).click();
await page.getByText("Cliente Playwright").waitFor();
const cardDoTeste = page.locator("li", { hasText: "Cliente Playwright" });
assert((await cardDoTeste.count()) === 1, `agendamento "Cliente Playwright" apareceu na agenda imediatamente (${primeiroNome})`);
assert((await page.getByLabel("Cliente", { exact: true }).inputValue()) === "", "formulário foi resetado após o cadastro");
const periodoDoCard = await cardDoTeste.locator("xpath=ancestor::section[1]").getAttribute("aria-label");
console.log(`  ✓ card está na seção: ${periodoDoCard}`);
const botaoDoHorario = page.getByRole("button", { name: primeiroNome, exact: true });
assert((await botaoDoHorario.isDisabled()) === true, `horário ${primeiroNome} ficou indisponível na grade`);

console.log("\n[3] Exclusão pela lixeira");
await cardDoTeste.getByRole("button", { name: /Excluir agendamento de Cliente Playwright/ }).click();
await page.getByText("Cliente Playwright").waitFor({ state: "detached" });
assert((await page.getByText("Cliente Playwright").count()) === 0, "agendamento removido da agenda após clicar na lixeira");
assert((await botaoDoHorario.isDisabled()) === false, `horário ${primeiroNome} voltou a ficar disponível`);

console.log("\n[4] Filtro por data");
const amanha = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
await page.locator("#schedule-date").fill(amanha);
await page.getByText("Nenhum agendamento para este período").first().waitFor();
assert((await page.getByText("Nenhum agendamento para este período").count()) === 3, "todos os períodos mostram o estado vazio na data sem agendamentos");

const hoje = new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD em fuso local? (sv-SE usa padrão ISO)
await page.locator("#date").fill(hoje);
await page.getByText("Maria Souza").waitFor();
assert((await page.getByText("Maria Souza").count()) === 1, "agendamentos do dia reapareceram ao voltar a data");

console.log("\n[5] Console");
assert(consoleErrors.length === 0, `nenhum erro de console (${consoleErrors.length} erros)`);

await browser.close();
console.log("\nE2E concluído: todos os testes passaram.");
