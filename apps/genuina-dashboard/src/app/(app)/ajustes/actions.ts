"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function changePasswordAction(_prev: unknown, formData: FormData) {
  const user = await requireUser();
  const actual = String(formData.get("actual") || "");
  const nueva = String(formData.get("nueva") || "");
  const confirmar = String(formData.get("confirmar") || "");

  if (!actual || !nueva || !confirmar) {
    return { ok: false, error: "Completa todos los campos." };
  }
  if (nueva.length < 6) {
    return { ok: false, error: "La nueva contraseña debe tener al menos 6 caracteres." };
  }
  if (nueva !== confirmar) {
    return { ok: false, error: "La confirmación no coincide con la nueva contraseña." };
  }

  const fresh = await prisma.user.findUnique({ where: { id: user.id } });
  if (!fresh || !bcrypt.compareSync(actual, fresh.passwordHash)) {
    return { ok: false, error: "La contraseña actual es incorrecta." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: bcrypt.hashSync(nueva, 10) },
  });

  return { ok: true, message: "Contraseña actualizada." };
}
