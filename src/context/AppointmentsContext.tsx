import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Appointment, AppointmentFormValues, Period } from "../types/types";
import { initialAppointments } from "../data/initialAppointments";
import { getPeriodFromTime, todayISO } from "../utils";

type AppointmentsContextValue = {
  /** Todos os agendamentos cadastrados. */
  appointments: Appointment[];
  /** Adiciona um novo agendamento (nome, data e horário validados). */
  addAppointment: (values: AppointmentFormValues) => void;
  /** Exclui um agendamento pelo id. */
  deleteAppointment: (id: string) => void;
  /** Data selecionada no filtro (YYYY-MM-DD). */
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  /** Agendamentos do dia selecionado, ordenados por horário (filter + sort). */
  dayAppointments: Appointment[];
  /** Agendamentos do dia agrupados por período (reduce). */
  periodsByDay: Record<Period, Appointment[]>;
  /** Horários já ocupados no dia selecionado (map). */
  takenHours: string[];
};

const AppointmentsContext = createContext<AppointmentsContextValue | undefined>(undefined);

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [selectedDate, setSelectedDate] = useState<string>(todayISO());

  function addAppointment({ clientName, date, time }: AppointmentFormValues) {
    // Validação defensiva: os três campos são obrigatórios.
    if (!clientName.trim() || !date || !time) return;

    setAppointments((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        clientName: clientName.trim(),
        date,
        time,
      },
    ]);
  }

  function deleteAppointment(id: string) {
    // filter() mantém apenas os agendamentos com id diferente do excluído.
    setAppointments((previous) =>
      previous.filter((appointment) => appointment.id !== id)
    );
  }

  // filter() mantém apenas os agendamentos do dia selecionado,
  // e sort() os ordena por horário.
  const dayAppointments = appointments
    .filter((appointment) => appointment.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  // reduce() agrupa os agendamentos do dia em três períodos:
  // Manhã (09h–12h), Tarde (13h–18h) e Noite (19h–21h).
  const periodsByDay = dayAppointments.reduce<Record<Period, Appointment[]>>(
    (groups, appointment) => {
      groups[getPeriodFromTime(appointment.time)].push(appointment);
      return groups;
    },
    { morning: [], afternoon: [], night: [] }
  );

  // map() extrai os horários já ocupados no dia selecionado,
  // usados para desabilitar a grade de horários do formulário.
  const takenHours = dayAppointments.map((appointment) => appointment.time);

  const value: AppointmentsContextValue = {
    appointments,
    addAppointment,
    deleteAppointment,
    selectedDate,
    setSelectedDate,
    dayAppointments,
    periodsByDay,
    takenHours,
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments(): AppointmentsContextValue {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointments deve ser usado dentro de AppointmentsProvider.");
  }
  return context;
}
