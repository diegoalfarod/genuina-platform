import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={20}
      height={20}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconDashboard = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="3" width="7.5" height="9" rx="1.5" />
    <rect x="13.5" y="3" width="7.5" height="6" rx="1.5" />
    <rect x="13.5" y="12" width="7.5" height="9" rx="1.5" />
    <rect x="3" y="15" width="7.5" height="6" rx="1.5" />
  </Base>
);

export const IconTarget = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </Base>
);

export const IconCalendar = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" />
    <path d="M3.5 9h17" />
    <path d="M8 2.5v4M16 2.5v4" />
  </Base>
);

export const IconSettings = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
  </Base>
);

export const IconBell = (p: IconProps) => (
  <Base {...p}>
    <path d="M18 8a6 6 0 1 0-12 0c0 6-2.5 8-2.5 8h17S18 14 18 8Z" />
    <path d="M10.3 20a1.94 1.94 0 0 0 3.4 0" />
  </Base>
);

export const IconSun = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
  </Base>
);

export const IconMoon = (p: IconProps) => (
  <Base {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </Base>
);

export const IconWhatsapp = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 20.5l1.3-4.2A8 8 0 1 1 8 19.4L3.5 20.5Z" />
    <path d="M9 9.2c.2-.6.4-.6.7-.6h.5c.2 0 .4 0 .6.5s.7 1.7.7 1.8-.1.3-.2.4l-.4.4c-.1.1-.2.2-.1.4a5 5 0 0 0 2.4 2.1c.2.1.3 0 .4-.1l.5-.6c.2-.2.3-.1.5-.1l1.6.8c.2.1.3.2.4.3 0 .5-.2 1.3-.9 1.5-.6.2-1.5.3-3-.4a8 8 0 0 1-3.3-3.2c-.5-.9-.6-1.6-.6-2s.3-.9.4-1Z" fill="currentColor" stroke="none" />
  </Base>
);

export const IconPhone = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.5 3.5c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.3 1L6.6 9.7a12 12 0 0 0 5.7 5.7l1.4-1.4c.3-.3.7-.4 1-.3l3 .8c.5.1.8.5.8 1V19a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7 2 2 0 0 1 5.5 3.5Z" />
  </Base>
);

export const IconMail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7l8 5.5L20 7" />
  </Base>
);

export const IconMapPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-6.5-5.6-6.5-10.2A6.5 6.5 0 0 1 12 4.3a6.5 6.5 0 0 1 6.5 6.5C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.3" />
  </Base>
);

export const IconSparkles = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
    <path d="M18.5 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
  </Base>
);

export const IconSearch = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Base>
);

export const IconPlus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const IconTrash = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M6 7l1 12.5A1.5 1.5 0 0 0 8.5 21h7a1.5 1.5 0 0 0 1.5-1.5L18 7" />
  </Base>
);

export const IconExternal = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 4h6v6M20 4l-8.5 8.5" />
    <path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
  </Base>
);

export const IconArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const IconLogout = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 4.5H6A1.5 1.5 0 0 0 4.5 6v12A1.5 1.5 0 0 0 6 19.5h3" />
    <path d="M15 8l4 4-4 4M19 12H9" />
  </Base>
);

export const IconCard = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3 10h18" />
    <path d="M7 15h4" />
  </Base>
);

export const IconChatBubble = (p: IconProps) => (
  <Base {...p}>
    <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L4 20l1.1-4.4A8.5 8.5 0 1 1 21 11.5Z" />
    <circle cx="8.8" cy="11.5" r="0.7" fill="currentColor" stroke="none" />
    <circle cx="12.5" cy="11.5" r="0.7" fill="currentColor" stroke="none" />
    <circle cx="16.2" cy="11.5" r="0.7" fill="currentColor" stroke="none" />
  </Base>
);

export const IconDocText = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v4h4" />
    <path d="M9 12h6M9 16h6" />
  </Base>
);

export const IconMegaphone = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 10.5v2a1.5 1.5 0 0 0 1.5 1.5H6l8 4.5v-14L6 9H4.5A1.5 1.5 0 0 0 3 10.5Z" />
    <path d="M17.5 9a4.5 4.5 0 0 1 0 5.5" />
    <path d="M7.5 14.5l1 5" />
  </Base>
);

export const IconChart = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4v16h16" />
    <path d="M9 16v-5M13 16V8M17 16v-3" />
  </Base>
);

export const IconLock = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="15.5" r="0.8" fill="currentColor" stroke="none" />
  </Base>
);

export const IconTeam = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 6a3 3 0 0 1 0 5.8" />
    <path d="M17 14.2A5.5 5.5 0 0 1 20.5 19" />
  </Base>
);
