/**
 * Períodos de funcionamento do salão.
 * Manhã (09h–12h), Tarde (13h–18h) e Noite (19h–21h).
 */
export type Period = "morning" | "afternoon" | "night";

/**
 * Um agendamento da agenda do salão.
 */
export type Appointment = {
  id: string;
  clientName: string;
  /** Data no formato YYYY-MM-DD */
  date: string;
  /** Horário no formato HH:MM */
  time: string;
};

/**
 * Valores enviados pelo formulário de agendamento.
 */
export type AppointmentFormValues = {
  clientName: string;
  date: string;
  time: string;
};
