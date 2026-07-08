import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";
import { GenuinaSeal } from "@/components/GenuinaSeal";
import { BottomDock } from "@/components/BottomDock";
import { getNotificationFeed } from "@/lib/notifications";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const { unreadCount } = await getNotificationFeed();

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Barra superior glassy */}
      <header className="sticky top-0 z-30 border-b border-hairline bg-surface backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2.5 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-display text-lg font-semibold text-ink">Genuina</span>
            <span className="hidden h-6 w-px bg-hairline sm:block" />
            <GenuinaSeal className="hidden sm:inline-flex" />
          </Link>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <span className="mx-1 hidden h-6 w-px bg-hairline sm:block" />
            <UserMenu nombre={user.nombre} rol={user.rol} />
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="animate-page mx-auto w-full max-w-6xl flex-1 px-4 pb-32 pt-6 md:px-8 md:pt-8">
        {children}
      </main>

      {/* Dock flotante */}
      <BottomDock unreadEquipo={unreadCount} />
    </div>
  );
}
