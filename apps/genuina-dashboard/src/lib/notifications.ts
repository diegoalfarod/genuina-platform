import "server-only";
import { prisma } from "./prisma";

export async function createNotification(input: {
  tipo?: string; // libre — ajusta a los tipos reales de tu primer agente
  titulo: string;
  mensaje: string;
}) {
  return prisma.notification.create({
    data: {
      tipo: input.tipo ?? "INFO",
      titulo: input.titulo,
      mensaje: input.mensaje,
    },
  });
}

export async function getNotificationFeed() {
  const [items, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
      take: 40,
    }),
    prisma.notification.count({ where: { leido: false } }),
  ]);
  return { items, unreadCount };
}
