import type { Appointment } from "../types/types";
import { todayISO } from "../utils";

const today = todayISO();

/**
 * Agendamentos iniciais do dia atual.
 *
 * ⚠️ Dados provisórios de demonstração: substitua por dados
 * reais (API ou banco) quando estiverem disponíveis.
 */
export const initialAppointments: Appointment[] = [
  { id: "seed-1", clientName: "Maria Souza", date: today, time: "10:00" },
  { id: "seed-2", clientName: "João Ferreira", date: today, time: "11:00" },
  { id: "seed-3", clientName: "Ana Beatriz", date: today, time: "14:00" },
  { id: "seed-4", clientName: "Carlos Lima", date: today, time: "20:00" },
];
