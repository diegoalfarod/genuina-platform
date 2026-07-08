// Sello interno: este dashboard ES Genuina, así que ya no dice "Powered by Genuina" —
// es una marca de identidad/versión del propio panel. Ajusta el texto cuando quieras.
export function GenuinaSeal({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-subtle ${className}`}
    >
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent to-accent-2"
      />
      <span className="font-display font-semibold text-muted">Genuina</span>
    </span>
  );
}
