// Utilidades de formato para la UI.
// Nota: formatCurrency (COP) y toWhatsAppNumber (indicativo 57) son específicos del
// mercado colombiano — razonables como default dado el mercado objetivo de Genuina,
// pero ajústalos si el cliente opera en otro país/moneda.

export function formatCurrency(value?: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(d?: Date | string | null): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(d?: Date | string | null): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/** Fecha relativa simple: "hoy", "mañana", "en 3 días", "hace 2 días". */
export function relativeDay(d?: Date | string | null): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  const today = new Date();
  const a = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const b = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "hoy";
  if (diff === 1) return "mañana";
  if (diff === -1) return "ayer";
  if (diff > 1) return `en ${diff} días`;
  return `hace ${Math.abs(diff)} días`;
}

/** Tiempo relativo fino: "justo ahora", "hace 5 min", "hace 3 h", "hace 2 días". */
export function relativeTime(d?: Date | string | null): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "justo ahora";
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours} h`;
  const days = Math.floor(hours / 24);
  return `hace ${days} día${days === 1 ? "" : "s"}`;
}

/** Tiempo hacia el futuro: "disponible ahora", "en 45 min", "en 3 h". */
export function inTime(d?: Date | string | null): string {
  if (!d) return "disponible ahora";
  const date = typeof d === "string" ? new Date(d) : d;
  const diffMs = date.getTime() - Date.now();
  if (diffMs <= 0) return "disponible ahora";
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 60) return `en ${minutes} min`;
  const hours = Math.round(minutes / 60);
  return `en ${hours} h`;
}

/** Normaliza un teléfono a formato para wa.me (solo dígitos, con indicativo Colombia si falta). */
export function toWhatsAppNumber(raw?: string | null): string | null {
  if (!raw) return null;
  let digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  // Si tiene 10 dígitos (celular colombiano), anteponer 57.
  if (digits.length === 10) digits = "57" + digits;
  return digits;
}
