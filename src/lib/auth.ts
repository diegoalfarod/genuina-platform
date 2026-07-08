import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const COOKIE = "genuina_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 días

function secret() {
  return process.env.AUTH_SECRET || "dev-secret-inseguro";
}

function sign(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

function createToken(userId: string) {
  const body = Buffer.from(
    JSON.stringify({ userId, exp: Date.now() + MAX_AGE * 1000 })
  ).toString("base64url");
  return `${body}.${sign(body)}`;
}

function verifyToken(token: string): { userId: string } | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  if (sign(body) !== sig) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString());
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return { userId: data.userId };
  } catch {
    return null;
  }
}

export async function verifyCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user) return null;
  if (!bcrypt.compareSync(password, user.passwordHash)) return null;
  return user;
}

export async function startSession(userId: string) {
  const store = await cookies();
  store.set(COOKIE, createToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  const store = await cookies();
  store.delete(COOKIE);
}

/** Devuelve el usuario actual o null (sin redirigir). */
export async function getCurrentUser() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  const verified = verifyToken(token);
  if (!verified) return null;
  return prisma.user.findUnique({ where: { id: verified.userId } });
}

/** Exige sesión: si no hay, redirige a /login. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
