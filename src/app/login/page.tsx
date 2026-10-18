import type { Metadata } from "next";
import Link from "next/link";
import { redirect, unstable_rethrow } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import { can } from "@/lib/permissions";

export const metadata: Metadata = { title: "Member login" };

export default function LoginPage() {
  return (
    <AuthLayout>
      <h1 className="font-heading text-3xl font-bold text-ink">Member login</h1>
      <p className="mt-3 text-body">
        Sign in to manage letters, announcements and group documents.
      </p>
      <div className="mt-8">
        {/* The database checks never block the form: each streams in on its own
            and renders nothing if the database can't be reached. */}
        <Suspense>
          <RedirectIfSignedIn />
        </Suspense>
        <Suspense>
          <SetupNotice />
        </Suspense>
        <LoginForm />
      </div>
    </AuthLayout>
  );
}

async function RedirectIfSignedIn() {
  let signedIn = false;
  try {
    const user = await getCurrentUser();
    signedIn = !!user && can(user.role, "dashboard.access");
  } catch (error) {
    unstable_rethrow(error);
    console.error("[login] session check failed:", error);
  }
  if (signedIn) redirect("/dashboard");
  return null;
}

async function SetupNotice() {
  await connection(); // check the database at request time, not during the build
  let needsSetup = false;
  try {
    needsSetup = (await db.user.count()) === 0;
  } catch (error) {
    unstable_rethrow(error);
    console.error("[login] setup check failed:", error);
  }
  if (!needsSetup) return null;

  return (
    <p className="mb-5 rounded-lg bg-brand-50 px-3.5 py-3 text-sm text-brand-800">
      No accounts exist yet.{" "}
      <Link href="/setup" className="font-semibold underline">
        Create the first admin account
      </Link>
      .
    </p>
  );
}
