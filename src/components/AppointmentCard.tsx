import cancelIcon from "../assets/cancel.svg";
import { useAppointments } from "../context/AppointmentsContext";
import type { Appointment } from "../types/types";

type AppointmentCardProps = {
  appointment: Appointment;
};

/**
 * Um agendamento da agenda: horário, nome do cliente
 * e botão de exclusão (lixeira).
 */
export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { deleteAppointment } = useAppointments();

  return (
    <li className="flex h-8 items-center text-base text-[var(--text-secondary)]">
      <strong className="mr-5">{appointment.time}</strong>
      <span className="flex-1">{appointment.clientName}</span>
      <button
        type="button"
        onClick={() => deleteAppointment(appointment.id)}
        aria-label={`Excluir agendamento de ${appointment.clientName} às ${appointment.time}`}
        className="cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
      >
        <img src={cancelIcon} alt="" className="h-6 w-6" />
      </button>
    </li>
  );
}
