type EmptyStateProps = {
  message: string;
};

/**
 * Mensagem exibida quando um período não tem agendamentos.
 */
export function EmptyState({ message }: EmptyStateProps) {
  return (
    <li className="flex h-8 items-center text-base text-[var(--text-secondary)]">
      {message}
    </li>
  );
}
