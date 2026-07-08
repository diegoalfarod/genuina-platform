import "server-only";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import {
  createToken,
  verifyToken,
  setSessionCookie,
  clearSessionCookie,
  readSessionCookie,
} from "@genuina/core/src/auth/token";
import { prisma } from "./prisma";

const COOKIE = "genuina_session";

function secret() {
  return process.env.AUTH_SECRET || "dev-secret-inseguro";
}

export async function verifyCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user) return null;
  if (!bcrypt.compareSync(password, user.passwordHash)) return null;
  return user;
}

export async function startSession(userId: string) {
  await setSessionCookie(COOKIE, createToken(userId, secret()));
}

export async function endSession() {
  await clearSessionCookie(COOKIE);
}

/** Devuelve el usuario actual o null (sin redirigir). */
export async function getCurrentUser() {
  const token = await readSessionCookie(COOKIE);
  if (!token) return null;
  const verified = verifyToken(token, secret());
  if (!verified) return null;
  return prisma.user.findUnique({ where: { id: verified.userId } });
}

/** Exige sesión: si no hay, redirige a /login. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
