"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function markNotificationRead(id: string) {
  await requireUser();
  await prisma.notification.update({ where: { id }, data: { leido: true } });
  revalidatePath("/", "layout");
}

export async function markAllNotificationsRead() {
  await requireUser();
  await prisma.notification.updateMany({
    where: { leido: false },
    data: { leido: true },
  });
  revalidatePath("/", "layout");
}
