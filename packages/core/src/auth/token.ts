import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 días

function sign(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

/** Token de sesión HMAC firmado — sin estado en servidor, sin librería externa. */
export function createToken(userId: string, secret: string) {
  const body = Buffer.from(
    JSON.stringify({ userId, exp: Date.now() + MAX_AGE * 1000 })
  ).toString("base64url");
  return `${body}.${sign(body, secret)}`;
}

export function verifyToken(token: string, secret: string): { userId: string } | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  if (sign(body, secret) !== sig) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString());
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return { userId: data.userId };
  } catch {
    return null;
  }
}

export async function setSessionCookie(cookieName: string, token: string) {
  const store = await cookies();
  store.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSessionCookie(cookieName: string) {
  const store = await cookies();
  store.delete(cookieName);
}

export async function readSessionCookie(cookieName: string): Promise<string | null> {
  const store = await cookies();
  return store.get(cookieName)?.value ?? null;
}
