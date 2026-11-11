import logo from "../assets/logo.svg";
import logoLight from "../assets/logo-light.svg";
import type { Theme } from "../hooks/useTheme";
import { AppointmentForm } from "./AppointmentForm";

type SidebarProps = {
  /** Tema ativo, usado para escolher a variante do logo. */
  theme: Theme;
};

/**
 * Painel lateral do HairDay: logo fixo no canto superior esquerdo
 * e o formulário de agendamento (coluna esquerda do layout do Figma).
 * O logo tem uma variante para o tema claro (o original tem partes
 * brancas, invisíveis sobre fundo claro).
 */
export function Sidebar({ theme }: SidebarProps) {
  return (
    <aside className="relative">
      <img
        src={theme === "light" ? logoLight : logo}
        alt="HairDay"
        className="absolute -top-3 -left-3 z-10 box-border h-[3.5rem] w-[8.7rem] rounded-br-[0.75rem] bg-[var(--bg-tertiary)] px-5 py-3"
      />
      <AppointmentForm />
    </aside>
  );
}
