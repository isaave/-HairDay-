import type { Period } from "../types/types";

/**
 * Grade de horários de funcionamento do salão (do Figma).
 */
export const openingHours: string[] = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

/**
 * Primeiro horário de cada período.
 * Usado para renderizar o cabeçalho "Manhã/Tarde/Noite" na grade de horários.
 */
export const periodStartTime: Record<Period, string> = {
  morning: "09:00",
  afternoon: "13:00",
  night: "19:00",
};

/**
 * Informações de cada período exibidas na agenda.
 */
export const periodInfo: Record<Period, { label: string; range: string }> = {
  morning: { label: "Manhã", range: "09h-12h" },
  afternoon: { label: "Tarde", range: "13h-18h" },
  night: { label: "Noite", range: "19h-21h" },
};
