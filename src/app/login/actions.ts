"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, startSession, endSession } from "@/lib/auth";

export async function loginAction(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Ingresa correo y contraseña." };
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    return { error: "Correo o contraseña incorrectos." };
  }

  await startSession(user.id);
  redirect("/");
}

export async function logoutAction() {
  await endSession();
  redirect("/login");
}
