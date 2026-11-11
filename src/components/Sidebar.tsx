import logoIcon from "../assets/logo.svg";
import { AppointmentForm } from "./AppointmentForm";

/**
 * Painel lateral do HairDay: logo fixo no canto superior esquerdo
 * e o formulário de agendamento (coluna esquerda do layout do Figma).
 */
export function Sidebar() {
  return (
    <aside className="relative">
      <img
        src={logoIcon}
        alt="HairDay"
        className="absolute -top-3 -left-3 z-10 box-border h-[3.5rem] w-[8.7rem] rounded-br-[0.75rem] bg-[var(--bg-tertiary)] px-5 py-3"
      />
      <AppointmentForm />
    </aside>
  );
}
