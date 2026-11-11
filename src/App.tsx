import { AppointmentsList } from "./components/AppointmentsList";
import { Sidebar } from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";
import { AppointmentsProvider } from "./context/AppointmentsContext";
import { useTheme } from "./hooks/useTheme";

/**
 * HairDay — plataforma de agendamentos.
 *
 * Layout do Figma: painel lateral (logo + formulário) à esquerda
 * e agenda por períodos à direita; empilha verticalmente no mobile.
 * O tema claro/escuro é gerenciado aqui e distribuído via Props.
 */
export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <AppointmentsProvider>
      <main className="relative mx-auto flex min-h-svh w-full flex-col gap-3 p-3 max-[1099px]:max-w-full min-[1100px]:h-screen min-[1100px]:grid min-[1100px]:grid-cols-[32rem_minmax(0,1fr)] min-[1100px]:gap-0">
        <Sidebar theme={theme} />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <AppointmentsList />
      </main>
    </AppointmentsProvider>
  );
}
