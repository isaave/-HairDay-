import { AppointmentsList } from "./components/AppointmentsList";
import { Sidebar } from "./components/Sidebar";
import { AppointmentsProvider } from "./context/AppointmentsContext";

/**
 * HairDay — plataforma de agendamentos.
 *
 * Layout do Figma: painel lateral (logo + formulário) à esquerda
 * e agenda por períodos à direita; empilha verticalmente no mobile.
 */
export default function App() {
  return (
    <AppointmentsProvider>
      <main className="mx-auto flex min-h-svh w-full flex-col gap-3 p-3 max-[1099px]:max-w-full min-[1100px]:h-screen min-[1100px]:grid min-[1100px]:grid-cols-[32rem_minmax(0,1fr)] min-[1100px]:gap-0">
        <Sidebar />
        <AppointmentsList />
      </main>
    </AppointmentsProvider>
  );
}
