import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export const SESSION_COOKIE = "uosg_session";
const SESSION_DAYS = 14;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function setSessionCookie(token: string, expiresAt: Date) {
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await db.session.create({ data: { id: hashToken(token), userId, expiresAt } });
  await setSessionCookie(token, expiresAt);
}

/** Returns the signed-in, active user for this request, or null. */
export async function readSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { id: hashToken(token) },
    include: { user: { select: { id: true, name: true, email: true, role: true, active: true } } },
  });
  if (!session) return null;

  if (session.expiresAt.getTime() <= Date.now() || !session.user.active) {
    await db.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  return session.user;
}

export async function deleteSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await db.session.deleteMany({ where: { id: hashToken(token) } });
  }
  store.delete(SESSION_COOKIE);
}

/** Signs a member out everywhere (used when their role, password or status changes). */
export async function deleteUserSessions(userId: string, exceptCurrent = false) {
  let keepId: string | undefined;
  if (exceptCurrent) {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    keepId = token ? hashToken(token) : undefined;
  }
  await db.session.deleteMany({
    where: { userId, ...(keepId ? { NOT: { id: keepId } } : {}) },
  });
}
