"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Role } from "@/generated/prisma/enums";
import { requirePermission, requireUser } from "@/lib/auth/current-user";
import { hashPassword, PASSWORD_MIN_LENGTH, verifyPassword } from "@/lib/auth/password";
import { deleteUserSessions } from "@/lib/auth/session";
import { db } from "@/lib/db";

export type MemberFormState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string | undefined>;
  /** Submitted values (never passwords), so React's form reset doesn't wipe them on errors. */
  values?: Record<string, string>;
};

function withValues(state: MemberFormState, formData: FormData, ...keys: string[]) {
  if (state.success) return state;
  return { ...state, values: Object.fromEntries(keys.map((k) => [k, String(formData.get(k) ?? "")])) };
}

const password = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters.`)
  .max(200);

const memberFields = {
  name: z.string().trim().min(2, "Enter the member's full name.").max(100),
  email: z.email("Enter a valid email address.").transform((v) => v.toLowerCase()),
  role: z.enum(Role, "Choose a role."),
};

function fieldErrors(error: z.ZodError): MemberFormState {
  const errors = z.flattenError(error).fieldErrors as Record<string, string[] | undefined>;
  return {
    fieldErrors: Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, v?.[0]])),
  };
}

async function emailTaken(email: string, exceptId?: string) {
  const existing = await db.user.findUnique({ where: { email }, select: { id: true } });
  return !!existing && existing.id !== exceptId;
}

export async function createMember(
  _prev: MemberFormState,
  formData: FormData,
): Promise<MemberFormState> {
  return withValues(await attemptCreateMember(formData), formData, "name", "email", "role");
}

async function attemptCreateMember(formData: FormData): Promise<MemberFormState> {
  await requirePermission("members.manage");

  const parsed = z
    .object({ ...memberFields, password })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fieldErrors(parsed.error);

  const { name, email, role } = parsed.data;
  if (await emailTaken(email)) {
    return { fieldErrors: { email: "A member with this email already exists." } };
  }

  await db.user.create({
    data: { name, email, role, passwordHash: await hashPassword(parsed.data.password) },
  });
  refresh();
  return { success: `${name} was added. Share the temporary password with them privately.` };
}

export async function updateMember(
  memberId: string,
  _prev: MemberFormState,
  formData: FormData,
): Promise<MemberFormState> {
  const state = await attemptUpdateMember(memberId, formData);
  return withValues(state, formData, "name", "email", "role", "active");
}

async function attemptUpdateMember(memberId: string, formData: FormData): Promise<MemberFormState> {
  const admin = await requirePermission("members.manage");

  const parsed = z
    .object({ ...memberFields, active: z.boolean() })
    .safeParse({ ...Object.fromEntries(formData), active: formData.get("active") === "on" });
  if (!parsed.success) return fieldErrors(parsed.error);

  const { name, email, role, active } = parsed.data;
  const member = await db.user.findUnique({ where: { id: memberId } });
  if (!member) return { error: "This member no longer exists." };

  // Prevent admins from locking themselves out.
  if (member.id === admin.id && (role !== member.role || !active)) {
    return { error: "You can't change your own role or deactivate yourself." };
  }
  if (await emailTaken(email, member.id)) {
    return { fieldErrors: { email: "Another member already uses this email." } };
  }

  await db.user.update({ where: { id: member.id }, data: { name, email, role, active } });
  if (!active) await deleteUserSessions(member.id);

  refresh();
  return { success: "Changes saved." };
}

export async function resetMemberPassword(
  memberId: string,
  _prev: MemberFormState,
  formData: FormData,
): Promise<MemberFormState> {
  await requirePermission("members.manage");

  const parsed = z.object({ password }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fieldErrors(parsed.error);

  const member = await db.user.findUnique({ where: { id: memberId }, select: { id: true } });
  if (!member) return { error: "This member no longer exists." };

  await db.user.update({
    where: { id: member.id },
    data: { passwordHash: await hashPassword(parsed.data.password) },
  });
  await deleteUserSessions(member.id);
  return { success: "Password reset. The member has been signed out everywhere." };
}

export async function deleteMember(memberId: string) {
  const admin = await requirePermission("members.manage");
  if (memberId === admin.id) return;

  const hasContent = await db.letter.count({ where: { authorId: memberId } });
  if (hasContent > 0) {
    // Keep their letters intact; deactivate instead of deleting.
    await db.user.update({ where: { id: memberId }, data: { active: false } });
    await deleteUserSessions(memberId);
  } else {
    await db.user.delete({ where: { id: memberId } });
  }
  redirect("/dashboard/members");
}

export async function changeOwnPassword(
  _prev: MemberFormState,
  formData: FormData,
): Promise<MemberFormState> {
  const user = await requireUser();

  const parsed = z
    .object({ current: z.string().min(1, "Enter your current password."), password, confirm: z.string() })
    .refine((d) => d.password === d.confirm, { path: ["confirm"], message: "Passwords don't match." })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fieldErrors(parsed.error);

  const record = await db.user.findUniqueOrThrow({ where: { id: user.id } });
  if (!(await verifyPassword(parsed.data.current, record.passwordHash))) {
    return { fieldErrors: { current: "Current password is incorrect." } };
  }

  await db.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(parsed.data.password) },
  });
  await deleteUserSessions(user.id, true);
  return { success: "Password updated. Other devices have been signed out." };
}
