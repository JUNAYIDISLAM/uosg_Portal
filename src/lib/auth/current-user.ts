import "server-only";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { can, type Permission } from "@/lib/permissions";
import { readSession } from "./session";

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof readSession>>>;

/** The signed-in user for this request (read once per request), or null. */
export const getCurrentUser = cache(readSession);

/**
 * Data Access Layer guard: call at the top of every dashboard page and server
 * action. Redirects to the login page when signed out.
 */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!can(user.role, "dashboard.access")) redirect("/login?error=no-access");
  return user;
}

/** Like requireUser, but also checks a permission. Pages 404 without it. */
export async function requirePermission(permission: Permission): Promise<CurrentUser> {
  const user = await requireUser();
  if (!can(user.role, permission)) notFound();
  return user;
}
