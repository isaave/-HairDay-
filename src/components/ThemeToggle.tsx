import type { Theme } from "../hooks/useTheme";

type ThemeToggleProps = {
  /** Tema ativo, para exibir o ícone do tema alvo. */
  theme: Theme;
  /** Alterna entre claro e escuro. */
  onToggle: () => void;
};

/* Ícones Phosphor (MIT — https://phosphoricons.com), embutidos
   como SVG para herdar a cor do botão via currentColor. */
function SunIcon() {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className="h-6 w-6">
      <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className="h-6 w-6">
      <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z" />
    </svg>
  );
}

/**
 * Alternância entre tema claro e escuro. Ocupa o canto superior
 * direito da página, espelhando o box do logo no canto superior
 * esquerdo, e mostra o ícone do tema para o qual vai alternar.
 */
export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      className="absolute top-0 right-0 z-10 flex h-[3.5rem] w-[3.5rem] cursor-pointer items-center justify-center rounded-bl-[0.75rem] border-0 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[var(--border-secondary)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
