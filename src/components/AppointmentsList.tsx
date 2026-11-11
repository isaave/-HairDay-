import afternoonIcon from "../assets/afternoon.svg";
import morningIcon from "../assets/morning.svg";
import nightIcon from "../assets/night.svg";
import { useAppointments } from "../context/AppointmentsContext";
import { periodInfo } from "../data/openingHours";
import type { Period } from "../types/types";
import { AppointmentCard } from "./AppointmentCard";
import { EmptyState } from "./EmptyState";
import { PeriodFilter } from "./PeriodFilter";

/** Ordem de exibição dos períodos na agenda. */
const periodOrder: Period[] = ["morning", "afternoon", "night"];

/** Ícone de cada período (assets do Figma). */
const periodIcons: Record<Period, string> = {
  morning: morningIcon,
  afternoon: afternoonIcon,
  night: nightIcon,
};

/**
 * Agenda do dia: agendamentos agrupados por período
 * (Manhã, Tarde e Noite), com filtro por data.
 */
export function AppointmentsList() {
  const { periodsByDay } = useAppointments();

  return (
    <section
      aria-label="Agenda do dia"
      className="flex flex-col justify-between max-[1099px]:flex-none min-[1100px]:h-full min-[1100px]:pt-20 min-[1100px]:pr-[7.75rem] min-[1100px]:pb-0"
    >
      <div>
        <header className="mb-8 flex items-start justify-between max-[1099px]:flex-col max-[1099px]:items-center max-[1099px]:text-center">
          <div>
            <h2 className="text-2xl font-bold">Agendamentos</h2>
            <p className="text-[0.87rem] text-[var(--text-tertiary)]">
              Visualize os agendamentos de acordo com o dia selecionado
            </p>
          </div>
          <PeriodFilter />
        </header>

        {periodOrder.map((period) => (
          <section
            key={period}
            aria-label={`Agendamentos da ${periodInfo[period].label}`}
            className="mb-3 rounded-[0.5rem] border border-[var(--border-primary)]"
          >
            <header className="flex border-b border-[var(--border-primary)] px-5 py-3">
              <img src={periodIcons[period]} alt="" className="mr-3 w-5" />
              <strong className="flex-1 text-[0.87rem] font-normal text-[var(--text-tertiary)]">
                {periodInfo[period].label}
              </strong>
              <span className="text-[0.87rem] text-[var(--text-tertiary)]">
                {periodInfo[period].range}
              </span>
            </header>

            <ul className="list-none p-5">
              {periodsByDay[period].length > 0 ? (
                periodsByDay[period].map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <EmptyState message="Nenhum agendamento para este período" />
              )}
            </ul>
          </section>
        ))}
      </div>

      <footer className="py-4 text-center text-[0.9rem] text-[var(--accent)] max-[1099px]:pt-8">
        <p>
          Desenvolvido por <strong>Isabella Avelina</strong> · Design HairDay
        </p>
      </footer>
    </section>
  );
}
