export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-hairline bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted">
      {children}
    </span>
  );
}
