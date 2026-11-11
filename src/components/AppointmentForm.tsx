import { Fragment, useState } from "react";
import type { FormEvent } from "react";
import calendarIcon from "../assets/calendar.svg";
import personIcon from "../assets/person.svg";
import { useAppointments } from "../context/AppointmentsContext";
import { openingHours, periodInfo, periodStartTime } from "../data/openingHours";
import { getPeriodFromTime, nowHHMM, todayISO } from "../utils";

/**
 * Formulário de agendamento: data, horário (grade por período)
 * e nome do cliente, com validação antes de salvar no contexto.
 */
export function AppointmentForm() {
  const { addAppointment, selectedDate, setSelectedDate, takenHours } =
    useAppointments();

  const [clientName, setClientName] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isToday = selectedDate === todayISO();
  const currentHHMM = nowHHMM();

  /**
   * Um horário fica indisponível quando já existe um agendamento
   * nele ou quando já passou (se a data selecionada é hoje).
   */
  function isHourUnavailable(hour: string): boolean {
    if (takenHours.includes(hour)) return true;
    if (isToday && hour <= currentHHMM) return true;
    return false;
  }

  function handleDateChange(date: string) {
    setSelectedDate(date);
    // A grade de horários muda com a data, então limpa a seleção.
    setSelectedTime(null);
    setError(null);
  }

  function handleSelectHour(hour: string) {
    setSelectedTime(hour);
    setError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validação: os três campos são obrigatórios.
    if (!clientName.trim()) {
      setError("Informe o nome do cliente.");
      return;
    }
    if (!selectedDate) {
      setError("Selecione a data do agendamento.");
      return;
    }
    if (!selectedTime) {
      setError("Selecione um horário disponível.");
      return;
    }

    addAppointment({ clientName, date: selectedDate, time: selectedTime });

    // Limpa o formulário para o próximo agendamento.
    setClientName("");
    setSelectedTime(null);
    setError(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="flex w-full flex-col rounded-[0.75rem] bg-[var(--bg-secondary)] p-6 pt-16 pb-6 max-[1099px]:max-w-full min-[1100px]:h-full min-[1100px]:max-w-[32rem] min-[1100px]:overflow-y-auto min-[1100px]:p-20 min-[1100px]:pb-6"
    >
      <header className="mb-6 max-w-[21rem]">
        <h1 className="text-2xl font-bold">Agendar atendimento</h1>
        <p className="mt-2 text-[0.87rem] text-[var(--text-tertiary)]">
          Selecione data, horário e informe o nome do cliente para criar o
          agendamento
        </p>
      </header>

      <label
        htmlFor="date"
        className="mb-1 block text-base font-bold text-[var(--text-secondary)]"
      >
        Data
      </label>
      <div className="mb-6 flex h-12 items-center gap-2 rounded-[0.5rem] border border-[var(--border-secondary)] px-3 py-[0.87rem] focus-within:border-[1.5px] focus-within:border-[var(--accent)]">
        <img src={calendarIcon} alt="" />
        <input
          id="date"
          name="date"
          type="date"
          required
          value={selectedDate}
          onChange={(event) => handleDateChange(event.target.value)}
          className="h-full w-full bg-transparent text-base text-[var(--text-secondary)] outline-none"
        />
      </div>

      <span
        id="hours-label"
        className="mb-1 block text-base font-bold text-[var(--text-secondary)]"
      >
        Horários
      </span>
      <ul className="hours mb-8 flex list-none flex-wrap gap-2 p-0" aria-labelledby="hours-label">
        {openingHours.map((hour) => {
          const period = getPeriodFromTime(hour);

          return (
            <Fragment key={hour}>
              {hour === periodStartTime[period] && (
                <li className="mt-3 w-full text-[0.87rem] text-[var(--text-tertiary)]">
                  {periodInfo[period].label}
                </li>
              )}
              <li>
                <button
                  type="button"
                  disabled={isHourUnavailable(hour)}
                  aria-pressed={selectedTime === hour}
                  onClick={() => handleSelectHour(hour)}
                  className={
                    selectedTime === hour
                      ? "h-10 w-[4.87rem] cursor-pointer rounded-[0.5rem] border border-[var(--accent)] bg-[var(--bg-tertiary)] text-base text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
                      : "h-10 w-[4.87rem] cursor-pointer rounded-[0.5rem] border border-[var(--border-secondary)] bg-[var(--bg-tertiary)] text-base text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--border-secondary)] disabled:hover:text-[var(--text-secondary)]"
                  }
                >
                  {hour}
                </button>
              </li>
            </Fragment>
          );
        })}
      </ul>

      <label
        htmlFor="client"
        className="mb-1 block text-base font-bold text-[var(--text-secondary)]"
      >
        Cliente
      </label>
      <div className="mb-6 flex h-12 items-center gap-2 rounded-[0.5rem] border border-[var(--border-secondary)] px-3 py-[0.87rem] focus-within:border-[1.5px] focus-within:border-[var(--accent)]">
        <img src={personIcon} alt="" />
        <input
          id="client"
          name="client"
          type="text"
          placeholder="Nome do cliente"
          required
          value={clientName}
          onChange={(event) => setClientName(event.target.value)}
          className="h-full w-full bg-transparent text-base text-[var(--text-secondary)] outline-none placeholder:text-[var(--text-tertiary)]"
        />
      </div>

      {error && (
        <p role="alert" className="mb-4 text-[0.87rem] font-bold text-[var(--accent)]">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="h-14 w-full cursor-pointer rounded-[0.5rem] border-0 bg-[var(--accent)] px-5 text-sm font-bold uppercase text-[var(--accent-contrast)] transition-colors duration-300 hover:bg-[var(--accent-hover)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
      >
        Agendar
      </button>
    </form>
  );
}
