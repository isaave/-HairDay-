import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

/** Chave de persistência do tema no localStorage. */
const STORAGE_KEY = "hairday:theme";

/**
 * Lê o tema inicial: preferência salva no localStorage e, na
 * ausência dela, a preferência do sistema — com fallback para o
 * tema dark (padrão do design original).
 */
function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // localStorage indisponível — segue para a preferência do sistema.
  }
  const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;
  return prefersLight ? "light" : "dark";
}

/**
 * Fonte única de verdade do tema claro/escuro.
 *
 * Sincroniza o atributo `data-theme` no `<html>` (que alterna os
 * tokens CSS) e persiste a escolha no localStorage. Deve ser
 * chamado uma única vez (no App), com o valor distribuído via Props.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Sem persistência disponível — o tema funciona na sessão atual.
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return { theme, toggleTheme };
}
