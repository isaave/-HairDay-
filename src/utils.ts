import type { Period } from "./types/types";

/**
 * Retorna a data de hoje no formato YYYY-MM-DD (fuso local),
 * para usar como valor padrão do filtro de agendamentos.
 */
export function todayISO(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Retorna a hora atual no formato HH:MM (fuso local),
 * usada para desabilitar horários que já passaram hoje.
 */
export function nowHHMM(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

/**
 * Classifica um horário HH:MM em um dos três períodos:
 * Manhã (09h–12h), Tarde (13h–18h) ou Noite (19h–21h).
 * Os horários fora da grade de funcionamento caem em "night".
 */
export function getPeriodFromTime(time: string): Period {
  const hour = Number.parseInt(time.split(":")[0], 10);

  if (hour >= 9 && hour <= 12) return "morning";
  if (hour >= 13 && hour <= 18) return "afternoon";
  return "night";
}
