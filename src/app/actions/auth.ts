"use server";

import { redirect, unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword, PASSWORD_MIN_LENGTH, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { can } from "@/lib/permissions";

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string | undefined>;
  /** Submitted values (never passwords), so React's form reset doesn't wipe them. */
  values?: Record<string, string>;
};

function keep(formData: FormData, ...keys: string[]) {
  return Object.fromEntries(keys.map((k) => [k, String(formData.get(k) ?? "")]));
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

// Compared against when the email is unknown, so both paths take similar time.
let dummyHash: Promise<string> | undefined;
function getDummyHash() {
  dummyHash ??= hashPassword("not-a-real-password");
  return dummyHash;
}

function safeNextPath(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/dashboard") && !next.startsWith("//") ? next : "/dashboard";
}

const DATABASE_DOWN = "We can't reach the database right now. Please try again in a minute.";

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = keep(formData, "email");
  try {
    return { ...(await attemptLogin(formData)), values };
  } catch (error) {
    unstable_rethrow(error); // let the success redirect through
    console.error("[login] failed:", error);
    return { error: DATABASE_DOWN, values };
  }
}

async function attemptLogin(formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const since = new Date(Date.now() - LOCKOUT_MINUTES * 60 * 1000);
  const recentFailures = await db.loginAttempt.count({
    where: { email, createdAt: { gte: since } },
  });
  if (recentFailures >= MAX_ATTEMPTS) {
    return {
      error: `Too many failed attempts. Please wait ${LOCKOUT_MINUTES} minutes and try again.`,
    };
  }

  const user = await db.user.findUnique({ where: { email } });
  const passwordOk = await verifyPassword(password, user?.passwordHash ?? (await getDummyHash()));

  if (!user || !passwordOk) {
    await db.loginAttempt.create({ data: { email } });
    return { error: "Incorrect email or password." };
  }
  if (!user.active) {
    return { error: "This account has been deactivated. Contact your group leader." };
  }
  if (!can(user.role, "dashboard.access")) {
    return { error: "Guest accounts can browse the public website but can't use the dashboard." };
  }

  await db.loginAttempt.deleteMany({ where: { email } });
  await createSession(user.id);
  redirect(safeNextPath(formData.get("next")));
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

const setupSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name.").max(100),
    email: z.email("Enter a valid email address.").transform((v) => v.toLowerCase()),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters.`)
      .max(200),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords don't match.",
  });

/** Creates the very first account (a Group Committee admin). Only works on an empty database. */
export async function setupFirstAdmin(_prev: FormState, formData: FormData): Promise<FormState> {
  return { ...(await attemptSetup(formData)), values: keep(formData, "name", "email") };
}

async function attemptSetup(formData: FormData): Promise<FormState> {
  if ((await db.user.count()) > 0) {
    return { error: "Setup is already complete. Please sign in." };
  }

  const parsed = setupSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const errors = z.flattenError(parsed.error).fieldErrors;
    return {
      fieldErrors: Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, v?.[0]])),
    };
  }

  const { name, email, password } = parsed.data;
  const user = await db.user.create({
    data: { name, email, passwordHash: await hashPassword(password), role: "GROUP_COMMITTEE_MEMBER" },
  });
  await createSession(user.id);
  redirect("/dashboard");
}
