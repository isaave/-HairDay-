import calendarIcon from "../assets/calendar.svg";
import { useAppointments } from "../context/AppointmentsContext";

/**
 * Filtro da agenda por data: sincronizado com o formulário
 * através do contexto (uma única fonte de verdade para selectedDate).
 */
export function PeriodFilter() {
  const { selectedDate, setSelectedDate } = useAppointments();

  return (
    <div className="max-[1099px]:mt-4">
      <label htmlFor="schedule-date" className="sr-only">
        Filtrar agendamentos por data
      </label>
      <div className="flex h-10 items-center gap-2 rounded-[0.5rem] border border-[var(--border-secondary)] px-3 py-2 focus-within:border-[1.5px] focus-within:border-[var(--accent)]">
        <img src={calendarIcon} alt="" className="h-4 w-4" />
        <input
          id="schedule-date"
          name="schedule-date"
          type="date"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
          className="bg-transparent text-sm text-[var(--text-secondary)] outline-none"
        />
      </div>
    </div>
  );
}
