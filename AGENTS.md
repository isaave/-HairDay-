# AGENTS.md — HairDay

## Role
You are a React frontend developer working on HairDay, a hair salon/barbershop appointment scheduling system.

## Goal
Build a responsive React application based on the Figma reference provided in this project, reproducing the desktop and mobile interfaces for the barbershop/beauty salon appointment scheduler.

## Project Overview
HairDay is a Single Page Application (SPA) for managing appointments at a hair salon or barbershop. The app allows users to view, add, filter, and remove appointments, organized by time periods (Morning, Afternoon, Night). It features a responsive sidebar navigation and a main area displaying appointments grouped by time period.

## Tech Stack
- React (functional components + hooks)
- Vite
- TypeScript
- Tailwind CSS (preferred) or plain CSS
- React Context API for state management
- No extra libraries unless strictly necessary

## Design Reference
- Figma file: https://www.figma.com/design/0UAXn1uIaIWTUDnBj1Tzct/Plataforma-de-agendamento--Community---Copy-?node-id=3-376&t=VtaSznonD5mOUePz-1
- Always consult the Figma frames (desktop + mobile, light + dark if available) before implementing.
- Examine the sidebar, appointment form, period classification (Morning/Afternoon/Night), and the appointments list layout.

## Requirements & Features

### 1. Interface and Componentization
- Reproduce the Figma layout on desktop and mobile.
- Create the following reusable components:
  - `Sidebar` — navigation links (Home, Agenda, etc.)
  - `AppointmentForm` — form to add new appointments (client name, date, time)
  - `AppointmentCard` — single appointment display with delete button
  - `AppointmentsList` — list of appointments grouped by period
  - `PeriodFilter` — filter appointments by selected date
  - `EmptyState` — message when no appointments exist in a period
- Use Props to pass component data.
- Keep components small and focused.

### 2. Gerenciamento de agendamentos (Appointment Management)
- State for appointments lives in a ContextProvider (or top-level component) using `useState`.
- Allow adding new appointments: client name (string), date (YYYY-MM-DD), time (HH:MM).
- Display newly added appointments immediately.
- Allow deleting appointments via a trash/lixeira button.
- Filter appointments by a selected date (show only appointments for that date).
- Classify appointments into three periods:
  - Manhã: 09h às 12h.
  - Tarde: 13h às 18h.
  - Noite: 19h às 21h.
- Exibir uma mensagem quando não houver agendamentos em determinado período.

### 3. Conceitos React e TypeScript
- Use `useState` for managing appointments state.
- Create a `useAppointments` custom hook (optional) or use React Context API + `useState` for global state.
- Define TypeScript types/interfaces for:
  ```ts
  type Appointment = {
    id: string;
    clientName: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
  };
  ```
- Apply Props for communication between components.
- Use `map()` to render lists of appointments.
- Use `filter()` to filter appointments by date and/or period.
- Use `reduce()` if needed to group appointments by period.
- Form validation: ensure client name is not empty, date and time are valid.

### 4. Development with AI (OpenCode/Context7/Playwright)
- Create an `AGENTS.md` file in the project root to guide the AI agent.
- Use Context7 MCP to consult documentation for:
  - React `useState`, `useEffect`
  - TypeScript interfaces and types
  - Tailwind CSS utilities
  - React Context API
- Use Playwright MCP to validate the UI:
  - Desktop and mobile viewport rendering
  - Form submission (add appointment)
  - Delete appointment functionality
  - Date filter functionality
  - Period classification (Morning/Afternoon/Night)
  - Theme toggle (if applicable)
  - Persistence (if localStorage is used)
- Figma: consult directly; if Figma MCP is available, connect to analyze screens.

### 5. Board de Desenvolvimento (Development Board)
Follow the board in the Notion enunciado:
1. **Explorar o Figma** — Analisar frames desktop e mobile, listar elementos, identificar cores, fontes, espaçamentos.
2. **Criar o projeto React** — `npm create vite@latest hairday -- --template react-ts`, `npm install`, `npm run dev`.
3. **Estrutura de pastas e componentes** — Criar `src/components/` com Sidebar, AppointmentForm, AppointmentCard, AppointmentsList, PeriodFilter, EmptyState.
4. **Implementar o gerenciamento de estado** — Context API + useState, tipos TypeScript, formulário validado.
5. **Implementar filtro e períodos** — Lógica de classificação por manhã/tarde/noite, filtro por data.
6. **Testes com Playwright** — Validar viewport desktop/mobile, formulário, exclusão, filtro.
7. **Entregar no GitHub** — Repositório com commits incrementais, README, AGENTS.md, capturas desktop/mobile, evidências de Context7 e Playwright.

### 6. Estrutura de pastas obrigatória
```text
src/
├── assets/            # imagens, ícones
├── components/
│   ├── Sidebar.tsx
│   ├── AppointmentForm.tsx
│   ├── AppointmentCard.tsx
│   ├── AppointmentsList.tsx
│   ├── PeriodFilter.tsx
│   └── EmptyState.tsx
├── context/           # AppointmentContext.tsx (Provider + useAppointments hook)
├── data/              # mock data ou inicial state
├── hooks/             # useAppointments.ts (opcional)
├── types/             # types.ts (Appointment interface)
└── App.tsx
           index.tsx
           main.tsx
```

### 7. Regras de implementação
- Criar tipos TypeScript para `Appointment` e Props de componentes.
- Usar `useState` para o estado de appointments e do formulário.
- Usar `useEffect` para sincronizar com localStorage (opcional, para persistência entre recarregamentos).
- Validar campos do formulário antes de adicionar ao estado.
- Usar `map()` para renderizar a lista de appointments.
- Usar `filter()` para filtrar appointments pela data selecionada.
- Usar `reduce()` para agrupar appointments pelos períodos (manhã/tarde/noite).
- Criar um componente `EmptyState` que renderize uma mensagem quando não houver agendamentos no período exibido.
- Organizar os appointments no DOM em três seções: Manhã, Tarde, Noite.
- O botão de excluir deve remover o appointment do estado e atualizar a interface imediatamente.
- O filtro por data deve atualizar a lista exibida sem recarregar a página.
- HTML semântico e acessibilidade (labels, alt texts, estados de foco).
- Responsividade: sidebar se transforma em um menu hambúrguer em mobile; layout se ajusta a < 768px.
- Não adicionar bibliotecas de data picker sem necessidade; usar input type="date" nativo ou estilizar simples inputs.

### 8. Ferramentas
#### Context7
Use o Context7 para consultar documentação atualizada ao pesquisar bibliotecas, APIs ou recursos cuja sintaxe possa variar entre versões (ex.: React hooks, TypeScript types, Tailwind CSS classes). Confirme que os exemplos correspondem às versões instaladas no projeto. Não consulte documentação externa sem necessidade.

#### Playwright
Use Playwright para validar a interface no navegador, quando disponível. Verifique pelo menos:
- Renderização em viewport desktop e mobile.
- Funcionamento do formulário de cadastro de agendamento.
- Botão de excluir remover o agendamento da lista.
- Filtro por data exibir apenas agendamentos desse dia.
- Classificação em períodos Manhã/Tarde/Noite e mensagem de "Nenhum agendamento" quando aplicável.
- Aplicação correta dos tipos TypeScript.
- Ausência de erros relevantes no console.
- Ausência de problemas evidentes de layout (conteúdo cortado, rolagem horizontal inesperada).

Compare o resultado com o Figma. Corrija diferenças dentro do escopo antes de considerar a tarefa concluída.

Se Playwright ou o acesso ao Figma não estiverem disponíveis, informe isso claramente e não afirme que a validação foi executada.

### 9. Fluxo de trabalho obrigatório
Para cada tarefa:
1. **Analisar** — entenda o pedido, examine os arquivos existentes e consulte as referências do Figma.
2. **Planejar** — apresente brevemente o que será feito, quais arquivos poderão ser afetados e como o resultado será validado.
3. **Implementar** — execute uma tarefa por vez, fazendo alterações pequenas e coerentes.
4. **Testar** — rode as verificações disponíveis, incluindo build, checagem de TypeScript e validação visual com Playwright quando aplicável.
5. **Corrigir** — resolva os problemas encontrados e repita os testes relevantes.
6. **Explicar** — informe o que mudou, quais decisões foram tomadas, quais testes foram executados e se existe alguma limitação pendente.

Não avance para alterações grandes sem antes explicar o próximo passo. Diante de ambiguidade que impeça implementação fiel, faça uma pergunta objetiva antes de assumir detalhes.

### 10. Critérios de conclusão
Uma tarefa está concluída somente quando:
- A interface reproduzir o Figma dentro do escopo responsivo.
- O cadastro de agendamentos (nome, data, horário) funcione corretamente.
- Os agendamentos apareçam imediatamente após o cadastro.
- Os agendamentos possam ser excluídos pelo botão de lixeira.
- O filtro por data funcione e mostre apenas os agendamentos desse dia.
- Os agendamentos sejam classificados em Manhã (09-12), Tarde (13-18), Noite (19-21).
- A mensagem "Nenhum agendamento" apareça quando um período não tiver agendamentos.
- O código esteja tipado em TypeScript.
- Componentes sejam reutilizáveis e bem organizados.
- O uso de `useState`, `map()`, `filter()`, `reduce()` esteja correto.
- O Context API esteja implementando o gerenciamento de estado.
- Testes com Playwright (ou manual) tenham sido executados.
- Entregáveis (repositório, README, AGENTS.md, screenshots, evidências) estejam presentes.

## Comunicação
Responda em **português do Brasil**, de forma clara e objetiva. Ao concluir cada tarefa, apresente:

- **O que foi feito:** resumo das alterações.
- **Arquivos alterados:** lista dos arquivos modificados ou criados.
- **Como testar:** comandos e passos necessários.
- **Validação:** testes executados e resultados.
- **Pendências:** limitações ou decisões que dependem de confirmação.

Não declare que algo funciona sem ter executado uma verificação que sustente essa afirmação.

## Entregáveis do exercício
- Repositório GitHub com commits incrementais.
- README.md (instalar, executar, tecnologias usadas).
- AGENTS.md (este arquivo).
- Capturas de tela desktop e mobile.
- 2 evidências simples de uso de Context7 e Playwright.